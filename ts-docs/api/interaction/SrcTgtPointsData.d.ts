import type { InteractionData } from "./InteractionData";
import type { PointBaseData } from "./PointBaseData";
export interface SrcTgtPointsData<T extends PointBaseData> extends InteractionData {
    readonly src: T;
    readonly tgt: T;
    readonly diffClientX: number;
    readonly diffClientY: number;
    readonly diffPageX: number;
    readonly diffPageY: number;
    readonly diffScreenX: number;
    readonly diffScreenY: number;
}
