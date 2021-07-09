export var CmdStatus;
(function (CmdStatus) {
    CmdStatus[CmdStatus["created"] = 0] = "created";
    CmdStatus[CmdStatus["executed"] = 1] = "executed";
    CmdStatus[CmdStatus["cancelled"] = 2] = "cancelled";
    CmdStatus[CmdStatus["done"] = 3] = "done";
    CmdStatus[CmdStatus["flushed"] = 4] = "flushed";
})(CmdStatus || (CmdStatus = {}));
