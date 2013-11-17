
appModule
    .factory('cleanProductsFactory',function(dataService){     //Function that clean the empty items from products.
        var products = dataService.products();
        return{
            removeEmptyItem: function(){    // Clean remove elements from array which don't have item. Need to use this because for paging in list.html we appended many empty items.
                    for (var i = 0; i < products.length; i++) {
                        if (products[i].item == '') {
                            products.splice(i, 1);
                            i--;
                        }
                    }
                    return products;
            }
        };
    })
    .factory('jsonFactory',function($filter,dataService,cleanProductsFactory){
        var book = [];
        var jsonObj;
        return{
            loadBook: function(){
                jsonObj = localStorage.getItem('jsonObj');
                book = JSON.parse(jsonObj);  //Returns book.
                return book;
            },

            saveData: function(heading,date){
                cleanProductsFactory.removeEmptyItem();
                var listIndex = dataService.listIndex(); //Contains the loaded list index value of jsonObj.
                book[listIndex]= [
                    [{name: heading ,date: $filter('date')(date)},dataService.products(), dataService.cartsArray()]
                ];
                jsonObj = JSON.stringify(book);
                localStorage.setItem('jsonObj',jsonObj);
            },
            numberOfList: function(){ //Added for newList, since we need last index.
                jsonObj = localStorage.getItem('jsonObj');
                book = JSON.parse(jsonObj);
                return book.length;
            }
        }
    });