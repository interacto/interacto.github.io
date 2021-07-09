import type { Flushable } from "./Flushable";
import type { UnitInteractionData } from "../../api/interaction/UnitInteractionData";
export declare abstract class InteractionDataBase implements UnitInteractionData, Flushable {
    protected currentTargetData: EventTarget | null;
    protected targetData: EventTarget | null;
    protected timeStampData: number;
    copy(data: UnitInteractionData): void;
    flush(): void;
    get currentTarget(): EventTarget | null;
    get target(): EventTarget | null;
    get timeStamp(): number;
}
