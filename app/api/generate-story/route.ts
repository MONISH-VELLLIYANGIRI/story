
interface StoryRequest {
  prompt: string;
  genre: string;
  characters?: string;
}

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "ollama", // dummy value (required by SDK)
  baseURL: "http://localhost:11434/v1",
});

const MODEL = "llama3.1:8b";


async function generateStory(systemPrompt: string, userPrompt: string) {
  const response = await client.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    temperature: 0.8,
    max_tokens: 800,
  });

  const text = response.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("No text returned from Gemini model");
  }

  return text;
}

export async function POST(request: Request) {
  try {
    const { prompt, genre, characters }: StoryRequest = await request.json();

    if (!prompt?.trim()) {
      return Response.json({ error: "Story theme is required" }, { status: 400 });
    }

    if (!genre?.trim()) {
      return Response.json({ error: "Genre is required" }, { status: 400 });
    }

    const systemPrompt = `You are a creative storyteller specializing in ${genre}.
Write a vivid, emotional, and well-structured story outline.`;

    const userPrompt = `
Genre: ${genre}
${characters ? `Main Characters: ${characters}` : "Create original characters"}
Theme: ${prompt}

Generate a detailed and creative story plot.
`;

    const plot = await generateStory(systemPrompt, userPrompt);

    return Response.json({
      plot,
      metadata: {
        genre,
        hasCustomCharacters: !!characters,
        model: MODEL,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Story Generation Error:", error);
    return Response.json(
      { error: error.message || "Failed to generate story" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({
    message: "Story Generator API (Gemini 2.5 Flash via OpenAI-compatible endpoint)",
    model: MODEL,
  });
}
