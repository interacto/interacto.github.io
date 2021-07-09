import { InitState } from "./InitState";
import { isOutputStateType } from "../../api/fsm/OutputState";
import { TimeoutTransition } from "./TimeoutTransition";
import { isKeyDownEvent, isKeyUpEvent } from "./Events";
import { Subject } from "rxjs";
import { remove, removeAt } from "../util/ArrayUtil";
import { CancelFSMException } from "./CancelFSMException";
export class FSMImpl {
    constructor(logger) {
        this.logger = logger;
        this.inner = false;
        this._started = false;
        this.initState = new InitState(this, "init");
        this._states = [this.initState];
        this.startingState = this.initState;
        this._currentState = this.initState;
        this.currentStatePublisher = new Subject();
        this.handlers = [];
        this.eventsToProcess = [];
        this.currentSubFSM = undefined;
        this._log = false;
    }
    buildFSM(dataHandler) {
        if (this.states.length > 1) {
            return;
        }
        this.dataHandler = dataHandler;
    }
    get currentState() {
        return this._currentState;
    }
    set currentState(state) {
        const old = this._currentState;
        this._currentState = state;
        this.currentStatePublisher.next([old, this._currentState]);
    }
    get currentStateObservable() {
        return this.currentStatePublisher;
    }
    process(event) {
        if (isKeyUpEvent(event)) {
            this.removeKeyEvent(event.code);
        }
        const processed = this.processEvent(event);
        if (processed && isKeyDownEvent(event) && !(this._currentState instanceof InitState) &&
            this.eventsToProcess.find(evt => isKeyDownEvent(evt) && evt.code === event.code) === undefined) {
            this.addRemaningEventsToProcess(event);
        }
        return processed;
    }
    processEvent(event) {
        var _a, _b;
        if (this.currentSubFSM !== undefined) {
            if (this.log) {
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionMsg(`processing event ${String(event.type)} in a sub-FSM`, this.constructor.name);
            }
            return this.currentSubFSM.process(event);
        }
        if (this.log) {
            (_b = this.logger) === null || _b === void 0 ? void 0 : _b.logInteractionMsg(`processing event ${String(event.type)} at state 
            ${this.currentState.name}: ${this.constructor.name}`, this.constructor.name);
        }
        return this.currentState.process(event);
    }
    get log() {
        return this._log;
    }
    set log(log) {
        this._log = log;
    }
    getDataHandler() {
        return this.dataHandler;
    }
    removeKeyEvent(key) {
        let removed = false;
        for (let i = 0, size = this.eventsToProcess.length; i < size && !removed; i++) {
            const event = this.eventsToProcess[i];
            if (event instanceof KeyboardEvent && event.code === key) {
                removed = true;
                removeAt(this.eventsToProcess, i);
            }
        }
    }
    enterStdState(state) {
        this.currentState = state;
        this.checkTimeoutTransition();
        if (this.started) {
            this.onUpdating();
        }
    }
    get started() {
        return this._started;
    }
    processRemainingEvents() {
        const list = [...this.eventsToProcess];
        list.forEach(event => {
            var _a;
            removeAt(this.eventsToProcess, 0);
            if (this.log) {
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionMsg("Recycling event", this.constructor.name);
            }
            this.process(event);
        });
    }
    addRemaningEventsToProcess(event) {
        this.eventsToProcess.push(event);
    }
    onTerminating() {
        var _a;
        if (this.log) {
            (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionMsg("FSM ended", this.constructor.name);
        }
        if (this.started) {
            this.notifyHandlerOnStop();
        }
        this.reinit();
        this.processRemainingEvents();
    }
    onCancelling() {
        var _a;
        if (this.log) {
            (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionMsg("FSM cancelled", this.constructor.name);
        }
        if (this.started) {
            this.notifyHandlerOnCancel();
        }
        this.fullReinit();
    }
    onStarting() {
        var _a;
        if (this.log) {
            (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionMsg("FSM started", this.constructor.name);
        }
        this._started = true;
        this.notifyHandlerOnStart();
    }
    onUpdating() {
        var _a;
        if (this.started) {
            if (this.log) {
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionMsg("FSM updated", this.constructor.name);
            }
            this.notifyHandlerOnUpdate();
        }
    }
    addState(state) {
        this._states.push(state);
    }
    reinit() {
        var _a, _b, _c;
        if (this.log) {
            (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionMsg("FSM reinitialised", this.constructor.name);
        }
        (_b = this.currentTimeout) === null || _b === void 0 ? void 0 : _b.stopTimeout();
        this._started = false;
        this.currentState = this.initState;
        this.currentTimeout = undefined;
        (_c = this.currentSubFSM) === null || _c === void 0 ? void 0 : _c.reinit();
        if (this.dataHandler !== undefined && !this.inner) {
            this.dataHandler.reinitData();
        }
    }
    fullReinit() {
        var _a;
        this.eventsToProcess.length = 0;
        this.reinit();
        (_a = this.currentSubFSM) === null || _a === void 0 ? void 0 : _a.fullReinit();
    }
    onTimeout() {
        var _a;
        if (this.currentTimeout !== undefined) {
            if (this.log) {
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionMsg("Timeout", this.constructor.name);
            }
            const state = this.currentTimeout.execute();
            if (isOutputStateType(state)) {
                this.currentState = state;
                this.checkTimeoutTransition();
            }
        }
    }
    stopCurrentTimeout() {
        var _a;
        if (this.currentTimeout !== undefined) {
            if (this.log) {
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionMsg("Timeout stopped", this.constructor.name);
            }
            this.currentTimeout.stopTimeout();
            this.currentTimeout = undefined;
        }
    }
    checkTimeoutTransition() {
        var _a;
        const tr = this.currentState.transitions
            .find(t => t instanceof TimeoutTransition);
        if (tr !== undefined) {
            if (this.log) {
                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionMsg("Timeout starting", this.constructor.name);
            }
            this.currentTimeout = tr;
            this.currentTimeout.startTimeout();
        }
    }
    addHandler(handler) {
        this.handlers.push(handler);
    }
    removeHandler(handler) {
        remove(this.handlers, handler);
    }
    notifyHandlerOnStart() {
        var _a;
        try {
            this.handlers.forEach(handler => {
                handler.fsmStarts();
            });
        }
        catch (ex) {
            if (ex instanceof CancelFSMException) {
                this.onCancelling();
                throw ex;
            }
            (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionErr("An 'fsmStarts' produced an error", ex, this.constructor.name);
            this.onCancelling();
        }
    }
    notifyHandlerOnUpdate() {
        var _a;
        try {
            this.handlers.forEach(handler => {
                handler.fsmUpdates();
            });
        }
        catch (ex) {
            if (ex instanceof CancelFSMException) {
                this.onCancelling();
                throw ex;
            }
            (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionErr("An 'fsmUpdates' produced an error", ex, this.constructor.name);
            this.onCancelling();
        }
    }
    notifyHandlerOnStop() {
        var _a;
        try {
            [...this.handlers].forEach(handler => {
                handler.fsmStops();
            });
        }
        catch (ex) {
            if (ex instanceof CancelFSMException) {
                this.onCancelling();
                throw ex;
            }
            (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionErr("An 'fsmStops' produced an error", ex, this.constructor.name);
            this.onCancelling();
        }
    }
    notifyHandlerOnCancel() {
        var _a;
        try {
            [...this.handlers].forEach(handler => {
                handler.fsmCancels();
            });
        }
        catch (ex) {
            (_a = this.logger) === null || _a === void 0 ? void 0 : _a.logInteractionErr("An 'fsmCancels' produced an error", ex, this.constructor.name);
        }
    }
    get states() {
        return [...this._states];
    }
    getEventsToProcess() {
        return [...this.eventsToProcess];
    }
    getInitState() {
        return this.initState;
    }
    uninstall() {
        this.fullReinit();
        this.log = false;
        this.currentStatePublisher.complete();
        this.currentSubFSM = undefined;
        this._states.forEach(state => {
            state.uninstall();
        });
        this._states.length = 0;
        this.dataHandler = undefined;
    }
}
