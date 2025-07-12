export const CATEGORIES_TWCSS = [
  {
    name: "Layout",
    description:
      "レイアウトの基本構造を決定するクラス群。要素の配置方法やコンテナの振る舞いを制御します。",
    items: [
      {
        class: "flex",
        description: "フレックスボックスコンテナを作成",
        css: "display: flex;",
        meaning:
          "子要素を柔軟にレイアウトできるコンテナにする。要素を横並びや縦並びに配置する際の基本クラス。",
        demo: "flex",
      },
      {
        class: "flex-col",
        description: "フレックスアイテムを縦方向に配置",
        css: "flex-direction: column;",
        meaning:
          "flex要素の子要素を縦方向（上から下）に並べる。デフォルトは横方向なので、縦配置にしたい場合に使用。",
        demo: "flex flex-col",
      },
      {
        class: "flex-row",
        description: "フレックスアイテムを横方向に配置（デフォルト）",
        css: "flex-direction: row;",
        meaning:
          "flex要素の子要素を横方向（左から右）に並べる。flexのデフォルト値だが、明示的に指定したい場合に使用。",
        demo: "flex flex-row",
      },
      {
        class: "justify-center",
        description: "メイン軸の中央に配置",
        css: "justify-content: center;",
        meaning:
          "flex要素の子要素を、メイン軸（flex-rowなら横方向、flex-colなら縦方向）の中央に配置。",
        demo: "flex justify-center",
      },
      {
        class: "justify-between",
        description: "メイン軸の両端に配置し、間隔を均等に",
        css: "justify-content: space-between;",
        meaning:
          "最初と最後の要素を両端に配置し、残りの要素を間隔を均等にして配置。ナビゲーションなどでよく使用。",
        demo: "flex justify-between",
      },
      {
        class: "items-center",
        description: "クロス軸の中央に配置",
        css: "align-items: center;",
        meaning:
          "flex要素の子要素を、クロス軸（flex-rowなら縦方向、flex-colなら横方向）の中央に配置。",
        demo: "flex items-center",
      },
      {
        class: "items-start",
        description: "クロス軸の開始位置に配置",
        css: "align-items: flex-start;",
        meaning:
          "flex要素の子要素を、クロス軸の開始位置（上端または左端）に配置。",
        demo: "flex items-start",
      },
      {
        class: "grid",
        description: "グリッドコンテナを作成",
        css: "display: grid;",
        meaning:
          "子要素を格子状に配置できるコンテナにする。複雑なレイアウトや整然とした配置に使用。",
        demo: "grid",
      },
      {
        class: "grid-cols-2",
        description: "2列のグリッドを作成",
        css: "grid-template-columns: repeat(2, minmax(0, 1fr));",
        meaning:
          "グリッドを2列に分割。各列は等幅で、利用可能なスペースを均等に分配。",
        demo: "grid grid-cols-2",
      },
      {
        class: "grid-cols-3",
        description: "3列のグリッドを作成",
        css: "grid-template-columns: repeat(3, minmax(0, 1fr));",
        meaning:
          "グリッドを3列に分割。各列は等幅で、利用可能なスペースを均等に分配。",
        demo: "grid grid-cols-3",
      },
      {
        class: "gap-4",
        description: "要素間の間隔を1rem（16px）に設定",
        css: "gap: 1rem;",
        meaning:
          "flexやgridコンテナ内の子要素間の間隔を設定。marginと違い、外側には余白が付かない。",
        demo: "flex gap-4",
      },
      {
        class: "gap-2",
        description: "要素間の間隔を0.5rem（8px）に設定",
        css: "gap: 0.5rem;",
        meaning:
          "flexやgridコンテナ内の子要素間の間隔を設定。gap-4より狭い間隔。",
        demo: "flex gap-2",
      },
    ],
  },
  {
    name: "Spacing",
    description:
      "パディング（内側の余白）とマージン（外側の余白）を制御するクラス群。要素間の距離や内部の空間を調整します。",
    items: [
      {
        class: "p-4",
        description: "全方向に1rem（16px）の内側余白",
        css: "padding: 1rem;",
        meaning:
          "要素の内側に16pxの余白を設定。コンテンツと境界の間に空間を作る。",
        demo: "p-4",
      },
      {
        class: "p-2",
        description: "全方向に0.5rem（8px）の内側余白",
        css: "padding: 0.5rem;",
        meaning: "要素の内側に8pxの余白を設定。p-4より狭い余白。",
        demo: "p-2",
      },
      {
        class: "p-8",
        description: "全方向に2rem（32px）の内側余白",
        css: "padding: 2rem;",
        meaning: "要素の内側に32pxの余白を設定。p-4より広い余白。",
        demo: "p-8",
      },
      {
        class: "px-4",
        description: "左右に1rem（16px）の内側余白",
        css: "padding-left: 1rem; padding-right: 1rem;",
        meaning: "要素の左右のみに16pxの余白を設定。上下には余白が付かない。",
        demo: "px-4",
      },
      {
        class: "py-2",
        description: "上下に0.5rem（8px）の内側余白",
        css: "padding-top: 0.5rem; padding-bottom: 0.5rem;",
        meaning: "要素の上下のみに8pxの余白を設定。左右には余白が付かない。",
        demo: "py-2",
      },
      {
        class: "m-4",
        description: "全方向に1rem（16px）の外側余白",
        css: "margin: 1rem;",
        meaning: "要素の外側に16pxの余白を設定。他の要素との間に距離を作る。",
        demo: "m-4",
      },
      {
        class: "m-2",
        description: "全方向に0.5rem（8px）の外側余白",
        css: "margin: 0.5rem;",
        meaning: "要素の外側に8pxの余白を設定。m-4より狭い余白。",
        demo: "m-2",
      },
      {
        class: "mx-auto",
        description: "左右マージンを自動調整（中央寄せ）",
        css: "margin-left: auto; margin-right: auto;",
        meaning: "ブロック要素を親要素の中央に配置。width設定が必要。",
        demo: "mx-auto",
      },
      {
        class: "mt-4",
        description: "上に1rem（16px）の外側余白",
        css: "margin-top: 1rem;",
        meaning: "要素の上のみに16pxの余白を設定。要素を下に押し下げる。",
        demo: "mt-4",
      },
      {
        class: "mb-2",
        description: "下に0.5rem（8px）の外側余白",
        css: "margin-bottom: 0.5rem;",
        meaning: "要素の下のみに8pxの余白を設定。次の要素との間に距離を作る。",
        demo: "mb-2",
      },
    ],
  },
  {
    name: "Typography",
    description:
      "テキストの見た目を制御するクラス群。文字サイズ、太さ、配置などを調整します。",
    items: [
      {
        class: "text-sm",
        description: "小さいフォントサイズ",
        css: "font-size: 0.875rem; line-height: 1.25rem;",
        meaning: "14pxの文字サイズ。キャプションや補足テキストに使用。",
        demo: "text-sm",
      },
      {
        class: "text-base",
        description: "基本フォントサイズ",
        css: "font-size: 1rem; line-height: 1.5rem;",
        meaning: "16pxの文字サイズ。通常の本文テキストに使用。",
        demo: "text-base",
      },
      {
        class: "text-lg",
        description: "大きいフォントサイズ",
        css: "font-size: 1.125rem; line-height: 1.75rem;",
        meaning: "18pxの文字サイズ。強調したいテキストに使用。",
        demo: "text-lg",
      },
      {
        class: "text-xl",
        description: "特大フォントサイズ",
        css: "font-size: 1.25rem; line-height: 1.75rem;",
        meaning: "20pxの文字サイズ。小見出しに使用。",
        demo: "text-xl",
      },
      {
        class: "text-2xl",
        description: "2倍大きいフォントサイズ",
        css: "font-size: 1.5rem; line-height: 2rem;",
        meaning: "24pxの文字サイズ。中見出しに使用。",
        demo: "text-2xl",
      },
      {
        class: "text-3xl",
        description: "3倍大きいフォントサイズ",
        css: "font-size: 1.875rem; line-height: 2.25rem;",
        meaning: "30pxの文字サイズ。大見出しに使用。",
        demo: "text-3xl",
      },
      {
        class: "font-bold",
        description: "太字フォント",
        css: "font-weight: 700;",
        meaning: "テキストを太字にする。見出しや強調したい部分に使用。",
        demo: "font-bold",
      },
      {
        class: "font-medium",
        description: "中程度の太さのフォント",
        css: "font-weight: 500;",
        meaning: "テキストを中程度の太さにする。通常と太字の中間。",
        demo: "font-medium",
      },
      {
        class: "font-light",
        description: "細いフォント",
        css: "font-weight: 300;",
        meaning: "テキストを細字にする。エレガントな印象を与える。",
        demo: "font-light",
      },
      {
        class: "text-center",
        description: "テキストを中央揃え",
        css: "text-align: center;",
        meaning: "テキストを要素の中央に配置。見出しなどでよく使用。",
        demo: "text-center",
      },
      {
        class: "text-left",
        description: "テキストを左揃え",
        css: "text-align: left;",
        meaning: "テキストを左側に配置。通常のテキストのデフォルト。",
        demo: "text-left",
      },
      {
        class: "text-right",
        description: "テキストを右揃え",
        css: "text-align: right;",
        meaning: "テキストを右側に配置。価格表示などでよく使用。",
        demo: "text-right",
      },
    ],
  },
  {
    name: "Colors",
    description:
      "テキストの色と背景色を制御するクラス群。グレースケールから各種カラーまで幅広く対応します。",
    items: [
      {
        class: "text-gray-900",
        description: "非常に濃いグレーのテキスト",
        css: "color: #111827;",
        meaning: "ほぼ黒に近い濃いグレー。メインテキストに使用。",
        demo: "text-gray-900",
      },
      {
        class: "text-gray-600",
        description: "中程度のグレーのテキスト",
        css: "color: #4B5563;",
        meaning: "中程度のグレー。サブテキストや説明文に使用。",
        demo: "text-gray-600",
      },
      {
        class: "text-gray-400",
        description: "薄いグレーのテキスト",
        css: "color: #9CA3AF;",
        meaning: "薄いグレー。プレースホルダーや非アクティブなテキストに使用。",
        demo: "text-gray-400",
      },
      {
        class: "text-blue-600",
        description: "青色のテキスト",
        css: "color: #2563EB;",
        meaning: "中程度の青色。リンクやアクション要素に使用。",
        demo: "text-blue-600",
      },
      {
        class: "text-red-600",
        description: "赤色のテキスト",
        css: "color: #DC2626;",
        meaning: "中程度の赤色。エラーメッセージや警告に使用。",
        demo: "text-red-600",
      },
      {
        class: "text-green-600",
        description: "緑色のテキスト",
        css: "color: #16A34A;",
        meaning: "中程度の緑色。成功メッセージや正常状態に使用。",
        demo: "text-green-600",
      },
      {
        class: "bg-white",
        description: "白色の背景",
        css: "background-color: #FFFFFF;",
        meaning: "純白の背景色。カードやモーダルなどに使用。",
        demo: "bg-white",
      },
      {
        class: "bg-gray-100",
        description: "非常に薄いグレーの背景",
        css: "background-color: #F3F4F6;",
        meaning: "非常に薄いグレーの背景。ページの背景やセクション分けに使用。",
        demo: "bg-gray-100",
      },
      {
        class: "bg-gray-800",
        description: "濃いグレーの背景",
        css: "background-color: #1F2937;",
        meaning: "濃いグレーの背景。ダークモードやヘッダーに使用。",
        demo: "bg-gray-800",
      },
      {
        class: "bg-blue-500",
        description: "青色の背景",
        css: "background-color: #3B82F6;",
        meaning: "中程度の青色の背景。プライマリボタンに使用。",
        demo: "bg-blue-500",
      },
      {
        class: "bg-red-500",
        description: "赤色の背景",
        css: "background-color: #EF4444;",
        meaning: "中程度の赤色の背景。エラーボタンや警告に使用。",
        demo: "bg-red-500",
      },
      {
        class: "bg-green-500",
        description: "緑色の背景",
        css: "background-color: #22C55E;",
        meaning: "中程度の緑色の背景。成功ボタンや確認に使用。",
        demo: "bg-green-500",
      },
    ],
  },
  {
    name: "Borders",
    description:
      "境界線と角丸を制御するクラス群。要素の輪郭や形状を調整します。",
    items: [
      {
        class: "border",
        description: "1pxの境界線",
        css: "border-width: 1px;",
        meaning: "要素の周囲に1pxの境界線を追加。デフォルトは薄いグレー。",
        demo: "border",
      },
      {
        class: "border-2",
        description: "2pxの境界線",
        css: "border-width: 2px;",
        meaning: "要素の周囲に2pxの境界線を追加。borderより太い線。",
        demo: "border-2",
      },
      {
        class: "border-gray-300",
        description: "薄いグレーの境界線色",
        css: "border-color: #D1D5DB;",
        meaning: "境界線の色を薄いグレーに設定。フォームなどでよく使用。",
        demo: "border border-gray-300",
      },
      {
        class: "border-blue-500",
        description: "青色の境界線色",
        css: "border-color: #3B82F6;",
        meaning: "境界線の色を青色に設定。フォーカス状態などに使用。",
        demo: "border border-blue-500",
      },
      {
        class: "rounded",
        description: "小さい角丸",
        css: "border-radius: 0.25rem;",
        meaning: "要素の角を4pxの半径で丸くする。ボタンやカードに使用。",
        demo: "rounded",
      },
      {
        class: "rounded-lg",
        description: "大きい角丸",
        css: "border-radius: 0.5rem;",
        meaning: "要素の角を8pxの半径で丸くする。カードやモーダルに使用。",
        demo: "rounded-lg",
      },
      {
        class: "rounded-full",
        description: "完全な円形",
        css: "border-radius: 9999px;",
        meaning: "要素を完全な円形または楕円形にする。アバターやボタンに使用。",
        demo: "rounded-full",
      },
      {
        class: "rounded-none",
        description: "角丸なし",
        css: "border-radius: 0px;",
        meaning:
          "角丸を完全に無効化。デフォルトの角丸をリセットしたい場合に使用。",
        demo: "rounded-none",
      },
    ],
  },
  {
    name: "Sizing",
    description:
      "要素の幅と高さを制御するクラス群。レスポンシブデザインにも対応します。",
    items: [
      {
        class: "w-full",
        description: "幅を100%に設定",
        css: "width: 100%;",
        meaning: "要素の幅を親要素の100%に設定。フルワイズのレイアウトに使用。",
        demo: "w-full",
      },
      {
        class: "w-1/2",
        description: "幅を50%に設定",
        css: "width: 50%;",
        meaning: "要素の幅を親要素の50%に設定。2列レイアウトに使用。",
        demo: "w-1/2",
      },
      {
        class: "w-1/3",
        description: "幅を33.333%に設定",
        css: "width: 33.333333%;",
        meaning: "要素の幅を親要素の1/3に設定。3列レイアウトに使用。",
        demo: "w-1/3",
      },
      {
        class: "w-1/4",
        description: "幅を25%に設定",
        css: "width: 25%;",
        meaning: "要素の幅を親要素の25%に設定。4列レイアウトに使用。",
        demo: "w-1/4",
      },
      {
        class: "w-auto",
        description: "幅を自動調整",
        css: "width: auto;",
        meaning: "要素の幅をコンテンツに応じて自動調整。デフォルト値。",
        demo: "w-auto",
      },
      {
        class: "h-full",
        description: "高さを100%に設定",
        css: "height: 100%;",
        meaning:
          "要素の高さを親要素の100%に設定。フルハイトのレイアウトに使用。",
        demo: "h-full",
      },
      {
        class: "h-screen",
        description: "高さを画面全体に設定",
        css: "height: 100vh;",
        meaning:
          "要素の高さを画面（ビューポート）全体に設定。ランディングページなどに使用。",
        demo: "h-screen",
      },
      {
        class: "h-64",
        description: "高さを16rem（256px）に設定",
        css: "height: 16rem;",
        meaning: "要素の高さを256pxに設定。カードやイメージコンテナに使用。",
        demo: "h-64",
      },
      {
        class: "h-32",
        description: "高さを8rem（128px）に設定",
        css: "height: 8rem;",
        meaning: "要素の高さを128pxに設定。中程度の高さのコンテナに使用。",
        demo: "h-32",
      },
      {
        class: "h-16",
        description: "高さを4rem（64px）に設定",
        css: "height: 4rem;",
        meaning: "要素の高さを64pxに設定。ボタンやナビゲーションバーに使用。",
        demo: "h-16",
      },
    ],
  },
  {
    name: "Position",
    description:
      "要素の位置を制御するクラス群。絶対位置指定や重ね順を調整します。",
    items: [
      {
        class: "relative",
        description: "相対位置指定",
        css: "position: relative;",
        meaning:
          "要素を通常の位置から相対的に配置。子要素の絶対位置の基準点にもなる。",
        demo: "relative",
      },
      {
        class: "absolute",
        description: "絶対位置指定",
        css: "position: absolute;",
        meaning:
          "要素を通常の流れから外し、最も近い位置指定された祖先要素から絶対位置で配置。",
        demo: "absolute",
      },
      {
        class: "fixed",
        description: "固定位置指定",
        css: "position: fixed;",
        meaning:
          "要素を画面に固定。スクロールしても位置が変わらない。ヘッダーなどに使用。",
        demo: "fixed",
      },
      {
        class: "sticky",
        description: "スティッキー位置指定",
        css: "position: sticky;",
        meaning:
          "要素を通常の流れで配置するが、スクロール時に指定位置で固定される。",
        demo: "sticky",
      },
      {
        class: "top-0",
        description: "上端を0に設定",
        css: "top: 0px;",
        meaning: "位置指定された要素の上端を基準点から0pxの位置に配置。",
        demo: "absolute top-0",
      },
      {
        class: "right-0",
        description: "右端を0に設定",
        css: "right: 0px;",
        meaning: "位置指定された要素の右端を基準点から0pxの位置に配置。",
        demo: "absolute right-0",
      },
      {
        class: "bottom-0",
        description: "下端を0に設定",
        css: "bottom: 0px;",
        meaning: "位置指定された要素の下端を基準点から0pxの位置に配置。",
        demo: "absolute bottom-0",
      },
      {
        class: "left-0",
        description: "左端を0に設定",
        css: "left: 0px;",
        meaning: "位置指定された要素の左端を基準点から0pxの位置に配置。",
        demo: "absolute left-0",
      },
      {
        class: "z-10",
        description: "重ね順を10に設定",
        css: "z-index: 10;",
        meaning: "要素の重ね順を10に設定。数値が大きいほど前面に表示される。",
        demo: "z-10",
      },
      {
        class: "z-20",
        description: "重ね順を20に設定",
        css: "z-index: 20;",
        meaning: "要素の重ね順を20に設定。z-10より前面に表示される。",
        demo: "z-20",
      },
    ],
  },
  {
    name: "Effects",
    items: [
      {
        class: "shadow-lg",
        description: "大きい影",
        css: "box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);",
        meaning: "要素に大きな影を追加。目立たせたいカードやモーダルに使用。",
        demo: "shadow-lg",
      },
      {
        class: "shadow-xl",
        description: "特大の影",
        css: "box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);",
        meaning: "要素に特大の影を追加。強い立体感を演出したい場合に使用。",
        demo: "shadow-xl",
      },
      {
        class: "shadow-none",
        description: "影なし",
        css: "box-shadow: none;",
        meaning:
          "要素の影を完全に無効化。デフォルトの影をリセットしたい場合に使用。",
        demo: "shadow-none",
      },
      {
        class: "opacity-100",
        description: "完全不透明",
        css: "opacity: 1;",
        meaning: "要素を完全に不透明にする。デフォルト値。",
        demo: "opacity-100",
      },
      {
        class: "opacity-75",
        description: "75%の透明度",
        css: "opacity: 0.75;",
        meaning: "要素を25%透明にする。軽い透明効果。",
        demo: "opacity-75",
      },
      {
        class: "opacity-50",
        description: "50%の透明度",
        css: "opacity: 0.5;",
        meaning: "要素を50%透明にする。半透明効果。",
        demo: "opacity-50",
      },
      {
        class: "opacity-25",
        description: "25%の透明度",
        css: "opacity: 0.25;",
        meaning: "要素を75%透明にする。かなり薄い表示。",
        demo: "opacity-25",
      },
      {
        class: "opacity-0",
        description: "完全透明",
        css: "opacity: 0;",
        meaning: "要素を完全に透明にする。見えないが領域は占有。",
        demo: "opacity-0",
      },
      {
        class: "hover:shadow-lg",
        description: "ホバー時に大きい影",
        css: "&:hover { box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1); }",
        meaning: "マウスホバー時に大きな影を追加。インタラクティブな効果。",
        demo: "hover:shadow-lg",
      },
      {
        class: "hover:opacity-75",
        description: "ホバー時に透明度75%",
        css: "&:hover { opacity: 0.75; }",
        meaning: "マウスホバー時に透明度を75%にする。フェード効果。",
        demo: "hover:opacity-75",
      },
      {
        class: "transition",
        description: "基本的なトランジション",
        css: "transition: all 150ms ease-in-out;",
        meaning:
          "全てのプロパティに150msのスムーズな変化を適用。ホバー効果などに使用。",
        demo: "transition",
      },
      {
        class: "transition-all",
        description: "全プロパティのトランジション",
        css: "transition: all 150ms ease-in-out;",
        meaning: "全てのプロパティの変化にトランジション効果を適用。",
        demo: "transition-all",
      },
      {
        class: "transition-opacity",
        description: "透明度のトランジション",
        css: "transition: opacity 150ms ease-in-out;",
        meaning: "透明度の変化のみにトランジション効果を適用。",
        demo: "transition-opacity",
      },
      {
        class: "duration-300",
        description: "トランジション時間300ms",
        css: "transition-duration: 300ms;",
        meaning: "トランジション効果の持続時間を300msに設定。",
        demo: "transition duration-300",
      },
      {
        class: "ease-in-out",
        description: "イーズイン・アウト",
        css: "transition-timing-function: ease-in-out;",
        meaning: "開始と終了をゆっくりにするトランジション。自然な動きを演出。",
        demo: "transition ease-in-out",
      },
      {
        class: "transform",
        description: "変形を有効化",
        css: "transform: translateX(0) translateY(0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1);",
        meaning: "要素の変形を有効化。他のtransformクラスと組み合わせて使用。",
        demo: "transform",
      },
      {
        class: "scale-105",
        description: "5%拡大",
        css: "transform: scale(1.05);",
        meaning: "要素を5%拡大。ホバー効果でよく使用。",
        demo: "transform scale-105",
      },
      {
        class: "scale-95",
        description: "5%縮小",
        css: "transform: scale(0.95);",
        meaning: "要素を5%縮小。クリック時の効果などに使用。",
        demo: "transform scale-95",
      },
      {
        class: "rotate-45",
        description: "45度回転",
        css: "transform: rotate(45deg);",
        meaning: "要素を45度回転。アイコンやデザイン要素に使用。",
        demo: "transform rotate-45",
      },
      {
        class: "hover:scale-105",
        description: "ホバー時5%拡大",
        css: "&:hover { transform: scale(1.05); }",
        meaning: "マウスホバー時に要素を5%拡大。インタラクティブな効果。",
        demo: "transform hover:scale-105",
      },
    ],
  },
  {
    name: "Responsive",
    description:
      "レスポンシブデザインを制御するクラス群。画面サイズに応じて異なるスタイルを適用できます。",
    items: [
      {
        class: "sm:text-lg",
        description: "スマートフォン以上で大きいフォントサイズ",
        css: "@media (min-width: 640px) { font-size: 1.125rem; }",
        meaning:
          "640px以上の画面幅で18pxの文字サイズを適用。スマートフォンでは通常サイズ、タブレット以上で大きく表示。",
        demo: "sm:text-lg",
      },
      {
        class: "md:flex",
        description: "タブレット以上でフレックスボックス",
        css: "@media (min-width: 768px) { display: flex; }",
        meaning:
          "768px以上の画面幅でフレックスボックスを適用。スマートフォンでは縦並び、タブレット以上で横並び。",
        demo: "md:flex",
      },
      {
        class: "lg:grid-cols-3",
        description: "デスクトップ以上で3列グリッド",
        css: "@media (min-width: 1024px) { grid-template-columns: repeat(3, minmax(0, 1fr)); }",
        meaning:
          "1024px以上の画面幅で3列グリッドを適用。デスクトップで3列、タブレット以下では異なるレイアウト。",
        demo: "grid lg:grid-cols-3",
      },
      {
        class: "xl:px-8",
        description: "大型デスクトップ以上で左右パディング",
        css: "@media (min-width: 1280px) { padding-left: 2rem; padding-right: 2rem; }",
        meaning:
          "1280px以上の画面幅で左右に32pxのパディングを適用。大型画面でより広い余白を確保。",
        demo: "xl:px-8",
      },
      {
        class: "2xl:max-w-7xl",
        description: "特大デスクトップ以上で最大幅制限",
        css: "@media (min-width: 1536px) { max-width: 80rem; }",
        meaning:
          "1536px以上の画面幅で最大幅を1280pxに制限。超大型画面でのレイアウト崩れを防ぐ。",
        demo: "2xl:max-w-7xl",
      },
      {
        class: "sm:w-1/2",
        description: "スマートフォン以上で幅50%",
        css: "@media (min-width: 640px) { width: 50%; }",
        meaning:
          "640px以上の画面幅で要素の幅を50%に設定。小画面では全幅、大画面では半分の幅。",
        demo: "sm:w-1/2",
      },
      {
        class: "md:w-1/3",
        description: "タブレット以上で幅33%",
        css: "@media (min-width: 768px) { width: 33.333333%; }",
        meaning:
          "768px以上の画面幅で要素の幅を1/3に設定。タブレット以上で3列レイアウト。",
        demo: "md:w-1/3",
      },
      {
        class: "lg:w-1/4",
        description: "デスクトップ以上で幅25%",
        css: "@media (min-width: 1024px) { width: 25%; }",
        meaning:
          "1024px以上の画面幅で要素の幅を25%に設定。デスクトップで4列レイアウト。",
        demo: "lg:w-1/4",
      },
      {
        class: "hidden sm:block",
        description: "スマートフォンでは非表示、以上で表示",
        css: "display: none; @media (min-width: 640px) { display: block; }",
        meaning:
          "デフォルトでは非表示、640px以上で表示。モバイルでは隠したい要素に使用。",
        demo: "hidden sm:block",
      },
      {
        class: "sm:hidden",
        description: "スマートフォン以上で非表示",
        css: "@media (min-width: 640px) { display: none; }",
        meaning:
          "640px以上の画面幅で要素を非表示。モバイル専用コンテンツに使用。",
        demo: "sm:hidden",
      },
      {
        class: "md:absolute",
        description: "タブレット以上で絶対位置",
        css: "@media (min-width: 768px) { position: absolute; }",
        meaning:
          "768px以上の画面幅で絶対位置指定。画面サイズに応じて配置方法を変更。",
        demo: "md:absolute",
      },
      {
        class: "lg:relative",
        description: "デスクトップ以上で相対位置",
        css: "@media (min-width: 1024px) { position: relative; }",
        meaning:
          "1024px以上の画面幅で相対位置指定。大画面でのレイアウト調整に使用。",
        demo: "lg:relative",
      },
      {
        class: "sm:text-center",
        description: "スマートフォン以上で中央揃え",
        css: "@media (min-width: 640px) { text-align: center; }",
        meaning:
          "640px以上の画面幅でテキストを中央揃え。画面サイズに応じて配置を変更。",
        demo: "sm:text-center",
      },
      {
        class: "md:text-left",
        description: "タブレット以上で左揃え",
        css: "@media (min-width: 768px) { text-align: left; }",
        meaning:
          "768px以上の画面幅でテキストを左揃え。デスクトップでの読みやすさを向上。",
        demo: "md:text-left",
      },
      {
        class: "lg:justify-between",
        description: "デスクトップ以上で両端揃え",
        css: "@media (min-width: 1024px) { justify-content: space-between; }",
        meaning:
          "1024px以上の画面幅でflexアイテムを両端揃え。大画面でのナビゲーション配置に使用。",
        demo: "flex lg:justify-between",
      },
      {
        class: "xl:gap-8",
        description: "大型デスクトップ以上で大きい間隔",
        css: "@media (min-width: 1280px) { gap: 2rem; }",
        meaning:
          "1280px以上の画面幅で要素間の間隔を32pxに設定。大画面でより広い間隔を確保。",
        demo: "flex xl:gap-8",
      },
      {
        class: "sm:p-6",
        description: "スマートフォン以上で大きいパディング",
        css: "@media (min-width: 640px) { padding: 1.5rem; }",
        meaning:
          "640px以上の画面幅で24pxのパディングを適用。大画面でより広い余白を確保。",
        demo: "sm:p-6",
      },
      {
        class: "md:m-8",
        description: "タブレット以上で大きいマージン",
        css: "@media (min-width: 768px) { margin: 2rem; }",
        meaning:
          "768px以上の画面幅で32pxのマージンを適用。タブレット以上で要素間に広い間隔。",
        demo: "md:m-8",
      },
      {
        class: "lg:h-96",
        description: "デスクトップ以上で高さ384px",
        css: "@media (min-width: 1024px) { height: 24rem; }",
        meaning:
          "1024px以上の画面幅で要素の高さを384pxに設定。大画面でより大きな表示領域を確保。",
        demo: "lg:h-96",
      },
      {
        class: "max-w-sm mx-auto",
        description: "スマートフォン用最大幅で中央配置",
        css: "max-width: 24rem; margin-left: auto; margin-right: auto;",
        meaning:
          "最大幅を384pxに制限し中央配置。モバイルファーストなカードレイアウトに使用。",
        demo: "max-w-sm mx-auto",
      },
    ],
  },
];
