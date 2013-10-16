/**
 * Created by Arham Ali Qureshi on 10/15/13.
 */
// Create a new module
var appModule = angular.module('appModule', [])
    .directive('ngBlur',function(){
        return{
            restrict: 'A',
            link: function (scope, element, attrs){
//                element.bind('click',function(){
//                  scope.$eval(attrs.ngBlur);
//                });
                $(element).on('onblur',function(){
                    scope.$eval(attrs.ngBlur);
                });
            }
        }
    })
    .directive('inputcolumn', function() {
        return {
            restrict: 'A',
            template: '<td>Hello</td>',
            replace: true

        };
    })
    .filter('range', function() {
        return function(input, total) {
            total = parseInt(total);
            for (var i=0; i<total; i++)
                input.push(i);
            return input;
        };
    })
    .controller('appCtrl',function($scope){
        $scope.title = "GROCERIES LIST";
        $scope.heading = "GROCERIES";
        $scope.date = $scope.date || new Date();
        $scope.products = [
            {item:'Potato', quantity:'3', status: false, unitPrice:'', cost:''},
            {item:'Tomato', quantity:'1', status: false, unitPrice:'', cost:''},
            {item:'Banana', quantity:'2', status: false, unitPrice:'', cost:''}
        ];
        window.test = $scope.products;
    });

