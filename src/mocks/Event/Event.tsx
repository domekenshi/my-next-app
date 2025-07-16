"use client";
import React, { useState } from "react";

const EventTester = () => {
  const [logs, setLogs] = useState<Record<string, string[]>>({});

  const addLog = (
    target: string,
    message: string,
    event?: React.SyntheticEvent
  ) => {
    const detail =
      event?.target instanceof HTMLElement
        ? ` [target: <${event.target.tagName.toLowerCase()}>]`
        : "";
    const newLog = `${new Date().toLocaleTimeString()} - ${message}${detail}`;

    setLogs((prev) => ({
      ...prev,
      [target]: [newLog, ...(prev[target] || [])].slice(0, 20),
    }));
  };

  const LogBox = ({ id }: { id: string }) => (
    <div style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
      <strong>{id} ログ:</strong>
      <div
        style={{
          maxHeight: "100px",
          overflowY: "auto",
          background: "#000",
          color: "#fff",
          padding: "0.5rem",
          border: "1px solid #ccc",
        }}
      >
        {(logs[id] || []).map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h2>イベントテスト画面</h2>

      <button
        onClick={(e: React.MouseEvent) => addLog("button", "onClick", e)}
        onFocus={(e: React.FocusEvent) => addLog("button", "onFocus", e)}
        onBlur={(e: React.FocusEvent) => addLog("button", "onBlur", e)}
      >
        ボタンテスト
      </button>
      <LogBox id="button" />

      <input
        placeholder="テキスト入力"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          addLog("input", "onChange", e)
        }
        onInput={(e: React.FormEvent<HTMLInputElement>) =>
          addLog("input", "onInput", e)
        }
        onFocus={(e: React.FocusEvent<HTMLInputElement>) =>
          addLog("input", "onFocus", e)
        }
        onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
          addLog("input", "onBlur", e)
        }
        onClick={(e: React.MouseEvent<HTMLInputElement>) =>
          addLog("input", "onClick", e)
        }
        style={{ display: "block", marginTop: "1rem" }}
      />
      <LogBox id="input" />

      <textarea
        placeholder="テキストエリア"
        onFocus={(e: React.FocusEvent<HTMLTextAreaElement>) =>
          addLog("textarea", "onFocus", e)
        }
        onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) =>
          addLog("textarea", "onBlur", e)
        }
        onInput={(e: React.FormEvent<HTMLTextAreaElement>) =>
          addLog("textarea", "onInput", e)
        }
        style={{ display: "block", marginTop: "1rem", width: "100%" }}
      />
      <LogBox id="textarea" />

      <form
        onSubmit={(e: React.FormEvent) => {
          e.preventDefault();
          addLog("form", "onSubmit", e);
        }}
        style={{ marginTop: "1rem" }}
      >
        <input placeholder="フォーム用input" />
        <button type="submit">送信</button>
      </form>
      <LogBox id="form" />

      <select
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          addLog("select", "onChange", e)
        }
        style={{ marginTop: "1rem" }}
      >
        <option
          onClick={(e: React.MouseEvent) => addLog("option", "onClick", e)}
        >
          選択肢A
        </option>
        <option>選択肢B</option>
      </select>
      <LogBox id="select" />
      <LogBox id="option" />

      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) =>
          addLog("div", "onClick", e)
        }
        onPointerDown={(e: React.PointerEvent<HTMLDivElement>) =>
          addLog("div", "onPointerDown", e)
        }
        style={{
          border: "1px solid black",
          height: "100px",
          overflow: "auto",
          marginTop: "1rem",
          padding: "0.5rem",
        }}
      >
        スクロール可能なdiv
        <div style={{ height: "200px" }} />
      </div>
      <LogBox id="div" />
    </div>
  );
};

export default EventTester;
