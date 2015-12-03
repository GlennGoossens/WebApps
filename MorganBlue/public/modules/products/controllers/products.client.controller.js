'use strict';

angular.module('products').controller('ProductsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Products', 'Categories', '$filter',
	function($scope, $stateParams, $location, Authentication, Products, Categories, $filter) {
		$scope.authentication = Authentication;
		$scope.categories = Categories.query();
		$scope.currentPage = 1;
		$scope.pageSize = 10;
		$scope.offset = 0;

		$scope.pageChanged = function() {
			$scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
		};

		$scope.create = function() {
			var product = new Products ({
				name: this.name,
				category: this.category,
				quantityPerUnit: this.quantityPerUnit,
				unitPrice: this.unitPrice,
				unitsInStock: this.unitsInStock,
				unitsOnOrder: this.unitsOnOrder
			});

			product.$save(function(response) {
				$location.path('products/' + response._id);

				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(product) {
			if ( product ) {
				product.$remove();

				for (var i in $scope.products) {
					if ($scope.products [i] === product) {
						$scope.products.splice(i, 1);
					}
				}
			} else {
				$scope.product.$remove(function() {
					$location.path('products');
				});
			}
		};

		$scope.update = function() {
			var product = $scope.product;
			product.category = product.category._id;

			product.$update(function() {
				$location.path('products/' + product._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		var appendCategory = function appendCategory(p) {
			p.category = $filter('filter')($scope.categories, {_id: p.category})[0];
		};

		$scope.find = function() {
			Products.query(function loadedProducts(products) {
				products.forEach(appendCategory);
				$scope.products = products;
			});
		};

		$scope.findOne = function() {
			$scope.product = Products.get({
				productId: $stateParams.productId
			}, appendCategory);
		};

		$scope.productSearch = function(product) {
			$location.path('products/' + product._id);
		};
	}
]);
