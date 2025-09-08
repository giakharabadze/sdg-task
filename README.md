# Dating.com Registration App

A modern React TypeScript application for user registration with authentication and success notifications.

## 🚀 Features

- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **User Registration** - Secure registration with email and password validation
- **Authentication** - Basic Auth integration with existing user detection
- **Success Notifications** - Beautiful success modal for completed registrations
- **Form Validation** - Real-time validation with visual feedback
- **ESC Key Support** - Close modals with Escape key
- **Token Management** - Automatic token storage and redirection

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Hot Toast** - Beautiful notifications

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/giakharabadze/sdg-task.git
cd sdg-task
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Modal.tsx          # Registration form modal
│   ├── SignUp.tsx         # Main sign-up page
│   └── SuccessModal.tsx   # Success notification modal
├── App.tsx                # Main app component
└── main.tsx              # App entry point
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Integration

The app integrates with the Dating.com API:

- **Authentication**: `GET https://api.dating.com/identity` (Basic Auth)
- **Registration**: `PUT https://api.dating.com/identity`
- **Token Storage**: Saves `X-Token` header to localStorage
- **Redirect**: Redirects to `https://www.dating.com/people/#token={TOKEN}`

## 🎨 Styling

- **Gradient Text**: Beautiful gradient effects on headings
- **Responsive Design**: Mobile-first with breakpoints
- **Modern UI**: Clean, professional interface
- **Interactive Elements**: Hover effects and transitions

## 📱 Responsive Breakpoints

- **Mobile**: Default styles
- **Large screens**: `lg:` prefix (1024px+)

## 🔐 Security Features

- **Form Validation**: Client-side validation for email and password
- **Password Requirements**: Minimum 8 characters
- **Secure Storage**: Token stored in localStorage
- **Error Handling**: Comprehensive error management

## 🚀 Deployment

The app is ready for deployment to any static hosting service:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📄 License

This project is part of the SDG task assignment.