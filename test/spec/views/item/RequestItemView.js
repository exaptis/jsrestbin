(function () {
    'use strict';

    var root = this;

    root.define([
        'views/item/RequestItemView'
    ],
        function (RequestItemView) {

            describe('Request ItemView', function () {

                it('should be an instance of Request ItemView', function () {
                    var requestItemView = new RequestItemView();
                    expect(requestItemView).to.be.an.instanceof(RequestItemView);
                });

                it('should have more test written', function () {
                    expect(true).to.be.ok;
                });
            });

        });

}).call(this);