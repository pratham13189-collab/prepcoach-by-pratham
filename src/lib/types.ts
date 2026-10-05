export interface Question {
  question: string;
  reference: string;
}

export interface Feedback {
  score: number | string;
  feedback: string;
  missing: string[];
  tip: string;
}
