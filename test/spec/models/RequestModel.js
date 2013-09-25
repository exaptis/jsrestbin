(function () {
    'use strict';

    var root = this;

    root.define([
        'models/RequestModel'
    ],
        function (RequestModel) {

            describe('Request Model', function () {

                it('should be an instance of Request Model', function () {
                    var requestModel = new RequestModel();
                    expect(requestModel).to.be.an.instanceof(RequestModel);
                });

                it('should have more test written', function () {
                    expect(true).to.be.ok;
                });
            });

        });

}).call(this);