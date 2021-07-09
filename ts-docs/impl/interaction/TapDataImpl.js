export class TapDataImpl {
    constructor() {
        this.tapsData = [];
    }
    get taps() {
        return [...this.tapsData];
    }
    addTapData(data) {
        this.tapsData.push(data);
    }
    flush() {
        this.tapsData.length = 0;
    }
}
