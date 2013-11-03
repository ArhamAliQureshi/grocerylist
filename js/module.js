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
            .when('/newList',{
                templateUrl: 'views/list.html',
                controller: 'newListCtrl'
            })
            .when('/list',{
                templateUrl: 'views/list.html',
                controller: 'listCtrl'
            })
            .when('/carts/',{
                templateUrl: 'views/carts.html',
                controller: 'cartsCtrl'
            })
            .when('/cart/:cartNumber',{
                templateUrl: 'views/cart.html',
                controller: 'cartCtrl'
            })
    });



appModule
    .directive('contenteditable', function($rootScope) {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
                // view -> model
                element.bind('keyup', function() {
                    scope.$apply(function() {   //$apply is $eval. updates all views of that model.
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
    .directive('ngClass',function(){
        return{
            link: function(scope, element, attrs, ctrl) {
                if(scope.product.status==true){scope.itemBought = true}
            }
        }
    })
    .directive('ngCalculate',function(){
        return{
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl){
                var cost = scope.$eval(attrs.ngCalculate); //get the equation from attribute.
                ctrl.$setViewValue(cost);   //Set the ngModel value.
                scope.updateTotalCost(); //Updated the total cost.
                scope.$watch('product.unitPrice + product.quantity', function(oldValue,newValue){
                    if(oldValue!=newValue){
                        var cost = scope.$eval(attrs.ngCalculate);  //get the equation from attribute.
                        ctrl.$setViewValue(cost);   //Set the ngModel value.
                        scope.updateTotalCost();    //Updated the total cost
                    }
                });
            }
        }
    })
    .directive('ngDebug',function(){
        return{
            restrict: 'A',
            link: function (scope, element, attrs, ctrl){
                console.log(scope.$eval(attrs.ngDebug));
            }
        }
    });


appModule
    .filter('range', function() {
        return function(input, total) {
            total = parseInt(total);
            while(input.length<total){
                var newItem = {item:'', quantity: '', status: false, unitPrice: '', cost: '', cartID: ''};
                input.push(newItem);
            }
            return input;
        };
    })
    .filter('status', function(){        // This will filter cart item and return items which status == true/false OR cartID == cartNumber.
        return function(input, bool, cartNumber){   //Obj, bool, cartNumber
            var filtered = [];  //contains the filtered product.
            angular.forEach(input,function(value,key){
                if(value.item !=''){        //Will check if the Item is empty
                    if( value.status == bool || value.cartID == cartNumber){
                        filtered.push(value);
                    }
                }
            });
            return filtered;
        }
    });



appModule
    .service('dataService',function($rootScope){
        var products = [
            {item:'Potato', quantity: 3, status: false, unitPrice: 5, cost: 0, cartID: ''},
            {item:'Tomato', quantity: 1, status: false, unitPrice: 0, cost: 0, cartID: ''},
            {item:'Banana', quantity: 2, status: false, unitPrice: 0, cost: 0, cartID: ''}
        ];
        window.test = products;

        var cartsArray=[{name:"Babo Baniya"},{name:"Memon Baniya"}]; //Contains the list of carts

        var activeRow = products.length;       //Contains the index of the click row in edit mode.

        return{
            products: function(){
                return products;
                $rootScope.$broadcast('productsChanged', products);
            },
            cartsArray : function (value){   //If value is passed in function then this value will be push else returns cartsArray.
                if(value){cartsArray.push(value);}
                else
                    return cartsArray;

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
                    $('body').css('zoom','100%');
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
    .controller('newListCtrl',function($scope,  $rootScope, dataService){
        $scope.products = dataService.products();       //Get products Array from service.
//        $scope.products.splice(0,$scope.products.length);
        $scope.products.length = 0;
        $scope.rowColor = '{color: green}';
        $scope.clickRow = function(element){
            var index = element.$index;
            var activeRow = $scope.isEditable == true? index : false;        //Check if row clicked in edit mode. If not set activeRow = false. Otherwise it will have the array $index value.
            dataService.activeRow(activeRow);
        };

        $scope.$on("$routeChangeStart",function(event, next, current){  //Event fires when route is about to change.
            Array.prototype.clean = function() {        // Clean remove elements from array which don't have item. Need to use this because for paging in list.html appended many empty items.
                for (var i = 0; i < this.length; i++) {
                    if (this[i].item == '') {
                        this.splice(i, 1);
                        i--;
                    }
                }
                return this;
            };
            if(next.templateUrl!=current.templateUrl){  //Check if next route is not same as current route.
                $scope.products.clean();    // Clean remove elements from array which don't have item.
            }
        });

    })
    .controller('listCtrl',function($scope,  $rootScope, dataService){
        $scope.products = dataService.products();       //Get products Array from service.
        $scope.rowColor = '{color: green}';
        $scope.clickRow = function(element){
            var index = element.$index;
            var activeRow = $scope.isEditable == true? index : false;        //Check if row clicked in edit mode. If not set activeRow = false. Otherwise it will have the array $index value.
            dataService.activeRow(activeRow);
        };

        $scope.$on("$routeChangeStart",function(event, next, current){  //Event fires when route is about to change.
            Array.prototype.clean = function() {        // Clean remove elements from array which don't have item. Need to use this because for paging in list.html appended many empty items.
                for (var i = 0; i < this.length; i++) {
                    if (this[i].item == '') {
                        this.splice(i, 1);
                        i--;
                    }
                }
                return this;
            };
            if(next.templateUrl!=current.templateUrl){  //Check if next route is not same as current route.
                $scope.products.clean();    // Clean remove elements from array which don't have item.
            }
        });

    })
    .controller('cartsCtrl',function($scope, dataService){
        $scope.products = dataService.products();       //Get products Array from service.
        $scope.cartsArray = dataService.cartsArray();
        $scope.addNewCart = function(){         //Called when new cart requested.
            $scope.cartsArray.push({name:'New Cart'});  //Append new Cart in carts array.
            location.href = '#/cart/'+($scope.cartsArray.length-1);
            window.testCart = $scope.cartsArray;
        };
    })
    .controller('cartCtrl',function($scope, $routeParams,dataService){
        $scope.cartNumber = $routeParams.cartNumber;    //Get Cart number from URL.
        $scope.products = dataService.products();       //Get products Array from service.


        $scope.updateProductStatus = function(product){
            product.cartID = $scope.cartNumber; //This get Cart number from URL and set it in products.
            $scope.updateTotalCost();   //Calculate the cost when check box clicked.
        };

        $scope.updateTotalCost = function(){
            var totalCost = 0;
            $.each($scope.products,function(index, value){
                if(value.status){totalCost+=value.cost;} //Will check if product is bought then will add its cost to total cost.
            });
            $scope.totalCost = totalCost;
        };
        $scope.clickRow = function(element){
            var index = element.$index;
            var activeRow = $scope.isEditable == true? index : false;        //Check if row clicked in edit mode. If not set activeRow = false. Otherwise it will have the array $index value.
            dataService.activeRow(activeRow);
        };
    });


