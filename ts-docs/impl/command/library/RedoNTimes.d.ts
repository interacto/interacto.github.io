import { CommandBase } from "../CommandBase";
import type { UndoHistory } from "../../../api/undo/UndoHistory";
export declare class RedoNTimes extends CommandBase {
    protected readonly history: UndoHistory;
    protected readonly numberOfRedos: number;
    constructor(undoHistory: UndoHistory, numberOfRedos: number);
    canExecute(): boolean;
    protected execution(): void;
}
