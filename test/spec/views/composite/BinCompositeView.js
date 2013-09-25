(function() {
	'use strict';

	var root = this;

	root.define([
		'views/composite/BinCompositeView'
		],
		function( Bincompositeview ) {

			describe('Bincompositeview Compositeview', function () {

				it('should be an instance of Bincompositeview Compositeview', function () {
					var BinCompositeView = new Bincompositeview();
					expect( BinCompositeView ).to.be.an.instanceof( Bincompositeview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );