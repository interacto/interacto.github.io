import { Pan, PanFSM } from "./Pan";
class SwipeFSM extends PanFSM {
    constructor(horizontal, minVelocity, minLength, pxTolerance) {
        super(horizontal, minLength, pxTolerance);
        this.minVelocity = minVelocity;
        this.t0 = 0;
    }
    computeVelocity(t1, x, y) {
        var _a;
        const value = this.horizontal ? x : y;
        const axe = (_a = this.moveAxe) !== null && _a !== void 0 ? _a : 0;
        return Math.abs(axe - value) / ((t1 - this.t0) / 1000);
    }
    setInitialValueOnTouch(evt) {
        super.setInitialValueOnTouch(evt);
        this.t0 = evt.timeStamp;
    }
    checkFinalPanConditions(evt) {
        return super.checkFinalPanConditions(evt) &&
            this.computeVelocity(evt.timeStamp, evt.changedTouches[0].clientX, evt.changedTouches[0].clientY) >= this.minVelocity;
    }
    reinit() {
        super.reinit();
        this.t0 = 0;
    }
}
export class Swipe extends Pan {
    constructor(horizontal, minVelocity, minLength, pxTolerance) {
        super(horizontal, minLength, pxTolerance, new SwipeFSM(horizontal, minVelocity, minLength, pxTolerance));
    }
}
