const Appbar = ({ onSaveChanges }: { onSaveChanges: () => void }) => {
  return (
    <div className="flex w-full ">
      <nav className="flex w-full justify-end h-12 bg-slate-200">
        <ul>
          <li className="p-2 pr-10">
            <button
              onClick={onSaveChanges}
              className="border rounded-lg p-1 border-neutral-800 bg-white"
            >
              {"Save Changes"}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Appbar;
