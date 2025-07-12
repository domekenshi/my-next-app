"use client";
import React, { useState } from "react";
import { Search, Copy, Check, ChevronDown } from "lucide-react";
import { CATEGORIES_TWCSS } from "./constants/tailwindConst";
import TwFooter from "./presenter/TwFooter";
import TwHeader from "./presenter/TwHeader";

const TailwindCheatSheet = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedClass, setCopiedClass] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedItem, setExpandedItem] = useState(null);

  /**
   * クリップボードへコピー
   * @description
   * 文字列をクリップボードにコピーして、2秒間だけ「コピーされた状態」を管理する(「コピーしました！」のフィードバック表示など)
   * @param text
   */
  const copyToClipboard = (text: string) => {
    // 文字列をクリップボードにコピー
    navigator.clipboard.writeText(text);
    setCopiedClass(text);
    // 2秒後に状態リセット（UI表示も戻る）
    setTimeout(() => setCopiedClass(""), 2000);
  };

  /**
   * カテゴリフィルタ
   * @description
   * 検索条件やカテゴリに応じてフィルタリングした結果の配列を作る
   */
  const filteredCategories = CATEGORIES_TWCSS.map((category) => ({
    // 既存のカテゴリ情報を維持
    ...category,
    // items はフィルターされたものに置き換える
    items: category.items.filter(
      (item) =>
        // class もしくは description に searchTerm（検索ワード）が含まれているか確認。
        // 大文字・小文字の違いは無視するため toLowerCase() を使って比較。
        item.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(
    // フィルターされたカテゴリのうち、選択中のカテゴリのみを抽出
    (category) =>
      selectedCategory === "all" ||
      // selectedCategory に一致するカテゴリ名だけを表示
      category.name.toLowerCase() === selectedCategory.toLowerCase()
  );

  const renderDemo = (item: any) => {
    const demoClasses = item.demo;
    // カテゴリー名を取得
    const categoryName = CATEGORIES_TWCSS.find((cat) =>
      cat.items.includes(item)
    )?.name;

    if (categoryName === "Colors") {
      if (item.class.startsWith("text-")) {
        return (
          <div className={`${demoClasses} p-2 border border-gray-200 rounded`}>
            サンプルテキスト
          </div>
        );
      } else if (item.class.startsWith("bg-")) {
        return (
          <div
            className={`${demoClasses} p-4 border border-gray-200 rounded text-center`}
          >
            背景色
          </div>
        );
      }
    }

    if (categoryName === "Typography") {
      return (
        <div className={`${demoClasses} p-2 border border-gray-200 rounded`}>
          サンプルテキスト
        </div>
      );
    }

    if (categoryName === "Layout") {
      return (
        <div
          className={`${demoClasses} p-2 border border-gray-200 rounded min-h-16`}
        >
          <div className="bg-blue-100 p-2 rounded">アイテム1</div>
          <div className="bg-green-100 p-2 rounded">アイテム2</div>
        </div>
      );
    }

    if (categoryName === "Spacing") {
      return (
        <div className="border border-gray-200 rounded overflow-hidden">
          <div
            className={`${demoClasses} bg-blue-100 border-2 border-dashed border-blue-300`}
          >
            コンテンツ
          </div>
        </div>
      );
    }

    if (categoryName === "Borders") {
      return (
        <div className={`${demoClasses} p-4 bg-gray-50`}>ボーダーサンプル</div>
      );
    }

    if (categoryName === "Sizing") {
      return (
        <div className="border border-gray-200 rounded overflow-hidden">
          <div className={`${demoClasses} bg-blue-100 p-2 text-center`}>
            サイズサンプル
          </div>
        </div>
      );
    }

    if (categoryName === "Effects") {
      return (
        <div
          className={`${demoClasses} p-4 bg-white border border-gray-200 rounded cursor-pointer`}
        >
          エフェクトサンプル
        </div>
      );
    }

    return (
      <div
        className={`${demoClasses} p-2 border border-gray-200 rounded bg-amber-100 opacity-75`}
      >
        {demoClasses}
      </div>
    );
  };

  const toggleExpanded = (itemClass: any) => {
    setExpandedItem(expandedItem === itemClass ? null : itemClass);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 text-black">
      <div className="max-w-7xl mx-auto">
        <TwHeader />

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="クラス名や説明で検索..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">すべてのカテゴリ</option>
            {CATEGORIES_TWCSS.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-8">
          {filteredCategories.map(
            (category) =>
              category.items.length > 0 && (
                <section
                  key={category.name}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {category.name}
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {category.items.map((item) => (
                      <div
                        key={item.class}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-blue-600">
                                {item.class}
                              </code>
                              <button
                                onClick={() => copyToClipboard(item.class)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                title="クラス名をコピー"
                              >
                                {copiedClass === item.class ? (
                                  <Check className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Copy className="w-4 h-4 text-gray-500" />
                                )}
                              </button>
                              <button
                                onClick={() => toggleExpanded(item.class)}
                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                title="詳細を表示"
                              >
                                <ChevronDown
                                  className={`w-4 h-4 text-gray-500 transition-transform ${
                                    expandedItem === item.class
                                      ? "rotate-180"
                                      : ""
                                  }`}
                                />
                              </button>
                            </div>
                            <p className="text-sm text-gray-600 font-mono">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* 展開可能な詳細情報 */}
                        {expandedItem === item.class && (
                          <div className="mt-3 mb-3 bg-gray-50 rounded-lg p-3 border border-gray-200">
                            <div className="space-y-2">
                              {item.css && (
                                <div>
                                  <p className="text-xs font-semibold text-gray-700 mb-1">
                                    CSS:
                                  </p>
                                  <code className="text-xs bg-white px-2 py-1 rounded border text-gray-800 font-mono">
                                    {item.css}
                                  </code>
                                </div>
                              )}
                              {item.meaning && (
                                <div>
                                  <p className="text-xs font-semibold text-gray-700 mb-1">
                                    詳細:
                                  </p>
                                  <p className="text-xs text-gray-600">
                                    {item.meaning}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="mt-3">
                          <p className="text-xs text-gray-500 mb-2">
                            プレビュー:
                          </p>
                          {renderDemo(item)}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )
          )}
        </div>
        <TwFooter />
      </div>
    </div>
  );
};

export default TailwindCheatSheet;
