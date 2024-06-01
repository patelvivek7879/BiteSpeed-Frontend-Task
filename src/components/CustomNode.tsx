import { Handle, Position } from "reactflow";
import CustomNodeLabel from "./CustomNodeLabel";

const CustomNode = ({ data, id }: { data: any, id: string}) => {
  return (
    <div  style={{padding: 0}}>
      <Handle type={"target"} position={Position.Left} />
      <Handle type={"source"} position={Position.Right} />
      <div>
        <CustomNodeLabel label={data?.label} id={id} />
      </div>
    </div>
  );
};

export default CustomNode;
