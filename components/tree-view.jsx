"use client"

import { useMemo, useRef, useEffect } from "react"
import ReactFlow, { Background, Controls, useReactFlow } from "reactflow"
import "reactflow/dist/style.css"
import CustomNode from "./custom-node"

const nodeTypes = { custom: CustomNode }

function computeWidthMap(node, map) {
  if (!node.children || node.children.length === 0) {
    map.set(node.id, 1)
    return 1
  }

  const width = node.children.reduce((sum, child) => sum + computeWidthMap(child, map), 0)
  map.set(node.id, width)
  return width
}

function buildReactFlowTree(
  node,
  x,
  y,
  nodes,
  edges,
  highlighted,
  visitOrder,
  unbalanced,
  pathNodes,
  widthMap,
  collapsedNodes,
  onNodeEdit,
  onToggleCollapse,
  onAddChild,
) {
  const width = widthMap.get(node.id) || 1
  const isLeaf = !node.children || node.children.length === 0
  const hasChildren = !isLeaf
  const isCollapsed = collapsedNodes.has(node.id)

  nodes.push({
    id: node.id,
    type: "custom",
    position: { x, y },
    data: {
      label: node.label,
      value: node.value,
      isLeaf,
      hasChildren,
      isCollapsed,
      highlighted: highlighted.has(node.id),
      visit: visitOrder.get(node.id),
      unbalanced: unbalanced.has(node.id),
      inPath: pathNodes.has(node.id),
      onEdit: onNodeEdit ? (newValue) => onNodeEdit(node.id, newValue) : undefined,
      onToggleCollapse: onToggleCollapse ? () => onToggleCollapse(node.id) : undefined,
      onAddChild: onAddChild && isLeaf ? () => onAddChild(node.id) : undefined,
    },
  })

  if (!node.children || node.children.length === 0 || isCollapsed) return

  const gapY = 140
  const gapX = 180

  let startX = x - ((width - 1) * gapX) / 2

  for (const child of node.children) {
    const childWidth = widthMap.get(child.id) || 1
    const cx = startX + ((childWidth - 1) * gapX) / 2

    edges.push({
      id: `${node.id}-${child.id}`,
      source: node.id,
      target: child.id,
      style: pathNodes.has(node.id) && pathNodes.has(child.id) ? { stroke: "#10b981", strokeWidth: 3 } : undefined,
    })

    buildReactFlowTree(
      child,
      cx,
      y + gapY,
      nodes,
      edges,
      highlighted,
      visitOrder,
      unbalanced,
      pathNodes,
      widthMap,
      collapsedNodes,
      onNodeEdit,
      onToggleCollapse,
      onAddChild,
    )
    startX += childWidth * gapX
  }
}

function TreeViewInner({
  tree,
  highlighted,
  visitOrder,
  unbalanced,
  pathNodes,
  collapsedNodes,
  onNodeClick,
  onNodeEdit,
  onToggleCollapse,
  onAddChild,
  shouldFitView,
}) {
  const reactFlowInstance = useReactFlow()
  const prevHighlightedRef = useRef(new Set())

  const { nodes, edges } = useMemo(() => {
    const widthMap = new Map()
    computeWidthMap(tree, widthMap)

    const n = []
    const e = []
    buildReactFlowTree(
      tree,
      0,
      0,
      n,
      e,
      highlighted,
      visitOrder,
      unbalanced,
      pathNodes,
      widthMap,
      collapsedNodes,
      onNodeEdit,
      onToggleCollapse,
      onAddChild,
    )
    return { nodes: n, edges: e }
  }, [tree, highlighted, visitOrder, unbalanced, pathNodes, collapsedNodes, onNodeEdit, onToggleCollapse, onAddChild])

  useEffect(() => {
    if (shouldFitView || highlighted.size !== prevHighlightedRef.current.size) {
      setTimeout(() => {
        reactFlowInstance.fitView({
          padding: 0.2,
          duration: 800,
          maxZoom: 1.5,
        })
      }, 100)
      prevHighlightedRef.current = new Set(highlighted)
    }
  }, [highlighted, shouldFitView, reactFlowInstance])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      onNodeClick={(_, node) => onNodeClick(node.id)}
      minZoom={0.1}
      maxZoom={2}
    >
      <Background />
      <Controls />
    </ReactFlow>
  )
}

export default function TreeView(props) {
  return <TreeViewInner {...props} />
}
