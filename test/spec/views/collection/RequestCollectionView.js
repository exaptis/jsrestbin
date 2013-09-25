(function () {
    'use strict';

    var root = this;

    root.define([
        'views/collection/RequestCollectionView'
    ],
        function (RequestCollectionView) {

            describe('Request CollectionView', function () {

                it('should be an instance of Request CollectionView', function () {
                    var requestCollectionView = new RequestCollectionView();
                    expect(requestCollectionView).to.be.an.instanceof(RequestCollectionView);
                });

                it('should have more test written', function () {
                    expect(true).to.be.ok;
                });
            });

        });

}).call(this);