const Note = require("../schema/Note");

const getAll = async () => {
  return await Note.findAll({
    attributes: ["id", "title", "content", "createdAt"],
  });
};

const getById = async (id) => {
  return await Note.findByPk(id, {
    attributes: ["id", "title", "content", "createdAt"],
  });
};

const create = async (noteData) => {
  return await Note.create(noteData);
};

const editById = async (id, noteData) => {
  return await Note.update(noteData, {
    where: {
      id: id,
    },
  });
};

const deleteById = async (id) => {
  return await Note.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  getById,
  getAll,
  create,
  editById,
  deleteById,
};
