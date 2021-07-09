export interface Logger {
    writeConsole: boolean;
    serverAddress: string | undefined;
    readonly frontVersion: string | undefined;
    readonly sessionID: string;
    logInteractionMsg(msg: string, interactionName?: string): void;
    logBindingMsg(msg: string, bindingName?: string): void;
    logBindingStart(bindingName: string): void;
    logBindingEnd(bindingName: string, cancelled: boolean): void;
    logCmdMsg(msg: string, cmdName?: string): void;
    logInteractionErr(msg: string, ex: unknown, interactionName?: string): void;
    logBindingErr(msg: string, ex: unknown, bindingName?: string): void;
    logCmdErr(msg: string, ex: unknown, cmdName?: string): void;
}
