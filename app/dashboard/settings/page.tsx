"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Settings, Bell, Moon, Lock, HelpCircle } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-8 h-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Settings</h1>
          </div>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Account section */}
        <div className="glass dark:glass-dark rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Account</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-medium text-foreground">{user?.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences section */}
        <div className="glass dark:glass-dark rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Preferences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive story generation updates</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full transition-colors ${notifications ? "bg-primary" : "bg-muted"}`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    notifications ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Use dark theme by default</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full transition-colors ${darkMode ? "bg-primary" : "bg-muted"}`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    darkMode ? "translate-x-6" : "translate-x-0.5"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Security section */}
        <div className="glass dark:glass-dark rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Security</h2>
          <button className="w-full flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
            <Lock className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1 text-left">
              <p className="font-medium text-foreground">Change Password</p>
              <p className="text-sm text-muted-foreground">Update your password regularly</p>
            </div>
          </button>
        </div>

        {/* Help section */}
        <div className="glass dark:glass-dark rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Help & Support</h2>
          <button className="w-full flex items-center gap-3 p-4 bg-background/50 rounded-lg hover:bg-background/70 transition-colors">
            <HelpCircle className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1 text-left">
              <p className="font-medium text-foreground">Documentation</p>
              <p className="text-sm text-muted-foreground">Learn how to use StoryAI</p>
            </div>
          </button>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full px-6 py-4 bg-destructive text-white font-semibold rounded-lg hover:bg-destructive/90 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
