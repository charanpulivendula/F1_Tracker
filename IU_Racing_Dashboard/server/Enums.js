module.exports = {
    SYS_STATE : {
        0: "None",
        255: "Default",
        1: "PowerOn",
        2: "EstConn",
        3: "ActTest",
        4: "ActTestPass",
        5: "WaitToCrank",
        6: "CrankChecksPassed",
        7: "Crank",
        8: "EngineIdle",
        9: "Driving",
        10: "ShutEngine",
        11: "PowerOff",
        12: "RaptorOff",
        13: "CrankCheckInit",
        14: "ActTestFail",
        15: "CrankChecksFailed",
        16: "EmgShutDown",
        17: "EngineFailedToStart",
        18: "CriticalLimitsExceeded",
        19: "Ignition"
    },
    CT_STATE : {
        0: "Uninitialized",
        1: "PwrOn",
        2: "Initialized",
        3: "ActTest",
        4: "CrankReady",
        5: "StartEngineNow",
        6: "RaceReady",
        7: "InitDriving",
        8: "Caution",
        9: "NomRace",
        10: "CoordStop",
        11: "CntrlShutdown",
        12: "EmrgShutdown",
        13: "VehicleShutdown",
        14: "TowMode",
        255: "Default"
    },
    TRACK_CONDITION : {
        0: "null",
        3: "red",
        9: "yellow",
        1: "green",
        37: "wavinggreen",
        4: "checkered",
        255: "default"
    },
    VEHICLE_FLAG_OBJ : {
        0: "null",
        25: "orange",
        2: "blue",
        4: "grey",
        7: "yellow",
        34: "stop",
        32: "purple",
        33: "enginekill",
        36: "attacker",
        35: "defender",
        255: "default"
    },
    HEARTBEAT : {

    }
    
}