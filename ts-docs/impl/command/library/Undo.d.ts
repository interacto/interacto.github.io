import { CommandBase } from "../CommandBase";
import type { UndoHistory } from "../../../api/undo/UndoHistory";
export declare class Undo extends CommandBase {
    protected readonly history: UndoHistory;
    constructor(undoHistory: UndoHistory);
    canExecute(): boolean;
    protected execution(): void;
}
