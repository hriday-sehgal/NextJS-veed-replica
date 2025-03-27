"use client"

import { useEffect, useState, useRef } from "react"
import { useMediaContext } from "./media-provider"
import { Slider } from "@mantine/core"

export default function Timeline() {
  const { media, currentTime, setCurrentTime, isPlaying, setIsPlaying, duration, setDuration } = useMediaContext()
  const [formattedTime, setFormattedTime] = useState("00:00.0")
  const [formattedDuration, setFormattedDuration] = useState("00:00.0")
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Calculate max duration from all media items
    if (media.length > 0) {
      const maxEndTime = Math.max(...media.map((item) => item.endTime))
      setDuration(maxEndTime)
    }
  }, [media])

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 0.1
        })
      }, 100)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isPlaying, duration])

  useEffect(() => {
    // Format current time as MM:SS.S
    const minutes = Math.floor(currentTime / 60)
    const seconds = Math.floor(currentTime % 60)
    const tenths = Math.floor((currentTime % 1) * 10)
    setFormattedTime(`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${tenths}`)

    // Format duration as MM:SS.S
    const durationMinutes = Math.floor(duration / 60)
    const durationSeconds = Math.floor(duration % 60)
    const durationTenths = Math.floor((duration % 1) * 10)
    setFormattedDuration(
      `${durationMinutes.toString().padStart(2, "0")}:${durationSeconds.toString().padStart(2, "0")}.${durationTenths}`,
    )
  }, [currentTime, duration])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSliderChange = (value: number) => {
    setCurrentTime(value)
  }

  return (
    <div className="h-24 border-t border-gray-200 bg-white">
      <div className="flex items-center justify-between px-4 h-12 border-b border-gray-200">
        <div className="flex items-center">
          <button className="p-2 text-gray-600 hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
              />
            </svg>
          </button>
          <span className="text-sm text-gray-600">Split</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-1 text-gray-600 hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
          <button className="p-1 text-gray-600 hover:text-gray-900" onClick={handlePlayPause}>
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </button>
          <button className="p-1 text-gray-600 hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
          <div className="text-sm text-gray-600">
            {formattedTime} / {formattedDuration}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-1 text-gray-600 hover:text-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <Slider value={1} min={0.5} max={2} step={0.1} label={null} styles={{ root: { width: 100 } }} />
          <span className="text-sm font-medium">Fit</span>
        </div>
      </div>
      <div className="relative h-12 px-4 flex items-center">
        <Slider
          value={currentTime}
          onChange={handleSliderChange}
          min={0}
          max={duration || 60}
          step={0.1}
          label={null}
          styles={{ root: { flex: 1 } }}
        />
      </div>
    </div>
  )
}

