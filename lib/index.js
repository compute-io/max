/**
*
*	COMPUTE: max
*
*
*	DESCRIPTION:
*		- Computes the maximum value of a numeric array.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

'use strict';

/**
* FUNCTION: max( arr )
*	Computes the maximum value of a numeric array.
*
* @param {Array} arr - array of values
* @returns {Number} max value
*/
function max( arr ) {
	if ( !Array.isArray( arr ) ) {
		throw new TypeError( 'max()::invalid input argument. Must provide an array.' );
	}
	var len = arr.length,
		val = arr[ 0 ];

	for ( var i = 1; i < len; i++ ) {
		if ( arr[ i ] > val ) {
			val = arr[ i ];
		}
	}
	return val;
} // end FUNCTION max()


// EXPORTS //

module.exports = max;
