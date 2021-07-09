import type { InteractionData } from "../interaction/InteractionData";
import type { InteractionBinderBuilder } from "./InteractionBinderBuilder";
import type { LogLevel } from "../logging/LogLevel";
import type { Interaction } from "../interaction/Interaction";
import type { Widget } from "./BaseBinderBuilder";
export interface InteractionUpdateBinderBuilder<I extends Interaction<D>, D extends InteractionData> extends InteractionBinderBuilder<I, D> {
    cancel(fn: (i: D) => void): InteractionUpdateBinderBuilder<I, D>;
    endOrCancel(fn: (i: D) => void): InteractionUpdateBinderBuilder<I, D>;
    when(fn: (i: D) => boolean): InteractionUpdateBinderBuilder<I, D>;
    end(fn: () => void): InteractionUpdateBinderBuilder<I, D>;
    on(widget: ReadonlyArray<Widget<EventTarget>> | Widget<EventTarget>, ...widgets: ReadonlyArray<Widget<EventTarget>>): InteractionUpdateBinderBuilder<I, D>;
    onDynamic(node: Widget<Node>): InteractionUpdateBinderBuilder<I, D>;
    log(...level: ReadonlyArray<LogLevel>): InteractionUpdateBinderBuilder<I, D>;
    stopImmediatePropagation(): InteractionUpdateBinderBuilder<I, D>;
    strictStart(): InteractionUpdateBinderBuilder<I, D>;
    preventDefault(): InteractionUpdateBinderBuilder<I, D>;
    catch(fn: (ex: unknown) => void): InteractionUpdateBinderBuilder<I, D>;
    name(name: string): InteractionUpdateBinderBuilder<I, D>;
}
