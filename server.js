/* eslint-disable */

var express = require( 'express' );
var http = require( 'http' );
var path = require( 'path' );
var reload = require( 'reload' );
var logger = require( 'morgan' );

var app = express();

var distDir = path.join( __dirname, 'dist' );

app.set( 'port', process.env.PORT || 3000 );
app.use( logger( 'dev' ) );

// my dist dir struture
app.use( '/vendor', express.static( path.join( distDir, 'assets/js/vendor' ) ) );
app.use( '/cjboco', express.static( path.join( distDir, 'assets/js/cjboco' ) ) );
app.use( '/js', express.static( path.join( distDir, 'assets/js' ) ) );
app.use( '/images', express.static( path.join( distDir, 'assets/images' ) ) );
app.use( '/css', express.static( path.join( distDir, 'assets/css' ) ) );
app.use( '/assets', express.static( path.join( distDir, 'assets' ) ) );

app.use('/**', (req, res) => {
	/*
	console.log(req.params); 		// "{ '0': 'about.html', '1': '' }"
	console.log(req.protocol)     	// "https"
	console.log(req.hostname)     	// "example.com"
	console.log(req.path)         	// "/creatures"
	console.log(req.originalUrl)  	// "/creatures?filter=sharks"
	console.log(req.subdomains)   	// "['ocean']"
	*/
	if (req.originalUrl.length > 1) {
		res.sendFile( path.join( distDir, req.originalUrl.slice(1) ) );
	} else {
		res.sendFile( path.join( distDir, '/' ) );
	}

} );


app.get('/', (req, res) => {
	res.sendFile( path.join( distDir, 'index.html' ) );
});

var server = http.createServer( app );

// Reload code here
reload( app ).then( function ( reloadReturned ) {
	server.listen( app.get( 'port' ), function () {
		console.log( 'Web server listening on port ' + app.get( 'port' ) );
	} );
} );
