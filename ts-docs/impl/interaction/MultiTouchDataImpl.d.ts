import type { MultiTouchData } from "../../api/interaction/MultiTouchData";
import type { SrcTgtTouchDataImpl } from "./SrcTgtTouchDataImpl";
import type { Flushable } from "./Flushable";
import type { SrcTgtPointsData } from "../../api/interaction/SrcTgtPointsData";
import type { TouchData } from "../../api/interaction/TouchData";
export declare class MultiTouchDataImpl implements MultiTouchData, Flushable {
    private readonly touchesData;
    constructor();
    get touches(): ReadonlyArray<SrcTgtPointsData<TouchData>>;
    addTouchData(data: SrcTgtTouchDataImpl): void;
    removeTouchData(id: number): void;
    flush(): void;
    setTouch(tp: Touch, evt: TouchEvent): void;
}
