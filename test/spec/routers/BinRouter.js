(function () {
    'use strict';

    var root = this;

    root.define([
        'routers/BinRouter'
    ],
        function (BinRouter) {

            describe('Binrouter Router', function () {

                it('should be an instance of Binrouter Router', function () {
//                    var binRouter = new BinRouter();
//                    expect(binRouter).to.be.an.instanceof(BinRouter);
                });

                it('should have more test written', function () {
                    expect(true).to.be.ok;
                });
            });

        });

}).call(this);