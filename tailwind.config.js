/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
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
				orange: '#FBB300',
				'orange-hover': '#fbb400c9',
				'light-grey': '#F3F3F3',
				soon: '#FFB74D',
				'kind-of-soon': '#FEE720',
				'not-soon': '#81C784',
				inactive: '#B0BEC5',
				overdue: '#FF5252',
			},
			fontFamily: {
				montserrat: ['montserrat', 'sans-serif'],
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
