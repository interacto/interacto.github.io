import type { InteractionData } from "../interaction/InteractionData";
import type { InteractionBinderBuilder } from "./InteractionBinderBuilder";
import type { KeyBinderBuilder } from "./KeyBinderBuilder";
import type { LogLevel } from "../logging/LogLevel";
import type { Interaction } from "../interaction/Interaction";
import type { Widget } from "./BaseBinderBuilder";
export interface KeyInteractionBinderBuilder<I extends Interaction<D>, D extends InteractionData> extends InteractionBinderBuilder<I, D>, KeyBinderBuilder {
    when(fn: (i: D) => boolean): KeyInteractionBinderBuilder<I, D>;
    on(widget: ReadonlyArray<Widget<EventTarget>> | Widget<EventTarget>, ...widgets: ReadonlyArray<Widget<EventTarget>>): KeyInteractionBinderBuilder<I, D>;
    onDynamic(node: Widget<Node>): KeyInteractionBinderBuilder<I, D>;
    log(...level: ReadonlyArray<LogLevel>): KeyInteractionBinderBuilder<I, D>;
    end(fn: () => void): KeyInteractionBinderBuilder<I, D>;
    with(...codes: ReadonlyArray<string>): KeyInteractionBinderBuilder<I, D>;
    stopImmediatePropagation(): KeyInteractionBinderBuilder<I, D>;
    preventDefault(): KeyInteractionBinderBuilder<I, D>;
    catch(fn: (ex: unknown) => void): KeyInteractionBinderBuilder<I, D>;
    name(name: string): KeyInteractionBinderBuilder<I, D>;
}
