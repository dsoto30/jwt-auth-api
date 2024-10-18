import pino from "pino";
import fs from "fs";
import path from "path";

const logDirectory = path.join(process.cwd(), "logs");

if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const logPath = path.join(logDirectory, "app.log");

const logger = pino({
    level: "info",
    transport: {
        targets: [{
            level: "info",
            target: "pino/file",
            options: {
                destination: logPath
            }
        }
        /*, {
            level: "info",
            target: "pino-pretty",
            options: {
                colorize: true
            }
        }*/]

    }
});

export default logger;