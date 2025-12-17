"use client"

import { memo, useState, useEffect } from "react"
import { Handle, Position } from "reactflow"
import { ChevronDown, ChevronRight } from "lucide-react"

function CustomNode({ data }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(data.value?.toString() || "")
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (data.highlighted || data.visit !== undefined) {
      console.log(`[v0] Node ${data.label} - highlighted: ${data.highlighted}, visit: ${data.visit}`)
    }
  }, [data.highlighted, data.visit, data.label])

  const handleDoubleClick = (e) => {
    e.stopPropagation()
    if (data.value !== undefined) {
      setIsEditing(true)
      setEditValue(data.value.toString())
    }
  }

  const handleSave = () => {
    const newValue = Number.parseInt(editValue)
    if (!isNaN(newValue) && data.onEdit) {
      data.onEdit(newValue)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      setIsEditing(false)
      setEditValue(data.value?.toString() || "")
    }
  }

  const handleCollapseClick = (e) => {
    e.stopPropagation()
    if (data.onToggleCollapse) {
      data.onToggleCollapse()
    }
  }

  const handleAddChild = (e) => {
    e.stopPropagation()
    if (data.onAddChild) {
      data.onAddChild()
    }
  }

  const getNodeStyle = () => {
    if (data.unbalanced) return "bg-red-100 border-red-600 border-[3px] shadow-lg shadow-red-300"
    if (data.inPath) return "bg-green-100 border-green-600 border-[3px] shadow-lg shadow-green-300"
    if (data.highlighted) return "bg-blue-100 border-blue-600 border-[3px] shadow-lg shadow-blue-300"
    if (isHovered) return "bg-gray-100 border-gray-500 border-2 shadow-lg"
    return "bg-white border-gray-300"
  }

  const getTextStyle = () => {
    if (data.unbalanced) return "text-red-900"
    if (data.inPath) return "text-green-900"
    if (data.highlighted) return "text-blue-900"
    if (isHovered) return "text-gray-900"
    return "text-gray-900"
  }

  return (
    <div
      className={`px-5 py-3 rounded-xl border-2 shadow-md text-center min-w-[90px] transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer relative ${getNodeStyle()}`}
      onDoubleClick={handleDoubleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2" />

      {data.hasChildren && (
        <button
          onClick={handleCollapseClick}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border-2 border-gray-300 rounded-full p-1 hover:bg-gray-100 hover:border-gray-400 transition-colors shadow-md z-10"
          title={data.isCollapsed ? "Expand children" : "Collapse children"}
        >
          {data.isCollapsed ? (
            <ChevronRight className="w-3 h-3 text-gray-600" />
          ) : (
            <ChevronDown className="w-3 h-3 text-gray-600" />
          )}
        </button>
      )}

      {data.isLeaf && data.onAddChild && (
        <button
          onClick={handleAddChild}
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-green-500 border-2 border-green-600 text-white rounded-full p-1 hover:bg-green-600 hover:border-green-700 transition-colors shadow-md z-10 font-bold text-xs"
          title="Add child node"
        >
          +
        </button>
      )}

      <div className={`font-bold text-base ${getTextStyle()}`}>{data.label}</div>

      {data.value !== undefined && (
        <div className={`text-sm mt-1 ${getTextStyle()}`}>
          val:{" "}
          {isEditing ? (
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className="w-16 px-1 border border-blue-500 rounded text-center"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className="font-bold">{data.value}</span>
          )}
        </div>
      )}

      {data.visit !== undefined && (
        <div className="mt-1.5 px-2.5 py-1 bg-blue-600 text-white rounded-full text-xs font-bold inline-block shadow-md">
          Visit #{data.visit}
        </div>
      )}

      {data.isLeaf && <div className="text-[10px] text-gray-500 mt-1">leaf</div>}

      {data.unbalanced && (
        <div className="text-[10px] text-red-600 font-bold mt-1 bg-red-100 px-1.5 py-0.5 rounded">UNBALANCED</div>
      )}

      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />
    </div>
  )
}

export default memo(CustomNode)
