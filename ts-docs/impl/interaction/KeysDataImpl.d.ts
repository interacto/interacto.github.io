import type { KeysData } from "../../api/interaction/KeysData";
import type { Flushable } from "./Flushable";
import type { KeyData } from "../../api/interaction/KeyData";
export declare class KeysDataImpl implements KeysData, Flushable {
    private readonly keysData;
    flush(): void;
    get keys(): ReadonlyArray<KeyData>;
    addKey(key: KeyData): void;
}
