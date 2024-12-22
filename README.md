# Slack Clone

A Slack clone built using Next.js 15, React 19, and Tailwind CSS. This project leverages Convex for real-time data handling and various Radix UI components for a modern and responsive UI.

## Features
- **Authentication**: Powered by @auth/core and @convex-dev/auth.
- **Real-time Updates**: Uses Convex for real-time data sync.
- **Responsive UI**: Built with Tailwind CSS and Radix UI components.
- **Dark Mode**: Theme switching enabled through next-themes.
- **Iconography**: Lucide-react and react-icons for consistent icon usage.
- **State Management**: Jotai for global state management.
- **Drag & Resize**: Implemented using react-resizable-panels.

## Tech Stack
- **Framework**: Next.js 15
- **Frontend**: React 19, Tailwind CSS
- **Real-time Data**: Convex
- **State Management**: Jotai
- **UI Components**: Radix UI
- **Icons**: Lucide-react, react-icons
- **Animation**: tailwindcss-animate

## Installation

1. Clone the repository:
```bash
$ git clone https://github.com/your-username/clone-slack.git
$ cd clone-slack
```

2. Install dependencies:
```bash
$ npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add the necessary keys.
```env
NEXT_PUBLIC_API_URL=your-api-url
AUTH_SECRET=your-auth-secret
```

4. Run the development server:
```bash
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts
- **dev**: Starts the development server
- **build**: Builds the application for production
- **start**: Starts the production server
- **lint**: Lints the project

## Folder Structure
```
/clone-slack
├── components
├── pages
├── public
├── styles
├── utils
└── convex
```

## Dependencies
- **@auth/core**: Authentication core for the app.
- **convex**: Real-time data handling.
- **tailwindcss**: Utility-first CSS framework.
- **radix-ui**: Accessible UI components.
- **jotai**: State management library.
- **lucide-react**: Icon library.
- **react-resizable-panels**: Drag and resizable panels.

## Dev Dependencies
- **eslint**: Linter for identifying code issues.
- **typescript**: TypeScript support.
- **postcss**: For Tailwind CSS processing.

## License
This project is licensed under the MIT License.

