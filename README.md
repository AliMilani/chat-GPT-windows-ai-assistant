chat-gpt AI Windows Assistant
=============================

A simple project showcasing the capability of chat-gpt to function as a smart personal assistant for Windows.

Installation
------------

To run this project, you need to have [Node.js](https://nodejs.org/en/) installed on your system. Then, create an `.env` file from the provided `.env.example` and fill in your OpenAI API key.

Usage
-----

The program takes input from `input-prompt.txt` and outputs a object response with the answer and any related actions.

Example
-------

Here is an example of a query to the chat-gpt AI Windows Assistant:


```javascript
http://127.0.0.1:5000/ask?question=play jazz music made by Miles Davis
```

The response would look like this:


```bash
[
  {
    $question: "play jazz music made by Miles Davis",
    $answer: {
      answer_text: "Playing jazz music made by Miles Davis on Spotify.",
      action: "spotify_play_artist",
      action_data: "Miles Davis",
    },
  }
]
```
