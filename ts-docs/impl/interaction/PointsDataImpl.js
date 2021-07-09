import { peek } from "../util/ArrayUtil";
export class PointsDataImpl {
    constructor() {
        this.pointsData = [];
    }
    get points() {
        return [...this.pointsData];
    }
    get currentPosition() {
        return this.currentPositionData;
    }
    set currentPosition(position) {
        this.currentPositionData = position;
    }
    get lastButton() {
        var _a;
        return (_a = peek(this.pointsData)) === null || _a === void 0 ? void 0 : _a.button;
    }
    addPoint(ptData) {
        this.pointsData.push(ptData);
    }
    flush() {
        this.pointsData.length = 0;
        this.currentPositionData = undefined;
    }
}
