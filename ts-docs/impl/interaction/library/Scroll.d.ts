import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import type { ScrollData } from "../../../api/interaction/ScrollData";
import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import { ScrollDataImpl } from "../ScrollDataImpl";
export declare class ScrollFSM extends FSMImpl {
    buildFSM(dataHandler?: ScrollFSMHandler): void;
}
interface ScrollFSMHandler extends FSMDataHandler {
    initToScroll(event: UIEvent): void;
}
export declare class Scroll extends InteractionBase<ScrollData, ScrollDataImpl, ScrollFSM> {
    private readonly handler;
    constructor();
}
export {};
