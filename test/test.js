/* global require, describe, it */
'use strict';

// MODULES //

var matrix = require( 'dstructs-matrix' );

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

	it( 'should throw an error if provided a dimension which is greater than 2 when provided a matrix', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				max( matrix( [2,2] ), {
					'dim': value
				});
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


	it( 'should compute the maximum along a matrix dimension', function test() {
		var expected,
			data,
			mat,
			m,
			i;

		data = new Int8Array( 25 );
		for ( i = 0; i < data.length; i++ ) {
			data[ i ] = i + 1;
		}
		mat = matrix( data, [5,5], 'int8' );

		// ensure that values in matrix are not all ordered 
		mat.set( 0, 3, 5 );
		mat.set( 0, 4, 4 );

		// Default:
		m = max( mat );
		expected = '5;10;15;20;25';

		assert.strictEqual( m.toString(), expected, 'default' );

		// Along columns:
		m = max( mat, {
			'dim': 2
		});
		expected = '5;10;15;20;25';

		assert.strictEqual( m.toString(), expected, 'dim: 2' );

		// Along rows:
		m = max( mat, {
			'dim': 1
		});
		expected = '21,22,23,24,25';

		assert.strictEqual( m.toString(), expected, 'dim: 1' );
	});

	it( 'should compute the maximum of 1d matrices (vectors)', function test() {
		var data, mat;

		data = [ 2, 4, 5, 3, 8, 2 ];

		// Row vector:
		mat = matrix( data, [1,6], 'int8' );
		assert.strictEqual( max( mat ), 8 );

		// Column vector:
		mat = matrix( data, [6,1], 'int8' );
		assert.strictEqual( max( mat ), 8 );
	});

});
