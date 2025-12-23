"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Sparkles, ArrowRight } from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  const handleStartGenerating = () => {
    router.push("/dashboard/generate")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Banner */}
      <div className="relative overflow-hidden pt-8 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary animate-sparkle" />
            <span className="text-sm font-medium text-primary">Welcome to StoryAI</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Unleash Your Imagination
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create unique, engaging stories powered by AI. Perfect for writers, game developers, and filmmakers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleStartGenerating}
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              Start Generating <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => router.push("/dashboard/stories")}
              className="px-8 py-4 bg-card border border-border text-foreground font-semibold rounded-lg hover:bg-secondary transition-colors"
            >
              View My Stories
            </button>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          {[
            { label: "Stories Generated", value: "0", icon: "📚" },
            { label: "Total Characters", value: "0", icon: "✍️" },
            { label: "Favorite Genres", value: "All", icon: "🎭" },
          ].map((stat) => (
            <div key={stat.label} className="glass dark:glass-dark rounded-xl p-6 text-center hover-lift">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick tips */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pb-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Quick Tips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: "Be Specific", desc: "Include details about genre, characters, and themes for better results" },
            { title: "Iterate & Refine", desc: "Edit and regenerate stories to fine-tune your perfect plot" },
            { title: "Export Your Work", desc: "Download stories as text files or JSON for use in other projects" },
            { title: "Save Favorites", desc: "Keep all your stories organized in your personal history" },
          ].map((tip) => (
            <div
              key={tip.title}
              className="bg-card border border-border rounded-lg p-4 hover:border-primary transition-colors"
            >
              <h3 className="font-semibold text-foreground mb-2">{tip.title}</h3>
              <p className="text-sm text-muted-foreground">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
