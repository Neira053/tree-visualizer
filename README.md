# Tree Data Structure Visualizer

An interactive, web-based Tree Data Structure Visualizer built with **React**, **Next.js**, **React Flow**, and **Tailwind CSS**. This project demonstrates how tree data structures and algorithms work internally, following DSA (Data Structures & Algorithms) principles with correct structure, traversal order, and collision-free visualization.

## Features

### Tree Visualization
- **Hierarchical Display**: Proper parent-child relationships with DSA-correct layout
- **Smart Layout**: Only displays existing branches (left/right child appears only if present)
- **No Node Overlap**: Clean visualization regardless of tree depth
- **Auto Pan & Zoom**: Navigate large trees effortlessly
- **Collapse/Expand**: Toggle subtree visibility for focused exploration

### Node Interactions
- **Hover Highlighting**: Visual feedback on node hover
- **Click Selection**: Select nodes to view detailed metadata
- **Expand/Collapse**: Control subtree visibility
- **Double-Click Edit**: Modify node values directly
- **Add Child Nodes**: Click + button on leaf nodes to add new children
- **Metadata Panel**: View node ID, label, value, type, and children count

### Search Functionality
- **Value/Label Search**: Find nodes by value or label
- **Leaf Node Detection**: Distinctly highlights leaf nodes
- **Auto-Focus**: Automatically brings searched nodes into view
- **Real-time Search**: Instant results as you type

### Tree Traversal Algorithms (DSA Focus)

#### DFS (Depth-First Search)
- **Order**: Preorder traversal (Root → Left → Right)
- **Visualization**: Sequential visit numbers on each node
- **Animation**: Step-by-step node highlighting
- **Complexity**: O(n) time, O(h) space

#### BFS (Breadth-First Search)
- **Order**: Level-order traversal
- **Visualization**: Distinct visit sequence from DFS
- **Animation**: Level-by-level highlighting
- **Complexity**: O(n) time, O(w) space

### Shortest Path in Tree
- **Algorithm**: Lowest Common Ancestor (LCA) based
- **Method**: Select two nodes to find the path between them
- **Visualization**: Green highlighting of path nodes and edges
- **Tree-Specific**: No graph algorithms like Dijkstra

### Tree Balance Check
- **Algorithm**: Recursive height-based balance check
- **Detection**: Highlights unbalanced nodes (height difference > 1)
- **Visualization**: 
  - Balanced nodes: Normal color
  - Unbalanced nodes: Red highlighting

### Tree ↔ Heap Conversion
- **Algorithm**: Convert tree to Max Heap
- **Process**:
  1. Level-order traversal to create array
  2. Apply heapify algorithm
  3. Rebuild as complete binary tree
- **Visualization**: Complete restructure showing max heap property

### UI & UX
- **Modern Design**: Clean Tailwind CSS styling
- **Control Panel**: Easy access to all algorithms
- **Status Messages**: Real-time feedback on operations
- **Responsive**: Works on desktop and mobile devices
- **Interview-Ready**: Simple, explainable implementation

## Project Structure

```
├── app/
│   ├── page.jsx                    # Main application entry point
│   ├── layout.jsx                  # Root layout with fonts and metadata
│   └── globals.css                 # Global styles and Tailwind configuration
├── components/
│   ├── tree-visualizer.jsx         # Main orchestration component
│   ├── tree-view.jsx               # React Flow tree rendering
│   ├── custom-node.jsx             # Custom node component with interactions
│   ├── metadata-panel.jsx          # Node details sidebar
│   ├── search-bar.jsx              # Search functionality
│   └── control-panel.jsx           # Algorithm control buttons
├── hooks/
│   ├── use-mobile.js               # Mobile device detection
│   └── use-toast.js                # Toast notifications (optional)
├── lib/
│   ├── tree-api.js                 # Mock API for tree data
│   ├── tree-algorithms.js          # DSA algorithm implementations
│   └── utils.js                    # Utility functions
└── README.md
```

## Installation & Setup

### Prerequisites
- **Node.js**: Version 18.x or higher
- **Package Manager**: npm, yarn, or pnpm

### Installation Steps

1. **Clone or Download the Project**
   ```bash
   git clone <repository-url>
   cd tree-visualizer
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage Guide

### Basic Operations

**Navigation**
- **Zoom**: Mouse wheel or pinch gesture
- **Pan**: Click and drag on canvas
- **Select Node**: Click any node
- **Edit Node**: Double-click node value
- **Add Child**: Click green + button on leaf nodes

### Running Algorithms

**DFS Traversal**
1. Click the **DFS** button (pink)
2. Watch animated preorder traversal
3. Visit numbers appear on nodes
4. Observe Root → Left → Right order

**BFS Traversal**
1. Click the **BFS** button (blue)
2. See level-order traversal animation
3. Compare visit order with DFS
4. Notice level-by-level progression

**Shortest Path**
1. Click the **Shortest Path** button (green)
2. Click first node (start)
3. Click second node (end)
4. Path highlights in green

**Balance Check**
1. Click the **Balance Check** button (orange)
2. Unbalanced nodes highlight in red
3. Balanced trees show no highlighting

**Convert to Max Heap**
1. Click the **To Max Heap** button (purple)
2. Tree restructures into complete binary tree
3. Max heap property maintained (parent ≥ children)

**Reset**
- Click **Reset** button to restore original tree

### Adding Nodes Dynamically
1. Find any leaf node (nodes with no children)
2. Look for the green + button below the leaf node
3. Click the + button
4. A new child node will be added with a random value
5. The former leaf node becomes an internal node

### Search Feature
1. Type node label or value in search bar
2. Press Enter or click Search button
3. Matching node highlights and centers in view

### Collapse/Expand
- Click chevron icon on any node
- Subtree toggles visibility
- Useful for large tree exploration

## Algorithm Details

### DFS (Depth-First Search)
- **Implementation**: Recursive preorder traversal
- **Time Complexity**: O(n)
- **Space Complexity**: O(h) where h is tree height
- **Use Cases**: Tree structure exploration, path finding

### BFS (Breadth-First Search)
- **Implementation**: Queue-based level-order traversal
- **Time Complexity**: O(n)
- **Space Complexity**: O(w) where w is max width
- **Use Cases**: Shortest path, level-based operations

### Shortest Path
- **Algorithm**: LCA (Lowest Common Ancestor)
- **Steps**:
  1. Build parent pointer map
  2. Find paths from both nodes to root
  3. Identify LCA
  4. Construct path through LCA
- **Time Complexity**: O(n)

### Balance Check
- **Definition**: Height difference ≤ 1 between child subtrees
- **Implementation**: Recursive height calculation
- **Time Complexity**: O(n)

### Max Heap Conversion
- **Algorithm**: Array-based heapify
- **Steps**:
  1. Level-order traversal to array
  2. Build max heap (heapify)
  3. Reconstruct as complete binary tree
- **Time Complexity**: O(n)
- **Property**: Parent value ≥ all children values

## Technologies Used

- **Next.js 16**: React framework with App Router
- **React 19**: Modern React with latest features
- **JavaScript (ES6+)**: No TypeScript dependencies
- **React Flow**: Interactive node-based graphs
- **Tailwind CSS v4**: Utility-first styling
- **Lucide Icons**: Modern icon library

## Customization

### Modify Tree Data
Edit `lib/tree-api.js`:

```javascript
const sampleTree = {
  id: "1",
  label: "Root",
  value: 50,
  children: [
    // Add your custom tree structure
  ],
}
```

### Adjust Styles
- **Colors**: Modify `app/globals.css` theme variables
- **Layout**: Edit Tailwind classes in components
- **Node Appearance**: Customize `components/custom-node.jsx`

### Add New Algorithms
1. Implement algorithm in `lib/tree-algorithms.js`
2. Add control button in `components/control-panel.jsx`
3. Wire up in `components/tree-visualizer.jsx`

## Educational Value

This project is perfect for:
- **DSA Learning**: Understand tree algorithms visually
- **Technical Interviews**: Demonstrate algorithm knowledge
- **Academic Projects**: Showcase data structure understanding
- **Teaching**: Visual aid for explaining tree concepts

## Code Quality

- **Clean Architecture**: Separation of concerns
- **Readable Code**: Well-commented and organized
- **No Complex Patterns**: Easy to understand and explain
- **Standard JavaScript**: No advanced or obscure features

## License

MIT License - Free to use for learning and development

## Contributing

Contributions welcome! Areas for improvement:
- Additional tree algorithms (AVL rotations, Red-Black trees)
- Custom tree input functionality
- Performance optimizations
- Enhanced visualizations
- Bug fixes

## Support

For issues or questions:
1. Check existing documentation
2. Review code comments
3. Create an issue in the repository

---

Built for DSA learners, students, and interview preparation. Happy coding!
#   t r e e - v i s u a l i z e r 
 
 #   t r e e - v i s u a l i z e r 
 
 
