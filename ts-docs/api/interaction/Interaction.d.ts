import type { InteractionData } from "./InteractionData";
import type { FSM } from "../fsm/FSM";
export interface Interaction<D extends InteractionData> {
    stopImmediatePropagation: boolean;
    preventDefault: boolean;
    readonly fsm: FSM;
    data: D;
    isRunning(): boolean;
    isActivated(): boolean;
    setActivated(activated: boolean): void;
    log(log: boolean): void;
    registerToNodes(widgets: ReadonlyArray<EventTarget>): void;
    registerToNodeChildren(elementToObserve: Node): void;
    setThrottleTimeout(timeout: number): void;
    fullReinit(): void;
    uninstall(): void;
}
