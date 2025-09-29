"use client";
import React from "react";
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import "survey-core/survey-core.css";

const surveyJson = {
  title: "ユーザーアンケート",
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "text",
          name: "username",
          title: "あなたの名前は？",
        },
        {
          type: "radiogroup",
          name: "experience",
          title: "Reactの経験は？",
          choices: ["初心者", "中級者", "上級者"],
        },
        {
          type: "panel", // グループ化
          name: "favoriteLangsGroup",
          title: "プログラミング言語の選択",
          elements: [
            {
              type: "dropdown",
              name: "favoriteLang1",
              title: "第一候補",
              choices: ["JavaScript", "TypeScript", "Python", "Go", "Rust"],
              placeholder: "選択してください",
            },
            {
              type: "dropdown",
              name: "favoriteLang2",
              title: "第二候補",
              choices: ["JavaScript", "TypeScript", "Python", "Go", "Rust"],
              placeholder: "選択してください",
            },
          ],
        },
      ],
    },
  ],
};

// 独自テーマ JSON
const customTheme = {
  cssVariables: {
    "--sjs-primary-backcolor": "#1d4ed8",
    "--sjs-primary-forecolor": "#ffffff",
    "--sjs-general-backcolor": "#f9fafb",
    "--sjs-general-forecolor": "#111827",
    "--sjs-corner-radius": "0.5rem",
    "--sjs-base-unit": "8px",
    "--sjs-border-default": "#d1d5db",
    "--sjs-border-light": "#e5e7eb",
    "--sjs-font-questiontitle-color": "#374151",
    "--sjs-font-questiondescription-color": "#6b7280",
    "--sjs-font-surveytitle-size": "1.5rem",
    "--sjs-shadow-small": "0 1px 2px rgba(0,0,0,0.05)",
  },
  // パネル固有のスタイルを上書き
  themeName: "custom",
  colorPalette: "light",
  backgroundImage: "",
  backgroundOpacity: 1,
  css: {
    panel: "custom-panel", // 独自クラスを割り当て
  },
};

// Tailwind や独自 CSS に適用
const styles = `
  .custom-panel {
    background-color: #eef2ff; /* グループ背景色 */
    padding: 1rem;
    border-radius: 0.5rem;
    margin-top: 1rem;
  }
`;

const SurveyComponent = () => {
  const survey = new Model(surveyJson);

  survey.applyTheme(themeJson);

  survey.onComplete.add((sender) => {
    console.log("回答:", sender.data);
  });

  return (
    <>
      <style>{styles}</style>
      <Survey model={survey} />
    </>
  );
};

export default SurveyComponent;

const themeJson = {
  themeName: "custom", // テーマ名
  colorPalette: "light", // カラーパレットの種類。light / dark など
  isPanelless: true, // trueにするとパネルの境界線が消える（パネル表示なし）
  backgroundImage: "", // 全体背景画像URL
  backgroundOpacity: 1, // 背景画像の透明度 0~1
  backgroundImageAttachment: "scroll" as const, // 背景画像のスクロール挙動（scroll / fixed）
  backgroundImageFit: "cover" as const, // 背景画像の表示方法（cover / contain）
  cssVariables: {
    "--sjs-editorpanel-backcolor": "rgba(158, 117, 159, 0.5)", // エディタパネル背景色（推定）
    "--sjs-editorpanel-hovercolor": "rgba(244, 244, 249, 1)", // パネルにマウスオーバーしたときの色（推定）
    "--sjs-questionpanel-hovercolor": "rgba(244, 244, 249, 1)", // 質問パネルのホバー色（推定）
    "--sjs-corner-radius": "4px", // 角の丸み
    "--sjs-base-unit": "8px", // 全体のスペーシング基準（padding/marginなどに影響）
    "--sjs-font-pagetitle-size": "20px", // ページタイトルのフォントサイズ
    "--sjs-font-pagetitle-color": "rgba(52, 50, 62, 1)", // ページタイトルの文字色
    "--sjs-shadow-small":
      "0px 0px 0px 1px rgba(52, 50, 62, 0.05), 0px 1px 2px 0px rgba(52, 50, 62, 0.15)", // 小さめの影（推定）
    "--sjs-font-questiontitle-color": "rgba(52, 50, 62, 1)", // 質問タイトル文字色
    "--sjs-font-questiondescription-color": "rgba(52, 50, 62, 0.5)", // 質問説明文文字色（推定）
    "--sjs-shadow-inner": "0px 1px 2px 0px rgba(52, 50, 62, 0.15)", // 内側の影（推定）
    "--sjs-font-editorfont-weight": "700", // エディタでのフォント太さ（推定）
    "--sjs-font-editorfont-color": "rgba(255, 255, 255, 1)", // エディタでのフォント色（推定）
    "--sjs-font-editorfont-placeholdercolor": "rgba(52, 50, 62, 0.5)", // エディタのプレースホルダー色（推定）
    "--sjs-border-default": "rgba(52, 50, 62, 0.25)", // 標準のボーダー色
    "--sjs-border-light": "rgba(52, 50, 62, 0.15)", // 薄めのボーダー色
    "--sjs-general-backcolor": "rgba(255, 255, 255, 1)", // 全体背景色
    "--sjs-general-backcolor-dark": "rgba(248, 248, 248, 1)", // ダークモードの背景色（推定）
    "--sjs-general-backcolor-dim-light": "rgba(255, 255, 255, 1)", // 薄め背景色（推定）
    "--sjs-general-backcolor-dim-dark": "rgba(243, 243, 243, 1)", // 薄め背景色（ダーク）（推定）
    "--sjs-general-forecolor": "rgba(0, 0, 0, 0.91)", // 全体文字色
    "--sjs-general-forecolor-light": "rgba(0, 0, 0, 0.45)", // 薄め文字色
    "--sjs-general-dim-forecolor": "rgba(0, 0, 0, 0.91)", // ディム文字色（推定）
    "--sjs-general-dim-forecolor-light": "rgba(0, 0, 0, 0.45)", // 薄めディム文字色（推定）
    "--sjs-secondary-backcolor": "rgba(255, 152, 20, 1)", // セカンダリボタン背景色
    "--sjs-secondary-backcolor-light": "rgba(255, 152, 20, 0.1)", // セカンダリ薄背景色
    "--sjs-secondary-backcolor-semi-light": "rgba(255, 152, 20, 0.25)", // 半透明背景色（推定）
    "--sjs-secondary-forecolor": "rgba(255, 255, 255, 1)", // セカンダリ文字色
    "--sjs-secondary-forecolor-light": "rgba(255, 255, 255, 0.25)", // セカンダリ薄文字色
    "--sjs-shadow-small-reset":
      "0px 0px 0px 0px rgba(0, 0, 0, 0.03), 0px 0px 0px 0px rgba(0, 0, 0, 0.1)", // 影リセット（推定）
    "--sjs-shadow-medium": "0px 2px 6px 0px rgba(0, 0, 0, 0.1)", // 中影
    "--sjs-shadow-large": "0px 8px 16px 0px rgba(0, 0, 0, 0.1)", // 大影
    "--sjs-shadow-inner-reset": "0px 0px 0px 0px rgba(52, 50, 62, 0.15)", // 内側影リセット
    "--sjs-border-inside": "rgba(0, 0, 0, 0.16)", // 内側ボーダー（推定）
    "--sjs-special-red-forecolor": "rgba(255, 255, 255, 1)", // 赤系強調文字色
    "--sjs-special-green": "rgba(25, 179, 148, 1)", // 緑系強調背景色
    "--sjs-special-green-light": "rgba(25, 179, 148, 0.1)", // 緑系薄背景色
    "--sjs-special-green-forecolor": "rgba(255, 255, 255, 1)", // 緑系文字色
    "--sjs-special-blue": "rgba(67, 127, 217, 1)", // 青系強調背景色
    "--sjs-special-blue-light": "rgba(67, 127, 217, 0.1)", // 青系薄背景色
    "--sjs-special-blue-forecolor": "rgba(255, 255, 255, 1)", // 青系文字色
    "--sjs-special-yellow": "rgba(255, 152, 20, 1)", // 黄系強調背景色
    "--sjs-special-yellow-light": "rgba(255, 152, 20, 0.1)", // 黄系薄背景色
    "--sjs-special-yellow-forecolor": "rgba(255, 255, 255, 1)", // 黄系文字色
    // 以降 article フォント系
    "--sjs-article-font-xx-large-*": "...", // 記事ページや説明文の超大文字フォントスタイル
    "--sjs-article-font-x-large-*": "...", // 大文字フォント
    "--sjs-article-font-large-*": "...", // 大文字フォント（推定）
    "--sjs-article-font-medium-*": "...", // 中文字フォント
    "--sjs-article-font-default-*": "...", // 標準文字フォント
    "--sjs-general-backcolor-dim": "#F8F8F6", // 薄め背景色
    "--sjs-primary-backcolor": "rgba(52, 50, 62, 1)", // プライマリボタン背景色
    "--sjs-primary-backcolor-dark": "rgba(107, 103, 126, 1)", // ダーク版プライマリ背景色
    "--sjs-primary-backcolor-light": "rgba(227, 227, 237, 1)", // 明るめプライマリ背景色
    "--sjs-primary-forecolor": "rgba(255, 255, 255, 1)", // プライマリ文字色
    "--sjs-primary-forecolor-light": "rgba(255, 255, 255, 0.25)", // 薄め文字色
    "--sjs-special-red": "rgba(229, 10, 62, 1)", // 赤系強調背景色
    "--sjs-special-red-light": "rgba(229, 10, 62, 0.1)", // 薄赤系背景色
    "--sjs-font-surveytitle-size": "24px", // アンケートタイトル文字サイズ
    "--sjs-font-headerdescription-color": "rgba(255, 255, 255, 1)", // ヘッダ説明文文字色
    "--sjs-header-backcolor": "transparent", // ヘッダ背景色
  },
  header: {
    height: 320, // ヘッダ高さ
    textAreaWidth: 340, // ヘッダのテキスト領域幅（推定）
    backgroundImage:
      "https://api.surveyjs.io/private/Surveys/files?name=d00d0812-8687-4d6d-b8b8-cc895bdf1957", // ヘッダ背景画像URL
    logoPositionX: "left" as const, // ロゴの水平位置
    descriptionPositionX: "right" as const, // 説明文の水平位置
  },
  headerView: "advanced" as const, // ヘッダ表示スタイル（advanced / default）
};
