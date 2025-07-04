'''
## Event Check-In App
A real-time event check-in mobile application built with React Native (Expo) and Node.js GraphQL backend. This project allows users to join events using their User ID, view attendee count, and interact with live updates.

## Features
<pre>'''
📲 User Login with just a User ID
📋 Event List with name, location, and live attendee count
✅ Join Event button with success feedback
🔄 Real-time updates via GraphQL (with optional Socket.io backend)
🌐 Mobile-ready using Expo QR scanning
🧭 Navigation between login and event pages
🔓 Logout functionality
🎨 Minimal modern UI with subtle styling
</pre>

## Project Structure
<pre>'''
event-checkin-app/ (lives in zip folder)
├── app/
│   ├── index.tsx           # Login screen (landing page)
│   └── events.tsx          # Event list page with join feature
├── assets/                 # App icons, splash screen, images
├── package.json
├── app.json                # Expo config
├── tsconfig.json           # TypeScript config
└── README.md               # (You're here)

Backend 
event-checkin-backend/
├── src/
│   ├── index.ts            # Express + Apollo Server setup
│   └── schema.graphql      # GraphQL schema
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env
├── package.json
└── README.md
</pre>
## Tech Stack
<pre>'''
Frontend
React Native (Expo)
TypeScript
Apollo Client
Expo Router
</pre>
Backend
<pre>'''
Node.js with Express
GraphQL with Apollo Server
Prisma + PostgreSQL
Socket.IO (optional real-time)
</pre>
## Installation & Running Locally
<pre>'''
🔹 Frontend (Expo)
cd event-checkin-app
npm install
npx expo start
</pre>
<pre>'''
Open in Expo Go (scan QR)
Enter any User ID to proceed to the event screen
💡 Tip: Make sure your mobile and backend are on the same Wi-Fi network
🔹 Backend (GraphQL + Prisma)
</pre>
<pre>'''
cd event-checkin-backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev
Runs at: http://localhost:4000/graphql
</pre>
## Screenshots

login page
![1000404704](https://github.com/user-attachments/assets/b6982d28-7256-4cd3-a0de-906a17e9377f)


event list
![1000404703](https://github.com/user-attachments/assets/5ecd389b-2437-42ba-8fde-0be511a2acf2)

## Future Improvements
<pre>'''
Authentication (JWT or Auth0)
Add/Edit/Delete events
QR Code check-in
User profiles and roles
Admin dashboard
</pre>
## Author
<pre>'''
Developed by Fathima Farzana
Part of a real-time app building assignment using full-stack technologies.
</pre>
