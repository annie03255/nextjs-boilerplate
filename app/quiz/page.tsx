// 前端頁面與後端 API 整合版，已連接 Gmail SMTP 寄送功能（Vercel-ready）

'use client';
import { useState } from "react";

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
    question: "如果要為自己選一個技能，你會選：",
    options: [
      { label: "精通解謎與觀察細節", value: "A" },
      { label: "能感知他人情緒與能量波動", value: "B" },
      { label: "動作俐落，身體反應超快、操作精準", value: "C" },
    ],
  },
  {
    question: "你喜歡的書／電影主角通常是：",
    options: [
      { label: "智慧型主角，靠邏輯解開謎團", value: "A" },
      { label: "溫暖型角色，有情感深度和幻想視角", value: "B" },
      { label: "行動派英雄，靠敏捷和執行力完成任務", value: "C" },
    ],
  },
  {
    question: "在團體中你通常是：",
    options: [
      { label: "負責分析與策略規劃", value: "A" },
      { label: "聯繫情感、拉近關係的潤滑劑", value: "B" },
      { label: "最先衝出去、帶頭行動的那個人", value: "C" },
    ],
  },
  {
    question: "你對旅行的想像是：",
    options: [
      { label: "參觀歷史景點、博物館", value: "A" },
      { label: "體驗當地文化、與人交流", value: "B" },
      { label: "探索自然地貌或動手冒險", value: "C" },
    ],
  },
  {
    question: "遇到困難時，你傾向：",
    options: [
      { label: "分析問題、查資料找解方", value: "A" },
      { label: "尋求支持、聽朋友建議", value: "B" },
      { label: "直接試著做做看，邊做邊解", value: "C" },
    ],
  },
  {
    question: "你覺得哪種節目最有趣？",
    options: [
      { label: "益智類、推理類節目", value: "A" },
      { label: "生活故事、溫馨感人節目", value: "B" },
      { label: "競速比賽、實境挑戰類", value: "C" },
    ],
  },
  {
    question: "下班／下課後最理想的放鬆方式是？",
    options: [
      { label: "靜靜做模型、玩桌遊", value: "A" },
      { label: "看動畫、畫畫、聽音樂", value: "B" },
      { label: "動手做東西或戶外活動", value: "C" },
    ],
  },
  {
    question: "你覺得小時候的你最像？",
    options: [
      { label: "好奇寶寶型，喜歡發問跟研究", value: "A" },
      { label: "幻想家型，喜歡玩扮家家酒", value: "B" },
      { label: "動作派型，喜歡拼裝、拆解東西", value: "C" },
    ],
  },
  {
    question: "你做出選擇時，通常依靠：",
    options: [
      { label: "理性分析、比較優缺點", value: "A" },
      { label: "情感直覺、內在感受", value: "B" },
      { label: "實際操作過的體驗或成果", value: "C" },
    ],
  },
  {
    question: "你對一份禮物最重視什麼？",
    options: [
      { label: "細節設計與概念創意", value: "A" },
      { label: "感情與回憶的連結", value: "B" },
      { label: "實用度與是否能馬上玩", value: "C" },
    ],
  },
];

export default function GiftQuiz() {
  const [answers, setAnswers] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[step] = value;
    setAnswers(newAnswers);
    setTimeout(() => {
      if (step < questions.length - 1) setStep(step + 1);
      else handleSubmit(newAnswers);
    }, 200);
  };

  const handleSubmit = async (finalAnswers: string[]) => {
    setSubmitted(true);
    const count = { A: 0, B: 0, C: 0 };
    finalAnswers.forEach((ans) => count[ans as keyof typeof count]++);
    const result = Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];

    await fetch("/api/send-result", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: "annieee0325@gmail.com",
        subject: "生日測驗結果",
        body: `使用者結果：${result}\n答案：${finalAnswers.join(", ")}`,
      }),
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-yellow-100 to-white p-4">
      <div className="max-w-xl w-full bg-white shadow-xl rounded-xl p-6 space-y-6">
        {!submitted ? (
          <>
            <h2 className="text-xl font-bold text-black">請選出最符合你的選項</h2>
            <div className="space-y-3 text-black">
              {questions[step].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className="w-full text-left p-4 border rounded-lg hover:bg-yellow-100 transition"
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="text-sm text-black text-center">
              問題 {step + 1} / {questions.length}
            </p>
          </>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold">感謝你的參與！</h2>
            <p className="text-gray-500 mt-2">我們已收到你的回覆 🎉</p>
          </div>
        )}
      </div>
    </div>
  );
}
