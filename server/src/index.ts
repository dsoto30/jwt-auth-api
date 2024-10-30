import express, {NextFunction, Request, Response, Application} from "express";
import dotenv from "dotenv";
import cors from "cors"
import { AppDataSource } from "./data-source";
import userRouter from "./users/users.routes";

const app: Application = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", userRouter);


app.get("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({message: "Not Found"});
})

AppDataSource.initialize().then(() => {
    app.listen(5000, () => {
        console.log("Server is running on port 5000");
    });
}).catch(error => console.log(error));
