(function () {
    'use strict';

    var root = this;

    root.define([
        'views/item/BinItemView'
    ],
        function (BinItemView) {

            describe('Bin Itemview', function () {

                it('should be an instance of Bin Itemview', function () {
                    var binItemView = new BinItemView();
                    expect(binItemView).to.be.an.instanceof(BinItemView);
                });

                it('should have more test written', function () {
                    expect(true).to.be.ok;
                });
            });

        });

}).call(this);