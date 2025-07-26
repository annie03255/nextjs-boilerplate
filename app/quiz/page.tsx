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
    question: "你最喜歡的書／電影主角通常是：",
    options: [
      { label: "智慧型主角，靠邏輯解開謎團", value: "A" },
      { label: "溫暖型角色，有情感深度和幻想視角", value: "B" },
      { label: "行動派英雄，靠敏捷和執行力完成任務", value: "C" },
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
      // 計算結果
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
                  className="w-full p-3 border rounded-lg text-left hover:bg-gray-100"
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
            <p className="text-lg mt-4">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}
