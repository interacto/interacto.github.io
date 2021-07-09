import { PointingDataBase } from "./PointingDataBase";
export class PointDataImpl extends PointingDataBase {
    constructor() {
        super(...arguments);
        this.buttonData = 0;
        this.buttonsData = 0;
        this.movementXData = 0;
        this.movementYData = 0;
        this.offsetXData = 0;
        this.offsetYData = 0;
        this.relatedTargetData = null;
    }
    flush() {
        super.flush();
        this.buttonData = 0;
        this.buttonsData = 0;
        this.movementXData = 0;
        this.movementYData = 0;
        this.offsetXData = 0;
        this.offsetYData = 0;
        this.relatedTargetData = null;
    }
    copy(data) {
        super.copy(data);
        this.buttonData = data.button;
        this.buttonsData = data.buttons;
        this.movementXData = data.movementX;
        this.movementYData = data.movementY;
        this.offsetXData = data.offsetX;
        this.offsetYData = data.offsetY;
        this.relatedTargetData = data.relatedTarget;
    }
    get button() {
        return this.buttonData;
    }
    get buttons() {
        return this.buttonsData;
    }
    get movementX() {
        return this.movementXData;
    }
    get movementY() {
        return this.movementYData;
    }
    get offsetX() {
        return this.offsetXData;
    }
    get offsetY() {
        return this.offsetYData;
    }
    get relatedTarget() {
        return this.relatedTargetData;
    }
}
