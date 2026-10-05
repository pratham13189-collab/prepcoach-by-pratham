# Prepcoach by PRATHAM

An AI based interview preparation web app for **electronics job questions**.
PRATHAM's PROJECT (Electronics & Communication Engineering).

## Features
1. **Practice** - random question from a built-in bank of 24 questions
   (Analog, Digital, Microcontrollers, Communication, Power Electronics, Basic Circuits).
   Type your answer and get a score out of 10, missed points and a tip.
2. **Generate Questions** - AI creates new questions for a topic and level.
3. **Explain Concept** - short interview-style explanation of any electronics topic.

## Technologies used
| Technology | Purpose |
|---|---|
| HTML / CSS | Structure and styling |
| Tailwind CSS + PostCSS | Responsive UI styling |
| JavaScript / TypeScript | Programming (type-safe code) |
| React.js | Interactive frontend |
| Next.js (App Router) | Full-stack framework, routing and API routes |
| Node.js + npm | Runtime and package manager |
| Groq API (Llama 3.3 model, free tier) via fetch | Evaluates answers, generates questions |
| REST API / JSON | Communication between frontend and backend |
| `.env.local` | Stores the API key safely |
| ESLint | Code quality checks |
| VS Code, Git/GitHub | Development and version control |

## Project structure
```
prepcoach-ai/
├── src/
│   ├── app/
│   │   ├── layout.tsx, page.tsx, globals.css
│   │   └── api/
│   │       ├── question/route.ts
│   │       ├── evaluate/route.ts
│   │       ├── generate/route.ts
│   │       └── explain/route.ts
│   ├── components/ (PracticeTab, GenerateTab, ExplainTab)
│   └── lib/ (mistral.ts, questions.ts, types.ts)
├── tailwind.config.ts, postcss.config.js
├── .eslintrc.json, tsconfig.json, next.config.mjs
├── .env.example
└── package.json
```

## How to run
1. Install Node.js 18 or above
2. Get a free API key from https://console.groq.com
3. In the project folder:
   ```
   npm install
   copy .env.example .env.local      (Windows)   |   cp .env.example .env.local   (Linux/Mac)
   ```
4. Open `.env.local` and paste your key in `GROQ_API_KEY`
5. Start the app:
   ```
   npm run dev
   ```
6. Open http://localhost:3000

Other commands: `npm run lint` (ESLint), `npm run build` (production build)

## How it works
The React page sends the question and the student's answer to a Next.js API route.
The route builds a prompt (question + reference points + answer) and calls the Groq API
using fetch. The reply comes back as JSON (score, feedback, missing points, tip)
and is shown on the page. The API key stays on the server and is never sent to the browser.

## Limitations
- Scores come from an AI model, so they are only a guide
- Free tier has a rate limit
- Question bank is small (extend it in `src/lib/questions.ts`)

## Future scope
- Login and score history
- Voice based answers
- More topics (VLSI, IoT, DSP)
