# Tree Data Structure Visualizer

An interactive, web-based Tree Data Structure Visualizer built to demonstrate how tree data structures and algorithms work internally, following core DSA principles.
The project focuses on correct tree structure, traversal order, and collision-free visualization, making it ideal for learning, academic evaluation, and technical interviews.

## ✨ Features
🌲 Tree Visualization

Hierarchical Structure with correct parent–child relationships

DSA-Correct Layout Algorithm

Displays only existing branches

Left or right child appears only if present

Leaf nodes never overlap, regardless of depth

Auto Pan & Zoom for large trees

Expand / Collapse Subtrees for focused exploration

## 🧩 Node Interactions

Hover Highlighting for visual feedback

Click Selection to inspect node details

Expand / Collapse Nodes interactively

Metadata Panel displaying:

Node ID

Label / Value

Node type (leaf / internal)

Number of children

## 🔍 Search Functionality

Search nodes by label or value

Leaf nodes are highlighted distinctly

Automatically brings the searched node into view

## 🔄 Tree Traversal Algorithms (DSA Focus)
DFS – Depth-First Search

Traversal Type: Preorder (Root → Left → Right)

Visualization:

Visit order number displayed on each node

Clearly shows depth-first behavior

Time Complexity: O(n)

Space Complexity: O(h)

BFS – Breadth-First Search

Traversal Type: Level-order

Visualization:

Visit order differs clearly from DFS

Highlights level-by-level traversal

Time Complexity: O(n)

Space Complexity: O(w)

The difference between DFS and BFS is visually demonstrated using visit sequence numbers, making algorithm behavior easy to understand.

## 🔗 Shortest Path in Tree

Approach: Lowest Common Ancestor (LCA) based

Interaction:

Select start node

Select end node

Visualize shortest path

Tree-specific logic (no graph algorithms like Dijkstra)

Highlighted Path clearly shown

# 3⚖️ Tree Balance Check

Uses recursive height comparison

A node is considered balanced if height difference ≤ 1

Visualization:

Balanced nodes → normal

Unbalanced nodes → highlighted in red

## 🔁 Tree → Heap Conversion

Converts a tree into a Max Heap

Process:

Level-order traversal → array

Heapify array

Rebuild as complete binary tree

Result:

Parent node ≥ child nodes

Proper heap structure visually represented

## 🎨 UI & UX

Built using Tailwind CSS for a clean, modern UI

Control Panel with algorithm buttons:

DFS

BFS

Shortest Path

Balance Check

Convert to Heap

Reset

Simple and intuitive design

Fully interview-ready and explainable

## 🗂️ Project Structure

tree-visualizer/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TreeView.jsx
│   │   │   ├── CustomNode.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── MetadataPanel.jsx
│   │   ├── dsa/
│   │   │   └── treeAlgorithms.js
│   │   ├── api/
│   │   │   └── treeApi.js
│   │   └── App.jsx
│   └── index.html
└── README.md

3# ⚙️ Installation & Setup
Prerequisites

Node.js (v18 or higher)

npm or yarn

Steps
git clone https://github.com/Neira053/tree-visualizer.git
cd tree-visualizer
npm install
npm run dev


Open in browser:

http://localhost:5173

🚀 Usage Guide
Run Traversals

Click DFS → observe depth-first order

Click BFS → observe level-order traversal

Shortest Path

Click start node

Click end node

Click Shortest Path

Balance Check

Click Check Balance

Unbalanced nodes highlight in red

Heap Conversion

Click Convert to Heap

Tree restructures into a Max Heap

Search

Enter node label or value

Matching node is highlighted and centered


## 🛠️ Technologies Used

React (Vite)

JavaScript (ES6+)

React Flow

Tailwind CSS

Node.js / Express (API layer)
re- write this as when i am pasting it in my read me file it paste it like a paragraph rather than points 


ChatGPT said:
Got it 👍
This happens because GitHub README only respects proper Markdown formatting.
Below is a clean, GitHub-friendly README version with correct headings, bullet points, spacing, and line breaks.
You can directly copy–paste this — it will NOT merge into a paragraph.

🌳 Tree Data Structure Visualizer
An interactive, web-based Tree Data Structure Visualizer built to demonstrate how tree data structures and algorithms work internally, following core DSA principles.

This project focuses on:

Correct tree structure

Accurate traversal order

Collision-free visualization

It is ideal for learning, academic evaluation, and technical interviews.

✨ Features
🌲 Tree Visualization
Hierarchical structure with correct parent–child relationships

DSA-correct layout algorithm

Displays only existing branches

Left or right child appears only if present

Leaf nodes never overlap, regardless of depth

Auto pan & zoom for large trees

Expand / collapse subtrees for focused exploration

🧩 Node Interactions
Hover highlighting for visual feedback

Click selection to inspect node details

Expand / collapse nodes interactively

📊 Metadata Panel Displays:
Node ID

Label / value

Node type (leaf / internal)

Number of children

🔍 Search Functionality
Search nodes by label or value

Leaf nodes are highlighted distinctly

Automatically centers the searched node in view

🔄 Tree Traversal Algorithms (DSA Focus)
🔹 DFS – Depth-First Search
Traversal Type: Preorder (Root → Left → Right)

Visualization:

Visit order number shown on each node

Clearly demonstrates depth-first behavior

Time Complexity: O(n)

Space Complexity: O(h)

🔹 BFS – Breadth-First Search
Traversal Type: Level-order

Visualization:

Visit order differs clearly from DFS

Highlights level-by-level traversal

Time Complexity: O(n)

Space Complexity: O(w)

📌 The difference between DFS and BFS is visually demonstrated using visit sequence numbers, making algorithm behavior easy to understand.

🔗 Shortest Path in Tree
Approach: Lowest Common Ancestor (LCA)

Interaction Flow:

Select start node

Select end node

Visualize shortest path

Tree-specific logic (no graph algorithms like Dijkstra)

Highlighted path clearly shown

⚖️ Tree Balance Check
Uses recursive height comparison

A node is balanced if height difference ≤ 1

🎨 Visualization:
Balanced nodes → normal

Unbalanced nodes → highlighted in red

🔁 Tree → Heap Conversion
Converts a tree into a Max Heap

🔄 Process:
Level-order traversal → array

Heapify the array

Rebuild as a complete binary tree

✅ Result:
Parent node ≥ child nodes

Proper heap structure visually represented

🎨 UI & UX
Built using Tailwind CSS for a clean, modern UI

Control panel with algorithm buttons:

DFS

BFS

Shortest Path

Balance Check

Convert to Heap

Reset

Simple, intuitive, and interview-ready design

🗂️ Project Structure

tree-visualizer/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TreeView.jsx
│   │   │   ├── CustomNode.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── MetadataPanel.jsx
│   │   ├── dsa/
│   │   │   └── treeAlgorithms.js
│   │   ├── api/
│   │   │   └── treeApi.js
│   │   └── App.jsx
│   └── index.html
└── README.md

⚙️ Installation & Setup
📌 Prerequisites
Node.js (v18 or higher)

npm or yarn

🚀 Steps
git clone https://github.com/Neira053/tree-visualizer.git
cd tree-visualizer
npm install
npm run dev
🌐 Open in Browser
http://localhost:5173
🚀 Usage Guide
▶️ Run Traversals
Click DFS → observe depth-first order

Click BFS → observe level-order traversal

🔗 Shortest Path
Click start node

Click end node

Click Shortest Path

⚖️ Balance Check
Click Check Balance

Unbalanced nodes highlight in red

🔁 Heap Conversion
Click Convert to Heap

Tree restructures into a Max Heap

🔍 Search
Enter node label or value

Matching node is highlighted and centered

🛠️ Technologies Used
React (Vite)

JavaScript (ES6+)

React Flow

Tailwind CSS

Node.js / Express (API layer)
