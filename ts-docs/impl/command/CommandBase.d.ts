import type { Command } from "../../api/command/Command";
import { CmdStatus } from "../../api/command/Command";
export declare abstract class CommandBase implements Command {
    protected status: CmdStatus;
    constructor();
    flush(): void;
    protected createMemento(): void;
    execute(): Promise<boolean> | boolean;
    protected abstract execution(): Promise<void> | void;
    hadEffect(): boolean;
    done(): void;
    isDone(): boolean;
    cancel(): void;
    getStatus(): CmdStatus;
    canExecute(): boolean;
}
