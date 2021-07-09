import type { Command } from "../command/Command";
import type { CmdBinderBuilder } from "./CmdBinderBuilder";
import type { BaseUpdateBinderBuilder } from "./BaseUpdateBinderBuilder";
import type { LogLevel } from "../logging/LogLevel";
import type { Widget } from "./BaseBinderBuilder";
export interface CmdUpdateBinderBuilder<C extends Command> extends CmdBinderBuilder<C>, BaseUpdateBinderBuilder {
    then(fn: (c: C) => void): CmdUpdateBinderBuilder<C>;
    continuousExecution(): CmdUpdateBinderBuilder<C>;
    strictStart(): CmdUpdateBinderBuilder<C>;
    throttle(timeout: number): CmdUpdateBinderBuilder<C>;
    first(fn: (c: C) => void): CmdUpdateBinderBuilder<C>;
    on(widget: ReadonlyArray<Widget<EventTarget>> | Widget<EventTarget>, ...widgets: ReadonlyArray<Widget<EventTarget>>): CmdUpdateBinderBuilder<C>;
    onDynamic(node: Widget<Node>): CmdUpdateBinderBuilder<C>;
    end(fn: (c: C) => void): CmdUpdateBinderBuilder<C>;
    when(fn: () => boolean): CmdUpdateBinderBuilder<C>;
    log(...level: ReadonlyArray<LogLevel>): CmdUpdateBinderBuilder<C>;
    stopImmediatePropagation(): CmdUpdateBinderBuilder<C>;
    preventDefault(): CmdUpdateBinderBuilder<C>;
    catch(fn: (ex: unknown) => void): CmdUpdateBinderBuilder<C>;
    name(name: string): CmdUpdateBinderBuilder<C>;
}
