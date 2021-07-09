export interface Command {
    flush(): void;
    execute(): Promise<boolean> | boolean;
    canExecute(): boolean;
    hadEffect(): boolean;
    done(): void;
    isDone(): boolean;
    cancel(): void;
    getStatus(): CmdStatus;
}
export declare enum CmdStatus {
    created = 0,
    executed = 1,
    cancelled = 2,
    done = 3,
    flushed = 4
}
