import type { PointBaseData } from "./PointBaseData";
export interface PointData extends PointBaseData {
    readonly button: number;
    readonly buttons: number;
    readonly movementX: number;
    readonly movementY: number;
    readonly offsetX: number;
    readonly offsetY: number;
    readonly relatedTarget: EventTarget | null;
}
