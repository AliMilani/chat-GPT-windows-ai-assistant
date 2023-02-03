const { ModuleImporter } = require("@humanwhocodes/module-importer");

const dotenv = require("dotenv");
dotenv.config();
const lastQuestions = [];
let lastConversation = null;

/**
 * Get the ChatGPT API instance.
 * @returns {import("chatgpt").ChatGPTAPI}
 */
async function getAPI() {
  const importer = new ModuleImporter(__dirname);
  /**
   * @type {import("chatgpt").ChatGPTAPI}
   */
  const { ChatGPTAPI } = await importer.import("chatgpt");
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY,
    // debug: true,
  });
  return api;
}

/**
 * takes a string, a key, and a value, and returns the string with the key replaced by
 * the value.
 * @param str - The string to be replaced.
 * @param key - The key to replace
 * @param value - The value to be replaced
 * @returns a string that has been replaced with the value of the key.
 */
const _replaceKey = (str, key, value) => {
  return str.replace(key, value);
};

/**
 * It takes a question and a list of the last questions asked, and generates a text file with the
 * question and the last questions.
 * @param question - "What is your name?"
 * @param lastQuestions - An array of strings, each string is a question that was asked in the last
 * questions.
 */
const generateAskPrompt = async (question, lastQuestions) => {
  const promptFileName = "input-prompt.txt";
  const promptText = require("fs").readFileSync(promptFileName, "utf8");
  const lastQuestionsKey = "%%last%%";
  const inputQuestionKey = "%%input%%";
  let prompt = _replaceKey(
    promptText,
    lastQuestionsKey,
    lastQuestions.join("\n")
  );
  prompt = _replaceKey(prompt, inputQuestionKey, question);
  //   console.log(prompt);
  return prompt;
};

const askQuestion = async (question) => {
  const api = await getAPI();
  const prompt = await generateAskPrompt(question, lastQuestions);
  require("fs").writeFileSync("input-prompt-to-send.txt", prompt, "utf8");
  const gptAPIOpts = lastConversation
    ? { conversationId: lastConversation }
    : {};
  const res = await api.sendMessage(prompt, gptAPIOpts);
  console.log(`res.conversationId: ${res.conversationId}`);
  const { text, conversationId } = res;
  lastQuestions.push(text);
  lastConversation = conversationId;
  return text;
};

module.exports = { askQuestion };
