/*jslint devel: true, browser:true */
/*global define, bootbox, Backbone, _, $ */

define([
    'collections/requests',
    'views/requests',
    'text!/templates/bin/item.html'
], function (RequestsCollection, RequestsView, BinTemplate) {
    'use strict';
    var BinView = Backbone.View.extend({

        tagName: "li",
        template: _.template(BinTemplate),
        requestsContainer: '#content',

        initialize: function () {
            this.model.bind('change:isActive', this.markAsActive, this);
            this.model.bind('destroy', this.render, this);
            this.model.bind('reset', this.render, this);
        },

        events: {
            'click a.empty': 'deleteAllRequests',
            'click a.delete': 'deleteBin',
            'click a.select': 'select',
            'click a.latest': 'selectLatest'
        },

        markAsActive: function () {
            this.$el.toggleClass('active', this.model.get('isActive'));
            this.$el.find('i').toggleClass('icon-white', this.model.get('isActive'));
            return this;
        },

        select: function (e) {
            e.preventDefault();
            this.renderRequests();
        },

        selectLatest: function (e) {
            e.preventDefault();
            this.renderRequests('latest');
        },

        render: function () {
            this.$el.prepend(this.template({ bin: this.model }));
            return this;
        },

        renderRequests: function (path) {

            var self = this,
                requests;

            this.model.collection.each(function (bin) {
                bin.set('isActive', self.model === bin);
            });

            requests = new RequestsCollection([], {
                query: this.model.collection.query + '/' + this.model.get('reference') + '/requests/' + (path || '')
            });

            requests.fetch({
                success: function () {
                    new RequestsView({
                        el: self.requestsContainer,
                        collection: requests,
                        binView: self
                    }).render();
                },
                error: function () {
                    $(self.requestsContainer).empty();
                }
            });

            Backbone.history.navigate(requests.query);
            document.title = 'jsRestBin - ' + this.model.get('reference');
        },

        buildExternalUrl: function () {
            return document.location.origin + '/bins/' + this.model.get('reference');
        },

        deleteBin: function (e) {

            var self = this;
            bootbox.confirm('Do you really want to delete this Bin?', 'No', 'Yes', function (result) {
                if (result === true) {
                    self.remove();
                    self.model.destroy();
                }
            });

            e.preventDefault();
        },

        deleteAllRequests: function (event) {

            var self = this;
            bootbox.confirm('Do you really want to empty this Bin?', 'No', 'Yes', function handleResult(result) {
                if (result === true) {
                    $.ajax({
                        url: self.model.collection.query + '/' + self.model.get('reference') + '/requests/',
                        type: 'DELETE'
                    });
                }
            });

            event.preventDefault();
        }


    });

    return BinView;
});