import { useCallback, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";

import CustomNode from "./components/CustomNode";
import toast, { Toaster } from "react-hot-toast";

import "reactflow/dist/style.css";
import RightSidebar from "./components/RightSidebar";
import Appbar from "./components/Appbar";
import { toastOptions } from "./Constants";

const nodeTypes = {
  default: CustomNode,
};

function App() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  // state to get details of selected node
  const [selectedNode, setSelectedNode] = useState<{ [x: string]: any }>({});

  const onConnect = useCallback(
    (params: any) =>
      setEdges((eds) => {
        const newParams = {
          ...params,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        };
        return addEdge(newParams, eds);
      }),
    []
  );

  const onDragOver = useCallback(
    (event: {
      preventDefault: () => void;
      dataTransfer: { dropEffect: string };
    }) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    []
  );

  let id = 1;
  const getId = () => `${id++}`;

  // when user leaves the mouse from nodes panel to ReactFlow canvas
  const onDrop = useCallback(
    (event: {
      preventDefault: () => void;
      dataTransfer: { getData: (arg0: string) => any };
      clientX: any;
      clientY: any;
    }) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");

      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position =
        reactFlowInstance &&
        reactFlowInstance?.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
      const uniqueId = getId();
      const newNode = {
        id: uniqueId,
        type,
        position,
        data: { label: `test message ${uniqueId}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const updateNodes = (textValue: string) => {
    const updatedNodes = nodes?.map((n) => {
      if (selectedNode?.id === n.id) {
        n.data.label = textValue;
        return n;
      } else {
        return n;
      }
    });
    setNodes(updatedNodes);
  };

  const onNodeClick = (_e: any, node: any) => {
    setSelectedNode(node);
  };

  // On click save button to save flow
  const onSaveChanges = () => {
    if (edges?.length !== nodes?.length - 1)
      toast.error("Cannot save Flow", {
        icon: null,
      });
    else toast.success("Saved Flow");
  };

  return (
    <div className="flex flex-col">
      <Appbar onSaveChanges={onSaveChanges} />
      <div className="flex flex-row">
        <ReactFlowProvider>
          <div
            className="w-full h-full p-4"
            style={{ height: "calc(100vh - 48px)" }}
            ref={reactFlowWrapper}
          >
            <ReactFlow
              nodeTypes={nodeTypes}
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeClick={onNodeClick}
              fitView
            >
              <Background color={"#bfbfbf"} variant={BackgroundVariant.Dots} />
              <Controls />
            </ReactFlow>
          </div>
          <RightSidebar
            updateNodes={updateNodes}
            setSelectedNode={setSelectedNode}
            selectedNode={selectedNode}
          />
        </ReactFlowProvider>
      </div>
      <Toaster toastOptions={toastOptions} />
    </div>
  );
}

export default App;
