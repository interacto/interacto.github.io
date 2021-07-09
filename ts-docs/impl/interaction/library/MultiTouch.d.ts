import { ConcurrentFSM } from "../../fsm/ConcurrentFSM";
import { ConcurrentInteraction } from "../ConcurrentInteraction";
import type { MultiTouchData } from "../../../api/interaction/MultiTouchData";
import type { TouchDnDFSMHandler } from "./TouchDnD";
import { TouchDnDFSM } from "./TouchDnD";
import { MultiTouchDataImpl } from "../MultiTouchDataImpl";
declare class MultiTouchFSM extends ConcurrentFSM<TouchDnDFSM> {
    constructor(nbTouch: number);
    buildFSM(dataHandler: TouchDnDFSMHandler): void;
    process(event: Event): boolean;
}
export declare class MultiTouch extends ConcurrentInteraction<MultiTouchData, MultiTouchDataImpl, MultiTouchFSM> {
    private readonly handler;
    constructor(nbTouches: number);
}
export {};
