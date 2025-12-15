import imageService from "../services/image.ts";
import { v4 as uuid } from "uuid";


const getPresignedUrl = async (req, res) => {
    try {
        const { fileName, contentType } = req.body;
        const user_id = req.user.user_id;

        const extension = fileName.split('.').pop();
        const key = `receipts/${user_id}/${uuid()}.${extension}`;
        const uploadUrl = await imageService.getPresignedUrl({key, contentType});
        res.status(200).json({uploadUrl, key});
    } catch (error) {
        console.log("[ERROR] getPresignedUrl controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const getSignedUrl = async (req, res) => {
    try {
        const { key } = req.body;
        const key_userID = key.split("/")[1];
        if (key_userID != req.user.user_id) {
            return res.status(403).json({ error: "Forbidden" });
        }
        const signedUrl = await imageService.getSignedUrl(key);
        res.status(200).json({signedUrl});
    } catch (error) {
        console.log("[ERROR] getSignedUrl controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const imageController = {
    getPresignedUrl,
    getSignedUrl,
}
export default imageController