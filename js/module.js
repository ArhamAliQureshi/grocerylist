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
                controller: 'homeCtrl'
            })
            .when('/book',{
                templateUrl: 'views/book.html',
                controller: 'bookCtrl'
            })
            .when('/newList/:listIndex',{
                templateUrl: 'views/list.html',
                controller: 'newListCtrl'
            })
            .when('/list/:listIndex',{
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