"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Trash2, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StoryHistoryProps {
  stories: any[]
  onSelectStory: (story: any) => void
  selectedId?: number
  onDeleteStory?: (id: number) => void
  onExportAll?: () => void
}

export function StoryHistory({ stories, onSelectStory, selectedId, onDeleteStory, onExportAll }: StoryHistoryProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    if (onDeleteStory && confirm("Are you sure you want to delete this story?")) {
      onDeleteStory(id)
    }
  }

  const handleExportStory = (e: React.MouseEvent, story: any) => {
    e.stopPropagation()
    const content = `
Story: ${story.prompt}
Genre: ${story.genre}
${story.characters ? `Characters: ${story.characters}` : ""}

${story.plot}
    `.trim()

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `story-${Date.now()}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="p-6 border border-border mt-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">Recent Stories</h3>
          <p className="text-xs text-muted-foreground mt-1">
            {stories.length} saved story{stories.length !== 1 ? "s" : ""}
          </p>
        </div>
        {stories.length > 0 && onExportAll && (
          <Button
            onClick={onExportAll}
            size="sm"
            variant="outline"
            className="border-border text-foreground hover:bg-secondary bg-transparent"
          >
            <Download className="w-3 h-3 mr-1" />
            Export All
          </Button>
        )}
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {stories.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground text-sm">
            <p>No stories generated yet</p>
            <p className="text-xs mt-1">Your stories will appear here</p>
          </div>
        ) : (
          stories.map((story) => (
            <div
              key={story.id}
              onMouseEnter={() => setHoveredId(story.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => onSelectStory(story)}
              className={`group p-3 rounded-lg transition-all border cursor-pointer ${
                selectedId === story.id ? "bg-primary/10 border-primary" : "bg-muted hover:bg-secondary border-border"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm line-clamp-2 text-foreground">{story.prompt}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-1 rounded bg-accent/20 text-accent font-medium">
                      {story.genre}
                    </span>
                    <span className="text-xs text-muted-foreground">{formatDate(story.createdAt)}</span>
                  </div>
                </div>
                {hoveredId === story.id && (
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={(e) => handleExportStory(e, story)}
                      className="p-1.5 hover:bg-primary/10 rounded transition-colors"
                      title="Export story"
                    >
                      <Download className="w-3.5 h-3.5 text-muted-foreground hover:text-accent" />
                    </button>
                    {onDeleteStory && (
                      <button
                        onClick={(e) => handleDelete(e, story.id)}
                        className="p-1.5 hover:bg-destructive/10 rounded transition-colors"
                        title="Delete story"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-muted-foreground hover:text-destructive" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {stories.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
          <p>Tip: Stories are stored in your browser. Export to save permanently.</p>
        </div>
      )}
    </Card>
  )
}
