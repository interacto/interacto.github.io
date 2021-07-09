import type { BaseBinderBuilder, Widget } from "./BaseBinderBuilder";
import type { LogLevel } from "../logging/LogLevel";
export interface BaseUpdateBinderBuilder extends BaseBinderBuilder {
    continuousExecution(): BaseUpdateBinderBuilder;
    strictStart(): BaseUpdateBinderBuilder;
    throttle(timeout: number): BaseUpdateBinderBuilder;
    when(fn: () => boolean): BaseUpdateBinderBuilder;
    end(fn: () => void): BaseUpdateBinderBuilder;
    log(...level: ReadonlyArray<LogLevel>): BaseUpdateBinderBuilder;
    on(widget: ReadonlyArray<Widget<EventTarget>> | Widget<EventTarget>, ...widgets: ReadonlyArray<Widget<EventTarget>>): BaseUpdateBinderBuilder;
    onDynamic(node: Widget<Node>): BaseUpdateBinderBuilder;
    stopImmediatePropagation(): BaseUpdateBinderBuilder;
    preventDefault(): BaseUpdateBinderBuilder;
    catch(fn: (ex: unknown) => void): BaseUpdateBinderBuilder;
    name(name: string): BaseUpdateBinderBuilder;
}
