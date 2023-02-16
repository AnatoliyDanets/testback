const express = require('express')
const { NotFound, BadRequest } = require('http-errors')
const Joi = require('joi')
const { Order, joiOrderSchema } = require('../../model')
const router = express.Router()



router.get('/', async (req, res, next) => {
    try {
        res.status(200).json(await Order.find())
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
        const order = await Order.findById(id)
        if (!order) {
            throw new NotFound()
        }
        res.json(order)
    } catch (error) {
        if (error.message.includes("Cast to ObjectId failed")) {
            error.status = 404;
        }
        next(error)
    }
})
router.post('/', async (req, res, next) => {
    try {
        const { error } = joiOrderSchema.validate(req.body)
        if (error) {
            throw new BadRequest(error.message)
        }
        const newOrder = await Order.create(req.body)
        res.status(201).json(newOrder)
    } catch (error) {
        if (error.message.includes("validation failed")) {
            error.status = 400;
        }
        next(error)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const removeOrder = await Bank.findByIdAndRemove(id);
        if (!removeOrder) {
            throw new NotFound();
        }
        res.json({ message: "product delete" });
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateOrder = await Order.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updateOrder) {
            throw new NotFound();
        }
        res.json(updateOrder);
    } catch (error) {
        if (error.message.includes("validation failed")) {
            error.status = 400;
        }
        next(error);
    }
});


router.patch("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateOrder = await Bank.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updateOrder) {
            throw new NotFound();
        }
        res.json(updateOrder);
    } catch (error) {
        if (error.message.includes("validation failed")) {
            error.status = 400;
        }
        next(error);
    }
});


module.exports = router