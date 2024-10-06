/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			montserrat: ['montserrat', 'sans-serif'],
			monda: ['monda', 'sans-serif'],
			extend: {
				borderRadius: {
					lg: 'var(--radius)',
					md: 'calc(var(--radius) - 2px)',
					sm: 'calc(var(--radius) - 4px)',
				},
				colors: {
					'main-green': '#2EBB4B',
					'light-green': '#79D8AC',
					pink: '#F55A99',
					black: '#1F1E26',
					grey: '#757575',
					'light-grey': '#F3F3F3',
				},
			},
		},
		plugins: [require('tailwindcss-animate')],
	},
};
