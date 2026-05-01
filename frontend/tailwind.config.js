/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      colors: {
        background: '#f8fafc',
        card: '#ffffff',
        primary: '#3b82f6',
        primaryHover: '#2563eb',
        primaryLight: '#eff6ff',
        success: '#10b981',
        successLight: '#d1fae5',
        warning: '#f59e0b',
        warningLight: '#fef3c7',
        danger: '#ef4444',
        dangerLight: '#fee2e2',
        textPrimary: '#1e293b',
        textSecondary: '#64748b',
        border: '#e2e8f0',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
      }
    },
  },
  plugins: [],
}
