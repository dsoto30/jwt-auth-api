import express, {NextFunction, Request, Response} from "express";
import dotenv from "dotenv";
import { Pool } from "pg";



const app = express();
dotenv.config();

app.use(express.json());


console.log(`DB_HOST: ${process.env.POSTGRES_HOST}`);

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD
});

const connection = async () => {
    try {
        await pool.connect();
        console.log("connected");
    } catch (err) {
        console.log(err);
    }
}

connection();



app.get("/", (req: Request, res, next: NextFunction) => {
    res.send("hello world");
});

app.listen(5000, () => {
    console.log(`server started on port ${5000}`);
})