import type { KeyData } from "../../api/interaction/KeyData";
import type { Flushable } from "./Flushable";
import { InteractionDataBase } from "./InteractionDataBase";
export declare class KeyDataImpl extends InteractionDataBase implements KeyData, Flushable {
    private codeData;
    private keyData;
    private locationData;
    private repeatData;
    private altKeyData;
    private ctrlKeyData;
    private metaKeyData;
    private shiftKeyData;
    flush(): void;
    copy(data: KeyData): void;
    get altKey(): boolean;
    get code(): string;
    get ctrlKey(): boolean;
    get key(): string;
    get location(): number;
    get metaKey(): boolean;
    get repeat(): boolean;
    get shiftKey(): boolean;
}
