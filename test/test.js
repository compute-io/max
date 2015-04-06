/* global require, describe, it */
'use strict';

// MODULES //

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
			'5',
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

	it( 'should throw an error if provided an accessor argument which is not a function', function test() {
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
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				max( [1,2,3], value );
			};
		}
	});

	it( 'should return the maximum value', function test() {
		var data, expected;

		data = [ 4, 2, 5, 3, 8, 2 ];
		expected = 8;

		assert.strictEqual( max( data ), expected );
	});

	it( 'should return the maximum value using an accessor function', function test() {
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
		actual = max( data, getValue );

		assert.strictEqual( actual, expected );

		function getValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( max( [] ) );
	});

});
