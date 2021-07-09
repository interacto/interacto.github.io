import { isEltRef } from "../../api/binder/BaseBinderBuilder";
export class Binder {
    constructor(undoHistory, logger, observer, binder) {
        var _a, _b, _c, _d, _e;
        Object.assign(this, binder);
        this.undoHistory = undoHistory;
        this.logger = logger;
        (_a = this.widgets) !== null && _a !== void 0 ? _a : (this.widgets = []);
        (_b = this.dynamicNodes) !== null && _b !== void 0 ? _b : (this.dynamicNodes = []);
        (_c = this.logLevels) !== null && _c !== void 0 ? _c : (this.logLevels = []);
        (_d = this.stopPropagation) !== null && _d !== void 0 ? _d : (this.stopPropagation = false);
        (_e = this.prevDefault) !== null && _e !== void 0 ? _e : (this.prevDefault = false);
        this.observer = observer;
    }
    on(widget, ...widgets) {
        const ws = [...widgets].concat(widget).map(w => {
            if (isEltRef(w)) {
                return w.nativeElement;
            }
            return w;
        });
        const w = this.widgets.length === 0 ? ws : [...this.widgets].concat(ws);
        const dup = this.duplicate();
        dup.widgets = w;
        return dup;
    }
    onDynamic(node) {
        const dup = this.duplicate();
        const nodeEvt = isEltRef(node) ? node.nativeElement : node;
        dup.dynamicNodes = [...this.dynamicNodes].concat(nodeEvt);
        return dup;
    }
    first(fn) {
        const dup = this.duplicate();
        dup.firstFn = fn;
        return dup;
    }
    when(fn) {
        const dup = this.duplicate();
        dup.whenFn = fn;
        return dup;
    }
    ifHadEffects(fn) {
        const dup = this.duplicate();
        dup.hadEffectsFn = fn;
        return dup;
    }
    ifHadNoEffect(fn) {
        const dup = this.duplicate();
        dup.hadNoEffectFn = fn;
        return dup;
    }
    ifCannotExecute(fn) {
        const dup = this.duplicate();
        dup.cannotExecFn = fn;
        return dup;
    }
    end(fn) {
        const dup = this.duplicate();
        dup.endFn = fn;
        return dup;
    }
    log(...level) {
        const dup = this.duplicate();
        dup.logLevels = [...level];
        return dup;
    }
    stopImmediatePropagation() {
        const dup = this.duplicate();
        dup.stopPropagation = true;
        return dup;
    }
    preventDefault() {
        const dup = this.duplicate();
        dup.prevDefault = true;
        return dup;
    }
    catch(fn) {
        const dup = this.duplicate();
        dup.onErrFn = fn;
        return dup;
    }
    name(name) {
        const dup = this.duplicate();
        dup.bindingName = name;
        return dup;
    }
    usingInteraction(fn) {
        const dup = this.duplicate();
        dup.usingFn = fn;
        return dup;
    }
    toProduce(fn) {
        const dup = this.duplicate();
        dup.produceFn = fn;
        return dup;
    }
}
