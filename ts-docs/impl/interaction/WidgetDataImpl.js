import { InteractionDataBase } from "./InteractionDataBase";
export class WidgetDataImpl extends InteractionDataBase {
    get widget() {
        return this.targetData;
    }
}
