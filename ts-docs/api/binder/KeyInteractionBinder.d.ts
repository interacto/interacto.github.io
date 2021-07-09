import type { InteractionData } from "../interaction/InteractionData";
import type { KeyInteractionBinderBuilder } from "./KeyInteractionBinderBuilder";
import type { LogLevel } from "../logging/LogLevel";
import type { Command } from "../command/Command";
import type { KeyInteractionCmdBinder } from "./KeyInteractionCmdBinder";
import type { Interaction } from "../interaction/Interaction";
import type { Widget } from "./BaseBinderBuilder";
export interface KeyInteractionBinder<I extends Interaction<D>, D extends InteractionData> extends KeyInteractionBinderBuilder<I, D> {
    when(fn: (i: D) => boolean): KeyInteractionBinder<I, D>;
    on(widget: ReadonlyArray<Widget<EventTarget>> | Widget<EventTarget>, ...widgets: ReadonlyArray<Widget<EventTarget>>): KeyInteractionBinder<I, D>;
    onDynamic(node: Widget<Node>): KeyInteractionBinder<I, D>;
    log(...level: ReadonlyArray<LogLevel>): KeyInteractionBinder<I, D>;
    end(fn: () => void): KeyInteractionBinder<I, D>;
    with(...codes: ReadonlyArray<string>): KeyInteractionBinder<I, D>;
    stopImmediatePropagation(): KeyInteractionBinder<I, D>;
    preventDefault(): KeyInteractionBinder<I, D>;
    catch(fn: (ex: unknown) => void): KeyInteractionBinder<I, D>;
    name(name: string): KeyInteractionBinder<I, D>;
    toProduce<C extends Command>(fn: (i: D) => C): KeyInteractionCmdBinder<C, I, D>;
}
