/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				'dark-gray': {
					50: '#f8f9fa',
					100: '#f1f3f4',
					200: '#e8eaed',
					300: '#dadce0',
					400: '#bdc1c6',
					500: '#9aa0a6',
					600: '#80868b',
					700: '#5f6368',
					800: '#3c4043',
					900: '#202124',
				},
				primary: {
					50: '#f0f9ff',
					100: '#e0f2fe',
					200: '#bae6fd',
					300: '#7dd3fc',
					400: '#38bdf8',
					500: '#0ea5e9',
					600: '#0284c7',
					700: '#0369a1',
					800: '#075985',
					900: '#0c4a6e',
				},
				purple: {
					50: '#faf5ff',
					100: '#f3e8ff',
					200: '#e9d5ff',
					300: '#d8b4fe',
					400: '#c084fc',
					500: '#a855f7',
					600: '#9333ea',
					700: '#7c3aed',
					800: '#6b21a8',
					900: '#581c87',
				},
			},
		},
	},
	plugins: [],
};
