/* global require, describe, it */
'use strict';

// MODULES //

var matrix = require( 'compute-matrix' );

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	max = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-max', function tests() {

	it( 'should export a function', function test() {
		expect( max ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
			// '5',
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				max( value );
			};
		}
	});

	it( 'should throw an error if `options` is not an object', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				max( [1,2,3,4,5], value );
			};
		}
	});

	it( 'should throw an error if provided an accessor which is not a function', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				max( [1,2,3,4,5], {'accessor': value} );
			};
		}
	});

	it( 'should throw an error if provided a dim option which is not a positive integer', function test() {
		var data = matrix( new Int32Array([1,2,3,4]), [2,2] );
		var values = [
			'5',
			-5,
			2.2,
			true,
			undefined,
			null,
			NaN,
			[],
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( Error );
		}

		function badValue( value ) {
			return function() {
				max( data, {'dim': value} );
			};
		}
	});

	it( 'should throw an error if provided a dim option which exceeds matrix dimensions ( = 2 )', function test() {
		var data = matrix( new Int32Array([1,2,3,4]), [2,2] );
		var values = [
			3,
			4,
			5
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[ i ] ) ).to.throw( RangeError );
		}

		function badValue( value ) {
			return function() {
				max( data, {'dim': value} );
			};
		}
	});

	it( 'should return the maximum value for an array', function test() {
		var data, expected;

		data = [ 4, 2, 5, 3, 8, 2 ];
		expected = 8;

		assert.strictEqual( max( data ), expected );
	});

	it( 'should return the maximum value for an array using an accessor function', function test() {
		var data, expected, actual;

		data = [
			[1,4],
			[2,2],
			[3,5],
			[4,3],
			[5,8],
			[6,2]
		];
		expected = 8;
		actual = max( data, {'accessor': getValue});

		assert.strictEqual( actual, expected );

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should calculate the column maxima of a matrix', function test() {
		var data, expected, results;

		data = matrix( new Int32Array( [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] ), [3,3] );
		expected = matrix( new Int32Array( [ 3, 6, 9 ] ), [3,1] );

		results = max( data );

		assert.strictEqual( results.length, expected.length );
		assert.deepEqual( results, expected );
	});

	it( 'should calculate the row maxima of a matrix', function test() {
		var data, expected, results;

		data = matrix( new Int32Array( [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] ), [3,3] );
		expected = matrix( new Int32Array( [ 7, 8, 9 ] ), [1, 3] );

		results = max( data, {'dim': 1} );

		assert.strictEqual( results.length, expected.length );
		assert.deepEqual( results, expected );
	});


	it( 'should return null if provided an empty array', function test() {
		assert.isNull( max( [] ) );
		assert.isNull( max( [], {'accessor': function( x ) { return x; }} ) );
	});

	it( 'should return null if provided an empty matrix', function test() {
		var data;

		data = matrix( new Int32Array(), [1, 0]);
		assert.isNull( max( data ) );

		data = matrix( new Int32Array(), [0, 1] );
		assert.isNull( max( data ) );
	});

});
