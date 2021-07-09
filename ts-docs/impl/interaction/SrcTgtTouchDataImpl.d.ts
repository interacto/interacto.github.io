import type { SrcTgtPointsData } from "../../api/interaction/SrcTgtPointsData";
import type { TouchData } from "../../api/interaction/TouchData";
import type { EventModifierData } from "../../api/interaction/EventModifierData";
import type { UnitInteractionData } from "../../api/interaction/UnitInteractionData";
export declare class SrcTgtTouchDataImpl implements SrcTgtPointsData<TouchData> {
    private readonly srcData;
    private readonly tgtData;
    constructor();
    get src(): TouchData;
    get tgt(): TouchData;
    flush(): void;
    copySrc(data: Touch, evt: EventModifierData & UnitInteractionData): void;
    copyTgt(data: Touch, evt: EventModifierData & UnitInteractionData): void;
    get diffClientX(): number;
    get diffClientY(): number;
    get diffPageX(): number;
    get diffPageY(): number;
    get diffScreenX(): number;
    get diffScreenY(): number;
}
