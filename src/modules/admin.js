import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: true,
            trim: true,
        },

        Email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },

        Password: {
            type: String,
            required: true,
            minlength: 6,
            select: false
        },

        Role: {
            type: String,
            enum: ["superAdmin", "admin"],
            default: "admin",
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        LastLogin: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);
export default Admin