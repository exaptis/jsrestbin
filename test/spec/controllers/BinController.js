(function () {
    'use strict';

    var root = this;

    root.define([
        'controllers/BinController'
    ],
        function (BinController) {

            describe('Bin Controller', function () {

                it('should be an instance of Bin Controller', function () {
                    var binController = new BinController();
                    expect(binController).to.be.an.instanceof(BinController);
                });

                it('should have more test written', function () {
                    expect(true).to.be.ok;
                });
            });

        });

}).call(this);