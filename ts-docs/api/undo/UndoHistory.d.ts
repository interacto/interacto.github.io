import type { Undoable } from "./Undoable";
import type { Observable } from "rxjs";
export declare abstract class UndoHistory {
    abstract add(undoable: Undoable): void;
    abstract clear(): void;
    abstract undo(): void;
    abstract redo(): void;
    abstract getUndo(): ReadonlyArray<Undoable>;
    abstract getRedo(): ReadonlyArray<Undoable>;
    abstract undosObservable(): Observable<Undoable | undefined>;
    abstract redosObservable(): Observable<Undoable | undefined>;
    abstract getLastUndo(): Undoable | undefined;
    abstract getLastRedo(): Undoable | undefined;
    abstract getLastUndoMessage(): string | undefined;
    abstract getLastRedoMessage(): string | undefined;
    abstract getLastOrEmptyUndoMessage(): string;
    abstract getLastOrEmptyRedoMessage(): string;
    abstract getSizeMax(): number;
    abstract setSizeMax(max: number): void;
}
