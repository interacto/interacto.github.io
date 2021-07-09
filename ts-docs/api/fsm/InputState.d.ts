import type { State } from "./State";
export interface InputState extends State {
    enter(): void;
}
