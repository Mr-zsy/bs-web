module.exports = {
    
    publicPath: process.env.NODE_ENV === 'production'
    ? '/web/'
	: '/',
	
    devServer:{
		host:'0.0.0.0',
        port: 8081, 
        hot: true,
		proxy: {
			'/api': {
				target: 'http://127.0.0.1:5000',
				changeOrigin: true,
				pathRewrite: {'^/api' : ''}
			}
		},        
	},
	lintOnSave:false
}