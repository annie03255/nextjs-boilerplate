// 前端頁面與後端 API 整合版，已連接 Gmail SMTP 寄送功能（Vercel-ready）

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
  {
    question: "你通常如何安排自己的週末？",
    options: [
      { label: "看書、參加講座，吸收新知識", value: "A" },
      { label: "與朋友相聚、看電影培養情感", value: "B" },
      { label: "參加戶外活動或動手做些什麼", value: "C" },
    ],
  },
  {
    question: "你在團隊中的角色偏向？",
    options: [
      { label: "提出策略與計畫的人", value: "A" },
      { label: "促進氣氛、讓大家感覺舒服的人", value: "B" },
      { label: "負責執行與解決技術問題的人", value: "C" },
    ],
  },
  {
    question: "你對「完成一件事」最滿足的部分是？",
    options: [
      { label: "思考過程中的邏輯推演與突破", value: "A" },
      { label: "可以讓他人感受到影響與連結", value: "B" },
      { label: "看到實際成果、感受到效率與速度", value: "C" },
    ],
  },
  {
    question: "你的書桌或工作空間通常是？",
    options: [
      { label: "有條理、有標示的整齊資料區", value: "A" },
      { label: "貼滿便利貼、玩偶與心情語錄", value: "B" },
      { label: "充滿工具、裝置和拆過的機構件", value: "C" },
    ],
  },
  {
    question: "你對童年回憶中最有感的是？",
    options: [
      { label: "探索事物原理與問很多為什麼", value: "A" },
      { label: "幻想自己是卡通角色或英雄", value: "B" },
      { label: "組裝東西、拆解玩具機構", value: "C" },
    ],
  },
  {
    question: "遇到突發狀況，你第一反應是？",
    options: [
      { label: "分析情況、快速評估後果", value: "A" },
      { label: "先安撫人心、處理情緒氛圍", value: "B" },
      { label: "立刻行動，邊做邊解決", value: "C" },
    ],
  },
  {
    question: "如果開啟一段新興趣，你傾向？",
    options: [
      { label: "查很多資料、研究整體邏輯", value: "A" },
      { label: "被背後的故事、情感所吸引", value: "B" },
      { label: "立刻上手操作與練習", value: "C" },
    ],
  },
  {
    question: "你覺得哪種「成功的感覺」最棒？",
    options: [
      { label: "破解難題、突破盲點時的快感", value: "A" },
      { label: "讓人感動、產生共鳴時的溫度", value: "B" },
      { label: "任務完成時那種行雲流水的成就感", value: "C" },
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
      <Card className="max-w-xl w-full shadow-2xl rounded-2xl bg-white">
        <CardContent className="p-6 space-y-6">
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
              <p className="mt-6 text-sm text-gray-400 text-center">問題 {step + 1} / {questions.length}</p>
            </motion.div>
          ) : (
            <div className="text-center py-10">
              <h2 className="text-xl font-semibold">感謝你的參與！</h2>
              <p className="text-gray-500 mt-2">我們已收到你的回覆 🎉</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
