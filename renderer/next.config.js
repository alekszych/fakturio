// eslint-disable-next-line no-undef
module.exports = {
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.target = "electron-renderer"
		}

		return config
	},
}
