'use strict';

module.exports = function (ngModule) {
	
	//var Items = require('../../../items/items.service')(ngModule);
	require('./pw-card/pw-card-list')(ngModule);
	require('./pw-card/pw-card-item')(ngModule);
	require('./pw-category/pw-category-list')(ngModule);
	require('./pw-category/pw-category-item')(ngModule);
	var modalTemplate = require('../../../_misc/pw-modal-template');
	
	ngModule.directive('pwArticleList', function($location, $uibModal, Articles, Items) {
		
		return {
			restrict: 'E',
			template: require('./pw-article-list.html'),
			scope: {
				query: '=' // the query is defined in ../config/routes to handle the display options (fav, trash, ...)
			},
			link: function(scope, element, attrs) {
				
				scope.createItem = function() {
					var article = new Articles({
						title: "Untitled",
						content: [{body: 'start typing here'}]
					});

					article.$save(
						function(response) {
							$location.path('articles/' + response._id);
						},
						function(errorResponse) {
							scope.error = errorResponse.data.message;
						}
					);
				};
				
			},
			controller: ['$scope', function($scope) {
				
				// we get articles based on the query params then build the tags array
				$scope.articles = Articles.query({ fields: JSON.stringify($scope.query) }, function () {
				
					// we store tags in an array of objects {name: tagName, count: tagCount}
					$scope.tags = Items.getUniqueTags ($scope.articles, 'tags');
					return Items.getItems ($scope.articles);
					
				});
				
				// arrays used to filter articles. populated both in the card list & the tag list directives
				this.activeTags = [];
				
				$scope.$on('itemsUpdate', function(event, items) {
					$scope.$evalAsync(function() {
						$scope.articles = items;
						$scope.tags = Items.getUniqueTags ($scope.articles, 'tags');
					});
				});
		
				$scope.$on('$destroy', function() {
					return Items.reset();
				});
				
			}],
			controllerAs: 'ctrl'
			
		};
		
	});

};