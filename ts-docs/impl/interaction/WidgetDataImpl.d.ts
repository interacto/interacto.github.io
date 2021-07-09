import type { WidgetData } from "../../api/interaction/WidgetData";
import type { Flushable } from "./Flushable";
import { InteractionDataBase } from "./InteractionDataBase";
export declare class WidgetDataImpl<T> extends InteractionDataBase implements WidgetData<T>, Flushable {
    get widget(): T | undefined;
}
