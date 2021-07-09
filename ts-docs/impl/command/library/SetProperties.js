import { UndoableCommand } from "../UndoableCommand";
import { SetProperty } from "./SetProperty";
export class SetProperties extends UndoableCommand {
    constructor(obj, newvalues) {
        super();
        this.obj = obj;
        this.compositeCmds = [];
        this.newvalues = newvalues;
    }
    get newvalues() {
        return this._newvalues;
    }
    set newvalues(v) {
        this._newvalues = v;
        for (const key in v) {
            this.compositeCmds.push(new SetProperty(this.obj, key, v[key]));
        }
    }
    execute() {
        this.compositeCmds.forEach(cmd => {
            void cmd.execute();
        });
        return super.execute();
    }
    execution() {
    }
    redo() {
        this.compositeCmds.forEach(cmd => {
            cmd.redo();
        });
    }
    undo() {
        this.compositeCmds.forEach(cmd => {
            cmd.undo();
        });
    }
}
