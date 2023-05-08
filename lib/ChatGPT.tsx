// index.js
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function ChatGPT(prompt:string) {
    const gptResponse = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 3000,
        temperature: 1,
        n: 1,
      })
    console.log('gpt', gptResponse)
    return {gptResponse};
}
;