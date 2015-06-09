/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	max = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array maximum', function tests() {

	it( 'should export a function', function test() {
		expect( max ).to.be.a( 'function' );
	});

	it( 'should compute the maximum', function test() {
		var data, expected;

		data = [ 2, 4, 5, 3, 8, 2 ];
		expected = 8;

		assert.strictEqual( max( data ), expected );
	});

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( max( [] ) );
	});

});
