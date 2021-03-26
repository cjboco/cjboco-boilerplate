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
app.use( '/mylibs', express.static( path.join( distDir, 'assets/js/mylibs' ) ) );
app.use( '/js', express.static( path.join( distDir, 'assets/js' ) ) );
app.use( '/images', express.static( path.join( distDir, 'assets/images' ) ) );
app.use( '/css', express.static( path.join( distDir, 'assets/css' ) ) );
app.use( '/assets', express.static( path.join( distDir, 'assets' ) ) );

app.get( '/', function ( req, res ) {
	res.sendFile( path.join( distDir, 'index.html' ) );
} );

var server = http.createServer( app );

// Reload code here
reload( app ).then( function ( reloadReturned ) {
	server.listen( app.get( 'port' ), function () {
		console.log( 'Web server listening on port ' + app.get( 'port' ) );
	} );
} );
