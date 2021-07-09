export class LoggingData {
    constructor(date, msg, level, name, type, sessionID, stack, frontVersion) {
        this.date = date;
        this.msg = msg;
        this.level = level;
        this.name = name;
        this.type = type;
        this.sessionID = sessionID;
        this.stack = stack;
        this.frontVersion = frontVersion;
    }
    toString() {
        const withstack = this.stack === undefined ? "" : `, ${this.stack}`;
        const withversion = this.frontVersion === undefined ? "" : ` ${this.frontVersion}`;
        return `${this.type}${withversion} [${this.sessionID}] [${this.level}:${this.name}] at ${this.date}: '${this.msg}'${withstack}`;
    }
}
export class UsageLog {
    constructor(name, sessionID, date, frontVersion) {
        this.name = name;
        this.sessionID = sessionID;
        this.date = date;
        this.frontVersion = frontVersion;
        this.duration = 0;
        this.cancelled = false;
    }
    toString() {
        const withversion = this.frontVersion === undefined ? "" : ` v:${this.frontVersion}`;
        return `Usage.${withversion} id:${this.sessionID} binding:${this.name} ` +
            `date:${this.date} duration:${this.duration} cancelled:${String(this.cancelled)}`;
    }
}
export class LoggerImpl {
    constructor(version) {
        this.frontVersion = version;
        this.ongoingBindings = [];
        this.serverAddress = undefined;
        this.writeConsole = true;
        this.sessionID = Date.now().toString(36) + Math.random().toString(36)
            .substr(2, 6);
    }
    processLoggingData(data) {
        if (this.writeConsole) {
            console.log(data.toString());
        }
        if (this.serverAddress !== undefined && data.type === "ERR") {
            const rq = new XMLHttpRequest();
            rq.open("POST", `${this.serverAddress}/api/err`, true);
            rq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            rq.send(JSON.stringify(data));
        }
    }
    formatError(ex) {
        var _a;
        if (ex instanceof Error) {
            return `${ex.message} ${(_a = ex.stack) !== null && _a !== void 0 ? _a : ""}`;
        }
        return String(ex);
    }
    logBindingErr(msg, ex, bindingName = "") {
        this.processLoggingData(new LoggingData(performance.now(), msg, "binding", bindingName, "ERR", this.sessionID, this.formatError(ex), this.frontVersion));
    }
    logBindingMsg(msg, bindingName = "") {
        this.processLoggingData(new LoggingData(performance.now(), msg, "binding", bindingName, "INFO", this.sessionID, undefined, this.frontVersion));
    }
    logCmdErr(msg, ex, cmdName = "") {
        this.processLoggingData(new LoggingData(performance.now(), msg, "command", cmdName, "ERR", this.sessionID, this.formatError(ex), this.frontVersion));
    }
    logCmdMsg(msg, cmdName = "") {
        this.processLoggingData(new LoggingData(performance.now(), msg, "command", cmdName, "INFO", this.sessionID, undefined, this.frontVersion));
    }
    logInteractionErr(msg, ex, interactionName = "") {
        this.processLoggingData(new LoggingData(performance.now(), msg, "interaction", interactionName, "ERR", this.sessionID, this.formatError(ex), this.frontVersion));
    }
    logInteractionMsg(msg, interactionName = "") {
        this.processLoggingData(new LoggingData(performance.now(), msg, "interaction", interactionName, "INFO", this.sessionID, undefined, this.frontVersion));
    }
    logBindingStart(bindingName) {
        this.ongoingBindings.push(new UsageLog(bindingName, this.sessionID, performance.now(), this.frontVersion));
    }
    logBindingEnd(bindingName, cancelled) {
        const logs = this.ongoingBindings.filter(d => bindingName.includes(d.name));
        this.ongoingBindings = this.ongoingBindings.filter(d => !logs.includes(d));
        if (logs.length === 1) {
            const log = logs[0];
            log.name = bindingName;
            log.duration = performance.now() - log.date;
            log.cancelled = cancelled;
            if (this.writeConsole) {
                console.log(log.toString());
            }
            if (this.serverAddress !== undefined) {
                const rq = new XMLHttpRequest();
                rq.open("POST", `${this.serverAddress}/api/usage`, true);
                rq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                rq.send(JSON.stringify(log));
            }
        }
    }
}
