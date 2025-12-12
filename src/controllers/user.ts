import userService from "../services/user.ts"

const createUser = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);
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

const updateUser = async (req, res) => {
    try {
    const { id } = req.params;
    const data = req.body;
    const updated_user = await userService.updateUser(id, data);
    if (!updated_user) {
        return res.json(400, {message: "Failed to updated user"});
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
            return res.json(400, {message: "Failed to find users"});
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

const userControllers = {
    getUsers,
    createUser,
    updateUser,
}

export default userControllers;