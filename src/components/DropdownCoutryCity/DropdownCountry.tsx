interface IDropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: String;
  options: any[];
  value?: string;
  customValueKey?: string;
}

const Dropdown = (props: IDropdownProps) => {
  const { label, options, value, onChange, customValueKey } = props;
  return (
    <div>
      <label>{label}</label>
      <div
        className=" border-gray-300 focus:border-green-500 focus:outline-none px-4 py-2 rounded cursor-pointer font-bold flex items-center justify-between w-[400px] bg-white shadow-sm w-50 mt-2"
        // para ficar sobreposto
        style={{ zIndex: 1000 }}
      >
        <select value={value} onChange={onChange}>
          <option>Select {label}</option>

          {options.map((option) => {
            if (typeof option === "string") {
              return <option key={option}>{option}</option>;
            } else {
              const data = customValueKey
                ? option[customValueKey]
                : option.value;
              return <option key={data}>{data}</option>;
            }
          })}
        </select>
      </div>
    </div>
  );
};

export default Dropdown;
