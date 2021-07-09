import { CommandBase } from "../CommandBase";
export class Redo extends CommandBase {
    constructor(undoHistory) {
        super();
        this.history = undoHistory;
    }
    canExecute() {
        return this.history.getLastRedo() !== undefined;
    }
    execution() {
        this.history.redo();
    }
}
