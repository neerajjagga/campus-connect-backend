import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    roomId : {
        type : String,
        required : true,
    },
    message : {
        type : String,
        required : true,
    }
}, {
    timestamps: true,
});

messageSchema.index({ createdAt : 1, roomId : 1 });

const Message = mongoose.model("Message", messageSchema);

export default Message;