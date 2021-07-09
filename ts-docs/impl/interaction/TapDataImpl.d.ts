import type { TouchData } from "../../api/interaction/TouchData";
import type { TapData } from "../../api/interaction/TapData";
import type { Flushable } from "./Flushable";
export declare class TapDataImpl implements TapData, Flushable {
    private readonly tapsData;
    constructor();
    get taps(): ReadonlyArray<TouchData>;
    addTapData(data: TouchData): void;
    flush(): void;
}
