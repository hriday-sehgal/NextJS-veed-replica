"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

interface MediaItem {
  id: string
  type: "image" | "video"
  url: string
  width: number
  height: number
  position: { x: number; y: number }
  startTime: number
  endTime: number
  file: File
}

interface MediaContextType {
  media: MediaItem[]
  addMedia: (item: MediaItem) => void
  removeMedia: (id: string) => void
  updateMedia: (id: string, item: MediaItem) => void
  selectedMedia: MediaItem | null
  selectMedia: (id: string) => void
  currentTime: number
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>
  isPlaying: boolean
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  duration: number
  setDuration: React.Dispatch<React.SetStateAction<number>>
}

const MediaContext = createContext<MediaContextType | undefined>(undefined)

export function useMediaContext() {
  const context = useContext(MediaContext)
  if (context === undefined) {
    throw new Error("useMediaContext must be used within a MediaProvider")
  }
  return context
}

interface MediaProviderProps {
  children: ReactNode
}

export default function MediaProvider({ children }: MediaProviderProps) {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(60) // Default duration in seconds

  const addMedia = (item: MediaItem) => {
    setMedia((prev) => [...prev, item])
    setSelectedMedia(item)
  }

  const removeMedia = (id: string) => {
    setMedia((prev) => prev.filter((item) => item.id !== id))
    if (selectedMedia?.id === id) {
      setSelectedMedia(null)
    }
  }

  const updateMedia = (id: string, updatedItem: MediaItem) => {
    setMedia((prev) => prev.map((item) => (item.id === id ? updatedItem : item)))
    if (selectedMedia?.id === id) {
      setSelectedMedia(updatedItem)
    }
  }

  const selectMedia = (id: string) => {
    const item = media.find((item) => item.id === id)
    setSelectedMedia(item || null)
  }

  return (
    <MediaContext.Provider
      value={{
        media,
        addMedia,
        removeMedia,
        updateMedia,
        selectedMedia,
        selectMedia,
        currentTime,
        setCurrentTime,
        isPlaying,
        setIsPlaying,
        duration,
        setDuration,
      }}
    >
      {children}
    </MediaContext.Provider>
  )
}

