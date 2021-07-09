import { CommandBase } from "../CommandBase";
export class RedoNTimes extends CommandBase {
    constructor(undoHistory, numberOfRedos) {
        super();
        this.history = undoHistory;
        this.numberOfRedos = numberOfRedos;
    }
    canExecute() {
        return this.history.getRedo().length >= this.numberOfRedos;
    }
    execution() {
        for (let i = 0; i < this.numberOfRedos; i++) {
            this.history.redo();
        }
    }
}
