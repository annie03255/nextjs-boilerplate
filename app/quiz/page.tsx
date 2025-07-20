'use client';
import { useState } from 'react';

const questions = [
  {
    text: '1. 如果你要參加一場冒險，你會：',
    options: [
      { label: 'A. 解開古老遺跡的機關，發現塵封的歷史', value: 'A' },
      { label: 'B. 與神秘生物建立羈絆，並一起歷經挑戰', value: 'B' },
      { label: 'C. 駕駛一台高速載具穿越障礙，靠技術衝線', value: 'C' },
    ],
  },
  {
    text: '2. 面對一件新挑戰，你最在意的是什麼？',
    options: [
      { label: 'A. 是否能學到一些知識或新觀點', value: 'A' },
      { label: 'B. 是否能感受到情感或想像力的觸動', value: 'B' },
      { label: 'C. 是否能實際操作、看到明確的成果與性能', value: 'C' },
    ],
  },
  {
    text: '3. 你最喜歡的玩具類型曾是：',
    options: [
      { label: 'A. 拼圖、模型或實驗玩具', value: 'A' },
      { label: 'B. 有角色故事背景的收藏品', value: 'B' },
      { label: 'C. 可動機械、組裝車、機器裝置', value: 'C' },
    ],
  },
  {
    text: '4. 如果生活是一部電影，你是哪一種主角？',
    options: [
      { label: 'A. 冷靜分析派，默默推進任務的人', value: 'A' },
      { label: 'B. 情感豐富，常常活在幻想與真誠中', value: 'B' },
      { label: 'C. 敢衝敢拼，速度和行動力掛帥的狠角色', value: 'C' },
    ],
  },
  {
    text: '5. 你希望收到的「理想驚喜」會是什麼感覺？',
    options: [
      { label: 'A. 精緻、有層次，讓人越看越有味道', value: 'A' },
      { label: 'B. 有點可愛、有點感性，會心一笑那種', value: 'B' },
      { label: 'C. 外型帥氣、動感，讓人忍不住動手玩', value: 'C' },
    ],
  },
];

export default function QuizPage() {
  const [answers, setAnswers] = useState<(string | null)[]>(
    Array(questions.length).fill(null)
  );

  const handleAnswer = (qIndex: number, value: string) => {
    const updated = [...answers];
    updated[qIndex] = value;
    setAnswers(updated);
  };

  const count = { A: 0, B: 0, C: 0 };
  answers.forEach((a) => {
    if (a) count[a as keyof typeof count]++;
  });

  const result =
    answers.every(Boolean) &&
    (count.A > count.B && count.A > count.C
      ? '恐龍化石（邏輯型、知識探索）'
      : count.B > count.C
      ? '沒牙仔（情感型、童趣幻想）'
      : 'F1 賽車（動感型、實作偏好）');

  return (
    <main style={{ padding: 32, fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 24, marginBottom: 24 }}>🌟 樂高五個問題</h1>
      {questions.map((q, i) => (
        <div key={i} style={{ marginBottom: 20 }}>
          <p style={{ fontWeight: 'bold' }}>{q.text}</p>
          {q.options.map((opt) => (
            <label key={opt.value} style={{ display: 'block', margin: '4px 0' }}>
              <input
                type="radio"
                name={`q${i}`}
                value={opt.value}
                checked={answers[i] === opt.value}
                onChange={() => handleAnswer(i, opt.value)}
              />{' '}
              {opt.label}
            </label>
          ))}
        </div>
      ))}
      {result && (
        <div style={{ marginTop: 32, padding: 16, background: '#f4f4f4' }}>
          <h2>🎉 你的樂高對應是：</h2>
          <p style={{ fontSize: 20 }}>{result}</p>
        </div>
      )}
    </main>
  );
}

