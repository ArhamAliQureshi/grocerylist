/**
 * Created by Arham Ali Qureshi on 10/15/13.
 */
// Create a new module
var appModule = angular.module('appModule', []);

appModule
    .config(function($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl: 'views/homepage.html',
                controller: 'listCtrl'
            })
            .when('/list',{
                templateUrl: 'views/list.html',
                controller: 'listCtrl'
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
    });


appModule
    .filter('range', function() {
        return function(input, total) {
            total = parseInt(total);
            while(input.length<total){
                var newItem = {item:'', quantity:'', status: false, unitPrice:'', cost:''};
                input.push(newItem);
            }
            return input;
        };
    });
appModule
    .service('dataService',function($rootScope){
        var products = [
            {item:'Potato', quantity:'3', status: false, unitPrice:'', cost:''},
            {item:'Tomato', quantity:'1', status: false, unitPrice:'', cost:''},
            {item:'Banana', quantity:'2', status: false, unitPrice:'', cost:''}
        ];
        var activeRow = products.length;       //Contains the index of the click row in edit mode.
        return{
            products: function(){
                return products;
                $rootScope.$broadcast('productsChanged', products);
            },
            activeRow: function(value){
                if(!isNaN(parseInt(value))){return activeRow = value;}
                else
                    return activeRow;}

        }
    });
appModule
    .controller('appCtrl',function($scope, dataService){
        $scope.title = "GROCERIES LIST";
        $scope.heading = "GROCERIES";
        $scope.date = $scope.date || new Date();
        $scope.isEditable = false;

        $scope.toggleEditable = function (){

            $scope.isEditable = !$scope.isEditable;
            var target = event.target;
            if($(target).is("span")){ target = $(target).parent();} //This will fix bug of Glyphicons click.
            var buttonInnerHTMl;
            switch ($scope.isEditable){
                case true:
                    $(target).removeClass("btn-warning");
                    $(target).addClass("btn-success");
                    buttonInnerHTMl = '<span class="icon-check icon-white"></span>Done';
                    $(target).html(buttonInnerHTMl);
                    break;
                case false:
                    dataService.activeRow(dataService.products().length); //This is used to avoid any unwanted delete events.
                    $(target).removeClass("btn-success");
                    $(target).addClass("btn-warning");
                    buttonInnerHTMl = '<span class="icon-edit icon-white"></span>Edit';
                    $(target).html(buttonInnerHTMl);
                    break;
            }
            $('#cart').prop('disabled', $scope.isEditable);

        };

        $scope.removeRow = function(){
            $scope.activeRow = dataService.activeRow();
            dataService.products().splice($scope.activeRow,1);
        };

    })
    .controller('listCtrl',function($scope, dataService){
        $scope.products = dataService.products();       //Get products Array from service.

        $scope.clickRow = function(element){
            var index = element.$index;
            var activeRow = $scope.isEditable == true? index : false;        //Check if row clicked in edit mode. If not set activeRow = false. Otherwise it will have the array $index value.
            dataService.activeRow(activeRow);
        };

        window.test = $scope.products;
    });


