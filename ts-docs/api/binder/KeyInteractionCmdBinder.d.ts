import type { Command } from "../command/Command";
import type { InteractionData } from "../interaction/InteractionData";
import type { KeyInteractionBinderBuilder } from "./KeyInteractionBinderBuilder";
import type { InteractionCmdBinder } from "./InteractionCmdBinder";
import type { LogLevel } from "../logging/LogLevel";
import type { Binding } from "../binding/Binding";
import type { Interaction } from "../interaction/Interaction";
import type { Widget } from "./BaseBinderBuilder";
export interface KeyInteractionCmdBinder<C extends Command, I extends Interaction<D>, D extends InteractionData> extends KeyInteractionBinderBuilder<I, D>, InteractionCmdBinder<C, I, D> {
    first(fn: (c: C, i: D) => void): KeyInteractionCmdBinder<C, I, D>;
    on(widget: ReadonlyArray<Widget<EventTarget>> | Widget<EventTarget>, ...widgets: ReadonlyArray<Widget<EventTarget>>): KeyInteractionCmdBinder<C, I, D>;
    onDynamic(node: Widget<Node>): KeyInteractionCmdBinder<C, I, D>;
    log(...level: ReadonlyArray<LogLevel>): KeyInteractionCmdBinder<C, I, D>;
    when(fn: (i: D) => boolean): KeyInteractionCmdBinder<C, I, D>;
    ifHadEffects(fn: (c: C, i: D) => void): KeyInteractionCmdBinder<C, I, D>;
    ifHadNoEffect(fn: (c: C, i: D) => void): KeyInteractionCmdBinder<C, I, D>;
    ifCannotExecute(fn: (c: C, i: D) => void): KeyInteractionCmdBinder<C, I, D>;
    end(fn: (c: C, i: D) => void): KeyInteractionCmdBinder<C, I, D>;
    with(...codes: ReadonlyArray<string>): KeyInteractionCmdBinder<C, I, D>;
    stopImmediatePropagation(): KeyInteractionCmdBinder<C, I, D>;
    preventDefault(): KeyInteractionCmdBinder<C, I, D>;
    catch(fn: (ex: unknown) => void): KeyInteractionCmdBinder<C, I, D>;
    name(name: string): KeyInteractionCmdBinder<C, I, D>;
    bind(): Binding<C, I, D>;
}
