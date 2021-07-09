import { CommandBase } from "../CommandBase";
export class Undo extends CommandBase {
    constructor(undoHistory) {
        super();
        this.history = undoHistory;
    }
    canExecute() {
        return this.history.getLastUndo() !== undefined;
    }
    execution() {
        this.history.undo();
    }
}
