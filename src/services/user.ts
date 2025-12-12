import prisma from "../db/prisma_client.ts";
import type { User } from "@prisma/client";
import jwt from "jsonwebtoken";

const createUser = async (data: Omit<User, "id" | "createdAt"> ) => {
    try {
        let created_user = await prisma.user.create({
            data: {...data},
        });
        return created_user;
    } catch (error) {
        console.log(`[ERROR] createUser: ${error}`);
    }
}

const updateUser = async (id: string, data: Partial<User>) => {
    try {
        const updated_user = await prisma.user.update({
            where: {id},
            data
        });
        return updated_user;
    } catch (error) {
        console.log(`[ERROR] updateUser: ${error}`)
    }
}

const getUsers = async (query: Partial<User>) => {
    try {
        let users = await prisma.user.findMany({
            where: {...query},
        });
        return users;
    } catch (error) {
        console.log(`[ERROR] getUsers: ${error}`);
    }
}


const userService = {
    createUser,
    updateUser,
    getUsers
}

export default userService;
