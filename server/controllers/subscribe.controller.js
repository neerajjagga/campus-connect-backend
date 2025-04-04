import subscribe from "../models/subscribe.model.js";
import { sendSubscribedEmail } from "../utils/event.utils.js";

export const subscribeEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if(!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        const isEmailAlreadySubscribed = await subscribe.findOne({ email });

        if(isEmailAlreadySubscribed) {
            return res.status(400).json({
                success : false,
                message : "You are already subscribed",
            });
        }

        await subscribe.create({ email });

        await sendSubscribedEmail(email);

        return res.json({
            success: true,
            message: "Email Subscribed successfully"
        });
        
    } catch (error) {
        console.log("Error coming while subscribing email", error.message);
        return res.status(500).json({
            success: false,
            message: "Unknown error occurred while subscribing email"
        })
    }
}