const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-arpit:Asdf1234@cluster0.gn6ojf5.mongodb.net/paytmApp");

const userSchema = mongoose.Schema({
    username: {
        type: String,
      
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: String,
    lastName: String
})
const User = mongoose.model("User",userSchema);

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true
    },
    balance: {
        type: Number,
        require:true
    }
});

const Account = mongoose.model("Account",accountSchema);



module.exports = {
    User,
    Account
}
