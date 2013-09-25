(function () {
    'use strict';

    var root = this;

    root.define([
        'collections/BinCollection'
    ],
        function (BinCollection) {

            describe('Bin Collection', function () {

                it('should be an instance of Bin Collection', function () {
                    var binCollection = new BinCollection();
                    expect(binCollection).to.be.an.instanceof(BinCollection);
                });

                it('should have more test written', function () {
                    expect(true).to.be.ok;
                });
            });

        });

}).call(this);