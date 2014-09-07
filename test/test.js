
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
	'use strict';

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

	it( 'should return the minimum value', function test() {
		var data, expected;

		data = [ 4, 2, 5, 3, 8, 2 ];
		expected = 8;

		assert.strictEqual( max( data ), expected );
	});

});