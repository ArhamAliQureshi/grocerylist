
appModule
    .controller('appCtrl',function($scope, dataService, jsonFactory){
        $scope.title = "GROCERIES LIST";
        $scope.heading = "GROCERIES";
        $scope.date = $scope.date || new Date();
        $scope.nav = dataService.getNav();
        $scope.isEditable = false;

        $scope.toggleEditable = function (){    //Enable or disable edit mode.

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

        $scope.removeRow = function(){      //Called from view to delete row when is edit mode.
            if($scope.isEditable){
                $scope.activeRow = dataService.activeRow();
                dataService.products().splice($scope.activeRow,1);
            }
        };

        $scope.save = function(){
            jsonFactory.saveData();
        };
    })
    .controller('bookCtrl',function($scope, jsonFactory, dataService){
        $scope.book = jsonFactory.loadBook();
        console.log($scope.book);
    })
    .controller('newListCtrl',function($scope,  $rootScope, cleanProductsFactory, dataService){
        $scope.products = dataService.products();       //Get products Array from service.
        $scope.nav = dataService.getNav();
        $scope.products.length = 0;
        $scope.rowColor = '{color: green}';
        $scope.clickRow = function(element){
            var index = element.$index;
            var activeRow = $scope.isEditable == true? index : false;        //Check if row clicked in edit mode. If not set activeRow = false. Otherwise it will have the array $index value.
            dataService.activeRow(activeRow);
        };

        $scope.$on("$routeChangeStart",function(event, next, current){  //Event fires when route is about to change.
            cleanProductsFactory.removeEmptyItem();
        });
    })
    .controller('listCtrl',function($scope,  $rootScope, cleanProductsFactory, dataService){
        $scope.nav = dataService.getNav();
        $scope.products = dataService.products();       //Get products Array from service.
        $scope.rowColor = '{color: green}';
        $scope.clickRow = function(element){
            var index = element.$index;
            var activeRow = $scope.isEditable == true? index : false;        //Check if row clicked in edit mode. If not set activeRow = false. Otherwise it will have the array $index value.
            dataService.activeRow(activeRow);
        };

        $scope.$on("$routeChangeStart",function(event, next, current){  //Event fires when route is about to change.
            cleanProductsFactory.removeEmptyItem();
        });
    })
    .controller('cartsCtrl',function($scope, dataService){
        $scope.nav = dataService.getNav();      //Navigation button ng-show API.
        $scope.cartsArray = dataService.cartsArray();
        $scope.addNewCart = function(){         //Called when new cart requested.
            $scope.cartsArray.push({name:'New Cart'});  //Append new Cart in carts array.
            location.href = '#/cart/'+($scope.cartsArray.length-1);
        };
        window.testCarts = $scope.cartsArray;
    })
    .controller('cartCtrl',function($scope, $routeParams,dataService){
        $scope.nav = dataService.getNav();
        $scope.cartNumber = $routeParams.cartNumber;    //Get Cart number from URL.
        $scope.products = dataService.products();       //Get products Array from service.
        $scope.cart = dataService.cartsArray()[$scope.cartNumber];
        $scope.totalCost = 0;


        $scope.$watch('cart.paidCash',function(e){  //Watches the change in paid cash field.
            $scope.cart.paidCash=e;
        });

        $scope.updateProductStatus = function(product){ //Executed when product checkbox clicked.
            product.cartID = $scope.cartNumber; //This get Cart number from URL and set it in products.
            $scope.updateTotalCost();   //Calculate the cost when check box clicked.
        };

        $scope.updateTotalCost = function(){
            var totalCost = 0;
            $.each($scope.products,function(index, value){
                if(value.status && value.cartID==$scope.cartNumber){totalCost+=value.cost;} //Will check if product is bought then will add its cost to total cost.
            });
            $scope.totalCost = totalCost;
        };
        $scope.clickRow = function(element){    //Executed when table's any row is clicked.
            var index = element.$index;
            var activeRow = $scope.isEditable == true? index : false;        //Check if row clicked in edit mode. If not set activeRow = false. Otherwise it will have the array $index value.
            dataService.activeRow(activeRow);
        };
    });
