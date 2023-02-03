chat-gpt AI Windows Assistant
=============================

Introduction
------------

This project serves as a virtual assistant for Windows, powered by OpenAI's GPT-3 language model. It can answer your questions, open programs for you, or play your favorite music. The aim of this simple and small project is to showcase the exciting possibility of using GPT-3 as a smart personal assistant!

Installation
------------

To use this project, you need to have [Node.js](https://nodejs.org/en/download/) installed on your system. Additionally, you need to obtain an OpenAI API Key, which you can use to populate the `.env.example` file. Simply rename this file to `.env` and replace the placeholder text with your actual API Key.

Usage
-----

This project makes use of an input prompt, which is stored in the `input-prompt.txt` file. You can edit this file to change the prompt to your liking. The application will then read the prompt and return the answer from GPT-3.

Example
-------

Here's an example of how you can use this application:

javascript

```javascript
http://127.0.0.1:5000/ask?question=play jazz music made by Miles Davis
```

This will return the following JSON response:

bash

```bash
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
```
