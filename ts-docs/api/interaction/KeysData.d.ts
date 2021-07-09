import type { InteractionData } from "./InteractionData";
import type { KeyData } from "./KeyData";
export interface KeysData extends InteractionData {
    readonly keys: ReadonlyArray<KeyData>;
}
