const { User } = require("../models");

exports.createUser = async (req, res) => {
  const body = req.body;
  const newUser = await User.create({
    name: body.name,
    email: body.email,
    password: body.password,
  });
  res.status(201);
};

exports.getAllUsers = async (req, res) => {
  const allUsers = await User.findAll();
  res.status(200).json(allUsers);
};

exports.getUserById = async (req, res) => {
  const id = req.params.id;
  const selectedUser = await User.findByPk(id);
  res.status(200).json(selectedUser);
};

exports.deleteUser = async (req, res) => {
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
};

exports.updateUser = async (req, res) => {
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
