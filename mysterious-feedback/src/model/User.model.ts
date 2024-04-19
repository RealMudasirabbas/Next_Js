import mongoose, { Schema, Document} from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: [true, 'Please provide a message'],
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    }
})


export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[];
}

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        match: [/.+\@.+\..+/, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a strong password'],
    },
    verifyCode: {
        type: String,
        required: [true, 'Please provide a verification code'],
    },
    verifyCodeExpiry: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true,
    },
    messages: [messageSchema],
})


const UserModel = mongoose.models.User as mongoose.Model<User> || mongoose.model<User>('User', userSchema);
export default UserModel