import mongoose,{ Document } from "mongoose";
import bcrypt from "bcryptjs";
export type UserType=Document & {
    
    _id:string;
    email:string;
    password:string;
    firstName:string;
    lastName:string;
};

const userSchema = new mongoose.Schema({

    email:{type:String, required:true, unique:true},
    password:{type:String, require:true},
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},

});
userSchema.pre("save", async function (this:UserType,next) {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 8);
    }
    next();
  });

const User = mongoose.model<UserType>("User",userSchema);

export default User;

// const userSchema=new mongoose.Schema({

// })