'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	dtype = require( 'compute-dtype' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var max1 = require( './array.js' ),
	max2 = require( './accessor.js' ),
	max3 = require( './matrix.js' );

// MAX //

/**
* FUNCTION: max( x[, options] )
*	Computes the maximum value of elements in x.
*
* @param {Number[]|Array|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} x - input value
* @param {Object} [opts] - function options
* @param {Function} [opts.accessor] - accessor function for accessing array values
* @param {Number} [opts.dim=2] - dimension along which to compute the maximum
* @returns {Number|Matrix|Null} max value(s) or null
*/
function max( x, options ) {
	/* jshint newcap:false */
	var opts = {},
		shape,
		ctor,
		err,
		len,
		dim,
		dt,
		d,
		m;

	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	if ( isMatrixLike( x ) ) {
		dt = dtype( x.data );
		dim = opts.dim;
		if ( dim > 2 ) {
			throw new RangeError( 'max()::invalid option. Dimension option exceeds number of matrix dimensions. Option: `' + dim + '`.' );
		}

		// Determine if provided a vector...
		if ( x.shape[ 0 ] === 1 || x.shape[ 1 ] === 1 ) {
			// Treat as an array-like object:
			return max1( x.data );
		}
		if ( dim === void 0 || dim === 2 ) {
			len = x.shape[ 0 ];
			shape = [ len, 1 ];
		} else {
			len = x.shape[ 1 ];
			shape = [ 1, len ];
		}
		ctor = x.data.constructor;
		// Create an output matrix and calculate the maxima:
		d = new ctor( len );
		m = matrix( d, shape, dt );
		return max3( m, x, dim );
	}
	if ( isArrayLike( x ) ) {
		if ( opts.accessor ) {
			return max2( x, opts.accessor );
		}
		return max1( x );
	}
	throw new TypeError( 'max()::invalid input argument. First argument must be either an array or a matrix. Value: `' + x + '`.' );
} // end FUNCTION max()


// EXPORTS //

module.exports = max;
