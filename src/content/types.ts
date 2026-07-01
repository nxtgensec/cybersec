export type Callout = { type: "tip" | "note" | "warning"; title?: string; body: string };

export type CodeBlock = { lang: string; code: string; caption?: string };

export type CommandEntry = { cmd: string; desc: string };

export type QuizQuestion = {
  q: string;
  choices: string[];
  answer: number;
  explain?: string;
};

export type LearningTopic = {
  slug: string;
  kind: "phase" | "tool" | "topic";
  title: string;
  tagline: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedMinutes: number;
  order?: number;
  next?: { slug: string; title: string; kind: "phase" | "tool" | "topic" };
  overview: string; // markdown
  whyItMatters: string;
  realWorldScenario: string;
  objectives: string[];
  theory: string; // markdown
  workflow: string[]; // step titles
  commands: CommandEntry[];
  toolsUsed: string[];
  expectedOutput?: CodeBlock;
  commonMistakes: string[];
  miniLab: {
    objective: string;
    steps: string[];
    expected: string;
  };
  practiceQuestions: string[];
  interviewQuestions: string[];
  cheatsheet: CommandEntry[];
  references: { label: string; url: string }[];
  summary: string;
  callouts?: Callout[];
};
