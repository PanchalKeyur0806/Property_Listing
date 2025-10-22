const SearchBtnLayout = ({ isActive, icon, name, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`size-30 flex flex-col gap-2 items-center justify-center shadow rounded-lg cursor-pointer transition-colors duration-100 ease-in hover:bg-blue-700 hover:text-white ${
        isActive === true ? "bg-blue-700 text-white" : "bg-white"
      }`}
    >
      <span>{icon}</span>
      <span>{name}</span>
    </div>
  );
};

export default SearchBtnLayout;
