import { Fragment } from "react";
import { TbMessage } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";

const CustomNodeLabel = ({ label, id }: { label: string; id: string }) => {
  return (
    <Fragment key={id}>
      <div className="flex flex-row gap-2 w-full justify-between items-center border-b border-b-slate-800 p-1 pt-2 bg-green-400">
        <span className="flex items-center gap-1 text-xs -mt-1" style={{ fontSize: 11}}>
            <TbMessage />
            {"Send Message"}
        </span>
        <FaWhatsapp size={11} />
      </div>
      <div className="text-center p-2">
        <div>{label ? label : <small className="italic text-gray-500">{"No message"}</small>}</div>
      </div>
    </Fragment>
  );
};

export default CustomNodeLabel;