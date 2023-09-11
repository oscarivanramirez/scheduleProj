import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// AWS Client Configuration
const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Define a function to upload a file
const uploadFile = async (filePath) => {
    // Read content from the file
    const fileContent = fs.readFileSync(filePath);

    // Setting up S3 upload parameters
    const params = {
        Bucket: 'scheduleproj',
        Key: Date.now().toString() + "-" + filePath.split("/").pop(), // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    try {
        const result = await s3Client.send(new PutObjectCommand(params));
        console.log(`File uploaded successfully. ${result}`);
    } catch (err) {
        console.error("Error uploading file: ", err);
    }
};

// Call the function with the path to your image file
uploadFile('/Users/oscarramirez/Desktop/ScheduleProj/server/public/img/IMG_7226.jpg');
