import type { Command } from "../command/Command";
import type { CmdUpdateBinderBuilder } from "./CmdUpdateBinderBuilder";
import type { LogLevel } from "../logging/LogLevel";
import type { InteractionData } from "../interaction/InteractionData";
import type { InteractionCmdUpdateBinder } from "./InteractionCmdUpdateBinder";
import type { Interaction } from "../interaction/Interaction";
import type { Widget } from "./BaseBinderBuilder";
export interface CmdUpdateBinder<C extends Command> extends CmdUpdateBinderBuilder<C> {
    then(fn: (c: C) => void): CmdUpdateBinder<C>;
    continuousExecution(): CmdUpdateBinder<C>;
    strictStart(): CmdUpdateBinder<C>;
    throttle(timeout: number): CmdUpdateBinder<C>;
    first(fn: (c: C) => void): CmdUpdateBinder<C>;
    on(widget: ReadonlyArray<Widget<EventTarget>> | Widget<EventTarget>, ...widgets: ReadonlyArray<Widget<EventTarget>>): CmdUpdateBinder<C>;
    onDynamic(node: Widget<Node>): CmdUpdateBinder<C>;
    when(fn: () => boolean): CmdUpdateBinder<C>;
    log(...level: ReadonlyArray<LogLevel>): CmdUpdateBinder<C>;
    end(fn: (c: C) => void): CmdUpdateBinder<C>;
    usingInteraction<I extends Interaction<D>, D extends InteractionData>(fn: () => I): InteractionCmdUpdateBinder<C, I, D>;
    stopImmediatePropagation(): CmdUpdateBinder<C>;
    preventDefault(): CmdUpdateBinder<C>;
    catch(fn: (ex: unknown) => void): CmdUpdateBinder<C>;
    name(name: string): CmdUpdateBinder<C>;
}
