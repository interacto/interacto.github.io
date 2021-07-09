import type { InteractionData } from "./InteractionData";
import type { TouchData } from "./TouchData";
export interface TapData extends InteractionData {
    readonly taps: ReadonlyArray<TouchData>;
}
