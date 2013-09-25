(function () {
    'use strict';

    var root = this;

    root.define([
        'controllers/RequestController'
    ],
        function (RequestController) {

            describe('Request Controller', function () {

                it('should be an instance of Request Controller', function () {
                    var requestController = new RequestController();
                    expect(requestController).to.be.an.instanceof(RequestController);
                });

                it('should have more test written', function () {
                    expect(true).to.be.ok;
                });
            });

        });

}).call(this);