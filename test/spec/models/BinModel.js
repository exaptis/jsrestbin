(function () {
    'use strict';

    var root = this;

    root.define([
        'models/BinModel'
    ],
        function (BinModel) {

            describe('Bin Model', function () {

                it('should be an instance of BinModel Model', function () {
                    var binModel = new BinModel();
                    expect(binModel).to.be.an.instanceof(BinModel);
                });

                it('should have more test written', function () {
                    expect(true).to.be.ok;
                });
            });

        });

}).call(this);