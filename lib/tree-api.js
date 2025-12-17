// Mock API for tree data
// In production, replace with actual API calls to backend

// Sample tree data
const sampleTree = {
  id: "1",
  label: "Root",
  value: 50,
  children: [
    {
      id: "2",
      label: "A",
      value: 30,
      children: [
        {
          id: "4",
          label: "C",
          value: 20,
          children: [
            { id: "8", label: "G", value: 10 },
            { id: "9", label: "H", value: 25 },
          ],
        },
        {
          id: "5",
          label: "D",
          value: 35,
        },
      ],
    },
    {
      id: "3",
      label: "B",
      value: 70,
      children: [
        {
          id: "6",
          label: "E",
          value: 60,
          children: [{ id: "10", label: "I", value: 55 }],
        },
        {
          id: "7",
          label: "F",
          value: 80,
          children: [
            { id: "11", label: "J", value: 75 },
            { id: "12", label: "K", value: 85 },
          ],
        },
      ],
    },
  ],
}

export async function fetchTree() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return JSON.parse(JSON.stringify(sampleTree))
}

export async function fetchNode(nodeId) {
  await new Promise((resolve) => setTimeout(resolve, 200))

  function findNode(node) {
    if (node.id === nodeId) return node
    if (node.children) {
      for (const child of node.children) {
        const found = findNode(child)
        if (found) return found
      }
    }
    return null
  }

  return findNode(sampleTree)
}

export async function searchNodes(query) {
  await new Promise((resolve) => setTimeout(resolve, 300))

  const results = []
  const lowerQuery = query.toLowerCase()

  function search(node) {
    if (
      node.label.toLowerCase().includes(lowerQuery) ||
      node.id.includes(lowerQuery) ||
      (node.value !== undefined && node.value.toString().includes(query))
    ) {
      results.push(node)
    }
    if (node.children) {
      node.children.forEach(search)
    }
  }

  search(sampleTree)
  return results
}
