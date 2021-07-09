import type { Logger } from "../../api/logging/Logger";
import type { LogLevel } from "../../api/logging/LogLevel";
export declare class LoggingData {
    readonly date: number;
    readonly msg: string;
    readonly level: keyof typeof LogLevel;
    readonly name: string;
    readonly type: "ERR" | "INFO";
    readonly sessionID: string;
    readonly stack?: string | undefined;
    readonly frontVersion?: string | undefined;
    constructor(date: number, msg: string, level: keyof typeof LogLevel, name: string, type: "ERR" | "INFO", sessionID: string, stack?: string | undefined, frontVersion?: string | undefined);
    toString(): string;
}
export declare class UsageLog {
    name: string;
    readonly sessionID: string;
    readonly date: number;
    readonly frontVersion?: string | undefined;
    duration: number;
    cancelled: boolean;
    constructor(name: string, sessionID: string, date: number, frontVersion?: string | undefined);
    toString(): string;
}
export declare class LoggerImpl implements Logger {
    writeConsole: boolean;
    serverAddress: string | undefined;
    readonly sessionID: string;
    readonly frontVersion: string | undefined;
    ongoingBindings: Array<UsageLog>;
    constructor(version?: string);
    private processLoggingData;
    private formatError;
    logBindingErr(msg: string, ex: unknown, bindingName?: string): void;
    logBindingMsg(msg: string, bindingName?: string): void;
    logCmdErr(msg: string, ex: unknown, cmdName?: string): void;
    logCmdMsg(msg: string, cmdName?: string): void;
    logInteractionErr(msg: string, ex: unknown, interactionName?: string): void;
    logInteractionMsg(msg: string, interactionName?: string): void;
    logBindingStart(bindingName: string): void;
    logBindingEnd(bindingName: string, cancelled: boolean): void;
}
