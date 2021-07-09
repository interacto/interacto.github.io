import type { InteractionData } from "../interaction/InteractionData";
import type { InteractionBinderBuilder } from "./InteractionBinderBuilder";
import type { LogLevel } from "../logging/LogLevel";
import type { Command } from "../command/Command";
import type { InteractionCmdBinder } from "./InteractionCmdBinder";
import type { Interaction } from "../interaction/Interaction";
import type { Widget } from "./BaseBinderBuilder";
export interface InteractionBinder<I extends Interaction<D>, D extends InteractionData> extends InteractionBinderBuilder<I, D> {
    when(fn: (i: D) => boolean): InteractionBinder<I, D>;
    on(widget: ReadonlyArray<Widget<EventTarget>> | Widget<EventTarget>, ...widgets: ReadonlyArray<Widget<EventTarget>>): InteractionBinder<I, D>;
    onDynamic(node: Widget<Node>): InteractionBinder<I, D>;
    log(...level: ReadonlyArray<LogLevel>): InteractionBinder<I, D>;
    end(fn: () => void): InteractionBinder<I, D>;
    stopImmediatePropagation(): InteractionBinder<I, D>;
    preventDefault(): InteractionBinder<I, D>;
    catch(fn: (ex: unknown) => void): InteractionBinder<I, D>;
    name(name: string): InteractionBinder<I, D>;
    toProduce<C extends Command>(fn: (i: D) => C): InteractionCmdBinder<C, I, D>;
}
