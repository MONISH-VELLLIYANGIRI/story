"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Sparkles, Loader2, RotateCcw, Info } from "lucide-react"

const GENRES = [
  { id: "fantasy", label: "Fantasy", icon: "⚔️" },
  { id: "scifi", label: "Sci-Fi", icon: "🚀" },
  { id: "mystery", label: "Mystery", icon: "🔍" },
  { id: "romance", label: "Romance", icon: "💕" },
  { id: "thriller", label: "Thriller", icon: "⚡" },
  { id: "adventure", label: "Adventure", icon: "🗺️" },
  { id: "horror", label: "Horror", icon: "👻" },
  { id: "comedy", label: "Comedy", icon: "😄" },
]

const TEMPLATES = [
  {
    name: "Classic Hero's Journey",
    prompt: "An unlikely hero discovers they have special powers and must save their world",
    characters: "Hero with hidden powers, Wise mentor, Dark enemy",
  },
  {
    name: "Love Against Odds",
    prompt: "Two people from rival families fall in love and must overcome obstacles",
    characters: "Star-crossed lovers, Protective family members",
  },
  {
    name: "Mystery to Solve",
    prompt: "A detective must solve a complex case that challenges everything they believe",
    characters: "Detective protagonist, Suspicious witnesses, Hidden villain",
  },
  {
    name: "Space Exploration",
    prompt: "A crew of astronauts discovers something extraordinary beyond their expectations",
    characters: "Captain, Science officer, Mysterious alien entity",
  },
]

interface StoryGeneratorProps {
  onGenerate: (prompt: string, genre: string, characters: string) => void
  isLoading: boolean
}

export function StoryGenerator({ onGenerate, isLoading }: StoryGeneratorProps) {
  const [genre, setGenre] = useState("fantasy")
  const [characters, setCharacters] = useState("")
  const [prompt, setPrompt] = useState("")
  const [showTemplates, setShowTemplates] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (prompt.trim()) {
      const selectedGenre = GENRES.find((g) => g.id === genre)?.label || genre
      onGenerate(prompt, selectedGenre, characters)
      setPrompt("")
      setCharacters("")
    }
  }

  const handleReset = () => {
    setPrompt("")
    setCharacters("")
    setGenre("fantasy")
    setShowTemplates(false)
  }

  const applyTemplate = (template: any) => {
    setPrompt(template.prompt)
    setCharacters(template.characters)
    setShowTemplates(false)
  }

  return (
    <Card className="p-6 border border-border sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          Generate Story
        </h2>
        <button
          onClick={handleReset}
          className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
          title="Reset form"
        >
          <RotateCcw className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Genre Selection */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">Genre</label>
          <div className="grid grid-cols-4 gap-2">
            {GENRES.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setGenre(g.id)}
                className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                  genre === g.id
                    ? "bg-accent text-accent-foreground shadow-lg"
                    : "bg-secondary text-foreground hover:bg-muted"
                }`}
              >
                <div className="text-lg mb-1">{g.icon}</div>
                <div className="truncate">{g.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Characters Input */}
        <div>
          <label htmlFor="characters" className="block text-sm font-semibold text-foreground mb-2">
            Main Characters (Optional)
          </label>
          <Input
            id="characters"
            placeholder="e.g., A brave knight, A mysterious wizard, A dragon"
            value={characters}
            onChange={(e) => setCharacters(e.target.value)}
            className="bg-input border-border text-foreground placeholder-muted-foreground"
          />
          <p className="text-xs text-muted-foreground mt-1">Describe the key characters for your story</p>
        </div>

        {/* Story Prompt */}
        <div>
          <label htmlFor="prompt" className="block text-sm font-semibold text-foreground mb-2">
            Story Theme
          </label>
          <textarea
            id="prompt"
            placeholder="Describe what your story should be about..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={5}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">{prompt.length}/500 characters</p>
        </div>

        {/* Template Suggestion Button */}
        <button
          type="button"
          onClick={() => setShowTemplates(!showTemplates)}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-sm text-accent hover:text-accent bg-transparent border border-accent/30 rounded-lg transition-colors"
        >
          <Info className="w-4 h-4" />
          {showTemplates ? "Hide" : "Show"} Story Templates
        </button>

        {/* Templates */}
        {showTemplates && (
          <div className="space-y-2 p-3 bg-secondary/30 rounded-lg border border-border">
            {TEMPLATES.map((template, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyTemplate(template)}
                className="w-full text-left p-3 rounded-lg bg-card hover:bg-primary/10 border border-border transition-colors"
              >
                <p className="font-semibold text-sm text-foreground">{template.name}</p>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{template.prompt}</p>
              </button>
            ))}
          </div>
        )}

        {/* Generate Button */}
        <Button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-semibold shadow-lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Story
            </>
          )}
        </Button>
      </form>
    </Card>
  )
}
