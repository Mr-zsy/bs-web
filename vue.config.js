module.exports = {
    
    publicPath: process.env.NODE_ENV === 'production'
    ? '/web/'
	: '/',

	lintOnSave:false
}