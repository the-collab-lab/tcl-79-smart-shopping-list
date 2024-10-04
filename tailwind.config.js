/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			montserrat: ['montserrat', 'sans-serif'],
			monda: ['monda', 'sans-serif'],
		},
	},
	plugins: [require('tailwindcss-animate')],
};
