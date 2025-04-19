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

export const getAllEvents = async (req, res) => {
    try {
      const events = await Event.find().sort({ date: 1 });
      res.status(200).json(events);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
  };

 

export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return next(errorHandler(404, 'Event not found!'));
    }

    if (req.user.id !== event.createdBy.toString()) {
      return next(errorHandler(401, 'You can only delete your own events!'));
    }

    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json('Event has been deleted!');
  } catch (error) {
    next(error);
  }
};

