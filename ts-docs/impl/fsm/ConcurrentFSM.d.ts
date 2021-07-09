import type { FSM } from "../../api/fsm/FSM";
import { FSMImpl } from "./FSMImpl";
export declare class ConcurrentFSM<F extends FSM> extends FSMImpl {
    private readonly conccurFSMs;
    constructor(fsms: ReadonlyArray<F>);
    getConccurFSMs(): ReadonlyArray<F>;
    process(event: Event): boolean;
    get started(): boolean;
    set log(log: boolean);
    uninstall(): void;
}
