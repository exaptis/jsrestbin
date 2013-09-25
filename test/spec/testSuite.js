define(function() {
	'use strict';

	/* return an array of specs to be run */
	return {
		specs: ['spec/collections/BinCollection.js',
		'spec/collections/RequestCollection.js',
		'spec/controllers/BinController.js',
		'spec/controllers/RequestController.js',
		'spec/models/BinModel.js',
		'spec/models/RequestModel.js',
		'spec/regions/ModalRegion.js',
		'spec/routers/BinRouter.js',
		'spec/views/collection/BinCollectionView.js',
		'spec/views/collection/RequestCollectionView.js',
		'spec/views/composite/BinCompositeView.js',
		'spec/views/item/BinItemView.js',
		'spec/views/item/DeleteBinFormItemView.js',
		'spec/views/item/EmptyBinsItemView.js',
		'spec/views/item/EmptyRequestsItemView.js',
		'spec/views/item/NavigationItemView.js',
		'spec/views/item/RequestItemView.js'
		]
	};
});
