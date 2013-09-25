(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/NavigationItemView'
		],
		function( Navigationitemview ) {

			describe('Navigationitemview Itemview', function () {

				it('should be an instance of Navigationitemview Itemview', function () {
					var NavigationItemView = new Navigationitemview();
					expect( NavigationItemView ).to.be.an.instanceof( Navigationitemview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );