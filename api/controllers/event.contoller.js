import Event from "../models/event.model.js";


export const createEvent = async (req, res, next) => {
    const { title, dateTime, location, description, createdBy } = req.body;
    
    try {
      if (!createdBy) {
        return res.status(400).json({ message: "createdBy is required" });
      }
  
      const event = new Event({
        title,
        dateTime,
        location,
        description,
        createdBy,  
      });
  
      await event.save();
      res.status(201).json({ message: "Event created", event });
    } catch (error) {
      next(error);
    }
};
