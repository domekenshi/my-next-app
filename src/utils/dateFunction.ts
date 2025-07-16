//////////////////////////////////////////
// 現在の日付を取得する関数
//////////////////////////////////////////
// 1. 基本的な現在日付取得関数
function getCurrentDate() {
  return new Date();
}

// 2. 日付を文字列形式で取得（YYYY-MM-DD）
function getCurrentDateString() {
  const now = new Date();
  const year = now.getFullYear();
  // padStart=文字列を指定した長さまで先頭に文字を追加するJavaScriptのメソッド;
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 3. 日本語形式で日付を取得
function getCurrentDateJapanese() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return `${year}年${month}月${day}日`;
}

// 4. 日時を含む詳細な現在日時取得
function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 5. フォーマットを指定できる柔軟な関数
function getCurrentDateFormatted(format = "YYYY-MM-DD") {
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return format
    .replace("YYYY", year)
    .replace("MM", month)
    .replace("DD", day)
    .replace("HH", hours)
    .replace("mm", minutes)
    .replace("ss", seconds);
}

// 6. タイムゾーンを考慮した日付取得
function getCurrentDateWithTimezone(timezone = "Asia/Tokyo") {
  const now = new Date();
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export const execGetCurrentDateLog = () => {
  // 使用例
  console.log("基本的な日付オブジェクト:", getCurrentDate());
  console.log("YYYY-MM-DD形式:", getCurrentDateString());
  console.log("日本語形式:", getCurrentDateJapanese());
  console.log("日時含む:", getCurrentDateTime());
  console.log(
    "カスタムフォーマット:",
    getCurrentDateFormatted("YYYY年MM月DD日 HH:mm:ss")
  );
  console.log("タイムゾーン指定:", getCurrentDateWithTimezone());
};
