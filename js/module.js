/**
 * Created by Arham Ali Qureshi on 10/15/13.
 */
// Create a new module
var appModule = angular.module('appModule', []);

appModule
    .config(function($routeProvider){
        $routeProvider
            .when('/',{

            })
    });

appModule
    .directive('contenteditable', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                // view -> model
                element.bind('blur', function() {
                    scope.$apply(function() {   //$apply is $eval.
                        ctrl.$setViewValue(element.html()); //$setViewValue is start of passing a value from the view to the model.
                    });
                });

                // model -> view
                ctrl.$render = function() {     //$render is called when model is changed.
                    element.html(ctrl.$viewValue);
                };

                // load init value from DOM
//                ctrl.$setViewValue(element.html()); //This line is commented because causing problem when inner HTML having angular object.
            }
        };
    })
    .directive('inputdiv', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs){

                element.bind('click',function(){
                    scope.$eval(attrs.inputdiv);
                });
            }
        };
    });


appModule
    .filter('range', function() {
        return function(input, total) {
            total = parseInt(total);
            var newItem = {item:'', quantity:'', status: false, unitPrice:'', cost:''};
            while(input.length<total){
                input.push(newItem);
            }
            return input;
        };
    });

appModule
    .controller('appCtrl',function($scope){
        $scope.title = "GROCERIES LIST";
        $scope.heading = "GROCERIES";
        $scope.isEditable = true;
        $scope.date = $scope.date || new Date();
        $scope.products = [
            {item:'Potato', quantity:'3', status: false, unitPrice:'', cost:''},
            {item:'Tomato', quantity:'1', status: false, unitPrice:'', cost:''},
            {item:'Banana', quantity:'2', status: false, unitPrice:'', cost:''}
        ];
        window.test = $scope.products;
    });

