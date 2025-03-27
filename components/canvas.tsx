"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { useMediaContext } from "./media-provider"
import { Resizable } from "re-resizable"

export default function Canvas() {
  const { media, selectedMedia, selectMedia, updateMedia, currentTime, isPlaying } = useMediaContext()
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleSelectMedia = (id: string) => {
    selectMedia(id)
  }

  const handleDragEnd = (id: string, position: { x: number; y: number }) => {
    const mediaItem = media.find((item) => item.id === id)
    if (mediaItem) {
      updateMedia(id, {
        ...mediaItem,
        position,
      })
    }
  }

  const handleResize = (id: string, size: { width: number; height: number }) => {
    const mediaItem = media.find((item) => item.id === id)
    if (mediaItem) {
      updateMedia(id, {
        ...mediaItem,
        width: size.width,
        height: size.height,
      })
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4 bg-gray-100">
      <div ref={canvasRef} className="relative bg-black w-full max-w-4xl aspect-video">
        {media.map((item) => (
          <MediaItem
            key={item.id}
            item={item}
            isSelected={selectedMedia?.id === item.id}
            onSelect={() => handleSelectMedia(item.id)}
            onDragEnd={handleDragEnd}
            onResize={handleResize}
            isVisible={currentTime >= item.startTime && currentTime <= item.endTime}
          />
        ))}
      </div>
    </div>
  )
}

interface MediaItemProps {
  item: any
  isSelected: boolean
  onSelect: () => void
  onDragEnd: (id: string, position: { x: number; y: number }) => void
  onResize: (id: string, size: { width: number; height: number }) => void
  isVisible: boolean
}

function MediaItem({ item, isSelected, onSelect, onDragEnd, onResize, isVisible }: MediaItemProps) {
  const [position, setPosition] = useState(item.position)
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setPosition(item.position)
  }, [item.position])

  const handleMouseDown = (e: React.MouseEvent) => {
    onSelect()
    setIsDragging(true)
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const newPosition = {
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y,
      }
      setPosition(newPosition)
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
      onDragEnd(item.id, position)
    }
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, startPos])

  if (!isVisible) return null

  return (
    <Resizable
      size={{ width: item.width, height: item.height }}
      onResizeStop={(e, direction, ref, d) => {
        onResize(item.id, {
          width: item.width + d.width,
          height: item.height + d.height,
        })
      }}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: isSelected ? 10 : 1,
      }}
      handleStyles={{
        topRight: { cursor: "ne-resize" },
        bottomRight: { cursor: "se-resize" },
        bottomLeft: { cursor: "sw-resize" },
        topLeft: { cursor: "nw-resize" },
      }}
      handleClasses={{
        topRight: "w-3 h-3 bg-white border border-gray-400 rounded-full",
        bottomRight: "w-3 h-3 bg-white border border-gray-400 rounded-full",
        bottomLeft: "w-3 h-3 bg-white border border-gray-400 rounded-full",
        topLeft: "w-3 h-3 bg-white border border-gray-400 rounded-full",
      }}
    >
      <div
        className={`h-full w-full cursor-move ${isSelected ? "ring-2 ring-blue-500" : ""}`}
        onMouseDown={handleMouseDown}
      >
        {item.type === "video" ? (
          <video src={item.url} className="w-full h-full object-cover" controls={false} />
        ) : (
          <img src={item.url || "/placeholder.svg"} alt="Media" className="w-full h-full object-cover" />
        )}
      </div>
    </Resizable>
  )
}

