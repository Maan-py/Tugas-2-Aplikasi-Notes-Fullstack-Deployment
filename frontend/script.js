const BASE_URL = "http://localhost:3000/api/notes";

const createNote = async (title, content) => {
  const url = `${BASE_URL}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add note");
    }

    // const result = await response.json();
    await getAllNotes();
  } catch (error) {
    console.log(error.message);
  }
};

const getAllNotes = async () => {
  const url = `${BASE_URL}`;
  const noteList = document.querySelector(".note-list");

  try {
    const response = await fetch(url);
    const { data } = await response.json();

    if (!response.ok) {
      throw new Error("Response status: " + response.status);
    }

    if (data.length === 0) {
      noteList.innerHTML = `<div class="note-item">
            <div class="empty-note">
                <h2>No notes yet</h2>
            </div>
        </div>`;

      return;
    }

    const noteCard = data
      .map((note) => {
        const dateObj = new Date(note.updatedAt);

        const formatted = dateObj.toLocaleString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        return `<div class="note-item">
            <div class="content">
                <h2>${note.title}</h2>
                <p>${note.content}</p>
                <p>Last updated: ${formatted}</p>
            </div>
            <div class="actions">
                <button type="button" class="button-edit" data-action="Edit" data-id=${note.id}>Edit</button>
                <button type="button" class="button-delete" data-action="Delete" data-id=${note.id}>Delete</button>
            </div>
        </div>`;
      })
      .join("");

    noteList.innerHTML = noteCard;
  } catch (error) {
    console.log(error.message);
  }
};

const getNoteById = async (id) => {
  const url = `${BASE_URL}/${id}`;

  try {
    const response = await fetch(url);
    const { data } = await response.json();

    if (!response.ok) {
      throw new Error("Response status: " + response.status);
    }

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const editNoteById = async (id, newTitle, newContent) => {
  const url = `${BASE_URL}/${id}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        content: newContent,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to edit note");
    }

    await getAllNotes();
    addButton.innerHTML = "Add Note";
    addButton.style.backgroundColor = "#0d6efd";
  } catch (error) {
    console.log(error.message);
  }
};

const deleteNoteById = async (id) => {
  const url = `${BASE_URL}/${id}`;

  if (!confirm("Are you sure wanna delete this?")) return;
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to remove note");
    }

    await getAllNotes();
  } catch (error) {
    console.log(error.message);
  }
};

const noteForm = document.querySelector(".note-input");
const noteList = document.querySelector(".note-list");

const titleInput = document.querySelector(".note-input input");
const contentInput = document.querySelector(".note-input textarea");

const addButton = document.querySelector(".add-button");

// add / edit note
noteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const editId = noteForm.dataset.editId;

  if (editId) {
    await editNoteById(editId, titleInput.value, contentInput.value);
  } else {
    await createNote(titleInput.value, contentInput.value);
  }

  noteForm.reset();
});

// show all notes
document.addEventListener("DOMContentLoaded", () => {
  getAllNotes();
});

// update note
noteList.addEventListener("click", async (e) => {
  if (e.target.classList.contains("button-edit")) {
    const id = e.target.dataset.id;

    const note = await getNoteById(id);

    titleInput.value = note.title;
    contentInput.value = note.content;

    noteForm.dataset.editId = id;

    addButton.innerHTML = "Edit Note";
    addButton.style.backgroundColor = "#ffc107";
  }
});

// delete note
noteList.addEventListener("click", async (e) => {
  if (e.target.classList.contains("button-delete")) {
    const id = e.target.dataset.id;

    await deleteNoteById(id);
  }
});
