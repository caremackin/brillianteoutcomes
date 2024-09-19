/*Controller for adding, deleting and modifying users in login and signup 
Sends web tokens for admin management*/
const { User } = require("../models");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  res.setHeader("Access-Control-Allow-Headers", "*");
  const body = req.body;
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(body.password, saltRounds);
  const newUser = await User.create({
    name: body.name,
    email: body.email,
    password: hashedPassword,
  });
  res.status(201);
};

exports.getAllUsers = async (req, res) => {
  res.setHeader("Access-Control-Allow-Headers", "*");
  const allUsers = await User.findAll();
  res.status(200).json(allUsers);
};

exports.getUserById = async (req, res) => {
  res.setHeader("Access-Control-Allow-Headers", "*");
  const id = req.params.id;
  const selectedUser = await User.findByPk(id);
  res.status(200).json(selectedUser);
};

exports.deleteUser = async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Headers", "*");
    const id = req.params.id;
    const deleted = await User.destroy({
      where: {
        id: id,
      },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.send("User not found");
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  res.setHeader("Access-Control-Allow-Headers", "*");
  try {
    const id = req.params.id;
    const body = req.body;
    const updated = await User.update(
      { name: body.name, email: body.email, password: body.password },
      {
        where: {
          id: id,
        },
      }
    );
    if (updated[0]) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

exports.authenticateLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const JWT_SECRET = process.env.JWT_SECRET;
  const user = await User.findAll({
    where: {
      email: email,
    },
  });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  if (!password) {
    return res.status(401).json({ error: "No password" });
  }
  const isMatch = await bcrypt.compare(password, user[0].password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const token = jwt.sign(
    { id: user.id, email: user.email, stateId: user.stateId },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  return res.json({
    token,
    user: { id: user.id, email: user.email, stateId: user.stateId },
  });
};
