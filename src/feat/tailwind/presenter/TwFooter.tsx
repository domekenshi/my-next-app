import React from "react";
const TwFooter = () => {
  return (
    <footer className="mt-12 text-center text-gray-500 text-sm">
      <p>
        このチートシートは開発時の参考用です。詳細な仕様は
        <a
          href="https://tailwindcss.com/docs"
          className="text-blue-600 hover:underline ml-1"
        >
          Tailwind CSS公式ドキュメント
        </a>
        をご確認ください。
      </p>
    </footer>
  );
};
export default TwFooter;
