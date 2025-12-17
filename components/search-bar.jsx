"use client"

import { useState } from "react"
import { searchNodes } from "@/lib/tree-api"
import { Search } from "lucide-react"

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("")
  const [searching, setSearching] = useState(false)

  async function handleSearch() {
    if (!query.trim()) return

    setSearching(true)
    const results = await searchNodes(query)
    setSearching(false)

    if (results.length > 0) {
      onSelect(results[0].id)
    } else {
      alert("Node not found")
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="bg-white border-b shadow-sm px-6 py-3 flex items-center gap-3">
      <Search className="w-5 h-5 text-gray-400" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search by node label or value..."
        disabled={searching}
      />
      <button
        onClick={handleSearch}
        disabled={searching}
        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
      >
        {searching ? "Searching..." : "Search"}
      </button>
    </div>
  )
}
