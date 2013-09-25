(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/DeleteBinFormItemView'
		],
		function( Deletebinformitemview ) {

			describe('Deletebinformitemview Itemview', function () {

				it('should be an instance of Deletebinformitemview Itemview', function () {
					var DeleteBinFormItemView = new Deletebinformitemview();
					expect( DeleteBinFormItemView ).to.be.an.instanceof( Deletebinformitemview );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );