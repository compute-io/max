'use strict';

/**
* FUNCTION: max( arr )
*	Computes the maximum value of an array.
*
* @param {Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} arr - input array
* @returns {Number|Null} max value
*/
function max( arr ) {
	var len = arr.length,
		m,
		i;

	if ( !len ) {
		return null;
	}
	m = arr[ 0 ];
	for ( i = 1; i < len; i++ ) {
		if ( arr[ i ] > m ) {
			m = arr[ i ];
		}
	}
	return m;
} // end FUNCTION max()


// EXPORTS //

module.exports = max;
