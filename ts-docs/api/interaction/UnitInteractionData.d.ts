import type { InteractionData } from "./InteractionData";
export interface UnitInteractionData extends InteractionData {
    readonly timeStamp: number;
    readonly target: EventTarget | null;
    readonly currentTarget: EventTarget | null;
}
