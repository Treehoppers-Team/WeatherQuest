const Event = require("../models/events");

const asyncHandler = require("express-async-handler"); // will keep us from using too many try catch blocks as we use async methods form mongoose to save, delete data

// @desc Get all events
// @route GET /events
// @access Private

const getAllEvents = asyncHandler(async (req, res) => {
  const events = await Event.find().select();
  // const events = await event.find().select("-password").lean(); // do not return the password with the event data, lean also means that we receive plan javascript objects instead of mongoose documents that come with additional methods and features
  if (!events?.length) {
    // logic chaining if no events -> check if there is a length
    // if no events found
    return res.status(400).json({ message: "No event found" });
  }
  res.json(events);
});

// @desc Create new event
// @route POST /events
// @access Private

const createNewEvent = asyncHandler(async (req, res) => {
  const { player, chosenWeather, actualWeather, won } = req.body;

  // Confirm data
  if (
    !player ||
    !chosenWeather ||
    !actualWeather ||
    typeof won === "undefined"
  ) {
    return res.status(400).json({ message: "All fields are required" }); // error for specific situations
  }

  // Check for duplicate
  //  const duplicate = await event.findOne({ eventname }).lean().exec(); // I believe exec is used for some type of error handling

  // .exec() is used to execute a Mongoose query and return a promise, allowing you to handle errors with try...catch.

  // In your code, you often use .lean().exec() together. The combination is useful when you want to both get plain JavaScript objects and execute the query. However, keep in mind that .exec() is not always required, and you can also use await directly on the query without it.

  // if (duplicate) {
  //   return res.status(409).json({ message: "Duplicate eventname" }); // 409 -> indicates conflict
  // }

  // Hash password
  // const hashedPwd = await bcrypt.hash(password, 10); // salt rounds, we don't know password without decrypting it

  const eventObject = { player, chosenWeather, actualWeather, won };

  // Create and store new event
  const event = await Event.create(eventObject);

  if (event) {
    //created
    res.status(201).json({ message: `New event created` });
  } else {
    res.status(400).json({ message: `Invaid event data received` });
  }
});

// @desc Update a event
// @route PATCH /events
// @access Private

const updateevent = asyncHandler(async (req, res) => {
  const { id, eventname, roles, active, password } = req.body;

  // Confirm data
  if (
    !id ||
    !eventname ||
    !Array.isArray(roles) ||
    !roles.length ||
    typeof active !== "boolean"
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const event = await Event.findById(id).exec(); // exec -> we do need to find that promise, not calling lean() because we need this to be a mongoose document with different methods attached to it

  // .exec() is used to execute a Mongoose query and return a promise, allowing you to handle errors with try...catch.

  if (!event) {
    return res.status(400).json({ message: "event not found" });
  }

  // Check for duplicate
  const duplicate = await event.findOne({ eventname }).lean().exec();
  // Allow updates to the original event
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate eventname" });
  }

  event.eventname = eventname;
  event.roles = roles;
  event.active = active;

  if (password) {
    // Has password
    event.password = await bcrypt.hash(password, 10); // salt round
  }

  const updatedevent = await event.save(); // if we requested lean() we would no have gotten the save method

  res.json({ message: `${updatedevent.eventname} updated` });
});

// @desc Delete a event
// @route DELETE /events
// @access Private

const deleteEvent = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "event ID Required" });
  }

  const event = await Event.findById(id).exec();

  if (!event) {
    return res.status(400).json({ message: "event not found" });
  }

  // Capture event details before deleting
  const deletedeventData = { eventname: event.player, _id: event._id };

  await event.deleteOne();

  const reply = `player event ${deletedeventData.player} with ID ${deletedeventData._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllEvents,
  createNewEvent,
  deleteEvent,
};
