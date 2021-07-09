import { CommandBase } from "../CommandBase";
import type { UndoHistory } from "../../../api/undo/UndoHistory";
export declare class UndoNTimes extends CommandBase {
    protected readonly history: UndoHistory;
    protected readonly numberOfUndos: number;
    constructor(undoHistory: UndoHistory, numberOfUndos: number);
    canExecute(): boolean;
    protected execution(): void;
}
