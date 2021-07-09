import type { ScrollData } from "../../api/interaction/ScrollData";
import type { Flushable } from "./Flushable";
import { InteractionDataBase } from "./InteractionDataBase";
export declare class ScrollDataImpl extends InteractionDataBase implements ScrollData, Flushable {
    protected scrollXData: number;
    protected scrollYData: number;
    flush(): void;
    get scrollX(): number;
    get scrollY(): number;
    setScrollData(event: UIEvent): void;
}
