const noteModel = require("../models/noteModel");

const createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const result = await noteModel.create({ title, content });

    return res.status(201).json({
      message: "Note created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating note",
      error: error.message,
    });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const result = await noteModel.getAll();
    return res.status(200).json({
      message: "All notes retrieved successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving notes",
      error: error.message,
    });
  }
};

const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await noteModel.getById(id);

    if (!result) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.status(200).json({
      message: "Note retrieved successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving note",
      error: error.message,
    });
  }
};

const updateNoteById = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const result = await noteModel.editById(id, { title, content });

    if (!result) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.status(200).json({
      message: "Note updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating note",
      error: error.message,
    });
  }
};

const deleteNoteById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await noteModel.deleteById(id);

    if (!result) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting note",
      error: error.message,
    });
  }
};

module.exports = {
  createNote,
  getNoteById,
  getAllNotes,
  updateNoteById,
  deleteNoteById,
};
