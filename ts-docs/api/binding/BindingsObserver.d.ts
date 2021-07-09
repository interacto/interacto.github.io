import type { Command } from "../command/Command";
import type { InteractionData } from "../interaction/InteractionData";
import type { Interaction } from "../interaction/Interaction";
import type { Binding } from "./Binding";
export interface BindingsObserver {
    observeBinding(binding: Binding<Command, Interaction<InteractionData>, InteractionData>): void;
    clearObservedBindings(): void;
}
