import type { Command } from "../command/Command";
import type { BaseBinderBuilder, Widget } from "./BaseBinderBuilder";
import type { LogLevel } from "../logging/LogLevel";
export interface CmdBinderBuilder<C extends Command> extends BaseBinderBuilder {
    first(fn: (c: C) => void): CmdBinderBuilder<C>;
    end(fn: (c: C) => void): CmdBinderBuilder<C>;
    on(widget: ReadonlyArray<Widget<EventTarget>> | Widget<EventTarget>, ...widgets: ReadonlyArray<Widget<EventTarget>>): CmdBinderBuilder<C>;
    onDynamic(node: Widget<Node>): CmdBinderBuilder<C>;
    when(fn: () => boolean): CmdBinderBuilder<C>;
    log(...level: ReadonlyArray<LogLevel>): CmdBinderBuilder<C>;
    stopImmediatePropagation(): CmdBinderBuilder<C>;
    preventDefault(): CmdBinderBuilder<C>;
    catch(fn: (ex: unknown) => void): CmdBinderBuilder<C>;
    name(name: string): CmdBinderBuilder<C>;
}
