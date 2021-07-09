import type { UnitInteractionData } from "./UnitInteractionData";
export interface ScrollData extends UnitInteractionData {
    readonly scrollX: number;
    readonly scrollY: number;
}
