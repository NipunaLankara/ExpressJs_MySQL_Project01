import { Router } from "express";
import { validationResult } from "express-validator";
import { validateAddNewCar } from "../validation/car-validation.mjs";
import DB from "../db/DB.mjs";
import { verifyToken } from "../util/verifyToken.mjs";

const carRouter = Router();

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// POST /add-new-car
carRouter.post("/add-new-car", verifyToken, validateAddNewCar, handleValidationErrors, async (req, res) => {
    const carData = req.body;
    const carNumber = req.body.CarNumber;

    try {
        await DB.car.create({ data: carData });
        return res.status(200).json({ msg: "Car " + carNumber + " Created" });
    } catch (err) {
        return res.status(500).json({ msg: "Car Create Failed", err: err });
    }
});

// GET /get-all-cars
carRouter.get("/get-all-cars", verifyToken, async (req, res) => {
    try {
        const carData = await DB.car.findMany();
        return res.status(200).json({
            msg: "All Cars List",
            data: carData
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Something Wrong", err: err });
    }
});

// GET /get-all-cars-with-user
carRouter.get("/get-all-cars-with-user", verifyToken, async (req, res) => {
    try {
        const carData = await DB.car.findMany({
            include: {
                User: {
                    select: {
                        Id: true,
                        UserName: true
                    }
                }
            }
        });

        return res.status(200).json({
            msg: "All Cars List with User ID and Username",
            data: carData
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Something went wrong", err: err.message });
    }
});

//  GET /get-car-by-id?id=...
carRouter.get("/get-car-by-id", verifyToken, async (req, res) => {
    const id = parseInt(req.query.id);
    if (isNaN(id)) {
        return res.status(400).json({ msg: "Invalid car ID" });
    }

    try {
        const car = await DB.car.findUnique({
            where: { Id: id }
        });

        if (!car) {
            return res.status(404).json({ msg: "Car not found" });
        }

        return res.status(200).json({
            msg: "Car fetched successfully",
            data: car
        });

    } catch (err) {
        return res.status(500).json({ msg: "Failed to fetch car", err: err.message });
    }
});

//  PUT /update-car-by-id?id=...  + req.body = new car data
carRouter.put("/update-car-by-id", verifyToken, async (req, res) => {
    const id = parseInt(req.query.id);
    const updateData = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ msg: "Invalid car ID" });
    }

    try {
        const updatedCar = await DB.car.update({
            where: { Id: id },
            data: updateData
        });

        return res.status(200).json({
            msg: "Car updated successfully",
            data: updatedCar
        });
    } catch (err) {
        return res.status(500).json({ msg: "Failed to update car", err: err.message });
    }
});


// DELETE /delete-car-by-id?id=...
carRouter.delete("/delete-car-by-id", verifyToken, async (req, res) => {
    const id = parseInt(req.query.id);
    if (isNaN(id)) {
        return res.status(400).json({ msg: "Invalid car ID" });
    }

    try {
        await DB.car.delete({ where: { Id: id } });
        return res.status(200).json({ msg: "Car deleted successfully" });
    } catch (err) {
        return res.status(500).json({ msg: "Failed to delete car", err: err.message });
    }
});



export default carRouter;
