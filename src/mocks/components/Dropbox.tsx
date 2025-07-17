import React from "react";

type Option = {
  value: string;
  label: string;
};

type Props = {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
};

/**
 * ドロップダウン（セレクト）
 * @param param0
 * @returns
 */
const Dropbox: React.FC<Props> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
  error,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 border rounded-md text-sm bg-white
          ${error ? "border-red-500" : "border-gray-300"}
          focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Dropbox;
