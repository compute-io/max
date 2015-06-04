'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	isMatrixLike = require( 'validate.io-matrix-like' ),
	ctors = require( 'compute-array-constructors' ),
	dtype = require( 'compute-dtype' ),
	matrix = require( 'compute-matrix' ),
	validate = require( './validate.js' );


// FUNCTIONS //

var max1 = require( './array.js' ),
	max2 = require( './accessor.js' ),
	max3 = require( './matrix.js' );

// MAX //

/**
* FUNCTION: max( arr[, accessor] )
*	Computes the maximum value of an array.
*
* @param {Number[]|Array} arr - input array
* @param {Function} [accessor] - accessor function for accessing array values
* @returns {Number|Null} max value
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
		ctor = ctors( dt );
		if ( ctor === null ) {
			throw new Error( 'max()::invalid option. Data type option does not have a corresponding array constructor. Option: `' + dt + '`.' );
		}
		// Create an output matrix and calculate the means:
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
