# Mrs.Noor
backend/
│
├── src/
│   ├── controllers/
│   │   ├── aiChatController.ts
│   │   ├── videoChatController.ts
│   │   └── index.ts (exporting all controllers)
│   │
│   ├── routes/
│   │   ├── aiChatRoutes.ts
│   │   ├── videoChatRoutes.ts
│   │   └── index.ts (combining all routes)
│   │
│   ├── services/
│   │   ├── aiService.ts
│   │   ├── videoChatService.ts
│   │   └── index.ts (exporting all services)
│   │
│   ├── models/
│   │   ├── aiChatModel.ts
│   │   ├── videoChatModel.ts
│   │   └── index.ts (exporting all models)
│   │
│   ├── app.ts (Express app initialization and middleware setup)
│   └── index.ts (Entry point of the backend application)
│
├── package.json
└── tsconfig.json

- src
  - api
    - askQuestion.ts          // API route for handling user questions
  - db
    - index.ts                // Prisma initialization and database connection
  - models
    - gptModel.ts             // Logic for interacting with the GPT AI model
  - routes
    - index.ts                // Export all route handlers
  - types                     // Custom TypeScript types and interfaces
    - index.ts
  - app.ts                    // Entry point of the Express application



frontend/
│
├── pages/
│   ├── index.tsx
│   ├── ai-chat/
│   │   └── index.tsx
│   └── video-chat/
│       └── index.tsx
│
├── components/
│   ├── Layout.tsx
│   ├── AiChat/
│   │   ├── AiChatMessage.tsx
│   │   └── AiChatInput.tsx
│   └── VideoChat/
│       ├── LocalVideo.tsx
│       ├── RemoteVideo.tsx
│       └── VideoChatControls.tsx
│
├── styles/
│   ├── globals.css
│   └── tailwind.css
│
├── public/
│   └── images/
│
├── utils/
│   ├── api.ts
│   └── socket.ts
│
├── tsconfig.json
├── next.config.js
├── package.json
└── tailwind.config.js
