import mongoose, { Schema } from "mongoose";

interface url {
    original_url: string;
    short_url: string;
    user_id: Schema.Types.ObjectId | null;
    created_at: Date;
}

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
        // ref: 'User',
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    // is_anonymous: {
    //     type: Boolean,
    //     default: false
    // }
  
});

  export const UrlModel = mongoose.model('Url', urlSchema);