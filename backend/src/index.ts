import express,{Request,Response} from 'express';
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from "./routes/auth";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";
import path from "path";
import myHotelRoutes from "./routes/my-hotels";
import hotelRoutes from "./routes/hotels";
import bookingRoutes from "./routes/my-bookings";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
// .then(()=>
//   console.log(
//     "connected to database ",
//     process.env.MONGODB_CONNECTION_STRING
//   )
// );

// catch(e){
//     console.log(e);
// }

// const DB_PATH='mongodb+srv://asitsahoo3921:aUt9AYAawMiqbiNA@cluster0.t6dk2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
// mongoose.connect(DB_PATH);

const com=mongoose.connection;

com.on('error', (error) => {
    console.error('MongoDB connection error:', error);
  });
  
  com.once('open', () => {
    console.log('MongoDB connected successfully');
  });




const app=express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(verifyToken);

app.use("/api/auth/validate-token", (req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.use(cors({
  origin: process.env.FRONTEND_URL, // Replace with your client's origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    //optionsSuccessStatus: 204,
}));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'https://mern-booking-app-z2yv.onrender.com'); // Replace '*' with your frontend domain
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

// app.get("/api/user",userRoutes,async(req:Request,res:Response)=>{
//         res.json({message:"hello from asit endpoints"});
// });

app.use(express.static(path.join(__dirname, "../../frontend/dist")));


app.use("/api/users",userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/my-bookings", bookingRoutes);


app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
});



app.listen(7000,()=>{
    console.log("serevr is running on localhost:7000");
});

