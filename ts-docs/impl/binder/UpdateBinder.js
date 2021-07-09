import { Binder } from "./Binder";
import { AnonBinding } from "../binding/AnonBinding";
export class UpdateBinder extends Binder {
    constructor(undoHistory, logger, observer, binder) {
        var _a, _b, _c;
        super(undoHistory, logger, observer, binder);
        Object.assign(this, binder);
        (_a = this.continuousCmdExecution) !== null && _a !== void 0 ? _a : (this.continuousCmdExecution = false);
        (_b = this._strictStart) !== null && _b !== void 0 ? _b : (this._strictStart = false);
        (_c = this.throttleTimeout) !== null && _c !== void 0 ? _c : (this.throttleTimeout = 0);
    }
    then(fn) {
        const dup = this.duplicate();
        dup.thenFn = fn;
        return dup;
    }
    continuousExecution() {
        const dup = this.duplicate();
        dup.continuousCmdExecution = true;
        return dup;
    }
    cancel(fn) {
        const dup = this.duplicate();
        dup.cancelFn = fn;
        return dup;
    }
    endOrCancel(fn) {
        const dup = this.duplicate();
        dup.endOrCancelFn = fn;
        return dup;
    }
    strictStart() {
        const dup = this.duplicate();
        dup._strictStart = true;
        return dup;
    }
    throttle(timeout) {
        const dup = this.duplicate();
        dup.throttleTimeout = timeout;
        return dup;
    }
    on(widget, ...widgets) {
        return super.on(widget, ...widgets);
    }
    onDynamic(node) {
        return super.onDynamic(node);
    }
    first(fn) {
        return super.first(fn);
    }
    when(fn) {
        return super.when(fn);
    }
    ifHadEffects(fn) {
        return super.ifHadEffects(fn);
    }
    ifHadNoEffect(fn) {
        return super.ifHadNoEffect(fn);
    }
    ifCannotExecute(fn) {
        return super.ifCannotExecute(fn);
    }
    end(fn) {
        return super.end(fn);
    }
    log(...level) {
        return super.log(...level);
    }
    stopImmediatePropagation() {
        return super.stopImmediatePropagation();
    }
    preventDefault() {
        return super.preventDefault();
    }
    catch(fn) {
        return super.catch(fn);
    }
    name(name) {
        return super.name(name);
    }
    usingInteraction(fn) {
        return super.usingInteraction(fn);
    }
    toProduce(fn) {
        return super.toProduce(fn);
    }
    duplicate() {
        return new UpdateBinder(this.undoHistory, this.logger, this.observer, this);
    }
    bind() {
        var _a;
        if (this.usingFn === undefined) {
            throw new Error("The interaction supplier cannot be undefined here");
        }
        if (this.produceFn === undefined) {
            throw new Error("The command supplier cannot be undefined here");
        }
        const binding = new AnonBinding(this.continuousCmdExecution, this.usingFn(), this.undoHistory, this.logger, this.produceFn, [...this.widgets], [...this.dynamicNodes], this._strictStart, [...this.logLevels], this.throttleTimeout, this.stopPropagation, this.prevDefault, this.firstFn, this.thenFn, this.whenFn, this.endFn, this.cancelFn, this.endOrCancelFn, this.hadEffectsFn, this.hadNoEffectFn, this.cannotExecFn, this.onErrFn, this.bindingName);
        (_a = this.observer) === null || _a === void 0 ? void 0 : _a.observeBinding(binding);
        return binding;
    }
}
