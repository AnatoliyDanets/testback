const express = require('express');
const { NotFound, BadRequest } = require('http-errors');
const { Product, joiSchema } = require('../../model');
const cloudinary = require("../../utils/cloudinary")
const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
    res.status(200).json(await Product.find());
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new NotFound();
    }
    res.json(product);
  } catch (error) {
    if (error.message.includes('Cast to ObjectId failed')) {
      error.status = 404;
    }
    next(error);
  }
});
router.post('/', async (req, res, next) => {
  const {
    category,
    model,
    cards,
    cardImg,
    brand,
    price,
    totalPrice,
    size,
    height,
    count,
    discount,
    discription,
    characteristics,
  } = req.body;




  try {


    let images = [...req.body.cardImg];
    let imagesBuffer = [];

    for (let i = 0; i < images.length; i++) {



      const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
        width: 1024,
        crop: "fill"
      });

      imagesBuffer.push({
        public_id: result.public_id,
        url: result.secure_url,

      })

    }



    // const { error } = joiSchema.validate(req.body);
    // if (error) {
    //   throw new BadRequest(error.message);
    // }
    const result = await cloudinary.uploader.upload(cards, {
      folder: 'products',
      // width: 300,
      // crop: "scale"
    });

    const newProduct = await Product.create({
      category,
      model,
      cards: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      cardImg: imagesBuffer,
      brand,
      price,
      totalPrice,
      size,
      height,
      count,
      discount,
      discription,
      characteristics,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    if (error.message.includes('validation failed')) {
      error.status = 400;
    }
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);


    const imgId = product.cards.public_id;
    if (imgId) {
      await cloudinary.uploader.destroy(imgId);
    }

    const images = product.cardImg
    for (let i = 0; i < images.length; i++) {
      await cloudinary.uploader.destroy(images[i].public_id);


    }



    const removeProduct = await Product.findByIdAndRemove(id);
    if (!removeProduct) {
      throw new NotFound();
    }

    res.json({ message: 'product delete' });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
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
    if (error.message.includes('validation failed')) {
      error.status = 400;
    }
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
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
    if (error.message.includes('validation failed')) {
      error.status = 400;
    }
    next(error);
  }
});

module.exports = router;
