import React, { useState } from "react";
import Dropbox from "../components/Dropbox";

const DropTest = () => {
  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");

  const options = [
    { value: "apple", label: "りんご" },
    { value: "banana", label: "バナナ" },
    { value: "orange", label: "オレンジ" },
  ];

  return (
    <div className="p-4 max-w-md mx-auto">
      <Dropbox
        label="好きな果物"
        options={options}
        value={selected}
        onChange={(val) => {
          setSelected(val);
          setError(val === "" ? "選択してください" : "");
        }}
        placeholder="選択してください"
        error={error}
      />
    </div>
  );
};

export default DropTest;
