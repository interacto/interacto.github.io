import type { BaseUpdateBinderBuilder } from "./BaseUpdateBinderBuilder";
import type { LogLevel } from "../logging/LogLevel";
import type { Command } from "../command/Command";
import type { InteractionData } from "../interaction/InteractionData";
import type { CmdUpdateBinder } from "./CmdUpdateBinder";
import type { InteractionUpdateBinder } from "./InteractionUpdateBinder";
import type { BaseBinder } from "./BaseBinder";
import type { Interaction } from "../interaction/Interaction";
import type { Widget } from "./BaseBinderBuilder";
export interface BaseUpdateBinder extends BaseUpdateBinderBuilder, BaseBinder {
    on(widget: ReadonlyArray<Widget<EventTarget>> | Widget<EventTarget>, ...widgets: ReadonlyArray<Widget<EventTarget>>): BaseUpdateBinder;
    onDynamic(node: Widget<Node>): BaseUpdateBinder;
    when(fn: () => boolean): BaseUpdateBinder;
    end(fn: () => void): BaseUpdateBinder;
    log(...level: ReadonlyArray<LogLevel>): BaseUpdateBinder;
    continuousExecution(): BaseUpdateBinder;
    strictStart(): BaseUpdateBinder;
    throttle(timeout: number): BaseUpdateBinder;
    toProduce<C extends Command>(fn: () => C): CmdUpdateBinder<C>;
    usingInteraction<I extends Interaction<D>, D extends InteractionData>(fn: () => I): InteractionUpdateBinder<I, D>;
    stopImmediatePropagation(): BaseUpdateBinder;
    preventDefault(): BaseUpdateBinder;
    catch(fn: (ex: unknown) => void): BaseUpdateBinder;
    name(name: string): BaseUpdateBinder;
}
