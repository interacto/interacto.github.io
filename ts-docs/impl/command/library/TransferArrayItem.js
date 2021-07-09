import { UndoableCommand } from "../UndoableCommand";
export class TransferArrayItem extends UndoableCommand {
    constructor(srcArray, tgtArray, srcIndex, tgtIndex, cmdName) {
        super();
        this._srcArray = srcArray;
        this._tgtArray = tgtArray;
        this._srcIndex = srcIndex;
        this._tgtIndex = tgtIndex;
        this.cmdName = cmdName;
    }
    execution() {
        this.redo();
    }
    canExecute() {
        return (this._srcIndex >= 0 && this._srcIndex < this._srcArray.length) &&
            (this._tgtIndex >= 0 && this._tgtIndex <= this._tgtArray.length);
    }
    getUndoName() {
        return this.cmdName;
    }
    redo() {
        const elt = this._srcArray[this._srcIndex];
        this._srcArray.splice(this._srcIndex, 1);
        this._tgtArray.splice(this._tgtIndex, 0, elt);
    }
    undo() {
        const elt = this._tgtArray[this._tgtIndex];
        this._tgtArray.splice(this._tgtIndex, 1);
        this._srcArray.splice(this._srcIndex, 0, elt);
    }
    get srcArray() {
        return this._srcArray;
    }
    set srcArray(value) {
        this._srcArray = value;
    }
    get tgtArray() {
        return this._tgtArray;
    }
    set tgtArray(value) {
        this._tgtArray = value;
    }
    get srcIndex() {
        return this._srcIndex;
    }
    set srcIndex(value) {
        this._srcIndex = value;
    }
    get tgtIndex() {
        return this._tgtIndex;
    }
    set tgtIndex(value) {
        this._tgtIndex = value;
    }
}
