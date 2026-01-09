
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

const systemPrompt = `
You are an award-winning creative storyteller and narrative designer.
You specialize in the ${genre} genre and are known for crafting emotionally
powerful, immersive, and well-paced story worlds.

Your goal is to design compelling story outlines that balance:
- strong character arcs
- meaningful conflict
- thematic depth
- clear narrative structure
`;

const userPrompt = `
STORY CONTEXT
-------------
Genre: ${genre}
Theme / Core Idea: ${prompt}
${characters ? `Main Characters: ${characters}` : "Main Characters: Create original, unique characters with clear motivations"}

TASK
----
Generate a detailed and creative story outline by following these steps internally:
1. Establish the story world and tone
2. Introduce the protagonist(s) and their emotional stakes
3. Define the central conflict and antagonist force
4. Escalate tension through key plot points
5. Deliver a meaningful climax and resolution aligned with the theme

OUTPUT STRUCTURE
---------------
Provide the response in the following structured format:

1. Story Premise
   - One powerful paragraph summarizing the core idea

2. Characters
   - Name
   - Role in the story
   - Motivation
   - Internal conflict

3. Plot Outline
   - Act I: Setup
   - Act II: Rising Conflict
   - Act III: Climax & Resolution

4. Theme Integration
   - Explain how the theme is explored through characters and events

5. Emotional Tone & Takeaway
   - Describe the emotional journey of the audience

CREATIVE GUIDELINES
------------------
- Be vivid and cinematic
- Avoid clichés
- Show emotional depth rather than surface-level description
- Ensure the ending feels earned and satisfying

Generate an original, engaging, and imaginative story outline.
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
