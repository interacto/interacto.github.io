export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["interaction"] = 0] = "interaction";
    LogLevel[LogLevel["binding"] = 1] = "binding";
    LogLevel[LogLevel["command"] = 2] = "command";
    LogLevel[LogLevel["usage"] = 3] = "usage";
})(LogLevel || (LogLevel = {}));
