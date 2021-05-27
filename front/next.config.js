const withBundleAnalyser = require('@next/bundle-analyzer')({
    enabled: process.env.ANALIZE === 'true'
})
module.exports = withBundleAnalyser({
    compress: true,
    webpack(config,{webpack}){
        const prod = process.env.NODE_ENV === 'production';
        const plugins = [...config.plugins];
        return {
            ...config,
            mode:prod ? 'production':'development',
            devtool: prod ? 'hidden-source-map' : 'eval',
            plugins
        }
    }
});
