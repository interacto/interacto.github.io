import { CmdStatus } from "../../api/command/Command";
export class CommandBase {
    constructor() {
        this.status = CmdStatus.created;
    }
    flush() {
        this.status = CmdStatus.flushed;
    }
    createMemento() {
    }
    execute() {
        let ok;
        if ((this.status === CmdStatus.created || this.status === CmdStatus.executed) && this.canExecute()) {
            if (this.status === CmdStatus.created) {
                this.createMemento();
            }
            ok = true;
            const result = this.execution();
            if (result instanceof Promise) {
                return result
                    .then(() => {
                    this.status = CmdStatus.executed;
                    return true;
                })
                    .catch(() => {
                    this.status = CmdStatus.executed;
                    return false;
                });
            }
            this.status = CmdStatus.executed;
        }
        else {
            ok = false;
        }
        return ok;
    }
    hadEffect() {
        return this.isDone();
    }
    done() {
        if (this.status === CmdStatus.created || this.status === CmdStatus.executed) {
            this.status = CmdStatus.done;
        }
    }
    isDone() {
        return this.status === CmdStatus.done;
    }
    cancel() {
        this.status = CmdStatus.cancelled;
    }
    getStatus() {
        return this.status;
    }
    canExecute() {
        return true;
    }
}
