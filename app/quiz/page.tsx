'use client';
import { useState } from 'react';

const questions = [
  {
    question: "如果你要參加一場冒險，你會：",
    options: [
      { label: "破解遺跡的線索，一層層深入未知之地", value: "A" },
      { label: "與未知生物成為夥伴，共同度過險境", value: "B" },
      { label: "身體力行地跨越地形障礙，靠直覺與反應前進", value: "C" },
    ],
  },
  {
    question: "面對一件新挑戰，你最在意的是什麼？",
    options: [
      { label: "是否能學到一些知識或新觀點", value: "A" },
      { label: "是否能感受到情感或想像力的觸動", value: "B" },
      { label: "是否能實際操作、看到明確的成果與性能", value: "C" },
    ],
  },
  {
    question: "你最喜歡的玩具類型曾是：",
    options: [
      { label: "拼圖、模型或實驗玩具", value: "A" },
      { label: "有角色故事背景的收藏品", value: "B" },
      { label: "可動機械、組裝車、機器裝置", value: "C" },
    ],
  },
  {
    question: "如果生活是一部電影，你是哪一種主角？",
    options: [
      { label: "冷靜分析派，默默推進任務的人", value: "A" },
      { label: "情感豐富，常常活在幻想與真誠中", value: "B" },
      { label: "敢衝敢拼，速度和行動力掛帥的狠角色", value: "C" },
    ],
  },
  {
    question: "你希望收到的『理想驚喜』會是什麼感覺？",
    options: [
      { label: "精緻、有層次，讓人越看越有味道", value: "A" },
      { label: "有點可愛、有點感性，會心一笑那種", value: "B" },
      { label: "外型帥氣、動感，讓人忍不住動手玩", value: "C" },
    ],
  },
  {
    question: "你喜歡怎樣開始一天？",
    options: [
      { label: "聽一集知識型 podcast 或閱讀新知", value: "A" },
      { label: "看一段溫馨故事或搞笑影片", value: "B" },
      { label: "做幾組伸展或來點清醒運動", value: "C" },
    ],
  },
  {
    question: "旅行中，你最想體驗的是：",
    options: [
      { label: "參觀博物館與歷史遺跡", value: "A" },
      { label: "沉浸當地文化與傳說故事", value: "B" },
      { label: "冒險活動或嘗試刺激行程", value: "C" },
    ],
  },
  {
    question: "你處理問題的方式是：",
    options: [
      { label: "分析、拆解並一步步解決", value: "A" },
      { label: "感受情境、體會每個人的立場", value: "B" },
      { label: "直接動手試試，邊做邊調整", value: "C" },
    ],
  },
  {
    question: "你的工作習慣偏好：",
    options: [
      { label: "制定清晰流程、按步驟執行", value: "A" },
      { label: "氣氛和諧、有情感交流", value: "B" },
      { label: "快速試錯、當下修正與反應", value: "C" },
    ],
  },
  {
    question: "你對節日禮物的想像是：",
    options: [
      { label: "耐用、有質感的設計物件", value: "A" },
      { label: "有情感意義或故事的物品", value: "B" },
      { label: "能互動或讓我玩一玩的東西", value: "C" },
    ],
  },
  {
    question: "最讓你放鬆的活動是：",
    options: [
      { label: "動腦解謎、玩策略型桌遊", value: "A" },
      { label: "看動畫或小說、畫畫、寫字", value: "B" },
      { label: "實作、組裝、修理、手作", value: "C" },
    ],
  },
  {
    question: "你最欣賞哪種特質的人？",
    options: [
      { label: "思考深入、有邏輯力", value: "A" },
      { label: "真誠善良、情感細膩", value: "B" },
      { label: "動作快、反應力強", value: "C" },
    ],
  },
  {
    question: "你面對陌生環境時：",
    options: [
      { label: "先觀察，內心推敲可能的規則", value: "A" },
      { label: "觀察他人情緒與互動方式", value: "B" },
      { label: "直接試，邊走邊調整反應", value: "C" },
    ],
  },
  {
    question: "你處理突發狀況時：",
    options: [
      { label: "冷靜思考、找出最佳策略", value: "A" },
      { label: "安撫他人情緒、先共感再解決", value: "B" },
      { label: "迅速行動，邊做邊找出路", value: "C" },
    ],
  },
  {
    question: "你會選擇參加的課程類型：",
    options: [
      { label: "邏輯推理、數理、系統性思考相關", value: "A" },
      { label: "藝術、文學、心理相關", value: "B" },
      { label: "木工、機械、互動設計相關", value: "C" },
    ],
  },
];

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[step] = value;
    setAnswers(newAnswers);

    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      const count = { A: 0, B: 0, C: 0 };
      newAnswers.forEach((ans) => count[ans as keyof typeof count]++);
      const top = Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
      let text = '';
      if (top === 'A') text = '探索型禮物偏好者';
      else if (top === 'B') text = '情感型禮物偏好者';
      else text = '動感型禮物偏好者';
      setResult(text);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-purple-100 to-white">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-xl p-6">
        {!result ? (
          <>
            <h1 className="text-xl font-bold text-black mb-4">請選出最符合你的選項</h1>
            <p className="text-black font-semibold mb-3">{questions[step].question}</p>
            <div className="space-y-3">
              {questions[step].options.map((opt) => (
                <button
                  key={opt.value}
                  className="w-full p-3 border rounded-lg text-left hover:bg-gray-100 text-black"
                  onClick={() => handleSelect(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-500 text-center">
              問題 {step + 1} / {questions.length}
            </p>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold text-black">🎁 你的結果是：</h2>
            <p className="text-lg mt-4 text-black">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
