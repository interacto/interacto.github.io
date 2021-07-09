import type { Command } from "../command/Command";
import type { InteractionData } from "../interaction/InteractionData";
import type { CmdBinderBuilder } from "./CmdBinderBuilder";
import type { InteractionCmdBinder } from "./InteractionCmdBinder";
import type { LogLevel } from "../logging/LogLevel";
import type { Interaction } from "../interaction/Interaction";
import type { Widget } from "./BaseBinderBuilder";
export interface CmdBinder<C extends Command> extends CmdBinderBuilder<C> {
    first(fn: (c: C) => void): CmdBinder<C>;
    end(fn: (c: C) => void): CmdBinder<C>;
    on(widget: ReadonlyArray<Widget<EventTarget>> | Widget<EventTarget>, ...widgets: ReadonlyArray<Widget<EventTarget>>): CmdBinder<C>;
    onDynamic(node: Widget<Node>): CmdBinder<C>;
    when(fn: () => boolean): CmdBinder<C>;
    log(...level: ReadonlyArray<LogLevel>): CmdBinder<C>;
    usingInteraction<I extends Interaction<D>, D extends InteractionData>(fn: () => I): InteractionCmdBinder<C, I, D>;
    stopImmediatePropagation(): CmdBinder<C>;
    preventDefault(): CmdBinder<C>;
    catch(fn: (ex: unknown) => void): CmdBinder<C>;
    name(name: string): CmdBinder<C>;
}
