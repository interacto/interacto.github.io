import { CommandBase } from "./CommandBase";
export class AnonCmd extends CommandBase {
    constructor(fct) {
        super();
        this.exec = fct;
    }
    canExecute() {
        return true;
    }
    execution() {
        this.exec();
    }
}
