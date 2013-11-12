
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
    .factory('jsonFactory',function(dataService,cleanProductsFactory){
        return{
            loadBook: function(){
                var jsonObj = localStorage.getItem('jsonObj');
                return JSON.parse(jsonObj);  //Returns book.
            },

            saveData: function(){

                cleanProductsFactory.removeEmptyItem();
                var jsonObj = [
                    [dataService.products(), dataService.cartsArray()]
                ];
                jsonObj = JSON.stringify(jsonObj);
                localStorage.setItem('jsonObj',jsonObj);
            }
        }
    });