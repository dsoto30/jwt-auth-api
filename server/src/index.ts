import express, {NextFunction, Request, Response} from "express";
import dotenv from "dotenv";
import cors from "cors"
import { AppDataSource } from "./data-source";
const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get("/", (req: Request, res, next: NextFunction) => {
    res.send("hello world");
});

app.get("*", (req: Request, res, next: NextFunction) => {
    res.status(404).json({message: "Not Found"});
})


AppDataSource.initialize().then(() => {
    app.listen(5000, () => {
        console.log("Server is running on port 5000");
    });
}).catch(error => console.log(error));
