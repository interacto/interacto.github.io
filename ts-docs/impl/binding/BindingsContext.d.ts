import type { BindingsObserver } from "../../api/binding/BindingsObserver";
import type { Binding } from "../../api/binding/Binding";
import type { Command } from "../../api/command/Command";
import type { Interaction } from "../../api/interaction/Interaction";
import type { InteractionData } from "../../api/interaction/InteractionData";
export declare class BindingsContext implements BindingsObserver {
    private readonly binds;
    private readonly disposables;
    private readonly cmds;
    constructor();
    observeBinding(binding: Binding<Command, Interaction<InteractionData>, InteractionData>): void;
    clearObservedBindings(): void;
    get bindings(): ReadonlyArray<Binding<Command, Interaction<InteractionData>, InteractionData>>;
    get commands(): ReadonlyArray<Command>;
    getCmd<C extends Command>(index: number): C;
    getCmdsProducedBy(binding: Binding<Command, Interaction<InteractionData>, InteractionData>): ReadonlyArray<Command>;
}
