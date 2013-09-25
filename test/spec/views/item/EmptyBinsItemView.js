(function () {
    'use strict';

    var root = this;

    root.define([
        'views/item/EmptyBinsItemView'
    ],
        function (EmptyBinsItemView) {

            describe('EmptyBinsItemView Itemview', function () {

                it('should be an instance of EmptyBins ItemView', function () {
                    var emptyBinsItemView = new EmptyBinsItemView();
                    expect(emptyBinsItemView).to.be.an.instanceof(EmptyBinsItemView);
                });

                it('should have more test written', function () {
                    expect(true).to.be.ok;
                });
            });

        });

}).call(this);