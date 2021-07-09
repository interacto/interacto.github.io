import type { EventModifierData } from "./EventModifierData";
export interface PointBaseData extends EventModifierData {
    readonly clientX: number;
    readonly clientY: number;
    readonly pageX: number;
    readonly pageY: number;
    readonly screenX: number;
    readonly screenY: number;
}
