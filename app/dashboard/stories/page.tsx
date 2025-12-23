"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { BookOpen, Download, Trash2, Heart, Search } from "lucide-react"

interface Story {
  id: number
  genre: string
  theme: string
  characters: string
  plot: string
  createdAt: string
}

export default function StoriesPage() {
  const router = useRouter()
  const [stories, setStories] = useState<Story[]>([])
  const [filteredStories, setFilteredStories] = useState<Story[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGenre, setFilterGenre] = useState("")
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("user_stories") || "[]")
    setStories(saved)
    setFilteredStories(saved)

    const savedFavorites = JSON.parse(localStorage.getItem("favorite_stories") || "[]")
    setFavorites(savedFavorites)
  }, [])

  useEffect(() => {
    let filtered = stories

    if (searchTerm) {
      filtered = filtered.filter((s) => s.theme.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    if (filterGenre) {
      filtered = filtered.filter((s) => s.genre === filterGenre)
    }

    setFilteredStories(filtered)
  }, [searchTerm, filterGenre, stories])

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this story?")) {
      const updated = stories.filter((s) => s.id !== id)
      setStories(updated)
      localStorage.setItem("user_stories", JSON.stringify(updated))
    }
  }

  const handleToggleFavorite = (id: number) => {
    let updated
    if (favorites.includes(id)) {
      updated = favorites.filter((fav) => fav !== id)
    } else {
      updated = [...favorites, id]
    }
    setFavorites(updated)
    localStorage.setItem("favorite_stories", JSON.stringify(updated))
  }

  const handleExportAll = () => {
    const content = filteredStories
      .map((s) => `${s.genre.toUpperCase()} - ${s.theme}\n${"=".repeat(50)}\n${s.plot}\n`)
      .join("\n\n")

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "all-stories.txt"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const genres = Array.from(new Set(stories.map((s) => s.genre)))

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">My Stories</h1>
          </div>
          <p className="text-muted-foreground">
            {stories.length} {stories.length === 1 ? "story" : "stories"} created
          </p>
        </div>

        {/* Filters and search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:outline-none transition-colors"
            />
          </div>

          <select
            value={filterGenre}
            onChange={(e) => setFilterGenre(e.target.value)}
            className="px-4 py-3 rounded-lg bg-card border border-border focus:border-primary focus:outline-none transition-colors text-foreground"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>

          {filteredStories.length > 0 && (
            <button
              onClick={handleExportAll}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export All
            </button>
          )}
        </div>

        {/* Stories grid */}
        {filteredStories.length === 0 ? (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {stories.length === 0 ? "No stories yet" : "No stories match your filters"}
            </h3>
            <p className="text-muted-foreground mb-6">
              {stories.length === 0 ? "Create your first story to get started" : "Try adjusting your search or filters"}
            </p>
            {stories.length === 0 && (
              <button
                onClick={() => router.push("/dashboard/generate")}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:shadow-lg transition-all"
              >
                Create Story
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                className="glass dark:glass-dark rounded-xl p-6 hover-lift cursor-pointer transition-all group"
                onClick={() => router.push(`/dashboard/story/${story.id}`)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <span className="inline-block px-2 py-1 bg-primary/20 text-primary rounded text-xs font-medium mb-2">
                      {story.genre}
                    </span>
                    <h3 className="font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {story.theme}
                    </h3>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleToggleFavorite(story.id)
                    }}
                    className="p-2 rounded-lg transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${favorites.includes(story.id) ? "fill-destructive text-destructive" : "text-muted-foreground"}`}
                    />
                  </button>
                </div>

                {/* Content preview */}
                {story.plot && <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{story.plot}</p>}

                {/* Meta info */}
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pt-4 border-t border-border">
                  <span>{story.plot.split(/\s+/).filter((w) => w).length} words</span>
                  <span>{new Date(story.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => {
                      const content = `${story.genre.toUpperCase()} - ${story.theme}\n${"=".repeat(50)}\n${story.plot}`
                      const blob = new Blob([content], { type: "text/plain" })
                      const url = URL.createObjectURL(blob)
                      const link = document.createElement("a")
                      link.href = url
                      link.download = `story-${story.id}.txt`
                      link.click()
                      URL.revokeObjectURL(url)
                    }}
                    className="flex-1 px-3 py-2 bg-secondary text-foreground text-xs rounded-lg hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                  <button
                    onClick={() => handleDelete(story.id)}
                    className="px-3 py-2 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
