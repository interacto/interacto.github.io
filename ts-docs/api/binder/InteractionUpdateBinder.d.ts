import type { InteractionData } from "../interaction/InteractionData";
import type { InteractionUpdateBinderBuilder } from "./InteractionUpdateBinderBuilder";
import type { LogLevel } from "../logging/LogLevel";
import type { Command } from "../command/Command";
import type { InteractionCmdUpdateBinder } from "./InteractionCmdUpdateBinder";
import type { Interaction } from "../interaction/Interaction";
import type { Widget } from "./BaseBinderBuilder";
export interface InteractionUpdateBinder<I extends Interaction<D>, D extends InteractionData> extends InteractionUpdateBinderBuilder<I, D> {
    on(widget: ReadonlyArray<Widget<EventTarget>> | Widget<EventTarget>, ...widgets: ReadonlyArray<Widget<EventTarget>>): InteractionUpdateBinder<I, D>;
    onDynamic(node: Widget<Node>): InteractionUpdateBinder<I, D>;
    log(...level: ReadonlyArray<LogLevel>): InteractionUpdateBinder<I, D>;
    when(fn: (i: D) => boolean): InteractionUpdateBinder<I, D>;
    end(fn: () => void): InteractionUpdateBinder<I, D>;
    cancel(fn: (i: D) => void): InteractionUpdateBinder<I, D>;
    endOrCancel(fn: (i: D) => void): InteractionUpdateBinder<I, D>;
    stopImmediatePropagation(): InteractionUpdateBinder<I, D>;
    preventDefault(): InteractionUpdateBinder<I, D>;
    strictStart(): InteractionUpdateBinder<I, D>;
    catch(fn: (ex: unknown) => void): InteractionUpdateBinder<I, D>;
    name(name: string): InteractionUpdateBinder<I, D>;
    toProduce<C extends Command>(fn: (i: D) => C): InteractionCmdUpdateBinder<C, I, D>;
}
