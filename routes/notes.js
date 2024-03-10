const notes = require("express").Router();
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
const { v4: uuidv4 } = require("uuid");

// GET Route for retrieving all the notess
notes.get("/", (req, res) => {
	readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post("/", (req, res) => {
	console.log(req.body);

	const { title, text, id } = req.body;

	if (req.body) {
		const newNotes = {
			title,
			text,
			id: uuidv4(),
		};

		readAndAppend(newNotes, "./db/db.json");
		res.json(`Note added successfully`);
	} else {
		res.error("Error in adding note");
	}
});

// DELETE Route for a note
notes.delete("/:id", (req, res) => {
	console.log(req.body);

	const { id } = req.body;

	res.json(`Note with ID ${id} has been deleted.`);
});

module.exports = notes;
