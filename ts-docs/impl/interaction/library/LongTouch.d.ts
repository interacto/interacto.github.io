import { FSMImpl } from "../../fsm/FSMImpl";
import { InteractionBase } from "../InteractionBase";
import type { FSMDataHandler } from "../../fsm/FSMDataHandler";
import type { TouchData } from "../../../api/interaction/TouchData";
import { TouchDataImpl } from "../TouchDataImpl";
declare class LongTouchFSM extends FSMImpl {
    private readonly duration;
    private currentTouchID?;
    constructor(duration: number);
    buildFSM(dataHandler?: LongTouchFSMHandler): void;
    reinit(): void;
}
interface LongTouchFSMHandler extends FSMDataHandler {
    tap(evt: TouchEvent): void;
}
export declare class LongTouch extends InteractionBase<TouchData, TouchDataImpl, LongTouchFSM> {
    private readonly handler;
    constructor(duration: number);
}
export {};
