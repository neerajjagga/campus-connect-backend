import { Server } from "socket.io";
import Message from "../models/message.model.js";
import User from './../models/user.model.js';

export const initializeSocket = async (server) => {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
        }
    });

    io.on("connection", (socket) => {
        console.log("User connected successfully");

        socket.on("joinRoom", async ({ fromUserId, toUserId }) => {
            try {
                const senderExists = await User.findById(fromUserId);
                const receiverExists = await User.findById(toUserId);

                if (!senderExists || !receiverExists) {
                    socket.emit("errorMessage", { error: "Invalid users" });
                    return;
                }

                const room = [toUserId, fromUserId].sort().join('_');
                socket.join(room);
                console.log(`User ${fromUserId} joined room: ${room}`);
                
            } catch (error) {
                console.error("Error joining room:", error.message);
            }
        });

        socket.on("sendMessage", async ({ fromUserId, toUserId, message }) => {
            try {
                const senderExists = await User.findById(fromUserId);
                const receiverExists = await User.findById(toUserId);

                if (!senderExists || !receiverExists) {
                    socket.emit("errorMessage", { error: "Invalid users" });
                    return;
                }

                const room = [toUserId, fromUserId].sort().join("_");

                await Message.create({
                    fromUserId,
                    toUserId,
                    roomId: room,
                    message,
                });

                io.to(room).emit("messageReceived", { fromUserId, message });

            } catch (error) {
                console.error("Error saving message:", error.message);
                socket.emit("errorMessage", { error: "Failed to send message" });
            }
        });

        socket.on("disconnect", (reason) => {
            console.log(`User disconnected: ${socket.id}, Reason: ${reason}`);
        });
    });
}