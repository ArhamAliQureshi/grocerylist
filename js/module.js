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
//                controller: 'listCtrl'
            })
            .when('/book',{
                templateUrl: 'views/book.html'
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