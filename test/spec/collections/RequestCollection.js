(function () {
    'use strict';

    var root = this;

    root.define([
        'collections/RequestCollection'
    ],
        function (RequestCollection) {

            describe('Request Collection', function () {

                it('should be an instance of Request Collection', function () {
                    var requestCollection = new RequestCollection();
                    expect(requestCollection).to.be.an.instanceof(RequestCollection);
                });

                it('should have more test written', function () {
                    expect(true).to.be.ok;
                });
            });

        });

}).call(this);