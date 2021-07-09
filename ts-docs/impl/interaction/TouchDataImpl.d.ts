import type { TouchData } from "../../api/interaction/TouchData";
import { PointingDataBase } from "./PointingDataBase";
import type { UnitInteractionData } from "../../api/interaction/UnitInteractionData";
import type { EventModifierData } from "../../api/interaction/EventModifierData";
export declare class TouchDataImpl extends PointingDataBase implements TouchData {
    private altitudeAngleData;
    private azimuthAngleData;
    private forceData;
    private identifierData;
    private radiusXData;
    private radiusYData;
    private rotationAngleData;
    private touchTypeData;
    get altitudeAngle(): number;
    get azimuthAngle(): number;
    get force(): number;
    get identifier(): number;
    get radiusX(): number;
    get radiusY(): number;
    get rotationAngle(): number;
    get touchType(): TouchType;
    copy(data: TouchData): void;
    flush(): void;
    static mergeTouchEventData(touch: Touch, evt: EventModifierData & UnitInteractionData): TouchData;
}
