
import { AppDataSource } from "../data-source";
import "reflect-metadata";
import { User } from "../entity/User.entity";
import { hashPassword } from "../helper/jwt_helper";






export async function insertUser(email: string, password: string): Promise<User | null> {
    try {

        const userRepository = AppDataSource.getRepository(User);
        const user = new User();
        user.email = email;
        user.password = hashPassword(password);
        await userRepository.save(user);

        return user;
    } catch (err) {
        console.error(err);
        return null;
    }
    
}



export async function getAllUsers(): Promise<User[]> {

    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();
    return users;
}

export async function getUserByEmail(email: string): Promise<User | null> {

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email: email });
    return user;
}

export async function getUserById(id: number): Promise<User | null> {

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ id: id });
    return user;
}

