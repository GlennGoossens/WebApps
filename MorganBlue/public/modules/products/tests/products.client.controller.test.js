'use strict';

(function() {
	describe('Products Controller Tests', function() {
		// Initialize global variables
		var ProductsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, Categories) {
			scope = $rootScope.$new();

			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			var category = new Categories({
				name: 'Beverages'
			});

			$httpBackend.expectGET('categories').respond([category]);

			ProductsController = $controller('ProductsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Product object fetched from XHR', inject(function(Products) {
			var sampleProduct = new Products({
				name: 'New Product'
			});

			var sampleProducts = [sampleProduct];

			$httpBackend.expectGET('products').respond(sampleProducts);

			scope.find();
			$httpBackend.flush();

			expect(scope.products).toEqualData(sampleProducts);
		}));

		it('$scope.findOne() should create an array with one Product object fetched from XHR using a productId URL parameter', inject(function(Products) {
			var sampleProduct = new Products({
				name: 'New Product'
			});

			$stateParams.productId = '525a8422f6d0f87f0e407a33';

			$httpBackend.expectGET(/products\/([0-9a-fA-F]{24})$/).respond(sampleProduct);

			scope.findOne();
			$httpBackend.flush();

			expect(scope.product).toEqualData(sampleProduct);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Products) {
			var sampleProductPostData = new Products({
				name: 'New Product'
			});

			var sampleProductResponse = new Products({
				_id: '525cf20451979dea2c000001',
				name: 'New Product'
			});

			scope.name = 'New Product';

			$httpBackend.expectPOST('products', sampleProductPostData).respond(sampleProductResponse);

			scope.create();
			$httpBackend.flush();

			expect(scope.name).toEqual('');

			expect($location.path()).toBe('/products/' + sampleProductResponse._id);
		}));

		it('$scope.update() should update a valid Product', inject(function(Products) {
			var sampleProductPutData = new Products({
				_id: '525cf20451979dea2c000001',
				name: 'New Product'
			});

			scope.product = sampleProductPutData;

			$httpBackend.expectPUT(/products\/([0-9a-fA-F]{24})$/).respond();

			scope.update();
			$httpBackend.flush();

			expect($location.path()).toBe('/products/' + sampleProductPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid productId and remove the Product from the scope', inject(function(Products) {
			var sampleProduct = new Products({
				_id: '525a8422f6d0f87f0e407a33'
			});

			scope.products = [sampleProduct];

			$httpBackend.expectDELETE(/products\/([0-9a-fA-F]{24})$/).respond(204);

			scope.remove(sampleProduct);
			$httpBackend.flush();

			expect(scope.products.length).toBe(0);
		}));
	});
}());
