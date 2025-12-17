"use client"

import { useState, useEffect } from "react"
import { ReactFlowProvider } from "reactflow"
import TreeView from "./tree-view"
import SearchBar from "./search-bar"
import MetadataPanel from "./metadata-panel"
import ControlPanel from "./control-panel"
import { fetchTree } from "@/lib/tree-api"
import { dfsTraversal, bfsTraversal, findShortestPath, checkBalance, convertToMaxHeap } from "@/lib/tree-algorithms"

export default function TreeVisualizer() {
  const [tree, setTree] = useState(null)
  const [mode, setMode] = useState("normal")
  const [visitOrder, setVisitOrder] = useState(new Map())
  const [highlighted, setHighlighted] = useState(new Set())
  const [unbalanced, setUnbalanced] = useState(new Set())
  const [pathNodes, setPathNodes] = useState(new Set())
  const [selectedNode, setSelectedNode] = useState(null)
  const [pathStartNode, setPathStartNode] = useState(null)
  const [loading, setLoading] = useState(true)
  const [statusMessage, setStatusMessage] = useState("")
  const [collapsedNodes, setCollapsedNodes] = useState(new Set())
  const [shouldFitView, setShouldFitView] = useState(false)

  useEffect(() => {
    loadTree()
  }, [])

  async function loadTree() {
    setLoading(true)
    const data = await fetchTree()
    setTree(data)
    setLoading(false)
  }

  function runDFS() {
    if (!tree) return
    setMode("dfs")
    setHighlighted(new Set())
    setVisitOrder(new Map())
    setUnbalanced(new Set())
    setPathNodes(new Set())
    setStatusMessage("Running DFS traversal...")
    setShouldFitView(true)
    setTimeout(() => setShouldFitView(false), 1000)

    const { order, visitMap } = dfsTraversal(tree)
    setVisitOrder(visitMap)
    animateTraversal(order, "DFS")
  }

  function runBFS() {
    if (!tree) return
    setMode("bfs")
    setHighlighted(new Set())
    setVisitOrder(new Map())
    setUnbalanced(new Set())
    setPathNodes(new Set())
    setStatusMessage("Running BFS traversal...")
    setShouldFitView(true)
    setTimeout(() => setShouldFitView(false), 1000)

    const { order, visitMap } = bfsTraversal(tree)
    setVisitOrder(visitMap)
    animateTraversal(order, "BFS")
  }

  function animateTraversal(order, algorithmName) {
    setHighlighted(new Set())
    let index = 0

    const interval = setInterval(() => {
      if (index < order.length) {
        const nodeId = order[index]
        setHighlighted((prev) => new Set([...prev, nodeId]))
        setStatusMessage(`${algorithmName}: Visiting node ${index + 1} of ${order.length}`)
        index++
      } else {
        clearInterval(interval)
        setStatusMessage(`${algorithmName} traversal complete!`)
        setTimeout(() => setStatusMessage(""), 3000)
      }
    }, 600)
  }

  function handleSearch(nodeId) {
    setMode("normal")
    setHighlighted(new Set([nodeId]))
    setSelectedNode(nodeId)
    setVisitOrder(new Map())
    setUnbalanced(new Set())
    setPathNodes(new Set())
    setStatusMessage(`Found node: ${nodeId}`)
    setShouldFitView(true)
    setTimeout(() => {
      setShouldFitView(false)
      setStatusMessage("")
    }, 2000)
  }

  function handleNodeClick(nodeId) {
    if (mode === "path") {
      if (!pathStartNode) {
        setPathStartNode(nodeId)
        setHighlighted(new Set([nodeId]))
        setStatusMessage("Select second node for path...")
      } else if (pathStartNode !== nodeId && tree) {
        const path = findShortestPath(tree, pathStartNode, nodeId)
        setPathNodes(new Set(path))
        setStatusMessage(`Path found: ${path.length} nodes`)
        setTimeout(() => setStatusMessage(""), 3000)
        setPathStartNode(null)
      }
    } else {
      setSelectedNode(nodeId)
    }
  }

  function startPathMode() {
    setMode("path")
    setPathStartNode(null)
    setPathNodes(new Set())
    setHighlighted(new Set())
    setVisitOrder(new Map())
    setUnbalanced(new Set())
    setStatusMessage("Click two nodes to find path")
    setShouldFitView(true)
    setTimeout(() => setShouldFitView(false), 1000)
  }

  function checkTreeBalance() {
    if (!tree) return
    setMode("balance")

    const unbalancedNodes = checkBalance(tree)
    setUnbalanced(unbalancedNodes)
    setHighlighted(new Set())
    setVisitOrder(new Map())
    setPathNodes(new Set())
    setShouldFitView(true)
    setTimeout(() => setShouldFitView(false), 1000)

    if (unbalancedNodes.size === 0) {
      setStatusMessage("Tree is balanced!")
    } else {
      setStatusMessage(`Found ${unbalancedNodes.size} unbalanced node(s)`)
    }
    setTimeout(() => setStatusMessage(""), 3000)
  }

  function convertToHeap() {
    if (!tree) return
    setMode("heap")

    const heapTree = convertToMaxHeap(tree)
    setTree(heapTree)
    setHighlighted(new Set())
    setVisitOrder(new Map())
    setUnbalanced(new Set())
    setPathNodes(new Set())
    setStatusMessage("Converted to Max Heap!")
    setShouldFitView(true)
    setTimeout(() => {
      setShouldFitView(false)
      setStatusMessage("")
    }, 3000)
  }

  function reset() {
    setMode("normal")
    setHighlighted(new Set())
    setVisitOrder(new Map())
    setUnbalanced(new Set())
    setPathNodes(new Set())
    setPathStartNode(null)
    setStatusMessage("Resetting tree...")
    loadTree()
    setTimeout(() => setStatusMessage(""), 2000)
  }

  function updateNodeValue(nodeId, newValue) {
    if (!tree) return

    function updateNode(node) {
      if (node.id === nodeId) {
        return { ...node, value: newValue }
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(updateNode),
        }
      }
      return node
    }

    setTree(updateNode(tree))
    setStatusMessage(`Updated node value to ${newValue}`)
    setTimeout(() => setStatusMessage(""), 2000)
  }

  function toggleNodeCollapse(nodeId) {
    setCollapsedNodes((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId)
      } else {
        newSet.add(nodeId)
      }
      return newSet
    })
  }

  function addChildNode(parentId) {
    if (!tree) return

    // Generate new node ID
    const allIds = []
    function collectIds(node) {
      allIds.push(Number.parseInt(node.id))
      if (node.children) {
        node.children.forEach(collectIds)
      }
    }
    collectIds(tree)
    const newId = (Math.max(...allIds) + 1).toString()

    // Add new child node
    function addNode(node) {
      if (node.id === parentId) {
        const newChild = {
          id: newId,
          label: `N${newId}`,
          value: Math.floor(Math.random() * 100),
        }
        return {
          ...node,
          children: node.children ? [...node.children, newChild] : [newChild],
        }
      }
      if (node.children) {
        return {
          ...node,
          children: node.children.map(addNode),
        }
      }
      return node
    }

    setTree(addNode(tree))
    setStatusMessage(`Added new child node to ${parentId}`)
    setTimeout(() => setStatusMessage(""), 2000)
  }

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-lg">Loading tree...</div>
      </div>
    )
  }

  if (!tree) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-lg">No tree data available</div>
      </div>
    )
  }

  return (
    <ReactFlowProvider>
      <div className="h-screen flex flex-col">
        <SearchBar onSelect={handleSearch} />
        <ControlPanel
          mode={mode}
          onDFS={runDFS}
          onBFS={runBFS}
          onPath={startPathMode}
          onBalance={checkTreeBalance}
          onHeap={convertToHeap}
          onReset={reset}
          pathStartNode={pathStartNode}
        />
        {statusMessage && (
          <div className="bg-blue-50 border-b border-blue-200 px-4 py-3 text-sm text-blue-800 font-semibold text-center shadow-sm">
            {statusMessage}
          </div>
        )}
        <div className="flex-1 relative">
          <TreeView
            tree={tree}
            highlighted={highlighted}
            visitOrder={visitOrder}
            unbalanced={unbalanced}
            pathNodes={pathNodes}
            collapsedNodes={collapsedNodes}
            onNodeClick={handleNodeClick}
            onNodeEdit={updateNodeValue}
            onToggleCollapse={toggleNodeCollapse}
            onAddChild={addChildNode}
            shouldFitView={shouldFitView}
          />
          {selectedNode && <MetadataPanel nodeId={selectedNode} onClose={() => setSelectedNode(null)} />}
        </div>
      </div>
    </ReactFlowProvider>
  )
}
