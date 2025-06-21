# Homey - Your AI Friend in a New Town

Homey is a personal AI companion that helps you feel at home faster when moving to a new city. Using intelligent recommendations and voice interactions, Homey learns your preferences via google takeout and connects you to the people and places that make a new city feel like your city.

## ✨ Features

### 🎯 Personalized Onboarding
- **Multi-path Setup**: Choose between chat-based or voice-guided onboarding
- **Google Takeout Integration**: Upload your data to help Homey understand your preferences
- **Profile Customization**: Set your preferences, interests, and lifestyle needs

### 🗣️ Voice Interactions
- **AI Voice Calls**: Receive personalized recommendations through natural voice conversations
- **Retell AI Integration**: Advanced voice AI for human-like interactions
- **Audio Demos**: Experience Homey's voice before getting started

### 🏙️ Smart Recommendations
- **Category-Based Discovery**: Explore recommendations across multiple categories (restaurants, coffee shops, fitness, healthcare, etc.)
- **AI-Powered Suggestions**: Get personalized place recommendations based on your preferences
- **Contextual Understanding**: Homey learns what makes places feel right for you

### 💾 Personal Dashboard
- **Saved Places**: Keep track of your favorite discoveries
- **Recommendation History**: Review past suggestions and your interactions
- **Profile Management**: Update your preferences and personal information

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Router** for navigation
- **TanStack Query** for data fetching
- **React Hook Form** with Zod validation

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **Supabase** for authentication and database
- **Retell AI** for voice interactions
- **ElevenLabs** for voice synthesis
- **Nebius API** for AI-powered recommendations

### Key Dependencies
- `retell-client-js-sdk` - Voice AI integration
- `@supabase/supabase-js` - Database and auth
- `@radix-ui/*` - Accessible UI primitives
- `lucide-react` - Icon library
- `next-themes` - Dark/light mode support

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm (install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd homey
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Set up environment variables**
   ```bash
   # Copy example environment files
   cp .env.example .env
   cp backend/.env.example backend/.env
   ```
   
   Configure your environment variables:
   - Supabase URL and API keys
   - Retell AI API keys
   - Nebius API configuration

4. **Start the development servers**
   ```bash
   # Start backend server (from project root)
   cd backend && npm run dev &
   
   # Start frontend server (from project root)
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to see the application.

## 📁 Project Structure

```
homey/
├── src/                          # Frontend source code
│   ├── components/              # React components
│   │   ├── sections/           # Landing page sections
│   │   ├── onboarding/         # Onboarding flow components
│   │   ├── modals/             # Modal dialogs
│   │   └── ui/                 # shadcn/ui components
│   ├── pages/                  # Route components
│   ├── hooks/                  # Custom React hooks
│   ├── integrations/           # API client integrations
│   └── lib/                    # Utility functions
├── backend/                     # Backend API server
│   └── src/
│       ├── routes/             # API route handlers
│       ├── middleware/         # Express middleware
│       └── config/             # Configuration files
├── supabase/                   # Supabase configuration
│   ├── functions/              # Edge functions
│   └── migrations/             # Database migrations
└── public/                     # Static assets
```

## 🔧 Development

### Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

**Backend:**
- `cd backend && npm run dev` - Start backend development server

### Key Features Implementation

#### Authentication Flow
- Users start at the landing page (`/`)
- Authentication handled through `/auth`
- Protected routes require login
- Automatic redirect to onboarding for new users

#### Onboarding Process
- Multi-step form with progress tracking
- Choice between chat and voice onboarding paths
- Google Takeout data upload support
- Preference collection across multiple categories

#### Recommendation Engine
- AI-powered place suggestions
- Category-based filtering
- User preference learning
- Integration with mapping services

## 🌐 Deployment

### Production Build
```bash
npm run build
```

Deploy the `dist` folder to your preferred hosting service (Vercel, Netlify, etc.).

### Backend Deployment
The backend can be deployed to any Node.js hosting service. Make sure to:
1. Set all required environment variables
2. Configure your Supabase project
3. Set up your Retell AI and Nebius API credentials

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

---

*Homey - Making every city feel like home, one recommendation at a time.* 🏠
