import mongoose from'mongoose';

const donationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  donationDate: {
    type: Date,
    default: Date.now,
  },
});


const Donation = mongoose.model("Donation", donationSchema);
export default Donation;
