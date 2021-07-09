import type { Interaction } from "../interaction/Interaction";
import type { Command } from "../command/Command";
import type { Observable } from "rxjs";
import type { InteractionData } from "../interaction/InteractionData";
export interface Binding<C extends Command, I extends Interaction<D>, D extends InteractionData> {
    readonly name: string;
    logUsage: boolean;
    logBinding: boolean;
    logCmd: boolean;
    readonly interaction: I;
    readonly command: C | undefined;
    activated: boolean;
    readonly running: boolean;
    readonly strictStart: boolean;
    readonly continuousCmdExecution: boolean;
    readonly timesEnded: number;
    readonly timesCancelled: number;
    readonly produces: Observable<C>;
    uninstallBinding(): void;
}
