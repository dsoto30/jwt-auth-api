"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
console.log(`DB_HOST: ${process.env.POSTGRES_HOST}`);
const pool = new pg_1.Pool({
    host: process.env.DB_HOST,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD
});
const connection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pool.connect();
        console.log("connected");
    }
    catch (err) {
        console.log(err);
    }
});
connection();
app.get("/", (req, res, next) => {
    res.send("hello world");
});
app.listen(5000, () => {
    console.log(`server started on port ${5000}`);
});
