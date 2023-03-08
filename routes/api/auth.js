const express = require('express');
const { authenticate } = require("../../middlewares")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { NotFound, BadRequest, Conflict, Unauthorized } = require('http-errors');
const { User } = require('../../model');
const { joiRegisterSchema, joiLoginSchema } = require('../../model/user');

const router = express.Router();
dotenv.config();
const { SECRET_KEY } = process.env;
// router.post("/register", async (req, res, next) => {
//     try {
//         const { error } = joiRegisterSchema.validate(req.body)
//         if (error) {
//             throw new BadRequest(error.message)
//         }
//         const { name, email, password } = req.body
//         const user = await User.findOne({ email })
//         if (user) {
//             throw new Conflict("User already exist")
//         }
//         const salt = await bcrypt.genSalt(10);
//         const hashPassword = await bcrypt.hash(password, salt);
//         const newUser = await User.create({
//             name,
//             email,
//             password: hashPassword

//         })
//         res.status(201).json({
//             user: {
//                 name: newUser.name,
//                 email: newUser.email,
//             },
//         });
//         console.log(req.body)
//     } catch (error) {
//         next(error)
//     }
// })

router.post('/login', async (req, res, next) => {
    try {
        const { error } = joiLoginSchema.validate(req.body);
        if (error) {
            throw new BadRequest(error.message);
        }
        const { name, password } = req.body;
        const user = await User.findOne({ name });
        if (!user) {
            throw new Unauthorized('Name or password wrong');
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            throw new Unauthorized('Name or password wrong');
        }
        const { _id } = user;
        const payload = {
            id: _id,
        };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '10h' });
        await User.findByIdAndUpdate(_id, { token });
        res.json({
            token,
            user: {
                name: user.name,
            },
        });
    } catch (error) {
        next(error);
    }
});


router.get("/logout", authenticate, async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: null });
    res.status(204).send("Logout success");
});

router.get("/current", authenticate, async (req, res) => {
    const { email, name, avatarURL } = req.user;
    res.json({
        user: {
            name,
            email,
            avatar: avatarURL,
        },
    });
});


module.exports = router;
