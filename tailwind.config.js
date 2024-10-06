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
				'primary-green': '#4ade80',
				'light-green': '#bbf7d0',
				'primary-pink': '#F55A99',
				'light-pink': '#D7A2C3',
				'ruby-pink': '#AC4270',
				'bg-black': '#181818',
				'dark-grey': '#7A7A7A',
				'light-grey': '#A3A3A3',
				'text-grey': '#B5B5B5',
			},
			transitionDuration: {
				50: '50ms',
				25: '25ms',

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
