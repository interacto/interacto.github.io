import { UndoableCommand } from "../UndoableCommand";
export declare class TransferArrayItem<T> extends UndoableCommand {
    protected _srcArray: Array<T>;
    protected _tgtArray: Array<T>;
    protected _srcIndex: number;
    protected _tgtIndex: number;
    protected readonly cmdName: string;
    constructor(srcArray: Array<T>, tgtArray: Array<T>, srcIndex: number, tgtIndex: number, cmdName: string);
    protected execution(): void;
    canExecute(): boolean;
    getUndoName(): string;
    redo(): void;
    undo(): void;
    get srcArray(): Array<T>;
    set srcArray(value: Array<T>);
    get tgtArray(): Array<T>;
    set tgtArray(value: Array<T>);
    get srcIndex(): number;
    set srcIndex(value: number);
    get tgtIndex(): number;
    set tgtIndex(value: number);
}
