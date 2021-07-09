import { CommandBase } from "../CommandBase";
export class UndoNTimes extends CommandBase {
    constructor(undoHistory, numberOfUndos) {
        super();
        this.history = undoHistory;
        this.numberOfUndos = numberOfUndos;
    }
    canExecute() {
        return this.history.getUndo().length >= this.numberOfUndos;
    }
    execution() {
        for (let i = 0; i < this.numberOfUndos; i++) {
            this.history.undo();
        }
    }
}
