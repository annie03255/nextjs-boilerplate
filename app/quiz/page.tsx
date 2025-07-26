// 不依賴 @/components 的版本，使用原生 HTML + Tailwind，便於部署

'use client';

import { useState } from "react";
import { motion } from "framer-motion";

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
      { label: "可動機械、組裝零件、裝置型玩具", value: "C" },
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
    question: "放假時你比較傾向：",
    options: [
      { label: "探索博物館或歷史遺跡", value: "A" },
      { label: "看動畫、追劇或畫畫寫日記", value: "B" },
      { label: "參加運動或玩桌遊、玩具模型", value: "C" },
    ],
  },
  {
    question: "如果有個難題擺在眼前，你會：",
    options: [
      { label: "查資料、拆解問題、慢慢找方法", value: "A" },
      { label: "問朋友的看法，然後靠感覺選路線", value: "B" },
      { label: "直接試幾種方法，看哪個最有效", value: "C" },
    ],
  },
  {
    question: "你覺得理想中的禮物應該是：",
    options: [
      { label: "值得收藏與思考，越看越有意思", value: "A" },
      { label: "有點情懷與回憶，會讓人想抱緊處理", value: "B" },
      { label: "酷帥好動，拿到就會想立刻動手", value: "C" },
    ],
  },
  {
    question: "你覺得哪句形容最接近你？",
    options: [
      { label: "安靜觀察型，會默默研究和記錄", value: "A" },
      { label: "情感豐沛型，對人事物很有感觸", value: "B" },
      { label: "反應快行動派，會先做再說", value: "C" },
    ],
  },
  {
    question: "如果要策劃一場活動，你會先：",
    options: [
      { label: "畫流程圖、分析細節", value: "A" },
      { label: "想像大家的心情、氣氛和畫面", value: "B" },
      { label: "列出器材、空間、動線，馬上安排實作", value: "C" },
    ],
  },
  {
    question: "哪個場景最讓你感興趣？",
    options: [
      { label: "古文明遺跡／地下神殿／實驗室", value: "A" },
      { label: "童話村莊／雲端之城／幻想生物棲息地", value: "B" },
      { label: "賽道設施／工程工坊／動力研究室", value: "C" },
    ],
  },
  {
    question: "你在團隊中通常扮演的角色是？",
    options: [
      { label: "規劃者／策略顧問／筆記者", value: "A" },
      { label: "氣氛組／橋樑角色／故事捕捉者", value: "B" },
      { label: "執行手／工具大師／搞定現場的人", value: "C" },
    ],
  },
  {
    question: "你最希望朋友怎麼形容你？",
    options: [
      { label: "有觀察力、有點神秘、思慮縝密", value: "A" },
      { label: "溫暖、有童心、有創意", value: "B" },
      { label: "帶得動、能執行、有能量", value: "C" },
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
    }, 300);
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
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white flex items-center justify-center p-4">
      <div className="max-w-xl w-full shadow-2xl rounded-2xl bg-white p-6">
        {!submitted ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4">請選出最符合你的選項</h2>
            <div className="space-y-4">
              {questions[step].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className="w-full text-left p-4 border border-gray-300 rounded-lg hover:bg-purple-50"
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-400 text-center">
              問題 {step + 1} / {questions.length}
            </p>
          </motion.div>
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
