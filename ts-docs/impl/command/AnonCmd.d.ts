import { CommandBase } from "./CommandBase";
export declare class AnonCmd extends CommandBase {
    private readonly exec;
    constructor(fct: () => void);
    canExecute(): boolean;
    protected execution(): void;
}
