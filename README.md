# Slack Clone

A Slack-like real-time messaging platform built using **Next.js** and **Convex**. This project is a feature-rich and interactive clone of the Slack platform, providing seamless team communication capabilities.

🚀 Live Link: https://slack-nry.vercel.app/


![Slack real-time messaging platform built](/public/screenshot.webp 'A Slack-like real-time messaging platform built')


---

## 🎯 Features
- Real-time messaging
- Emoji support
- Rich text editor
- User authentication
- Responsive design
- Theming with Tailwind CSS
- Modular and scalable architecture

---

## 🚀 Technologies Used

- **Next.js 15**: Framework for building React-based web applications.
- **Convex**: Real-time backend for data synchronization.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Radix UI**: Accessible React primitives.
- **React Icons**: Icons for React applications.
- **Jotai**: State management.
- **Date-fns**: Utility library for date manipulation.
- **Quill**: Rich text editor.
- **Framer Motion**: Animations.

---

## 📂 Folder Structure

```
.git/                 # Git version control metadata
.next/                # Compiled Next.js build files
convex/               # Convex backend configuration
node_modules/         # Project dependencies
public/               # Static assets (images, icons, etc.)
src/                  # Source code
  ├── app/            # Pages and layouts for Next.js
  ├── components/     # Reusable React components
  ├── features/       # Feature-specific components and logic
  ├── hooks/          # Custom React hooks
  ├── lib/            # Utility functions and libraries
middleware.ts         # Middleware for routing/authentication
.env.local            # Environment variables
.eslintrc.json        # ESLint configuration
.gitignore            # Files and directories to ignore in Git
components.json       # Component-specific configuration
next-env.d.ts         # TypeScript declarations for Next.js
next.config.ts        # Next.js configuration
package.json          # Project metadata and dependencies
postcss.config.mjs    # PostCSS configuration for Tailwind CSS
README.md             # Project documentation (this file)
sampleData.json       # Sample data for testing
tailwind.config.ts    # Tailwind CSS configuration
tsconfig.json         # TypeScript configuration
```

---

## 🛠️ Dependencies
Here are the key dependencies used in this project:

### Production Dependencies
```json
{
  "@auth/core": "^0.36.0",
  "@convex-dev/auth": "^0.0.74",
  "@emoji-mart/react": "^1.1.1",
  "@radix-ui/react-avatar": "^1.1.1",
  "@radix-ui/react-dialog": "^1.1.5",
  "clsx": "^2.1.1",
  "convex": "^1.17.0",
  "date-fns": "^4.1.0",
  "jotai": "^2.10.2",
  "next": "15.0.3",
  "react": "19.0.0",
  "tailwindcss": "^3.4.1"
}
```

### Development Dependencies
```json
{
  "@types/react": "^18",
  "eslint": "^8",
  "postcss": "^8",
  "typescript": "^5"
}
```

---

## 🔐 Environment Variables

Ensure you set up the following environment variables in your `.env.local` file:

```env
# Deployment used by `npx convex dev`
CONVEX_DEPLOYMENT=<your_convex_deployment_url>

# Public Convex URL
NEXT_PUBLIC_CONVEX_URL=<your_public_convex_url>
```

Replace `<your_convex_deployment_url>` and `<your_public_convex_url>` with the appropriate values for your Convex deployment.

---

## 🤝 Connect with Me

If you have any questions or want to collaborate, feel free to connect with me on LinkedIn:

[**My LinkedIn Profile**](https://www.linkedin.com/in/rehman-nry/)

---

Happy Coding! 😊