"use client"

import { useState } from "react"
import { Tooltip } from "@mantine/core"

const navItems = [
  { id: "brand-kit", label: "Brand Kit", icon: "📁" },
  { id: "video", label: "Video", icon: "🎥", active: true },
  { id: "audio", label: "Audio", icon: "🔊" },
  { id: "subtitles", label: "Subtitles", icon: "💬" },
  { id: "text", label: "Text", icon: "T" },
  { id: "elements", label: "Elements", icon: "⚪" },
  { id: "settings", label: "Settings", icon: "⚙️" },
]

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("video")

  return (
    <div className="flex flex-col items-center py-2 h-full">
      {navItems.map((item) => (
        <Tooltip key={item.id} label={item.label} position="right" withArrow transitionProps={{ duration: 200 }}>
          <button
            className={`w-12 h-12 my-1 rounded-md flex items-center justify-center ${
              activeItem === item.id ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setActiveItem(item.id)}
          >
            <span className={`text-xl ${item.id === "text" ? "font-serif font-bold" : ""}`}>{item.icon}</span>
          </button>
        </Tooltip>
      ))}
    </div>
  )
}

