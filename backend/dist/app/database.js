"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const client_1 = require("@prisma/client");
const logging_1 = require("./logging");
exports.prismaClient = new client_1.PrismaClient({
    log: [
        {
            emit: "event",
            level: "query"
        },
        {
            emit: "event",
            level: "error"
        },
        {
            emit: "event",
            level: "info"
        },
        {
            emit: "event",
            level: "warn"
        }
    ]
});
exports.prismaClient.$on("query", (err) => {
    logging_1.logger.info(err);
});
exports.prismaClient.$on("info", (err) => {
    logging_1.logger.info(err);
});
exports.prismaClient.$on("warn", (err) => {
    logging_1.logger.warn(err);
});
exports.prismaClient.$on("error", (err) => {
    logging_1.logger.error(err);
});
