import User from '../models/user.model.js'
export const signup = async(req, res) => {
   try {
    const {email, fullname, password} = req.body;
    if(!email || !fullname || !password) {
       return res.status(400).send("fill all the fields");
    }
    const user = await User.findOne({email});
    if(user) {
      return  res.status(400).send("this email is already existed");
    }
    else {
        const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
        const hashedPassword = await bcrypt.hash(password, salt);
        const newuser = {
            email, 
            fullname,
            password: hashedPassword
        }
        await newuser.save();
    }

   }
   catch(error) {
    console.log("something happened in sigup");
    res.status(400).send("signup error");
    
   }
}

export const login = (req, res) => {
    res.status(201).send("login route");
}

export const logout = (req, res) => {
    res.status(201).send("logout route");
}