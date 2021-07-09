import { PointingDataBase } from "./PointingDataBase";
export class TouchDataImpl extends PointingDataBase {
    constructor() {
        super(...arguments);
        this.altitudeAngleData = 0;
        this.azimuthAngleData = 0;
        this.forceData = 0;
        this.identifierData = 0;
        this.radiusXData = 0;
        this.radiusYData = 0;
        this.rotationAngleData = 0;
        this.touchTypeData = "direct";
    }
    get altitudeAngle() {
        return this.altitudeAngleData;
    }
    get azimuthAngle() {
        return this.azimuthAngleData;
    }
    get force() {
        return this.forceData;
    }
    get identifier() {
        return this.identifierData;
    }
    get radiusX() {
        return this.radiusXData;
    }
    get radiusY() {
        return this.radiusYData;
    }
    get rotationAngle() {
        return this.rotationAngleData;
    }
    get touchType() {
        return this.touchTypeData;
    }
    copy(data) {
        super.copy(data);
        this.altitudeAngleData = data.altitudeAngle;
        this.azimuthAngleData = data.azimuthAngle;
        this.forceData = data.force;
        this.identifierData = data.identifier;
        this.radiusXData = data.radiusX;
        this.radiusYData = data.radiusY;
        this.rotationAngleData = data.rotationAngle;
        this.touchTypeData = data.touchType;
    }
    flush() {
        super.flush();
        this.altitudeAngleData = 0;
        this.azimuthAngleData = 0;
        this.forceData = 0;
        this.identifierData = 0;
        this.radiusXData = 0;
        this.radiusYData = 0;
        this.rotationAngleData = 0;
        this.touchTypeData = "direct";
    }
    static mergeTouchEventData(touch, evt) {
        const data = new TouchDataImpl();
        data.copy(touch);
        data.timeStampData = evt.timeStamp;
        data.altKeyData = evt.altKey;
        data.shiftKeyData = evt.shiftKey;
        data.ctrlKeyData = evt.ctrlKey;
        data.metaKeyData = evt.metaKey;
        data.currentTargetData = evt.currentTarget;
        return data;
    }
}
