import type { InteractionData } from "../interaction/InteractionData";
import type { LogLevel } from "../logging/LogLevel";
import type { Command } from "../command/Command";
import type { KeyInteractionCmdUpdateBinder } from "./KeyInteractionCmdUpdateBinder";
import type { InteractionUpdateBinderBuilder } from "./InteractionUpdateBinderBuilder";
import type { KeyBinderBuilder } from "./KeyBinderBuilder";
import type { Interaction } from "../interaction/Interaction";
import type { Widget } from "./BaseBinderBuilder";
export interface KeyInteractionUpdateBinder<I extends Interaction<D>, D extends InteractionData> extends InteractionUpdateBinderBuilder<I, D>, KeyBinderBuilder {
    on(widget: ReadonlyArray<Widget<EventTarget>> | Widget<EventTarget>, ...widgets: ReadonlyArray<Widget<EventTarget>>): KeyInteractionUpdateBinder<I, D>;
    onDynamic(node: Widget<Node>): KeyInteractionUpdateBinder<I, D>;
    log(...level: ReadonlyArray<LogLevel>): KeyInteractionUpdateBinder<I, D>;
    when(fn: (i: D) => boolean): KeyInteractionUpdateBinder<I, D>;
    strictStart(): KeyInteractionUpdateBinder<I, D>;
    with(...codes: ReadonlyArray<string>): KeyInteractionUpdateBinder<I, D>;
    stopImmediatePropagation(): KeyInteractionUpdateBinder<I, D>;
    preventDefault(): KeyInteractionUpdateBinder<I, D>;
    cancel(fn: (i: D) => void): KeyInteractionUpdateBinder<I, D>;
    endOrCancel(fn: (i: D) => void): KeyInteractionUpdateBinder<I, D>;
    catch(fn: (ex: unknown) => void): KeyInteractionUpdateBinder<I, D>;
    name(name: string): KeyInteractionUpdateBinder<I, D>;
    toProduce<C extends Command>(fn: (i: D) => C): KeyInteractionCmdUpdateBinder<C, I, D>;
}
