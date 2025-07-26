// 不用寄 Email，直接顯示測驗結果的版本

"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
];

export default function QuizNoEmail() {
  const [answers, setAnswers] = useState<string[]>([]);
  const [step, setStep] = useState(0);
  const [resultKey, setResultKey] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[step] = value;
    setAnswers(newAnswers);
    setTimeout(() => {
      if (step < questions.length - 1) setStep(step + 1);
      else calculateResult(newAnswers);
    }, 300);
  };

  const calculateResult = (finalAnswers: string[]) => {
    const count = { A: 0, B: 0, C: 0 };
    finalAnswers.forEach((ans) => count[ans as keyof typeof count]++);
    const top = Object.entries(count).sort((a, b) => b[1] - a[1])[0][0];
    setResultKey(top);
  };

  const resultMap: Record<string, { title: string; desc: string }> = {
    A: {
      title: "🧠 邏輯探索型",
      desc: "你擅長觀察細節、破解規則，是隊伍裡的策略師！",
    },
    B: {
      title: "🎈 情感幻想型",
      desc: "你重感受與故事連結，像孩子般看世界，充滿溫暖與好奇。",
    },
    C: {
      title: "⚡️ 實作行動型",
      desc: "你講求效率與執行力，動手做比說更快，是天生的挑戰者。",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white flex items-center justify-center p-4">
      <Card className="max-w-xl w-full shadow-2xl rounded-2xl bg-white">
        <CardContent className="p-6 space-y-6">
          {resultKey ? (
            <div className="text-center py-10">
              <h2 className="text-xl font-bold mb-4">🎉 你的測驗結果：</h2>
              <p className="text-2xl font-semibold text-black">{resultMap[resultKey].title}</p>
              <p className="mt-2 text-gray-700">{resultMap[resultKey].desc}</p>
            </div>
          ) : (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4 text-black">請選出最符合你的選項</h2>
              <div className="space-y-4">
                {questions[step].options.map((opt) => (
                  <Button
                    key={opt.value}
                    onClick={() => handleSelect(opt.value)}
                    className="w-full justify-start text-left p-4 text-base"
                    variant="outline"
                  >
                    {opt.label}
                  </Button>
                ))}
              </div>
              <p className="mt-6 text-sm text-gray-400 text-center">
                問題 {step + 1} / {questions.length}
              </p>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
