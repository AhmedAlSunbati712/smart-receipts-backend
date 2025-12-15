import dotenv from "dotenv";
import s3 from "../config/aws.ts"
dotenv.config();

const BUCKET_NAME = process.env.S3_BUCKET_NAME!;

const uploadToS3 = (params: AWS.S3.PutObjectRequest) => {
    return new Promise<AWS.S3.ManagedUpload.SendData>((resolve, reject) => {
        s3.upload(params, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

const getPresignedUrl = async (data: {
    key: string,
    contentType: string,
}) => {
    try {
        const uploadUrl = await s3.getSignedUrlPromise("putObject", {
            Bucket: BUCKET_NAME,
            Key: data.key,
            ContentType: data.contentType,
            Expires: 120,
        });
        return uploadUrl;
    } catch (error) {
        console.log("[ERROR] getPresignedUrl service: ", error);
        throw error;
    }
}

const getSignedUrl = async (key: string) => {
    try {
        const signedUrl = s3.getSignedUrl("getObject", {
            Bucket: BUCKET_NAME,
            Key: key,
            Expires: 300,
        })
        return signedUrl;
    } catch(error) {
        console.log("[ERROR] getSignedUrl service: ", error);
        throw error;
    }
}

const uploadImage = async (imageData : {imageName: string, base64Image: string, type: string}) => {
    const imageBuffer = Buffer.from(
        imageData.base64Image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
    );
    const params = {
        Bucket: `${BUCKET_NAME}`,
        Key: `images/${imageData.imageName}`,
        Body: imageBuffer,
        ContentType: imageData.type,
    };
    try {
        const data = await uploadToS3(params);
        return {
            url: data.Location,
            key: data.Key,
        }
    } catch (error) {
        console.log("[ERROR] uploadImage service: ", error);
        throw error;
    }
    
}

const imageService = {
    uploadImage,
    getPresignedUrl,
    getSignedUrl,
}

export default imageService;