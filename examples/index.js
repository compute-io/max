'use strict';

var matrix = require( 'dstructs-matrix' ),
	max = require( './../lib' );

var data,
	mat,
	m,
	i;

// ----
// Plain arrays...
var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
m = max( data );
console.log( 'Arrays: %d\n', m );


// ----
// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
m = max( data, {
	'accessor': getValue
});
console.log( 'Accessors: %d\n', m );


// ----
// Typed arrays...
data = new Int32Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
m = max( data );


// ----
// Matrices (along rows)...
mat = matrix( data, [100,10], 'int32' );
m = max( mat, {
	'dim': 1
});
console.log( 'Matrix (rows): %s\n', m.toString() );


// ----
// Matrices (along columns)...
m = max( mat, {
	'dim': 2
});
console.log( 'Matrix (columns): %s\n', m.toString() );


// ----
// Matrices (custom output data type)...
m = max( mat, {
	'dtype': 'uint8'
});
console.log( 'Matrix (%s): %s\n', m.dtype, m.toString() );
