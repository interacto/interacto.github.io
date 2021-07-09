import type { LogLevel } from "../logging/LogLevel";
import type { Command } from "../command/Command";
import type { InteractionData } from "../interaction/InteractionData";
import type { BaseBinderBuilder, Widget } from "./BaseBinderBuilder";
import type { InteractionBinder } from "./InteractionBinder";
import type { CmdBinder } from "./CmdBinder";
import type { Interaction } from "../interaction/Interaction";
export interface BaseBinder extends BaseBinderBuilder {
    on(widget: ReadonlyArray<Widget<EventTarget>> | Widget<EventTarget>, ...widgets: ReadonlyArray<Widget<EventTarget>>): BaseBinder;
    onDynamic(node: Widget<Node>): BaseBinder;
    when(whenPredicate: () => boolean): BaseBinder;
    end(fn: () => void): BaseBinder;
    log(...level: ReadonlyArray<LogLevel>): BaseBinder;
    catch(fn: (ex: unknown) => void): BaseBinder;
    name(name: string): BaseBinder;
    toProduce<C extends Command>(fn: () => C): CmdBinder<C>;
    usingInteraction<I extends Interaction<D>, D extends InteractionData>(fn: () => I): InteractionBinder<I, D>;
}
