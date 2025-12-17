"use client"

import { Play, GitBranch, Route, Scale, Binary, RotateCcw } from "lucide-react"

export default function ControlPanel({ mode, onDFS, onBFS, onPath, onBalance, onHeap, onReset, pathStartNode }) {
  return (
    <div className="bg-white border-b shadow-sm px-6 py-4">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">Algorithms:</span>
          <button
            onClick={onDFS}
            disabled={mode === "dfs"}
            className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Play className="w-4 h-4" />
            DFS
          </button>
          <button
            onClick={onBFS}
            disabled={mode === "bfs"}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <GitBranch className="w-4 h-4" />
            BFS
          </button>
        </div>

        <div className="w-px h-8 bg-gray-300" />

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-700">Operations:</span>
          <button
            onClick={onPath}
            disabled={mode === "path"}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Route className="w-4 h-4" />
            {pathStartNode ? "Select End Node" : "Shortest Path"}
          </button>
          <button
            onClick={onBalance}
            disabled={mode === "balance"}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Scale className="w-4 h-4" />
            Balance Check
          </button>
          <button
            onClick={onHeap}
            disabled={mode === "heap"}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <Binary className="w-4 h-4" />
            To Max Heap
          </button>
        </div>

        <div className="w-px h-8 bg-gray-300" />

        <button
          onClick={onReset}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  )
}
