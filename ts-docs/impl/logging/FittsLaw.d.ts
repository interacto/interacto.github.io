import type { Binding } from "../../api/binding/Binding";
import type { Command } from "../../api/command/Command";
import type { Interaction } from "../../api/interaction/Interaction";
import type { InteractionData } from "../../api/interaction/InteractionData";
export declare class FittsLawDataImpl {
    readonly t: number;
    readonly w: number;
    readonly h: number;
    readonly d: number;
    constructor(t: number, w: number, h: number, d: number);
    getID(we?: number): number;
}
export declare class FittsLaw {
    private readonly obsSrc;
    private readonly providedTarget?;
    private readonly data;
    private _startX?;
    private _startY?;
    private _target?;
    private readonly handler;
    constructor(bSrc: Binding<Command, Interaction<InteractionData>, InteractionData>, bTgt: Binding<Command, Interaction<InteractionData>, InteractionData>, target?: Element);
    private computeD;
    get we(): number;
    getAB(effectiveTargetW?: boolean): [a: number, b: number, r: number];
    uninstall(): void;
    private reinit;
}
