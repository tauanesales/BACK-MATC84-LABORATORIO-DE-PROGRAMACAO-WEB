import userService from "../services/user.service.js";

const create = async (req, res) => {
  try {
    const requiredFields = ["name", "email", "password"];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ error: `Please add the field ${field}` });
      }
    }
    if (req.body.password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters" });
    }
    const user = await userService.create(req.body);

    res.status(201).json({
      message: "User created",
      id: user._id,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const findById = async (req, res) => {
  try {
    const id = req.id;
    const user = await userService.findByIdService(id);
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const update = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name && !email && !password) {
      return res.status(400).json({
        error: "Please add at least one of the fields: name, email, password",
      });
    }
    const id = req.params.id;
    await userService.updateService(id, name, email, password);
    res.json({ message: "User successfully updated!" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userIdToDelete = req.params.id;

    const result = await userService.deleteUser(userIdToDelete);
    res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default { create, findById, update, deleteUser };
