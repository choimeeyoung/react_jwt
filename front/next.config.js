const CompressPlugin = require('compression-webpack-plugin')
const withBundleAnalyser = require('@next/bundle-analyzer')({
    enabled: process.env.ANALIZE === 'true'
})

module.exports = withBundleAnalyser({
    future :{
      webpack5:true
    },
    webpack(config,{webpack,dev}){
        const prod = process.env.NODE_ENV === 'production';
        const plugins = [...config.plugins];
        if(prod){
            plugins.push(new CompressPlugin());
        }

        if (dev) {
            config.devtool = 'inline-source-map';
        }
        return {
            ...config,
            mode:prod ? 'production':'development',
            devtool: prod ? 'hidden-source-map' : 'inline-source-map',
            plugins
        }
    }
});
