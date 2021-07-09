export class MultiTouchDataImpl {
    constructor() {
        this.touchesData = new Map();
    }
    get touches() {
        return [...this.touchesData.values()];
    }
    addTouchData(data) {
        this.touchesData.set(data.src.identifier, data);
    }
    removeTouchData(id) {
        const tdata = this.touchesData.get(id);
        if (tdata !== undefined) {
            this.touchesData.delete(id);
            tdata.flush();
        }
    }
    flush() {
        this.touchesData.forEach(data => {
            data.flush();
        });
        this.touchesData.clear();
    }
    setTouch(tp, evt) {
        const tdata = this.touchesData.get(tp.identifier);
        if (tdata !== undefined) {
            tdata.copyTgt(tp, evt);
        }
    }
}
