import userService from "../services/user.ts"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const createUser = async (req, res) => {
    try {
        const data = req.body;
        data.password = await bcrypt.hash(data.password, 10);
        const created_user = await userService.createUser(data);
        if (!created_user) {
            return res.json(400, {message: "Failed to create user"});
        }
        const { password, ...userWithoutPassword } = created_user;
        res.json(userWithoutPassword)
    } catch (error) {
        console.error("[ERROR] createUser controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const logIn = async (req, res) => {
    try {
        const data = req.body;
        let user = await userService.getUsers({email: data.email});
        if (!user || user.length == 0) {
            return res.status(400).json({ message: "Failed to find user" });
        }
        
        const passwordMatch = await bcrypt.compare(data.password, user[0].password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }
        if (!process.env.SECRET_KEY) {
            throw new Error("SECRET_KEY is missing in environment variables");
        }
        const token = jwt.sign({user_id: user[0].id}, process.env.SECRET_KEY!);
        res.cookie("auth", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });
        res.status(200).json({ success: true });
    } catch (error) {
        console.error("[ERROR] logIn controller: ", error);
        res.status(500).json({ message: "Login Failed" });
    }
}

const updateUser = async (req, res) => {
    try {
    const { id } = req.params;
    const data = req.body;
    if (req.user.user_id != req.params.id) {
        return res.status(403).json({ error: "Forbidden" });
    }
    const updated_user = await userService.updateUser(id, data);
    if (!updated_user) {
        return res.status(400).json({message: "Failed to updated user"});
    }
    const {password, ...user_without_password} = updated_user;
    res.json(user_without_password);
    
    } catch(error) {
        console.error("[ERROR] updateUser controller: ", error);
        res.status(500).json({ message: "Internal server error"});
    }
}

const getUsers = async (req, res) => {
    try {
        const query = req.query;
        console.log(query);
        const found_users = await userService.getUsers(query);
        if (!found_users) {
            return res.status(400).json({message: "Failed to find users"});
        }
        const found_users_without_passwords = found_users.map((user) => {
            const { password, ...userWithoutPassword} = user;
            return userWithoutPassword;
        })
        res.json(found_users_without_passwords);
    } catch (error) {
        console.error("[ERROR] getUsers controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const userController = {
    getUsers,
    createUser,
    updateUser,
    logIn,
}

export default userController;