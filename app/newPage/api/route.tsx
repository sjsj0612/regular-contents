/* eslint-disable import/no-anonymous-default-export */
import { NextResponse } from "next/server";
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config({ path: __dirname + '/.env' });

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function GET() {
    const data = { 
        pokemon: {
            name: '테스트'
        }
    }
    return NextResponse.json({ data });
}

export async function POST(request:Request) {
    if (!configuration.apiKey) {
        return new Response('OpenAI API key not configured', {
            status: 500,
        });
        // response.status(500).json({
        // error: {
        //     message: 'OpenAI API key not configured',
        // },
        // });
        // return;
    }

   
    const req = await request.json();
    console.log('req', req);
    const question = req.question || '';

    const gptResponse = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: question,
        temperature: 1,
        max_tokens: 3000,
    });
    console.log('gptResponse', gptResponse.data.choices[0].text);
    return NextResponse.json({ result: gptResponse.data.choices[0].text });
    // res.status(200).json({ result: response.data.choices[0].text });
}