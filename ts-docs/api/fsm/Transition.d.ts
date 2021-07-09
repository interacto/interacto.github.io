import type { InputState } from "./InputState";
import type { EventType } from "./EventType";
export interface Transition<E extends Event> {
    readonly target: InputState;
    execute(event: Event): InputState | undefined;
    isGuardOK(event: E): boolean;
    accept(event: Event): event is E;
    getAcceptedEvents(): ReadonlyArray<EventType>;
    uninstall(): void;
}
