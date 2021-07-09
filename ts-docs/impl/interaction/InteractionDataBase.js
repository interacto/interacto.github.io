export class InteractionDataBase {
    constructor() {
        this.currentTargetData = null;
        this.targetData = null;
        this.timeStampData = 0;
    }
    copy(data) {
        this.currentTargetData = data.currentTarget;
        this.targetData = data.target;
        this.timeStampData = data.timeStamp;
    }
    flush() {
        this.currentTargetData = null;
        this.targetData = null;
        this.timeStampData = 0;
    }
    get currentTarget() {
        return this.currentTargetData;
    }
    get target() {
        return this.targetData;
    }
    get timeStamp() {
        return this.timeStampData;
    }
}
