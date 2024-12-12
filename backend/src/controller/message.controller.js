import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getalluser = async(req, res) => {
    try {
        const loggedinuserid = req.user._id;
        const alluser = await User.find({ _id: { $ne: loggedinuserid } }).select("-password");
        res.status(201).json(alluser);
    } catch (error) {
        console.log("error happed in the get all the user of the sidebar");
        console.log(error.message);
        res.status(500).json({error: "server side error in the get all the user of the sidebar"})
        
    }
}

export const getallmessage = async(req, res) => {
    try {
        const {id: usertochatid} = req.params;
        const myid = req.user._id;
        const messages = await Message.find({
            $or: [
                { sender: myid, receiver: usertochatid },  // Messages where the logged-in user is the sender
                { sender: usertochatid, receiver: myid }   // Messages where the other user is the sender
            ]
        });
          res.status(200).json(messsages);

    } catch (error) {
        console.log("error happed in the get all the message of the user");
        console.log(error.message);
        res.status(500).json({error: "server side error in the get all the message of the user "})
        
    }
 }

 export const sendmessage = async(req, res) => {
    try {
        console.log("send message in the backend");
        const {text, image} = req.body;
        const {id: chatid} = req.params;
        const myid = req.user._id;
        let imageUrl = null;
        if (image) {
          const uploadResult = await cloudinary.uploader.upload(image);
          imageUrl = uploadResult.secure_url;  // Get the image URL from Cloudinary
        }
        console.log(text);
        console.log(image);
        const newMessage = new Message({
            sender: myid,
            receiver: chatid,
            text: text,
            image: imageUrl,  // Store image URL or null
          });
          await newMessage.save();
          
          //socket.io code


          res.status(200).json(newMessage);
    } catch (error) {
        console.log("error happed to send the message");
        console.log(error.message);
        res.status(500).json({error: "server side error to send the message"})
        
    }

 }