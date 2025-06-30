import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: "class",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: '#3B9EB5',
				secondary: '#231F20',
				divider: '#E9E9EA',
				success: '#48BD69',
				transparent: '#50657B',
				silver: '#E9ECF2',
				grey: '#808D9E',
				green: {
					500: "#24AE7C",
					600: "#0D2A1F",
				},
				blue: {
					200:'#f1f3f9',
					500: "#79B5EC",
					600: "#152432",
					700: "#202b58"
				},
				red: {
					500: "#F37877",
					600: "#3E1716",
					700: "#F24E43",
				},
				light: {
					200: "#E8E9E9",
				},
				dark: {
					200: "#0D0F10",
					300: "#131619",
					400: "#1A1D21",
					500: "#363A3D",
					600: "#76828D",
					700: "#ABB8C4",
				},
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;
