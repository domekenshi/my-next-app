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
//////////////////////////////////////////
// 曜日を取得する関数
//////////////////////////////////////////
// 7. 曜日を取得する関数（日本語）
function getCurrentDayOfWeek() {
  const now = new Date();
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return days[now.getDay()];
}

// 8. 曜日を取得する関数（英語）
function getCurrentDayOfWeekEn() {
  const now = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[now.getDay()];
}

// 9. 曜日を取得する関数（英語短縮形）
function getCurrentDayOfWeekShort() {
  const now = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[now.getDay()];
}

// 10. 日付と曜日をまとめて取得
function getCurrentDateWithDayOfWeek() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const dayOfWeek = getCurrentDayOfWeek();
  return `${year}-${month}-${day} (${dayOfWeek})`;
}

// 11. 指定した日付の曜日を取得
function getDayOfWeek(dateString: string) {
  const date = new Date(dateString);
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  return days[date.getDay()];
}

// 12. 日付の差分を計算（日数）
function getDaysDifference(date1: any, date2: any) {
  const d1: any = new Date(date1);
  const d2: any = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// 13. 指定日数後の日付を取得
function getDateAfterDays(days: any) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

// 14. 月の最初の日を取得
function getFirstDayOfMonth(year: any, month: any) {
  return new Date(year, month - 1, 1);
}

// 15. 月の最後の日を取得
function getLastDayOfMonth(year: any, month: any) {
  return new Date(year, month, 0);
}

// 16. 年齢を計算
function calculateAge(birthDate: any) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

// 17. 営業日判定（土日を除く）
function isBusinessDay(date: any) {
  const d = new Date(date);
  const day = d.getDay();
  return day !== 0 && day !== 6; // 0=日曜, 6=土曜
}

// 18. 次の営業日を取得
function getNextBusinessDay(date = new Date()) {
  const nextDay = new Date(date);
  do {
    nextDay.setDate(nextDay.getDate() + 1);
  } while (!isBusinessDay(nextDay));
  return nextDay;
}

// 19. 日付の妥当性チェック
function isValidDate(dateString: string) {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

// 20. 相対時間表示（○分前、○時間前など）
function getRelativeTime(date: any) {
  const now: any = new Date();
  const formatdate: any = new Date(date);
  const diff = now - formatdate;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}日前`;
  if (hours > 0) return `${hours}時間前`;
  if (minutes > 0) return `${minutes}分前`;
  return `${seconds}秒前`;
}

// 21. 日付範囲内かチェック
function isDateInRange(checkDate: any, startDate: any, endDate: any) {
  const check = new Date(checkDate);
  const start = new Date(startDate);
  const end = new Date(endDate);
  return check >= start && check <= end;
}

// 22. 月初から月末までの日付配列を生成
function getMonthDates(year: any, month: any) {
  const dates = [];
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  for (let d = new Date(firstDay); d <= lastDay; d.setDate(d.getDate() + 1)) {
    dates.push(new Date(d));
  }
  return dates;
}

// 23. 四半期を取得
function getQuarter(date = new Date()) {
  const month = new Date(date).getMonth() + 1;
  return Math.ceil(month / 3);
}

// 24. 時間を○時間○分形式に変換
function formatDuration(minutes: any) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0) {
    return `${hours}時間${mins > 0 ? `${mins}分` : ""}`;
  }
  return `${mins}分`;
}

// 25. タイムスタンプを日本語形式に変換
function timestampToJapanese(timestamp: any) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const dayOfWeek = getCurrentDayOfWeek();

  return `${year}年${month}月${day}日(${dayOfWeek}) ${hours}:${minutes}`;
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
  console.log("曜日（日本語）:", getCurrentDayOfWeek());
  console.log("曜日（英語）:", getCurrentDayOfWeekEn());
  console.log("曜日（英語短縮）:", getCurrentDayOfWeekShort());
  console.log("日付+曜日:", getCurrentDateWithDayOfWeek());
  console.log("指定日付の曜日:", getDayOfWeek("2024-12-25")); // クリスマスの曜日
  console.log("=== 実務でよく使う関数の例 ===");
  console.log(
    "日付差分:",
    getDaysDifference("2024-01-01", "2024-12-31") + "日"
  );
  console.log("7日後:", getDateAfterDays(7));
  console.log("今月の最初:", getFirstDayOfMonth(2024, 7));
  console.log("今月の最後:", getLastDayOfMonth(2024, 7));
  console.log("年齢計算:", calculateAge("1990-01-01") + "歳");
  console.log("営業日判定:", isBusinessDay("2024-07-17")); // 水曜日
  console.log("次の営業日:", getNextBusinessDay());
  console.log("相対時間:", getRelativeTime("2024-07-17T09:00:00"));
  console.log("四半期:", getQuarter() + "Q");
  console.log("時間フォーマット:", formatDuration(125)); // 2時間5分
};
