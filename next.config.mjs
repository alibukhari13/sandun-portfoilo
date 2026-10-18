/** @type {import('next').NextConfig} */
const nextConfig = {};

nextConfig.experimental = {
	serverActions: {
		bodySizeLimit: "4mb",
	},
};

export default nextConfig;
