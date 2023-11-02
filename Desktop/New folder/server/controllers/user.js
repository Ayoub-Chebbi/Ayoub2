const bcrypt = require("bcrypt");
const User = require("../models/model");

module.exports.registerUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            accountType: req.body.accountType,
        });

        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(400).json({ message: "Could not create user" });
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        res.json({
            _id: user._id,
            accountType: user.accountType,
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(400).json({ message: "Could not login user" });
    }
};

module.exports.getAllUsers = (req,res)=>{
    User.find()
        .then(allUsers =>{res.json(allUsers)})
        .catch(err =>console.log(err))
}

module.exports.deleteUser = (req,res)=>{
    User.findByIdAndDelete(req.params.id)
        .then(deleteConfirm =>res.json(deleteConfirm))
        .catch(err=>console.log(err))
    }

    module.exports.UpdateUser = (req,res)=>{
        User.findByIdAndUpdate(req.params.id , req.body, {new:true})
            .then(allUsers=>res.json(allUsers))
            .catch(err=>console.log(err))
    }
    module.exports.getOneUser = (req,res)=>{
        User.findById(req.params.id)
            .then(allUsers=>res.json(allUsers))
            .catch(err=>console.log(err))
    }