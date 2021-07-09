import { UndoableCommand } from "../UndoableCommand";
export declare class SetProperty<T, S extends keyof T> extends UndoableCommand {
    protected readonly obj: T;
    protected readonly prop: S;
    newvalue: T[S];
    protected mementoValue: T[S];
    constructor(obj: T, prop: S, newvalue: T[S]);
    protected createMemento(): void;
    protected execution(): void;
    redo(): void;
    undo(): void;
    getUndoName(): string;
}
