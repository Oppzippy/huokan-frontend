module.exports = {
	purge: ["./src/**/*.svelte"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			backgroundImage: {
				"huokan-logo": "url('/resources/images/huokan-logo.png')",
			},
		},
	},
	variants: {
		extend: {
			textColor: ["visited"],
		},
	},
	plugins: [],
};
