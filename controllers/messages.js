// Määrittää REST -apin endpointit
const messagesRouter = require("express").Router();
const Message = require("../models/message");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

//endpoint viestin lähettämiseen tietokantaan
messagesRouter.post("/", async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);

  //varmistetaan että käyttäjätoken on oikein
  const decodedToken = jwt.verify(token, config.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const message = new Message({
    content: body.content,
    date: body.date,
    username: user.username,
  });

  const savedMessage = await message.save();
  response.json(savedMessage.toJSON());
});

//GET endpoint hakee tietokannasta kaikki viestit
messagesRouter.get("/", async (request, response) => {
  const messages = await Message.find({}).sort({ date: -1 });
  response.json(messages.map((message) => message.toJSON()));
});

module.exports = messagesRouter;
