(function () {
    'use strict';

    var root = this;

    root.define([
        'views/collection/BinCollectionView'
    ],
        function (BinCollectionView) {

            describe('Bin CollectionView', function () {

                it('should be an instance of Bin CollectionView', function () {
                    var binCollectionView = new BinCollectionView();
                    expect(binCollectionView).to.be.an.instanceof(BinCollectionView);
                });

                it('should have more test written', function () {
                    expect(true).to.be.ok;
                });
            });

        });

}).call(this);