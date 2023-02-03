const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { askQuestion } = require("./gpt");


const app = express();
const port = process.env.PORT || 5000;

app.get("/ask", async (req, res) => {
	const question = req.query.question;
	const answer = await askQuestion(question);
	res.send(answer);
	});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
