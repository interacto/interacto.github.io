import type { UnitInteractionData } from "./UnitInteractionData";
export interface EventModifierData extends UnitInteractionData {
    readonly altKey: boolean;
    readonly ctrlKey: boolean;
    readonly metaKey: boolean;
    readonly shiftKey: boolean;
}
