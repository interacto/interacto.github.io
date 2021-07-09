export class MustBeUndoableCmdError extends Error {
    constructor(cmdProducer) {
        super(`The following command must be undoable: ${String(cmdProducer)}`);
    }
}
