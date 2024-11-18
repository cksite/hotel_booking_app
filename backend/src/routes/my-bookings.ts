// import express, { Request, Response } from "express";
// import verifyToken from "../middleware/auth";
// import Hotel from "../models/hotel";
// import { HotelType } from "../shared/types";

// const router = express.Router();

// // /api/my-bookings
// router.get("/", verifyToken, async (req: Request, res: Response) => {
//   try {
//     const hotels = await Hotel.find({
//       bookings: { $elemMatch: { userId: req.userId } },
//     });

//     const results = hotels.map((hotel) => {
//       const userBookings = hotel.bookings.filter(
//         (booking) => booking.userId === req.userId
//       );

//       const hotelWithUserBookings: HotelType = {
//         ...hotel.toObject(),
//         bookings: userBookings,
//       };

//       return hotelWithUserBookings;
//     });
//     console.log(results);
//     res.status(200).send(results);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Unable to fetch bookings" });
//   }
// });

// export default router;

import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";

const router = express.Router();

// /api/my-bookings
router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
  
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      const hotels = await Hotel.find({
        bookings: { $elemMatch: { userId } },
      });
  
      if (!hotels || hotels.length === 0) {
        return res.status(404).json({ message: "No bookings found" });
      }
  
      const results = hotels.map((hotel) => {
        const userBookings = hotel.bookings.filter(
          (booking) => booking.userId === userId
        );
  
        const hotelWithUserBookings: HotelType = {
          ...hotel.toObject(),
          bookings: userBookings,
        };
  
        return hotelWithUserBookings;
      });
  
      return res.status(200).json(results);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      return res.status(500).json({ message: "Unable to fetch bookings" });
    }
  });
  
  export default router;
