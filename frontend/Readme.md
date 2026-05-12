### GUIDE AND COMMANDS FOR FRONTEND

```javascript
// create frontend project
npm create vite@latest frontend
npm install

// tailwind setup
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p

// in frontend/tailwind.config.js file put 
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

// frontend/src/index.css 
@tailwind base;
@tailwind components;
@tailwind utilities;

// run project
npm run dev

// install redux toolkit
npm install @reduxjs/toolkit react-redux

npm install axios

npm install react-router-dom

npm install react-infinite-scroll-component

npm install swiper

npm install react-toastify

npm install react-icons

npm install chart.js react-chartjs-2
```
