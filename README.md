Max
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the maximum value.


## Installation

``` bash
$ npm install compute-max
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var max = require( 'compute-max' );
```

#### max( x[, options] )

Computes the maximum value. `x` may be either an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var data, m;

data = [ 2, 4, 5, 3, 8, 2 ];
m = max( data );
// returns 8

data = new Int8Array( data );
m = max( data );
// returns 8
```

For non-numeric `arrays`, provide an accessor `function` for accessing numeric values

``` javascript
var arr = [
	{'x':3},
	{'x':2},
	{'x':5},
	{'x':4},
	{'x':4},
	{'x':5}
];

function getValue( d ) {
	return d.x;
}

var val = max( arr, getValue );
// returns 5
```

If provided a [`matrix`](https://github.com/dstructs/matrix), the function accepts the following additional `option`:

*	__dim__: dimension along which to compute the maximum. Default: `2` (along the columns).

By default, the function computes the maximum value along the columns (`dim=2`).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	m,
	i;

data = new Int8Array( 25 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = i;
}
mat = matrix( data, [5,5], 'int8' );
/*
	[  0  1  2  3  4
	   5  6  7  8  9
	  10 11 12 13 14
	  15 16 17 18 19
	  20 21 22 23 24 ]
*/

mu = max( mat );
/*
	[ 4
	  9
	  14
	  19
	  24 ]
*/
```

To compute the maximum along the rows, set the `dim` option to `1`.

``` javascript
mu = max( mat, {
	'dim': 1
});
/*
	[ 20 21 22 23 24 ]
*/
```

__Note__: if provided an empty `array` or empty `matrix`, the function returns `null`.

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	max = require( 'compute-max' );

var data,
	mat,
	m,
	i;

// ----
// Plain arrays...
var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
m = max( data );
console.log( 'Arrays: %d\n', m );


// ----
// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
m = max( data, {
	'accessor': getValue
});
console.log( 'Accessors: %d\n', m );


// ----
// Typed arrays...
data = new Int32Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
m = max( data );


// ----
// Matrices (along rows)...
mat = matrix( data, [100,10], 'int32' );
m = max( mat, {
	'dim': 1
});
console.log( 'Matrix (rows): %s\n', m.toString() );


// ----
// Matrices (along columns)...
m = max( mat, {
	'dim': 2
});
console.log( 'Matrix (columns): %s\n', m.toString() );


// ----
// Matrices (custom output data type)...
m = max( mat, {
	'dtype': 'uint8'
});
console.log( 'Matrix (%s): %s\n', m.dtype, m.toString() );

```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-max.svg
[npm-url]: https://npmjs.org/package/compute-max

[travis-image]: http://img.shields.io/travis/compute-io/max/master.svg
[travis-url]: https://travis-ci.org/compute-io/max

[coveralls-image]: https://img.shields.io/coveralls/compute-io/max/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/max?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/max.svg
[dependencies-url]: https://david-dm.org/compute-io/max

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/max.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/max

[github-issues-image]: http://img.shields.io/github/issues/compute-io/max.svg
[github-issues-url]: https://github.com/compute-io/max/issues
