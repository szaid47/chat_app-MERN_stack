import User from "../models/user.model.js";
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async(req,res)=>{
    try {
        const {id:userToChatID}=req.params;
        const myId = req.user._id;

        const messages= await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatID},
                {senderId:userToChatID, recieverId:myId}
            ]
        })

        res.status(200).json(messages)
    } catch (error) {
         console.error("Erro in Get messages : ", error.message);
    res.status(500).json({ error: "Internal server error" });
    }
}

export const sendMessage = async(req,res)=>{
    try {
        const {text,image}=req.body;
        const {id:recieverId}=req.params;
        const senderId = req.user._id;

        let imageurl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageurl=uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        })
        await newMessage.save();

        //realttime functionality using socket.io

        res.status(201).json(newMessage);
    } catch (error) {
         console.error("Erro in send  messages : ", error.message);
    res.status(500).json({ error: "Internal server error" });
    }
}