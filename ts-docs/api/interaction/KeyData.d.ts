import type { UnitInteractionData } from "./UnitInteractionData";
import type { EventModifierData } from "./EventModifierData";
export interface KeyData extends UnitInteractionData, EventModifierData {
    readonly code: string;
    readonly key: string;
    readonly location: number;
    readonly repeat: boolean;
}
