import type { Undoable } from "../../api/undo/Undoable";
import type { Observable } from "rxjs";
import { UndoHistory } from "../../api/undo/UndoHistory";
export declare class UndoHistoryImpl extends UndoHistory {
    private readonly undos;
    private readonly redos;
    private sizeMax;
    private readonly undoPublisher;
    private readonly redoPublisher;
    constructor();
    undosObservable(): Observable<Undoable | undefined>;
    redosObservable(): Observable<Undoable | undefined>;
    clear(): void;
    private clearRedo;
    add(undoable: Undoable): void;
    undo(): void;
    redo(): void;
    getLastUndoMessage(): string | undefined;
    getLastRedoMessage(): string | undefined;
    getLastOrEmptyUndoMessage(): string;
    getLastOrEmptyRedoMessage(): string;
    getLastUndo(): Undoable | undefined;
    getLastRedo(): Undoable | undefined;
    getSizeMax(): number;
    setSizeMax(max: number): void;
    getUndo(): ReadonlyArray<Undoable>;
    getRedo(): ReadonlyArray<Undoable>;
}
