const notes = require("express").Router();
const {
	readFromFile,
	readAndAppend,
	writeToFile,
} = require("../helpers/fsUtils");
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
	const { id } = req.params;
	if (!id) {
		res.status(400).send("No id provided. Please provide a valid id.");
		return "Error";
	}
	readFromFile("./db/db.json").then((data) => {
		const array = JSON.parse(data);
		const found = array.find((element) => element.id === id);
		if (!found) {
			res.status(404).send("Note not found.");
			return Error("Note not found.");
		} else {
			const filteredArray = array.filter((obj) => obj.id !== id);
			writeToFile("./db/db.json", filteredArray);
			res.json(`Note with ID ${id} has been deleted.`);
		}
	});
});

module.exports = notes;
