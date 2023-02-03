const { ModuleImporter } = require("@humanwhocodes/module-importer");

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
  });
  return api;
}

const _replaceKey = (str, key, value) => {
  return str.replace(key, value);
};


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
  return prompt;
};

const askQuestion = async (question) => {
  const api = await getAPI();
	const prompt = await generateAskPrompt(question, lastQuestions);
  const gptAPIOpts = lastConversation
    ? { conversationId: lastConversation }
    : {};
	const res = await api.sendMessage(prompt, gptAPIOpts);
  const { text, conversationId } = res;
  lastQuestions.push(text);
  lastConversation = conversationId;
  return text;
};

module.exports = { askQuestion };
