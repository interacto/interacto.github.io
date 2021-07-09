import { UndoableCommand } from "../UndoableCommand";
export class SetProperty extends UndoableCommand {
    constructor(obj, prop, newvalue) {
        super();
        this.obj = obj;
        this.prop = prop;
        this.newvalue = newvalue;
    }
    createMemento() {
        this.mementoValue = this.obj[this.prop];
    }
    execution() {
        this.obj[this.prop] = this.newvalue;
    }
    redo() {
        this.execution();
    }
    undo() {
        this.obj[this.prop] = this.mementoValue;
    }
    getUndoName() {
        return `Set ${String(this.prop)} value`;
    }
}
