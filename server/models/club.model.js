import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    nameSlug: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    profileImageUrl : {
        type : String,
        default : ''
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    admins: [
        {
            admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            joinedAt: { type: Date, default: Date.now },
        },
    ],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event"
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
}, {
    timestamps: true,
});

clubSchema.index({ createdAt : -1 });

const Club = mongoose.model("Club", clubSchema);

export default Club