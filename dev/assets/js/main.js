var CJ = ( function ( parent ) {
	'use strict';

	var globals = parent.globals || {},
		helpers = parent.helpers || {},
		settings = parent.settings || {},
		filters = parent.filters || {},
		fn = parent.fn || {};

	var debug = false;

	/* ======================== Start: Editable Content Below ======================== */

	if ( debug ) {
		console.log( 'main.js - loaded' );
	}

	/* ============================ End: Editable Content ============================ */

	// update any parent stuff and return
	parent.globals = globals;
	parent.helpers = helpers;
	parent.settings = settings;
	parent.filters = filters;
	parent.fn = fn;
	return parent;
}( CJ || {} ) );
