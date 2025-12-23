"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { StoryGeneratorForm } from "@/components/story-generator-form"
import { Wand2 } from "lucide-react"

export default function GeneratePage() {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async (data: { genre: string; theme: string; characters: string }) => {
    setIsGenerating(true)
    setError(null)
    try {
      console.log("[v0] Sending story generation request:", data)
      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: data.theme,
          genre: data.genre,
          characters: data.characters || undefined,
        }),
      })

      console.log("[v0] API response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
        console.log("[v0] API error response:", errorData)
        throw new Error(errorData.error || `API error: ${response.status}`)
      }

      const result = await response.json()
      console.log("[v0] Story generated successfully")

      // Save to localStorage and redirect
      const stories = JSON.parse(localStorage.getItem("user_stories") || "[]")
      const newStory = {
        id: Date.now(),
        ...data,
        plot: result.plot,
        createdAt: new Date().toISOString(),
      }
      stories.unshift(newStory)
      localStorage.setItem("user_stories", JSON.stringify(stories))

      router.push(`/dashboard/story/${newStory.id}`)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to generate story"
      console.error("[v0] Story generation error:", errorMessage)
      setError(errorMessage)
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Wand2 className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Create Your Story</h1>
          </div>
          <p className="text-muted-foreground">Use AI to generate unique, creative story plots</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400">
            <p className="font-semibold">Error generating story</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Generator form */}
        <StoryGeneratorForm onGenerate={handleGenerate} isLoading={isGenerating} />
      </div>
    </div>
  )
}
