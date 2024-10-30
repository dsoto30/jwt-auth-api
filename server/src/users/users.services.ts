
import { AppDataSource } from "../data-source";
import "reflect-metadata";
import { User } from "../entity/User.entity";
import { hashPassword } from "../helper/jwt_helper";

const userRepository = AppDataSource.getRepository(User);


export async function insertUser(email: string, password: string): Promise<User | null> {

    const user = new User();
    user.email = email;
    user.password = hashPassword(password);
    await userRepository.save(user);
    return user;

}
    

export async function getAllUsers(): Promise<User[]> {
    const users = await userRepository.find();
    return users;
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const user = await userRepository.findOneBy({ email: email });
    return user;
}

