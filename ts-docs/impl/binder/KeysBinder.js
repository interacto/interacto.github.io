import { AnonBinding } from "../binding/AnonBinding";
import { KeysDataImpl } from "../interaction/KeysDataImpl";
import { KeyDataImpl } from "../interaction/KeyDataImpl";
import { UpdateBinder } from "./UpdateBinder";
export class KeysBinder extends UpdateBinder {
    constructor(undoHistory, logger, observer, binder) {
        super(undoHistory, logger, observer, binder);
        Object.assign(this, binder);
        this.codes = this.codes === undefined ? [] : [...this.codes];
        this.checkCodeFn = (i) => {
            let currentCodes = [];
            if (i instanceof KeysDataImpl) {
                currentCodes = i.keys.map(k => k.code);
            }
            else {
                if (i instanceof KeyDataImpl) {
                    currentCodes = [i.code];
                }
            }
            return (this.codes.length === 0 || this.codes.length === currentCodes.length &&
                currentCodes.every((v) => this.codes.includes(v))) &&
                (this.whenFn === undefined || this.whenFn(i));
        };
    }
    with(...keyCodes) {
        const dup = this.duplicate();
        dup.codes = [...keyCodes];
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
    then(fn) {
        return super.then(fn);
    }
    continuousExecution() {
        return super.continuousExecution();
    }
    strictStart() {
        return super.strictStart();
    }
    throttle(timeout) {
        return super.throttle(timeout);
    }
    cancel(fn) {
        return super.cancel(fn);
    }
    endOrCancel(fn) {
        return super.endOrCancel(fn);
    }
    catch(fn) {
        return super.catch(fn);
    }
    name(name) {
        return super.name(name);
    }
    toProduce(fn) {
        return super.toProduce(fn);
    }
    usingInteraction(fn) {
        return super.usingInteraction(fn);
    }
    duplicate() {
        return new KeysBinder(this.undoHistory, this.logger, this.observer, this);
    }
    bind() {
        var _a;
        if (this.usingFn === undefined) {
            throw new Error("The interaction supplier cannot be undefined here");
        }
        if (this.produceFn === undefined) {
            throw new Error("The command supplier cannot be undefined here");
        }
        const binding = new AnonBinding(this.continuousCmdExecution, this.usingFn(), this.undoHistory, this.logger, this.produceFn, [...this.widgets], [...this.dynamicNodes], this._strictStart, [...this.logLevels], this.throttleTimeout, this.stopPropagation, this.prevDefault, this.firstFn, this.thenFn, this.checkCodeFn, this.endFn, this.cancelFn, this.endOrCancelFn, this.hadEffectsFn, this.hadNoEffectFn, this.cannotExecFn, this.onErrFn, this.bindingName);
        (_a = this.observer) === null || _a === void 0 ? void 0 : _a.observeBinding(binding);
        return binding;
    }
}
