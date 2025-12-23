"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Copy, Download, Edit2, RotateCcw, Share2, Heart } from "lucide-react"

interface Story {
  id: number
  genre: string
  theme: string
  characters: string
  plot: string
  createdAt: string
}

interface StoryOutputProps {
  story: Story
}

export function StoryOutput({ story }: StoryOutputProps) {
  const router = useRouter()
  const [isRevealed, setIsRevealed] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [editedPlot, setEditedPlot] = useState(story.plot)

  useEffect(() => {
    setIsRevealed(true)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText(editedPlot)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const handleExport = () => {
    const content = `
${story.genre.toUpperCase()} - ${story.theme}
${"=".repeat(50)}
${story.characters ? `Characters: ${story.characters}\n` : ""}
${editedPlot}
    `.trim()

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `story-${story.id}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleSaveEdit = () => {
    const stories = JSON.parse(localStorage.getItem("user_stories") || "[]")
    const updated = stories.map((s: any) => (s.id === story.id ? { ...s, plot: editedPlot } : s))
    localStorage.setItem("user_stories", JSON.stringify(updated))
    setShowEdit(false)
  }

  const wordCount = editedPlot.split(/\s+/).filter((w) => w).length
  const createdDate = new Date(story.createdAt).toLocaleDateString()

  return (
    <div className="space-y-6 animate-reveal">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                {story.genre}
              </span>
              <span className="text-sm text-muted-foreground">{createdDate}</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">{story.theme}</h1>
          </div>
          <button
            onClick={() => setIsFavorited(!isFavorited)}
            className={`p-2 rounded-lg transition-colors ${
              isFavorited
                ? "bg-destructive/20 text-destructive"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <Heart className={`w-6 h-6 ${isFavorited ? "fill-current" : ""}`} />
          </button>
        </div>

        {story.characters && (
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">Characters:</span> {story.characters}
          </p>
        )}
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap gap-4 p-4 bg-card border border-border rounded-xl">
        <div>
          <p className="text-xs text-muted-foreground">Word Count</p>
          <p className="text-lg font-semibold text-foreground">{wordCount}</p>
        </div>
        <div className="border-l border-border" />
        <div>
          <p className="text-xs text-muted-foreground">Genre</p>
          <p className="text-lg font-semibold text-primary capitalize">{story.genre}</p>
        </div>
        <div className="border-l border-border" />
        <div>
          <p className="text-xs text-muted-foreground">Created</p>
          <p className="text-lg font-semibold text-foreground">{createdDate}</p>
        </div>
      </div>

      {/* Story content */}
      {showEdit ? (
        <div className="space-y-4">
          <textarea
            value={editedPlot}
            onChange={(e) => setEditedPlot(e.target.value)}
            className="w-full px-4 py-6 rounded-xl bg-card border border-border focus:border-primary focus:outline-none transition-colors resize-none text-foreground leading-relaxed"
            rows={12}
          />
          <div className="flex gap-3">
            <button
              onClick={handleSaveEdit}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Save Changes
            </button>
            <button
              onClick={() => setShowEdit(false)}
              className="flex-1 px-4 py-3 bg-card border border-border text-foreground font-semibold rounded-lg hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div
            className={`p-8 bg-gradient-to-br from-card to-card/50 border border-border rounded-2xl shadow-lg transition-all duration-500 ${
              isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            } animate-typing`}
          >
            <p className="text-foreground leading-relaxed text-lg whitespace-pre-wrap">{editedPlot}</p>
          </div>
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-3 bg-card border border-border text-foreground rounded-lg hover:bg-secondary transition-colors"
        >
          <Copy className="w-4 h-4" />
          {isCopied ? "Copied!" : "Copy"}
        </button>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-3 bg-card border border-border text-foreground rounded-lg hover:bg-secondary transition-colors"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
        <button
          onClick={() => setShowEdit(!showEdit)}
          className="flex items-center gap-2 px-4 py-3 bg-card border border-border text-foreground rounded-lg hover:bg-secondary transition-colors"
        >
          <Edit2 className="w-4 h-4" />
          {showEdit ? "Preview" : "Edit"}
        </button>
        <button
          onClick={() => router.push("/dashboard/generate")}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg hover:shadow-lg transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          Generate Another
        </button>
        <button className="flex items-center gap-2 px-4 py-3 bg-card border border-border text-foreground rounded-lg hover:bg-secondary transition-colors ml-auto">
          <Share2 className="w-4 h-4" />
          Share
        </button>
      </div>
    </div>
  )
}
