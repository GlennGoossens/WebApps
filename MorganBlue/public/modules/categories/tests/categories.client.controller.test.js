'use strict';

(function() {

	describe('Categories Controller Tests', function() {

		var CategoriesController,
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


		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {

			scope = $rootScope.$new();


			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;


			CategoriesController = $controller('CategoriesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Category object fetched from XHR', inject(function(Categories) {

			var sampleCategory = new Categories({
				name: 'New Category',
				description: 'New Category Description'
			});


			var sampleCategories = [sampleCategory];


			$httpBackend.expectGET('categories').respond(sampleCategories);


			scope.find();
			$httpBackend.flush();


			expect(scope.categories).toEqualData(sampleCategories);
		}));

		it('$scope.findOne() should create an array with one Category object fetched from XHR using a categoryId URL parameter', inject(function(Categories) {
			// Define a sample Monkey object
			var sampleCategory = new Categories({
				name: 'New Category',
				description: 'New Category Description'
			});

			$stateParams.categoryId = '525a8422f6d0f87f0e407a33';

			$httpBackend.expectGET(/categories\/([0-9a-fA-F]{24})$/).respond(sampleCategory);

			scope.findOne();
			$httpBackend.flush();

			expect(scope.category).toEqualData(sampleCategory);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Categories) {
			var sampleCategoryPostData = new Categories({
				name: 'New Category',
				description: 'New Category Description'
			});

			var sampleCategoryResponse = new Categories({
				_id: '525cf20451979dea2c000001',
				name: 'New Category',
				description: 'New Category Description'
			});

			scope.name = 'New Category';
			scope.description = 'New Category Description';

			$httpBackend.expectPOST('categories', sampleCategoryPostData).respond(sampleCategoryResponse);

			scope.create();
			$httpBackend.flush();

			expect(scope.name).toEqual('');

			expect($location.path()).toBe('/categories/' + sampleCategoryResponse._id);
		}));

		it('$scope.update() should update a valid Category', inject(function(Categories) {
			var sampleCategoryPutData = new Categories({
				_id: '525cf20451979dea2c000001',
				name: 'Update Category',
				description: 'Update Category Description'
			});

			scope.category = sampleCategoryPutData;

			$httpBackend.expectPUT(/categories\/([0-9a-fA-F]{24})$/).respond();

			scope.update();
			$httpBackend.flush();

			expect($location.path()).toBe('/categories/' + sampleCategoryPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid categoryId and remove the Monkey from the scope', inject(function(Categories) {
			var sampleCategory = new Categories({
				_id: '525a8422f6d0f87f0e407a33'
			});

			scope.categories = [sampleCategory];

			$httpBackend.expectDELETE(/categories\/([0-9a-fA-F]{24})$/).respond(204);

			scope.remove(sampleCategory);
			$httpBackend.flush();

			expect(scope.categories.length).toBe(0);
		}));
	});
}());
