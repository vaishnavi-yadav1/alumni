import Donation from '../models/donation.model.js'


export const addDonation = async (req, res) => {
  try {
    const { user, amount } = req.body;

    if (!user || !amount) {
      return res.status(400).json({ message: "User and amount are required" });
    }

    const donation = new Donation({ user, amount });
    await donation.save();

    res.status(201).json({ message: "Donation successful", donation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  };