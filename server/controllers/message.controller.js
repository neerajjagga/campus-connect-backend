import Message from "../models/message.model.js";

export const getMessages = async (req, res) => {
    try {
        const { roomId } = req.query;

        if (!roomId) {
            return res.status(400).json({
                success: false,
                messages: "RoomId is required"
            });
        }

        const messages = await Message.find({ roomId }, { "roomId" : 0, "__v" : 0 })
            .sort({ createdAt: 1 })
            .populate("fromUserId", "name profileImageUrl")
            .populate("toUserId", "name profileImageUrl")
            .lean()

        return res.json({
            success: true,
            messages,
            message: messages.length > 0 ? "Messages fetched successfully" : "No messages found"
        });

    } catch (error) {
        console.log("Error coming while getting messages", error.message);
        return res.status(500).json({
            success: false,
            message: "Unknown error occurred while getting messages"
        })
    }
}