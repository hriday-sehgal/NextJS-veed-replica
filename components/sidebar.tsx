"use client"

import { useState } from "react"
import { useMediaContext } from "./media-provider"
import { Button, Text, Group, FileButton } from "@mantine/core"

export default function Sidebar() {
  const { addMedia, selectedMedia, updateMedia } = useMediaContext()
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile)
      const isVideo = selectedFile.type.startsWith("video/")

      addMedia({
        id: Date.now().toString(),
        type: isVideo ? "video" : "image",
        url,
        width: 320,
        height: 240,
        position: { x: 100, y: 100 },
        startTime: 0,
        endTime: isVideo ? 10 : 5,
        file: selectedFile,
      })

      setFile(selectedFile)
    }
  }

  const handleWidthChange = (value: string) => {
    if (selectedMedia) {
      updateMedia(selectedMedia.id, {
        ...selectedMedia,
        width: Number.parseInt(value) || 0,
      })
    }
  }

  const handleHeightChange = (value: string) => {
    if (selectedMedia) {
      updateMedia(selectedMedia.id, {
        ...selectedMedia,
        height: Number.parseInt(value) || 0,
      })
    }
  }

  const handleStartTimeChange = (value: string) => {
    if (selectedMedia) {
      updateMedia(selectedMedia.id, {
        ...selectedMedia,
        startTime: Number.parseFloat(value) || 0,
      })
    }
  }

  const handleEndTimeChange = (value: string) => {
    if (selectedMedia) {
      updateMedia(selectedMedia.id, {
        ...selectedMedia,
        endTime: Number.parseFloat(value) || 0,
      })
    }
  }

  return (
    <div className="w-72 border-r border-gray-200 bg-white">
      {!selectedMedia ? (
        <div className="p-4">
          <div className="border-b border-gray-200 pb-4">
            <Text size="lg" fw={600} className="mb-4">
              Add Media
            </Text>
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <Text fw={500} className="mb-1">
                Upload a File
              </Text>
              <Text size="xs" c="dimmed" className="mb-3 text-center">
                Drag & drop a file
                <br />
                or
              </Text>
              <FileButton onChange={handleFileChange} accept="image/*, video/*">
                {(props) => (
                  <Button {...props} variant="outline" color="blue" size="xs" className="text-blue-500 border-blue-500">
                    import from a link
                  </Button>
                )}
              </FileButton>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button
              variant="outline"
              className="flex items-center justify-center p-3 border border-gray-200 rounded-md"
              leftSection={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              }
            >
              Record
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center p-3 border border-gray-200 rounded-md relative"
              leftSection={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              }
            >
              Brand Kits
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                +
              </span>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button
              variant="outline"
              className="flex items-center justify-center p-3 border border-gray-200 rounded-md relative"
              leftSection={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              }
            >
              Text To Speech
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                +
              </span>
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center p-3 border border-gray-200 rounded-md relative"
              leftSection={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              }
            >
              Voice Clone
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1 rounded text-[10px]">
                NEW
              </span>
            </Button>
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-2">
              <Text fw={500}>AI Avatars</Text>
              <Button variant="subtle" size="xs" color="gray">
                View All
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative">
                  <div className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=80&width=80`}
                      alt={`Avatar ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-1 right-1 bg-blue-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-xs">
                    +
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <Text size="lg" fw={600} className="mb-4">
            Media Properties
          </Text>

          <div className="space-y-4">
            <div>
              <Text size="sm" fw={500} className="mb-1">
                Dimensions
              </Text>
              <Group grow>
                <div>
                  <Text size="xs" c="dimmed" mb={4}>
                    Width
                  </Text>
                  <input
                    type="number"
                    value={selectedMedia.width}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <Text size="xs" c="dimmed" mb={4}>
                    Height
                  </Text>
                  <input
                    type="number"
                    value={selectedMedia.height}
                    onChange={(e) => handleHeightChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </Group>
            </div>

            <div>
              <Text size="sm" fw={500} className="mb-1">
                Timeline
              </Text>
              <Group grow>
                <div>
                  <Text size="xs" c="dimmed" mb={4}>
                    Start Time (s)
                  </Text>
                  <input
                    type="number"
                    step="0.1"
                    value={selectedMedia.startTime}
                    onChange={(e) => handleStartTimeChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <Text size="xs" c="dimmed" mb={4}>
                    End Time (s)
                  </Text>
                  <input
                    type="number"
                    step="0.1"
                    value={selectedMedia.endTime}
                    onChange={(e) => handleEndTimeChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </Group>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

