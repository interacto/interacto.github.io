import type { UnitInteractionData } from "./UnitInteractionData";
import type { PointBaseData } from "./PointBaseData";
export interface TouchData extends PointBaseData, UnitInteractionData {
    readonly altitudeAngle: number;
    readonly azimuthAngle: number;
    readonly force: number;
    readonly identifier: number;
    readonly pageX: number;
    readonly pageY: number;
    readonly radiusX: number;
    readonly radiusY: number;
    readonly rotationAngle: number;
    readonly touchType: TouchType;
}
