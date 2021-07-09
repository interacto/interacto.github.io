import { TransitionBase } from "./TransitionBase";
import { isOutputStateType } from "../../api/fsm/OutputState";
import { TerminalState } from "./TerminalState";
import { CancellingState } from "./CancellingState";
export class SubFSMTransition extends TransitionBase {
    constructor(srcState, tgtState, fsm) {
        super(srcState, tgtState);
        this.subFSM = fsm;
        this.subFSM.inner = true;
        this.subFSMHandler = {
            "fsmStarts": () => {
                this.src.exit();
            },
            "fsmUpdates": () => {
                this.src.fsm.onUpdating();
            },
            "fsmStops": () => {
                this.action(undefined);
                this.unsetFSMHandler();
                if (this.tgt instanceof TerminalState) {
                    this.tgt.enter();
                    return;
                }
                if (this.tgt instanceof CancellingState) {
                    this.cancelsFSM();
                    return;
                }
                if (isOutputStateType(this.tgt)) {
                    this.src.fsm.currentState = this.tgt;
                    this.tgt.enter();
                }
            },
            "fsmCancels": () => {
                this.cancelsFSM();
            }
        };
    }
    setUpFSMHandler() {
        this.subFSM.addHandler(this.subFSMHandler);
        this.src.fsm.currentSubFSM = this.subFSM;
        this.subStateSubscription = this.subFSM.currentStateObservable
            .subscribe(value => {
            this.src.fsm.currentState = value[1];
        });
    }
    unsetFSMHandler() {
        var _a;
        this.subFSM.removeHandler(this.subFSMHandler);
        this.src.fsm.currentSubFSM = undefined;
        (_a = this.subStateSubscription) === null || _a === void 0 ? void 0 : _a.unsubscribe();
    }
    cancelsFSM() {
        this.unsetFSMHandler();
        this.src.fsm.onCancelling();
    }
    execute(event) {
        const transition = this.findTransition(event);
        if (transition === undefined) {
            return undefined;
        }
        this.src.fsm.stopCurrentTimeout();
        this.setUpFSMHandler();
        this.subFSM.process(event);
        return transition.target;
    }
    accept(event) {
        return this.findTransition(event) !== undefined;
    }
    isGuardOK(event) {
        var _a, _b;
        return (_b = (_a = this.findTransition(event)) === null || _a === void 0 ? void 0 : _a.isGuardOK(event)) !== null && _b !== void 0 ? _b : false;
    }
    findTransition(event) {
        return this.subFSM
            .initState
            .transitions
            .find(tr => tr.accept(event));
    }
    getAcceptedEvents() {
        if (this.subFSM.initState.transitions.length === 0) {
            return [];
        }
        return this.subFSM.initState
            .transitions
            .map(tr => tr.getAcceptedEvents())
            .reduce((a, b) => [...a, ...b]);
    }
    uninstall() {
        this.unsetFSMHandler();
        this.subFSM.uninstall();
    }
}
