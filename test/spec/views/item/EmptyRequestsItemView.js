(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/EmptyRequestsItemView'
		],
		function( Emptyrequestsitemview ) {

			describe('Emptyrequestsitemview Itemview', function () {

				it('should be an instance of Emptyrequestsitemview Itemview', function () {
					var EmptyRequestsItemView = new Emptyrequestsitemview();
					expect( EmptyRequestsItemView ).to.be.an.instanceof( Emptyrequestsitemview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );