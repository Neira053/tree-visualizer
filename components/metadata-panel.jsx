"use client"

import { useEffect, useState } from "react"
import { fetchNode } from "@/lib/tree-api"
import { X } from "lucide-react"

export default function MetadataPanel({ nodeId, onClose }) {
  const [node, setNode] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadNode() {
      setLoading(true)
      const data = await fetchNode(nodeId)
      setNode(data)
      setLoading(false)
    }
    loadNode()
  }, [nodeId])

  if (loading) {
    return (
      <div className="fixed top-20 right-6 w-80 bg-white border border-gray-200 rounded-lg shadow-xl p-6">
        <div className="text-sm text-gray-500">Loading...</div>
      </div>
    )
  }

  if (!node) return null

  return (
    <div className="fixed top-20 right-6 w-80 bg-white border border-gray-200 rounded-lg shadow-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Node Information</h2>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded transition-colors">
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase mb-1">ID</div>
          <div className="text-sm font-mono bg-gray-50 px-2 py-1 rounded">{node.id}</div>
        </div>

        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Label</div>
          <div className="text-sm font-medium">{node.label}</div>
        </div>

        {node.value !== undefined && (
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Value</div>
            <div className="text-sm font-medium">{node.value}</div>
          </div>
        )}

        <div>
          <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Type</div>
          <div className="text-sm">{!node.children || node.children.length === 0 ? "Leaf Node" : "Internal Node"}</div>
        </div>

        {node.children && node.children.length > 0 && (
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Children</div>
            <div className="text-sm">{node.children.length} child node(s)</div>
          </div>
        )}

        {node.metadata && (
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Metadata</div>
            <pre className="text-xs bg-gray-50 p-3 rounded overflow-auto max-h-40 border border-gray-200">
              {JSON.stringify(node.metadata, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
