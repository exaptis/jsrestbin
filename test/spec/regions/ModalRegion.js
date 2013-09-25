(function () {
    'use strict';

    var root = this;

    root.define([
        'regions/ModalRegion'
    ],
        function (ModalRegion) {

            describe('Modal Region', function () {

                it('should be an instance of Modal Region', function () {
                    var modalRegion = new ModalRegion();
                    expect(modalRegion).to.be.an.instanceof(ModalRegion);
                });

                it('should have more test written', function () {
                    expect(true).to.be.ok;
                });
            });

        });

}).call(this);