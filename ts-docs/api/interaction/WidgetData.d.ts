import type { InteractionData } from "./InteractionData";
export interface WidgetData<T> extends InteractionData {
    readonly widget: T | undefined;
}
