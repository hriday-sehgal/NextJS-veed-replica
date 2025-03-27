"use client"

import { useRouter } from "next/navigation"
import { AppShell } from "@mantine/core"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import Canvas from "@/components/canvas"
import Timeline from "@/components/timeline"
import MediaProvider from "@/components/media-provider"

export default function Home() {
  const router = useRouter()

  return (
    <MediaProvider>
      <AppShell
        padding={0}
        navbar={{ width: 70, breakpoint: "sm" }}
        header={{ height: 60 }}
        styles={{
          main: {
            backgroundColor: "#f8f9fa",
          },
        }}
      >
        <AppShell.Header className="flex items-center px-4 border-b border-gray-200">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center mr-4">
                <span className="text-white font-bold">V</span>
              </div>
              <span className="text-gray-700 font-medium">Project Name</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <span className="text-sm text-gray-600">Save your project for later —</span>
                <button className="text-blue-500 text-sm ml-1">sign up</button>
                <span className="text-sm text-gray-600 mx-1">or</span>
                <button className="text-blue-500 text-sm">log in</button>
              </div>
              <button className="bg-orange-500 text-white px-4 py-1.5 rounded-md text-sm font-medium">Upgrade</button>
              <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Done
              </button>
            </div>
          </div>
        </AppShell.Header>
        <AppShell.Navbar p={0} className="border-r border-gray-200">
          <Navbar />
        </AppShell.Navbar>
        <AppShell.Main>
          <div className="flex h-full">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Canvas />
              <Timeline />
            </div>
          </div>
        </AppShell.Main>
      </AppShell>
    </MediaProvider>
  )
}

