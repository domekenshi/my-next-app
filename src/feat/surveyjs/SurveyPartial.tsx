"use client";
import React, { useState } from "react";
import { Survey } from "survey-react-ui"; // 読み込みはしておく
import { Model } from "survey-core";
import "survey-core/survey-core.css";

const surveyJson = {
  title: "ユーザーアンケート",
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "dropdown",
          name: "favoriteLang",
          title: "好きなプログラミング言語は？",
          choices: ["JavaScript", "TypeScript", "Python", "Go", "Rust"],
          placeholder: "選択してください",
        },
      ],
    },
  ],
};

const SurveyPartial = () => {
  const [survey] = useState(() => new Model(surveyJson));
  const [answer, setAnswer] = useState<string>("");

  const dropdownQuestion = survey.getAllQuestions()[0]; // ドロップダウンだけ取得

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAnswer(e.target.value);
    dropdownQuestion.value = e.target.value; // Survey Model に反映
  };

  const handleComplete = () => {
    console.log("送信データ:", survey.data);
    alert(`送信しました: ${survey.data.favoriteLang}`);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg max-w-md mx-auto">
      <label className="block mb-2 font-semibold text-gray-700">
        {dropdownQuestion.title}
      </label>
      <select
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={answer}
        onChange={handleChange}
      >
        <option value="" disabled>
          {dropdownQuestion.placeholder}
        </option>

        {dropdownQuestion.choices?.map(
          (c: any, i: number) => console.log(i)
          // <option key={i} value={c}>
          //   {c}
          // </option>
        )}
      </select>

      <button
        className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-colors"
        onClick={handleComplete}
      >
        Complete
      </button>
    </div>
  );
};

export default SurveyPartial;
