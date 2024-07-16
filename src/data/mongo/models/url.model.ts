import mongoose, { Schema } from "mongoose";

const urlSchema = new mongoose.Schema( {

    original_url: {
        type: String,
        required: true 
    },
    short_url: {
        type: String,
        required: true,
        unique: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    clicks: {
        type: Number,
        default: 0
    }
  
});

export const UrlModel = mongoose.model('Url', urlSchema);