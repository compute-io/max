/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	max = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix maximum', function tests() {

	var data,
		mat,
		i;

	data = new Int8Array( 9 );
	for ( i = 0; i < data.length; i++ ) {
		data[ i ] = i + 1;
	}
	mat = matrix( data, [3,3], 'int8' );


	it( 'should export a function', function test() {
		expect( max ).to.be.a( 'function' );
	});

	it( 'should compute the maximum along matrix columns', function test() {
		var out, p, expected;

		out = matrix( [3,1], 'int32' );

		p = max( out, mat );
		expected = '3;6;9';

		assert.strictEqual( p.toString(), expected );

		p = max( out, mat, 2 );
		expected = '3;6;9';

		assert.strictEqual( p.toString(), expected );
	});

	it( 'should compute the maximum along matrix rows', function test() {
		var out, p, expected;

		out = matrix( [1,3], 'int32' );

		p = max( out, mat, 1 );
		expected = '7,8,9';

		assert.strictEqual( p.toString(), expected );
	});
	
	it( 'should return null if provided a matrix having one or more zero dimensions', function test() {
		var out, mat;

		out = matrix( [0,0] );

		mat = matrix( [0,10] );
		assert.isNull( max( out, mat ) );

		mat = matrix( [10,0] );
		assert.isNull( max( out, mat ) );

		mat = matrix( [0,0] );
		assert.isNull( max( out, mat ) );
	});

});
