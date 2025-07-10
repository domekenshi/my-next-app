import React, { useState, useMemo } from "react";

// 汎用的な配列フィルタリングユーティリティ
const ArrayFilterUtils = {
  // 基本的なフィルタリング関数
  filterArray: (array, conditions) => {
    if (!Array.isArray(array) || !conditions || conditions.length === 0) {
      return array;
    }

    return array.filter((item) => {
      return conditions.every((condition) => {
        const { field, operator, value, type = "string" } = condition;

        if (!field || value === undefined || value === null || value === "") {
          return true; // 空の条件は無視
        }

        const itemValue = ArrayFilterUtils.getNestedValue(item, field);

        return ArrayFilterUtils.applyCondition(
          itemValue,
          operator,
          value,
          type
        );
      });
    });
  },

  // ネストされたオブジェクトの値を取得
  getNestedValue: (obj, path) => {
    return path.split(".").reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  },

  // 条件を適用
  applyCondition: (itemValue, operator, conditionValue, type) => {
    // 値の型変換
    const normalizedItemValue = ArrayFilterUtils.normalizeValue(
      itemValue,
      type
    );
    const normalizedConditionValue = ArrayFilterUtils.normalizeValue(
      conditionValue,
      type
    );

    switch (operator) {
      case "equals":
        return normalizedItemValue === normalizedConditionValue;

      case "not_equals":
        return normalizedItemValue !== normalizedConditionValue;

      case "contains":
        return type === "string"
          ? String(normalizedItemValue)
              .toLowerCase()
              .includes(String(normalizedConditionValue).toLowerCase())
          : false;

      case "not_contains":
        return type === "string"
          ? !String(normalizedItemValue)
              .toLowerCase()
              .includes(String(normalizedConditionValue).toLowerCase())
          : true;

      case "starts_with":
        return type === "string"
          ? String(normalizedItemValue)
              .toLowerCase()
              .startsWith(String(normalizedConditionValue).toLowerCase())
          : false;

      case "ends_with":
        return type === "string"
          ? String(normalizedItemValue)
              .toLowerCase()
              .endsWith(String(normalizedConditionValue).toLowerCase())
          : false;

      case "greater_than":
        return type === "number"
          ? Number(normalizedItemValue) > Number(normalizedConditionValue)
          : type === "date"
          ? new Date(normalizedItemValue) > new Date(normalizedConditionValue)
          : false;

      case "less_than":
        return type === "number"
          ? Number(normalizedItemValue) < Number(normalizedConditionValue)
          : type === "date"
          ? new Date(normalizedItemValue) < new Date(normalizedConditionValue)
          : false;

      case "greater_equal":
        return type === "number"
          ? Number(normalizedItemValue) >= Number(normalizedConditionValue)
          : type === "date"
          ? new Date(normalizedItemValue) >= new Date(normalizedConditionValue)
          : false;

      case "less_equal":
        return type === "number"
          ? Number(normalizedItemValue) <= Number(normalizedConditionValue)
          : type === "date"
          ? new Date(normalizedItemValue) <= new Date(normalizedConditionValue)
          : false;

      case "in":
        const arrayValues = Array.isArray(normalizedConditionValue)
          ? normalizedConditionValue
          : String(normalizedConditionValue)
              .split(",")
              .map((v) => v.trim());
        return arrayValues.includes(normalizedItemValue);

      case "not_in":
        const notInValues = Array.isArray(normalizedConditionValue)
          ? normalizedConditionValue
          : String(normalizedConditionValue)
              .split(",")
              .map((v) => v.trim());
        return !notInValues.includes(normalizedItemValue);

      case "is_null":
        return (
          normalizedItemValue === null || normalizedItemValue === undefined
        );

      case "is_not_null":
        return (
          normalizedItemValue !== null && normalizedItemValue !== undefined
        );

      case "is_empty":
        return (
          normalizedItemValue === "" ||
          normalizedItemValue === null ||
          normalizedItemValue === undefined
        );

      case "is_not_empty":
        return (
          normalizedItemValue !== "" &&
          normalizedItemValue !== null &&
          normalizedItemValue !== undefined
        );

      default:
        return true;
    }
  },

  // 値の正規化
  normalizeValue: (value, type) => {
    if (value === null || value === undefined) {
      return value;
    }

    switch (type) {
      case "number":
        return Number(value);
      case "string":
        return String(value);
      case "date":
        return value instanceof Date ? value : new Date(value);
      case "boolean":
        return Boolean(value);
      default:
        return value;
    }
  },

  // 複数の条件でのフィルタリング（AND/OR対応）
  filterArrayAdvanced: (array, conditionGroups, logic = "AND") => {
    if (
      !Array.isArray(array) ||
      !conditionGroups ||
      conditionGroups.length === 0
    ) {
      return array;
    }

    return array.filter((item) => {
      const groupResults = conditionGroups.map((group) => {
        return (
          ArrayFilterUtils.filterArray([item], group.conditions).length > 0
        );
      });

      return logic === "AND"
        ? groupResults.every((result) => result)
        : groupResults.some((result) => result);
    });
  },
};

// 演算子の定義
const OPERATORS = {
  string: [
    { value: "equals", label: "等しい" },
    { value: "not_equals", label: "等しくない" },
    { value: "contains", label: "含む" },
    { value: "not_contains", label: "含まない" },
    { value: "starts_with", label: "〜で始まる" },
    { value: "ends_with", label: "〜で終わる" },
    { value: "is_empty", label: "空" },
    { value: "is_not_empty", label: "空でない" },
  ],
  number: [
    { value: "equals", label: "等しい" },
    { value: "not_equals", label: "等しくない" },
    { value: "greater_than", label: "より大きい" },
    { value: "less_than", label: "より小さい" },
    { value: "greater_equal", label: "以上" },
    { value: "less_equal", label: "以下" },
    { value: "is_null", label: "null" },
    { value: "is_not_null", label: "null でない" },
  ],
  date: [
    { value: "equals", label: "等しい" },
    { value: "not_equals", label: "等しくない" },
    { value: "greater_than", label: "より後" },
    { value: "less_than", label: "より前" },
    { value: "greater_equal", label: "以降" },
    { value: "less_equal", label: "以前" },
  ],
  boolean: [{ value: "equals", label: "等しい" }],
};

// 条件設定コンポーネント
const ConditionBuilder = ({
  condition,
  onUpdate,
  onRemove,
  availableFields,
}) => {
  const handleFieldChange = (field) => {
    const fieldInfo = availableFields.find((f) => f.value === field);
    onUpdate({
      ...condition,
      field,
      type: fieldInfo?.type || "string",
      operator: "equals",
      value: "",
    });
  };

  const currentOperators = OPERATORS[condition.type] || OPERATORS.string;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-2 p-3 bg-gray-50 rounded-lg">
      <select
        value={condition.field}
        onChange={(e) => handleFieldChange(e.target.value)}
        className="px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="">フィールド選択</option>
        {availableFields.map((field) => (
          <option key={field.value} value={field.value}>
            {field.label}
          </option>
        ))}
      </select>

      <select
        value={condition.operator}
        onChange={(e) => onUpdate({ ...condition, operator: e.target.value })}
        className="px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        {currentOperators.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>

      {condition.type === "date" ? (
        <input
          type="date"
          value={condition.value}
          onChange={(e) => onUpdate({ ...condition, value: e.target.value })}
          className="px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      ) : condition.type === "number" ? (
        <input
          type="number"
          value={condition.value}
          onChange={(e) => onUpdate({ ...condition, value: e.target.value })}
          className="px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="値を入力"
        />
      ) : condition.type === "boolean" ? (
        <select
          value={condition.value}
          onChange={(e) =>
            onUpdate({ ...condition, value: e.target.value === "true" })
          }
          className="px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="">選択</option>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
      ) : (
        <input
          type="text"
          value={condition.value}
          onChange={(e) => onUpdate({ ...condition, value: e.target.value })}
          className="px-2 py-1 border rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          placeholder="値を入力"
        />
      )}

      <div className="text-xs text-gray-500 flex items-center">
        {condition.type}
      </div>

      <button
        onClick={onRemove}
        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
      >
        削除
      </button>
    </div>
  );
};

// メインコンポーネント
const ArrayFilterTool = () => {
  // サンプルデータ
  const sampleData = [
    {
      id: 1,
      name: "田中太郎",
      age: 25,
      department: "営業",
      salary: 300000,
      joinDate: "2020-04-01",
      active: true,
    },
    {
      id: 2,
      name: "佐藤花子",
      age: 30,
      department: "開発",
      salary: 450000,
      joinDate: "2019-03-15",
      active: true,
    },
    {
      id: 3,
      name: "鈴木次郎",
      age: 28,
      department: "営業",
      salary: 350000,
      joinDate: "2021-01-10",
      active: false,
    },
    {
      id: 4,
      name: "高橋美穂",
      age: 32,
      department: "人事",
      salary: 400000,
      joinDate: "2018-09-01",
      active: true,
    },
    {
      id: 5,
      name: "渡辺健太",
      age: 27,
      department: "開発",
      salary: 480000,
      joinDate: "2020-08-20",
      active: true,
    },
    {
      id: 6,
      name: "山田良子",
      age: 35,
      department: "経理",
      salary: 420000,
      joinDate: "2017-05-15",
      active: false,
    },
    {
      id: 7,
      name: "中村孝志",
      age: 29,
      department: "開発",
      salary: 460000,
      joinDate: "2019-11-03",
      active: true,
    },
    {
      id: 8,
      name: "小林さくら",
      age: 26,
      department: "営業",
      salary: 320000,
      joinDate: "2021-06-01",
      active: true,
    },
  ];

  const availableFields = [
    { value: "name", label: "名前", type: "string" },
    { value: "age", label: "年齢", type: "number" },
    { value: "department", label: "部署", type: "string" },
    { value: "salary", label: "給与", type: "number" },
    { value: "joinDate", label: "入社日", type: "date" },
    { value: "active", label: "在籍状況", type: "boolean" },
  ];

  const [conditions1, setConditions1] = useState([
    { field: "department", operator: "equals", value: "開発", type: "string" },
  ]);

  const [conditions2, setConditions2] = useState([
    { field: "age", operator: "greater_equal", value: "30", type: "number" },
  ]);

  const [logicOperator, setLogicOperator] = useState("AND");

  // フィルタリング結果
  const filteredData = useMemo(() => {
    if (logicOperator === "AND") {
      // 両方の条件を満たす（AND）
      const result1 = ArrayFilterUtils.filterArray(sampleData, conditions1);
      return ArrayFilterUtils.filterArray(result1, conditions2);
    } else {
      // いずれかの条件を満たす（OR）
      const result1 = ArrayFilterUtils.filterArray(sampleData, conditions1);
      const result2 = ArrayFilterUtils.filterArray(sampleData, conditions2);

      // 重複を除去してマージ
      const combinedIds = new Set([
        ...result1.map((item) => item.id),
        ...result2.map((item) => item.id),
      ]);
      return sampleData.filter((item) => combinedIds.has(item.id));
    }
  }, [conditions1, conditions2, logicOperator]);

  // 条件の追加・更新・削除
  const addCondition = (conditionSet, setter) => {
    setter([
      ...conditionSet,
      { field: "", operator: "equals", value: "", type: "string" },
    ]);
  };

  const updateCondition = (conditionSet, setter, index, newCondition) => {
    const updated = [...conditionSet];
    updated[index] = newCondition;
    setter(updated);
  };

  const removeCondition = (conditionSet, setter, index) => {
    setter(conditionSet.filter((_, i) => i !== index));
  };

  // 統計情報
  const stats = useMemo(() => {
    const total = sampleData.length;
    const filtered = filteredData.length;
    const percentage = total > 0 ? Math.round((filtered / total) * 100) : 0;

    return { total, filtered, percentage };
  }, [filteredData, sampleData]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center">
        オブジェクト配列フィルタリングツール
      </h1>

      {/* 統計情報 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-sm text-gray-600">総件数</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">
            {stats.filtered}
          </div>
          <div className="text-sm text-gray-600">フィルタ結果</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-purple-600">
            {stats.percentage}%
          </div>
          <div className="text-sm text-gray-600">一致率</div>
        </div>
      </div>

      {/* 論理演算子選択 */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-3">条件の組み合わせ</h2>
        <div className="flex gap-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="logic"
              value="AND"
              checked={logicOperator === "AND"}
              onChange={(e) => setLogicOperator(e.target.value)}
              className="mr-2"
            />
            AND（両方の条件を満たす）
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="logic"
              value="OR"
              checked={logicOperator === "OR"}
              onChange={(e) => setLogicOperator(e.target.value)}
              className="mr-2"
            />
            OR（いずれかの条件を満たす）
          </label>
        </div>
      </div>

      {/* 検索条件1 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">検索条件1</h2>
          <button
            onClick={() => addCondition(conditions1, setConditions1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            条件追加
          </button>
        </div>
        <div className="space-y-3">
          {conditions1.map((condition, index) => (
            <ConditionBuilder
              key={index}
              condition={condition}
              onUpdate={(newCondition) =>
                updateCondition(
                  conditions1,
                  setConditions1,
                  index,
                  newCondition
                )
              }
              onRemove={() =>
                removeCondition(conditions1, setConditions1, index)
              }
              availableFields={availableFields}
            />
          ))}
        </div>
      </div>

      {/* 検索条件2 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">検索条件2</h2>
          <button
            onClick={() => addCondition(conditions2, setConditions2)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            条件追加
          </button>
        </div>
        <div className="space-y-3">
          {conditions2.map((condition, index) => (
            <ConditionBuilder
              key={index}
              condition={condition}
              onUpdate={(newCondition) =>
                updateCondition(
                  conditions2,
                  setConditions2,
                  index,
                  newCondition
                )
              }
              onRemove={() =>
                removeCondition(conditions2, setConditions2, index)
              }
              availableFields={availableFields}
            />
          ))}
        </div>
      </div>

      {/* 結果表示 */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">フィルタリング結果</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  ID
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  名前
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  年齢
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  部署
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  給与
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  入社日
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  在籍
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {item.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.age}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.department}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.salary.toLocaleString()}円
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.joinDate}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        item.active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.active ? "在籍" : "退職"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 使用例 */}
      <div className="p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">使用例（JavaScript）</h3>
        <pre className="text-sm bg-white p-3 rounded overflow-x-auto">
          {`// 基本的な使用方法
const conditions = [
  { field: 'age', operator: 'greater_than', value: 25, type: 'number' },
  { field: 'department', operator: 'equals', value: '開発', type: 'string' }
];

const filteredData = ArrayFilterUtils.filterArray(data, conditions);

// 複数の条件グループ（AND/OR）
const conditionGroups = [
  { conditions: [{ field: 'department', operator: 'equals', value: '開発' }] },
  { conditions: [{ field: 'age', operator: 'greater_than', value: 30 }] }
];

const result = ArrayFilterUtils.filterArrayAdvanced(data, conditionGroups, 'OR');`}
        </pre>
      </div>
    </div>
  );
};

export default ArrayFilterTool;
