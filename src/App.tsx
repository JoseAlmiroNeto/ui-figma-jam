import ReactFlow, {
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  Node,
  useEdgesState,
  useNodesState,
} from "reactflow";
import * as Toolbar from "@radix-ui/react-toolbar";
import { zinc } from "tailwindcss/colors";
import "reactflow/dist/style.css";
import { Square } from "./components/nodes/Square";
import { useCallback } from "react";
import DefaultEdge from "./components/edges/DefaultEdges";

const NODE_TYPES = {
  square: Square,
};

const EDGE_TYPES = {
  default: DefaultEdge,
};

const INITIAL_NODES = [
  {
    id: crypto.randomUUID(),
    type: "square",
    position: {
      x: 200,
      y: 400,
    },
    data: { label: "Node 1" },
  },

  {
    id: crypto.randomUUID(),
    type: "square",
    position: {
      x: 1000,
      y: 400,
    },
    data: { label: "Node 2" },
  },
] satisfies Node[];

function App() {
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);

  const onConnet = useCallback((connetion: Connection) => {
    return setEdges((edges) => addEdge(connetion, edges));
  }, []);

  function addSquareNode() {
    setNodes((nodes) => [
      ...nodes,
      {
        id: crypto.randomUUID(),
        type: "square",
        position: {
          x: 750,
          y: 350,
        },
        data: { label: "Node" },
      },
    ]);
  }

  return (
    <div className="w-screen h-screen">
      <ReactFlow
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        nodes={nodes}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnet}
        onNodesChange={onNodesChange}
        connectionMode={ConnectionMode.Loose}
        defaultEdgeOptions={{
          type: "default",
        }}
      >
        <Background gap={12} size={2} color={zinc[200]} />
        <Controls />
      </ReactFlow>

      <Toolbar.Root className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg border border-zinc-300 h-20 w-96 overflow-hidden flex justify-center">
        <Toolbar.Button
          className="w-32 h-32 bg-violet-500 mt-4 rounded transition-transform hover:-translate-y-3"
          onClick={addSquareNode}
        />
      </Toolbar.Root>
    </div>
  );
}

export default App;
