import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import type { WidgetData } from "../../../api/interaction/WidgetData";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { WidgetDataImpl } from "../WidgetDataImpl";
declare class ButtonPressedFSM extends FSMImpl {
    constructor();
    buildFSM(dataHandler: ButtonPressedFSMHandler): void;
}
interface ButtonPressedFSMHandler extends FSMDataHandler {
    initToPressedHandler(event: InputEvent): void;
}
export declare class ButtonPressed extends InteractionBase<WidgetData<HTMLButtonElement>, WidgetDataImpl<HTMLButtonElement>, ButtonPressedFSM> {
    private readonly handler;
    constructor();
    onNewNodeRegistered(node: EventTarget): void;
    onNodeUnregistered(node: EventTarget): void;
}
export {};
