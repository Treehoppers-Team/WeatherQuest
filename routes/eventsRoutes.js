const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router
  .route("/")
  .get(eventController.getAllEvents)
  .post(eventController.createNewEvent)
  .delete(eventController.deleteEvent); // any get request that comes to our rest api at /user, we give them a response here

// get (retrieve), post (create), patch (update), delete (delete) -> follows your CRUD operations

module.exports = router;
