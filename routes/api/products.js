

const express = require('express')
const { NotFound, BadRequest } = require('http-errors')
const { Product, joiSchema } = require('../../model')
const router = express.Router()
// const products = require('../../model')


router.get('/', async (req, res, next) => {
  try {
    res.status(200).json(await Product.find())
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const product = await Product.findById(id)
    if (!product) {
      throw new NotFound()
    }
    res.json(product)
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      error.status = 404;
    }
    next(error)
  }
})
router.post('/', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const newProduct = await Product.create(req.body)
    res.status(201).json(newProduct)
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
    const removeProduct = await Bank.findByIdAndRemove(id);
    if (!removeProduct) {
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
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateProduct) {
      throw new NotFound();
    }
    res.json(updateProduct);
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
    const updateProduct = await Bank.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updateProduct) {
      throw new NotFound();
    }
    res.json(updateProduct);
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }
    next(error);
  }
});


module.exports = router
