import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import multerS3 from "multer-s3";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import calenderRoutes from "./routes/calender.js";
import todoRoutes from "./routes/todo.js"
import userRoutes from "./routes/user.js"
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import { S3Client } from "@aws-sdk/client-s3";  // <--- AWS v3 import

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// AWS File Storage (v3 setup)
const s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

/* FILE STORAGE */
// Note: multer-s3 needs to be compatible with AWS SDK v3 or you'd need a workaround.
// Here's the modified solution using multer-s3:
const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: 'scheduleproj',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + "-" + file.originalname)
        }
    })
});

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/calender", calenderRoutes);
app.use("/todo", todoRoutes);
app.use("/user", userRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
})
.catch((error) => console.log(`${error} did not connect`));

export default app;
