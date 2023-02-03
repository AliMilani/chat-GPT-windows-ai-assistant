const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { askQuestion } = require("./gpt");


const app = express();
const port = process.env.PORT || 5000;

app.get("/ask", async (req, res) => {
	/* example:
	 http://127.0.0.1:5000/ask?question=play jazz music made by Miles Davis
	 [
		{
			$question: "play jazz music made by Miles Davis",
			$answer: {
			answer_text: "Playing jazz music made by Miles Davis on Spotify.",
			action: "spotify_play_artist",
			action_data: "Miles Davis",
			},
		},
	]
	*/
	const question = req.query.question;
	console.log(req.query);
	const answer = await askQuestion(question);
	console.log(answer);
	res.send(answer);
	});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});
