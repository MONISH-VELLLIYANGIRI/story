"use client"

import type React from "react"

import { useState } from "react"
import { Sparkles, RotateCcw, Zap } from "lucide-react"

interface GenreOption {
  id: string
  label: string
  emoji: string
  description: string
}

const GENRES: GenreOption[] = [
  { id: "fantasy", label: "Fantasy", emoji: "🧙", description: "Magic and mythical worlds" },
  { id: "scifi", label: "Sci-Fi", emoji: "🚀", description: "Futuristic technology" },
  { id: "romance", label: "Romance", emoji: "💕", description: "Love and relationships" },
  { id: "horror", label: "Horror", emoji: "👻", description: "Scary encounters" },
  { id: "thriller", label: "Thriller", emoji: "🔪", description: "Suspense and mystery" },
  { id: "adventure", label: "Adventure", emoji: "🗺️", description: "Epic journeys" },
  { id: "comedy", label: "Comedy", emoji: "😂", description: "Humor and laughs" },
  { id: "drama", label: "Drama", emoji: "🎭", description: "Emotional stories" },
]

const TEMPLATES = [
  { label: "Hero's Journey", value: "A young hero discovers their destiny and must overcome great challenges" },
  { label: "Lost Love", value: "Two people separated by fate must find their way back to each other" },
  {
    label: "Mystery",
    value: "An detective must solve a baffling case that challenges everything they believe",
  },
  { label: "Revenge", value: "A character seeks justice against those who wronged them" },
]

interface StoryGeneratorFormProps {
  onGenerate: (data: { genre: string; theme: string; characters: string }) => Promise<void>
  isLoading: boolean
}

export function StoryGeneratorForm({ onGenerate, isLoading }: StoryGeneratorFormProps) {
  const [selectedGenre, setSelectedGenre] = useState("")
  const [theme, setTheme] = useState("")
  const [characters, setCharacters] = useState("")
  const [hoveredGenre, setHoveredGenre] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedGenre && theme) {
      await onGenerate({ genre: selectedGenre, theme, characters })
    }
  }

  const handleSurpriseMe = () => {
    const randomGenre = GENRES[Math.floor(Math.random() * GENRES.length)]
    const randomTemplate = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)]
    setSelectedGenre(randomGenre.id)
    setTheme(randomTemplate.value)
    setCharacters("")
  }

  const handleReset = () => {
    setSelectedGenre("")
    setTheme("")
    setCharacters("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Genre Selection */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Choose a Genre</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {GENRES.map((genre) => (
            <button
              key={genre.id}
              type="button"
              onClick={() => setSelectedGenre(genre.id)}
              onMouseEnter={() => setHoveredGenre(genre.id)}
              onMouseLeave={() => setHoveredGenre("")}
              className={`relative p-4 rounded-2xl transition-all duration-300 hover-lift ${
                selectedGenre === genre.id
                  ? "bg-gradient-to-br from-primary to-accent text-white shadow-lg scale-105"
                  : "glass dark:glass-dark text-foreground hover:border-primary"
              }`}
            >
              <div className="text-4xl mb-2">{genre.emoji}</div>
              <div className="font-semibold text-sm">{genre.label}</div>
              {hoveredGenre === genre.id && !selectedGenre && (
                <div className="absolute inset-0 rounded-2xl border-2 border-primary/50 animate-pulse" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Theme/Prompt */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">Story Theme or Prompt</label>
        <textarea
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="Describe the theme or core concept of your story..."
          className="w-full px-4 py-4 rounded-xl bg-card border border-border focus:border-primary focus:outline-none transition-colors resize-none"
          rows={4}
        />
        <p className="text-xs text-muted-foreground mt-2">
          {theme.length}/500 characters | {theme.split(" ").filter((w) => w).length} words
        </p>

        {/* Quick templates */}
        {!theme && (
          <>
            <p className="text-sm text-muted-foreground mt-4 mb-2">Or try a template:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {TEMPLATES.map((template) => (
                <button
                  key={template.label}
                  type="button"
                  onClick={() => setTheme(template.value)}
                  className="p-3 text-left rounded-lg bg-secondary border border-border hover:border-primary transition-colors text-sm"
                >
                  <div className="font-medium text-foreground">{template.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{template.value}</div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Characters (Optional) */}
      <div>
        <label className="block text-sm font-semibold text-foreground mb-3">Characters (Optional)</label>
        <input
          type="text"
          value={characters}
          onChange={(e) => setCharacters(e.target.value)}
          placeholder="e.g., A brave knight, A mysterious sorceress, A loyal companion"
          className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:outline-none transition-colors"
        />
        <p className="text-xs text-muted-foreground mt-2">Separate multiple characters with commas</p>
      </div>

      {/* AI Sparkle Animation */}
      <div className="flex items-center justify-center gap-2 py-6">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary/50" />
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="w-4 h-4 animate-sparkle" />
          <span className="text-sm font-medium">Powered by AI</span>
        </div>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary/50" />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          disabled={!selectedGenre || !theme || isLoading}
          className="flex-1 px-6 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
        >
          <Sparkles className="w-5 h-5 group-hover:animate-spin" />
          {isLoading ? "Generating Story..." : "Generate Story"}
        </button>

        <button
          type="button"
          onClick={handleSurpriseMe}
          disabled={isLoading}
          className="px-6 py-4 bg-card border border-border text-foreground font-semibold rounded-xl hover:bg-secondary transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5" />
          Surprise Me
        </button>

        <button
          type="button"
          onClick={handleReset}
          disabled={isLoading}
          className="px-6 py-4 bg-card border border-border text-foreground font-semibold rounded-xl hover:bg-secondary transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </button>
      </div>
    </form>
  )
}
