// DFS Traversal (Preorder: Root -> Left -> Right)
export function dfsTraversal(root) {
  const order = []
  const visitMap = new Map()
  let visitNumber = 1

  function dfs(node) {
    order.push(node.id)
    visitMap.set(node.id, visitNumber++)

    if (node.children) {
      for (const child of node.children) {
        dfs(child)
      }
    }
  }

  dfs(root)
  return { order, visitMap }
}

// BFS Traversal (Level Order)
export function bfsTraversal(root) {
  const order = []
  const visitMap = new Map()
  const queue = [root]
  let visitNumber = 1

  while (queue.length > 0) {
    const node = queue.shift()
    order.push(node.id)
    visitMap.set(node.id, visitNumber++)

    if (node.children) {
      queue.push(...node.children)
    }
  }

  return { order, visitMap }
}

// Find Shortest Path between two nodes using tree structure (via LCA)
export function findShortestPath(root, startId, endId) {
  // Build parent map
  const parentMap = new Map()
  parentMap.set(root.id, null)

  function buildParentMap(node) {
    if (node.children) {
      for (const child of node.children) {
        parentMap.set(child.id, node)
        buildParentMap(child)
      }
    }
  }
  buildParentMap(root)

  // Find path from node to root
  function getPathToRoot(nodeId) {
    const path = []
    let currentId = nodeId

    while (currentId !== null) {
      path.push(currentId)
      const parent = parentMap.get(currentId)
      currentId = parent ? parent.id : null
    }

    return path
  }

  const pathFromStart = getPathToRoot(startId)
  const pathFromEnd = getPathToRoot(endId)

  // Find Lowest Common Ancestor (LCA)
  const startSet = new Set(pathFromStart)
  let lca = null

  for (const nodeId of pathFromEnd) {
    if (startSet.has(nodeId)) {
      lca = nodeId
      break
    }
  }

  if (!lca) return []

  // Build path: start -> LCA -> end
  const lcaIndexStart = pathFromStart.indexOf(lca)
  const lcaIndexEnd = pathFromEnd.indexOf(lca)

  const path = pathFromStart.slice(0, lcaIndexStart + 1)
  path.push(...pathFromEnd.slice(0, lcaIndexEnd).reverse())

  return path
}

// Check if tree is balanced and return unbalanced nodes
export function checkBalance(root) {
  const unbalanced = new Set()

  function getHeight(node) {
    if (!node) return 0
    if (!node.children || node.children.length === 0) return 1

    const heights = node.children.map(getHeight)
    return 1 + Math.max(...heights)
  }

  function checkNode(node) {
    if (!node.children || node.children.length === 0) return

    const heights = node.children.map(getHeight)
    const maxHeight = Math.max(...heights)
    const minHeight = Math.min(...heights)

    // A node is unbalanced if height difference > 1
    if (maxHeight - minHeight > 1) {
      unbalanced.add(node.id)
    }

    node.children.forEach(checkNode)
  }

  checkNode(root)
  return unbalanced
}

// Convert tree to Max Heap
export function convertToMaxHeap(root) {
  // Step 1: Level-order traversal to get array representation
  const nodes = []
  const queue = [root]

  while (queue.length > 0) {
    const node = queue.shift()
    nodes.push(node)
    if (node.children) {
      queue.push(...node.children)
    }
  }

  // Step 2: Extract values and create value array
  const values = nodes.map((n) => n.value || 0)

  // Step 3: Build Max Heap using array
  function heapify(arr, n, i) {
    let largest = i
    const left = 2 * i + 1
    const right = 2 * i + 2

    if (left < n && arr[left] > arr[largest]) {
      largest = left
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right
    }

    if (largest !== i) {
      ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
      heapify(arr, n, largest)
    }
  }

  // Build heap
  for (let i = Math.floor(values.length / 2) - 1; i >= 0; i--) {
    heapify(values, values.length, i)
  }

  // Step 4: Rebuild tree structure as complete binary tree
  function buildHeapTree(index) {
    if (index >= values.length) return undefined

    const node = {
      id: `heap-${index}`,
      label: `Node ${index}`,
      value: values[index],
      children: [],
    }

    const left = buildHeapTree(2 * index + 1)
    const right = buildHeapTree(2 * index + 2)

    if (left) node.children.push(left)
    if (right) node.children.push(right)

    if (node.children.length === 0) delete node.children

    return node
  }

  return buildHeapTree(0)
}
