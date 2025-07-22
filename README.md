# 🤖 MORVS AI Chat Bot

<div align="center">
  <img src="https://img.shields.io/badge/AI-Chat%20Bot-00D4AA?style=for-the-badge&logo=robot&logoColor=white" alt="AI Chat Bot"/>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"/>
</div>

<div align="center">
  <h3>🚀 An intelligent AI-powered chat interface with PDF processing capabilities</h3>
  <p>Built with Next.js, React, and powered by Groq's LLaMA 3 model</p>
</div>

---

## ✨ Features

- 🎯 **AI-Powered Chat**: Intelligent conversations using Groq's LLaMA 3-70B model
- 📄 **PDF Processing**: Upload and analyze PDF documents with real-time parsing
- 💬 **Real-time Streaming**: Live response streaming for enhanced user experience
- 💾 **Persistent Chat History**: Conversations saved locally using localStorage
- 🎨 **Modern UI**: Sleek cyberpunk-inspired design with smooth animations
- 📱 **Responsive Design**: Works seamlessly across desktop and mobile devices
- ⚡ **Fast Performance**: Optimized with Next.js and efficient state management

## 🛠️ Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)

### UI Components & Styling
![Shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=flat&logo=shadcnui&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=flat&logo=framer&logoColor=white)
![Google Fonts](https://img.shields.io/badge/Google%20Fonts-4285F4?style=flat&logo=google-fonts&logoColor=white)

### AI & Processing
![Groq](https://img.shields.io/badge/Groq-F55036?style=flat&logo=groq&logoColor=white)
![PDF.js](https://img.shields.io/badge/PDF.js-ED1C24?style=flat&logo=adobe-acrobat-reader&logoColor=white)

### Development Tools
![VS Code](https://img.shields.io/badge/VS%20Code-007ACC?style=flat&logo=visual-studio-code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Groq API Key ([Get one here](https://console.groq.com/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/morvs-chat-bot.git
   cd morvs-chat-bot
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Configure API Key**
   
   Replace `"YOUR_API_KEY"` in the code with your actual Groq API key:
   ```typescript
   Authorization: "Bearer YOUR_GROQ_API_KEY"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🎮 Usage

1. **Start Chatting**: Type your message in the input field and press Enter or click Send
2. **Upload PDFs**: Click the "Upload PDF" button to analyze document content
3. **View History**: Your conversations are automatically saved and persist between sessions
4. **Clear Chat**: Use the "Clear" button to start fresh

## 📁 Project Structure

```
morvs-chat-bot/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
├── public/
├── src/
├── package.json
└── README.md
```

## 🔧 Key Components

- **MorvsChat**: Main chat interface component
- **Message Handling**: Real-time streaming and state management
- **PDF Processing**: Client-side PDF parsing using PDF.js
- **UI Components**: Custom shadcn/ui components with Tailwind styling

## 🎨 Design Features

- **Cyberpunk Theme**: Dark gradient backgrounds with cyan and green accents
- **Orbitron Font**: Futuristic typography for the main title
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Layout**: Mobile-first design approach

## 📚 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [React Documentation](https://reactjs.org/) - learn React fundamentals
- [Groq Documentation](https://console.groq.com/docs) - explore Groq AI capabilities
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sourav Upadhyay**
- GitHub: [@SouravUpadhyay7](https://github.com/SouravUpadhyay7)
- Project: [Morvs AI Interface](https://github.com/SouravUpadhyay7/Morvs_Chat_Bot)

---

<div align="center">
  <p>Built with ❤️ using Next.js and modern web technologies</p>
  <p>© 2025 Sourav Upadhyay - Morvs AI Interface</p>
</div>