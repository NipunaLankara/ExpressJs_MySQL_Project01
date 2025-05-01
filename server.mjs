import express from "express"
import userRouter from "./src/route/user.mjs";
import carRouter from "./src/route/car.mjs";
import bookingRouter from "./src/route/booking.mjs";

const server = express();

server.use(express.json());

const apiRouter = express.Router();

apiRouter.use("/user",userRouter);
apiRouter.use("/car",carRouter);
apiRouter.use("/booking",bookingRouter);

server.use("/api/v1",apiRouter);



const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server Started at http://127.0.0.1:${PORT}`);
});
