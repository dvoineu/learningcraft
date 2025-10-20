# LearningCraft

AI-powered quiz generation platform with internationalization support (Russian & Belarusian).

## 🚀 Features

- **AI-Powered Quiz Generation**: Create quizzes from uploaded documents
- **Multi-language Support**: Full i18n with Russian and Belarusian
- **Modern UI**: Built with Next.js 15 and Tailwind CSS v4
- **Real-time Database**: Powered by Supabase
- **Type-Safe**: Full TypeScript implementation

## 📋 Prerequisites

- Node.js 20+ 
- npm or yarn
- Supabase account

## 🛠️ Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd web-learningcraft
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env.local` and fill in your Supabase credentials:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your actual values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

See [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) for detailed project structure and architecture.

```
src/
├── app/              # Next.js App Router
│   └── [locale]/     # Internationalized routes
├── components/       # React components (organized by feature)
├── lib/              # Utilities, types, and integrations
└── i18n/             # Internationalization configs and dictionaries
```

## 🌍 Internationalization

The app supports multiple languages through dynamic routing:
- Russian: `/ru`
- Belarusian: `/be`

Add new languages by:
1. Creating a new dictionary in `src/i18n/dictionaries/`
2. Adding the locale to `src/i18n/config.ts`

## 🧪 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server

## 🔧 Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Database**: [Supabase](https://supabase.com)
- **UI Components**: Custom components with shadcn/ui patterns

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Project Structure Guide](./PROJECT_OVERVIEW.md)

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com/new)
3. Add environment variables in Vercel dashboard
4. Deploy!

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more options.

## 📝 License

Private project - All rights reserved

