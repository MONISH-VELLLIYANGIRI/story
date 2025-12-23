module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/api/generate-story/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/openai/client.mjs [app-route] (ecmascript) <export OpenAI as default>");
;
const client = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$openai$2f$client$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__OpenAI__as__default$3e$__["default"]({
    apiKey: "ollama",
    baseURL: "http://localhost:11434/v1"
});
const MODEL = "llama3.1:8b";
async function generateStory(systemPrompt, userPrompt) {
    const response = await client.chat.completions.create({
        model: MODEL,
        messages: [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user",
                content: userPrompt
            }
        ],
        temperature: 0.8,
        max_tokens: 800
    });
    const text = response.choices?.[0]?.message?.content;
    if (!text) {
        throw new Error("No text returned from Gemini model");
    }
    return text;
}
async function POST(request) {
    try {
        const { prompt, genre, characters } = await request.json();
        if (!prompt?.trim()) {
            return Response.json({
                error: "Story theme is required"
            }, {
                status: 400
            });
        }
        if (!genre?.trim()) {
            return Response.json({
                error: "Genre is required"
            }, {
                status: 400
            });
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
                generatedAt: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error("Story Generation Error:", error);
        return Response.json({
            error: error.message || "Failed to generate story"
        }, {
            status: 500
        });
    }
}
async function GET() {
    return Response.json({
        message: "Story Generator API (Gemini 2.5 Flash via OpenAI-compatible endpoint)",
        model: MODEL
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f6b295e3._.js.map