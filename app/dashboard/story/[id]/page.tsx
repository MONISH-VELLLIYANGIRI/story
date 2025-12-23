"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { StoryOutput } from "@/components/story-output"

export default function StoryPage() {
  const params = useParams()
  const router = useRouter()
  const [story, setStory] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const stories = JSON.parse(localStorage.getItem("user_stories") || "[]")
    const found = stories.find((s: any) => s.id === Number(params.id))
    if (found) {
      setStory(found)
    }
    setIsLoading(false)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading story...</p>
        </div>
      </div>
    )
  }

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Story not found</h1>
          <button
            onClick={() => router.push("/dashboard/stories")}
            className="text-primary hover:underline font-medium"
          >
            Back to stories
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-4xl mx-auto">
        <StoryOutput story={story} />
      </div>
    </div>
  )
}
