type Item = {
  id: number;
  category: string;
  keyword: string;
  price: number;
};

const items: Item[] = [
  { id: 1, category: "book", keyword: "typescript", price: 1500 },
  { id: 2, category: "book", keyword: "react", price: 2000 },
  { id: 3, category: "food", keyword: "apple", price: 300 },
  { id: 4, category: "food", keyword: "banana", price: 250 },
  { id: 5, category: "tool", keyword: "hammer", price: 1200 },
];

// 検索条件;
const searchCondition1 = "book"; // category
const searchCondition2 = "react"; // keyword
// フィルター関数;
function filterItems(
  items: Item[],
  condition1: string,
  condition2: string
): Item[] {
  return items.filter(
    (item) => item.category === condition1 && item.keyword.includes(condition2)
  );
}

const result = filterItems(items, "book", "react");
console.log(result);

// 出力:
// [
//   { id: 2, category: "book", keyword: "react", price: 2000 }
// ]
// 部分一致・大文字小文字無視
function filterItemsFlexible(
  items: Item[],
  condition1: string,
  condition2: string
): Item[] {
  return items.filter(
    (item) =>
      item.category.toLowerCase().includes(condition1.toLowerCase()) &&
      item.keyword.toLowerCase().includes(condition2.toLowerCase())
  );
}

type SearchConditions = {
  category?: string;
  keyword?: string;
};
// 検索条件がオブジェクト形式;
function filterItemsByConditions(
  items: Item[],
  conditions: SearchConditions
): Item[] {
  return items.filter((item) => {
    const matchCategory = conditions.category
      ? item.category === conditions.category
      : true;
    const matchKeyword = conditions.keyword
      ? item.keyword.includes(conditions.keyword)
      : true;

    return matchCategory && matchKeyword;
  });
}
const result = filterItemsByConditions(items, {
  category: "book",
  keyword: "react",
});

function checkDateRange(
  from: string,
  to: string
): "inRange" | "future" | "past" {
  const now = new Date();
  const fromDate = new Date(from);
  const toDate = new Date(to);

  if (now >= fromDate && now <= toDate) {
    return "inRange"; // 期間内
  } else if (now < fromDate) {
    return "future"; // まだ始まってない（未来）
  } else {
    return "past"; // 終わってる
  }
}

const from = "2025-07-01";
const to = "2025-07-15";

const result = checkDateRange(from, to);
console.log(result); // "inRange" or "future" or "past"
// 日付に時刻も含;
function checkDateRangeWithTime(
  from: string,
  to: string
): "inRange" | "future" | "past" {
  const now = new Date().getTime();
  const fromTime = new Date(from).getTime();
  const toTime = new Date(to).getTime();

  if (now >= fromTime && now <= toTime) {
    return "inRange";
  } else if (now < fromTime) {
    return "future";
  } else {
    return "past";
  }
}
