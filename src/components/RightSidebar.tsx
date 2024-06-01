import { TbMessage } from "react-icons/tb";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DragEvent, useEffect, useState } from "react";

type Props = {
  updateNodes: (textValue: string) => void;
  setSelectedNode: (node: any) => void;
  selectedNode: any;
};

const RightSidebar = ({
  updateNodes,
  selectedNode,
  setSelectedNode,
}: Props) => {
  // setting state for text area text value, on change will update the state for show text in textarea and node label
  const [textValue, setTextValue] = useState("");

  useEffect(() => {
    if (selectedNode) {
      setTextValue(selectedNode?.data?.label);
    }
  }, [selectedNode]);

  const onBackBtnClick = () => {
    setSelectedNode({});
  };

  const onTextAreaChange = (e: any) => {
    const textValue = e.target.value;
    setTextValue(textValue);

    try {
      updateNodes(textValue);
    } catch (error) {
      console.log("Error while updating text for node ==>>>", error);
    }
  };

  const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-96 border-0 border-l-2 p-2">
      {Object.keys(selectedNode).length === 0 ? (
        <div
          className="flex flex-col justify-center items-center left-auto right-auto border rounded p-4 hover: cursor-grab"
          onDragStart={(event) => onDragStart(event, "default")}
          draggable
        >
          <TbMessage />
          {"Message"}
        </div>
      ) : (
        <div className="w-full">
          <div className="flex items-center border rounded p-4">
            <div onClick={() => onBackBtnClick()}>
              <IoMdArrowRoundBack />
            </div>
            <div className="w-full flex justify-center">{"Message"}</div>
          </div>
          <div className="w-full flex flex-col border rounded p-4">
            <p className="text-sm">{"Text"}</p>
            <textarea
              className="border sidebar-textarea"
              onChange={onTextAreaChange}
              value={textValue}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSidebar;
