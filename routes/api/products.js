const express = require('express');
const { NotFound, BadRequest } = require('http-errors');
const { authenticate } = require("../../middlewares")
const { Product, joiSchema } = require('../../model');
const cloudinary = require('../../utils/cloudinary');
const router = express.Router();

router.get('/',
  // authenticate,
  async (req, res, next) => {
    try {
      // const { page = 1, limit = 5 } = req.query;
      // const skip = (page - 1) * limit;
      // const { _id } = req.user;
      res.status(200).json(await Product.find(
        //   {
        //   skip,
        //   limit: +limit,
        // }
      ));
    } catch (error) {
      next(error);
    }
  });

router.get('/:id',
  authenticate,
  async (req, res, next) => {
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
router.post('/',
  authenticate,
  async (req, res, next) => {
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
      discount_time,
      discription,
      characteristics,
    } = req.body;

    try {
      let images = [...cardImg];
      let imagesBuffer = [];

      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
          folder: 'products',
          width: 1024,
          crop: 'fill',
        });

        imagesBuffer.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }

      // const { error } = joiSchema.validate(req.body);
      // if (error) {
      //   throw new BadRequest(error.message);
      // }
      const result = await cloudinary.uploader.upload(cards, {
        folder: 'products',
        width: 70,
        height: 70
        // crop: "scale"
      });
      const { _id } = req.user;
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
        discount_time,
        discription,
        characteristics,
        owner: _id
      });
      res.status(201).json(newProduct);
    } catch (error) {
      if (error.message.includes('validation failed')) {
        error.status = 400;
      }
      next(error);
    }
  });

router.delete('/:id',
  authenticate,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      const imgId = product.cards.public_id;
      if (imgId) {
        await cloudinary.uploader.destroy(imgId);
      }

      const images = product.cardImg;
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

router.put('/:id',
  authenticate,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const currentProduct = await Product.findById(id);
      // const { _id } = req.user;
      const data = {
        category: req.body.category,
        model: req.body.model,
        brand: req.body.brand,
        cards: req.body.cards,
        cardImg: req.body.cardImg,
        price: req.body.price,
        totalPrice: req.body.totalPrice,
        size: req.body.size,
        height: req.body.height,
        count: req.body.count,
        discount: req.body.discount,
        discount_time: req.body.discount_time,
        discription: req.body.discription,
        characteristics: req.body.characteristics,
        // owner: _id
      };

      if (typeof req.body.cards === 'string') {
        const ImgId = currentProduct.cards.public_id;
        if (ImgId) {
          await cloudinary.uploader.destroy(ImgId);
        }

        const newImage = await cloudinary.uploader.upload(req.body.cards, {
          folder: 'products',
          width: 70,
          height: 70
        });

        data.cards = {
          public_id: newImage.public_id,
          url: newImage.secure_url,
        };
      }

      if (typeof req.body.cardImg[0] === "string") {
        const images = currentProduct.cardImg;
        for (let i = 0; i < images.length; i++) {
          await cloudinary.uploader.destroy(images[i].public_id);
        }

        let newImages = [...req.body.cardImg];
        let imagesBuffer = [];
        for (let i = 0; i < newImages.length; i++) {
          const result = await cloudinary.uploader.upload(newImages[i], {
            folder: 'products',
            width: 1024,
            crop: 'scale',
          });

          imagesBuffer.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }

        data.cardImg = imagesBuffer;
      }

      const updateProduct = await Product.findByIdAndUpdate(id, data, {
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

router.patch('/:id',
  async (req, res, next) => {
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

module.exports = router;
