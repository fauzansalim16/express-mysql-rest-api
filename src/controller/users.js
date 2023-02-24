const UsersModel = require('../models/users');

const getAllUsers = async (req, res) => {
  try {
    const [data] = await UsersModel.getAllUsers();
    res.json({
      message: 'berhasil mendapatkan data',
      data: data,
    });
  } catch (error) {
    res.json({
      message: 'gagal mendapatkan data',
      serverMessage: error,
    });
  }
};

const createNewUser = async (req, res) => {
  const { body } = req;

  if (!body.nama || !body.email || !body.alamat) {
    return res.status(400).json({ message: 'Data invalid', data: null });
  }

  try {
    await UsersModel.createNewUser(body);
    res.status(201).json({
      message: 'Create new user successfully',
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      serverMessage: error,
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await UsersModel.updateUser(body, id);

    res.json({
      message: 'UPDATE success',
      data: {
        id: id,
        ...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'server error',
      serverError: error,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await UsersModel.deleteUser(id);
    res.json({
      message: 'DELETE success',
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: 'server error',
      serverError: error,
    });
  }
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
