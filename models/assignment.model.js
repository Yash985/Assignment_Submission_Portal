import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    userId: {
      //here instead of using type:String we should use mongoose.Schema.Types.ObjectId to refer to the user model
      //here using string to match the example assignment object
      //{
      // 'userId':Soumik,
      // 'task':'Hello World',
      //'admin':'Alok',
      //}
      type: String,
      required: { type: String, message: "User ID is required" },
    },
    task: {
      type: String,
      required: { type: String, message: "Task is required" },
    },
    admin: {
      //here instead of using type:String we should use mongoose.Schema.Types.ObjectId to refer to the admin model
      type: String,
      required: { type: String, message: "Admin is required" },
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

export default Assignment;
