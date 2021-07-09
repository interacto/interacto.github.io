import type { LogLevel } from "../logging/LogLevel";
export interface EltRef<T> {
    nativeElement: T;
}
export declare function isEltRef(o: unknown): o is EltRef<EventTarget>;
export declare type Widget<T extends EventTarget> = EltRef<T> | T;
export interface BaseBinderBuilder {
    on(widget: ReadonlyArray<Widget<EventTarget>> | Widget<EventTarget>, ...widgets: ReadonlyArray<Widget<EventTarget>>): BaseBinderBuilder;
    onDynamic(node: Widget<Node>): BaseBinderBuilder;
    when(fn: () => boolean): BaseBinderBuilder;
    end(fn: () => void): BaseBinderBuilder;
    log(...level: ReadonlyArray<LogLevel>): BaseBinderBuilder;
    stopImmediatePropagation(): BaseBinderBuilder;
    preventDefault(): BaseBinderBuilder;
    catch(fn: (ex: unknown) => void): BaseBinderBuilder;
    name(name: string): BaseBinderBuilder;
}
