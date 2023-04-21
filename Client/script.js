const refresh = () => {
  document.querySelector("#addButton").innerHTML = "Add";

  fetch("https://notes-keeper-pi.vercel.app/notes", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const noteList = document.querySelector(".note-list");
      data.forEach((note) => {
        const existingNote = noteList.querySelector(`[ data-id = '${note._id}' ]`);
        if (!existingNote) {
          noteList.innerHTML += `
          <div class="note" data-id="${note._id}">
            <div class="icon">
              <button type="submit" data-id="${note._id}" onclick="deleteNote(this.getAttribute('data-id'))"><i class="fa-regular fa-trash-can fa-lg"></i></button>
              <button type="submit" data-id="${note._id}" onclick="editNote(this.getAttribute('data-id'))"><i class="fa-solid fa-pencil fa-lg"></i></button> 
            </div>
            <div class="note-content">
              <h1>${note.title}</h1>
              <p>${note.content}</p>
            </div>
          </div>`;
        } else {
          existingNote.innerHTML = `
          <div class="icon">
            <button type="submit" data-id="${note._id}" onclick="deleteNote(this.getAttribute('data-id'))"><i class="fa-regular fa-trash-can fa-lg"></i></button>
            <button type="submit" data-id="${note._id}" onclick="editNote(this.getAttribute('data-id'))"><i class="fa-solid fa-pencil fa-lg"></i></button> 
          </div>
          <div class="note-content">
            <h1>${note.title}</h1>
            <p>${note.content}</p>
          </div>`;
        }
      });
    })
    .catch((error) => console.error(error));
};

refresh();

const getValue = () => {
  const title = document.querySelector("#title").value;
  const content = document.querySelector("#content").value;

  if (!update) {
    fetch("https://notes-keeper-pi.vercel.app/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        refresh();
        document.querySelector("#title").value = "";
        document.querySelector("#content").value = "";
      })
      .catch((error) => console.error(error));
  } 
  
  else {
    fetch(`https://notes-keeper-pi.vercel.app/notes/${updateID}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      refresh();
      document.querySelector("#title").value = "";
      document.querySelector("#content").value = "";
    })
    .catch((error) => console.error(error));
  }
  
  update=false;
};

const deleteNote = (id) => {
  console.log(id);
  fetch(`https://notes-keeper-pi.vercel.app/notes/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(`Note with ID ${id} deleted successfully!`);
      const noteList = document.querySelector(".note-list");
      const noteElement = noteList.querySelector(`[data-id='${id}']`);
      noteElement.remove();
    })
    .catch((error) => console.error(error));
};

var update = false;
var updateID;

const editNote = (id) => {
  document.querySelector("#addButton").innerHTML = "edit";
  update = true;
  updateID=id;
};