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
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
};
