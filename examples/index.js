'use strict';

var max = require( './../lib' );

var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random()*1000;
}

console.log( max( data ) );
