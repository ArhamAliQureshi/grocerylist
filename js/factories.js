
appModule
    .factory('cleanProductsFactory',function(dataService){     //Function that need to be performed when route changes are defined here.
        return{
            removeEmptyItem: function(){    // Clean remove elements from array which don't have item. Need to use this because for paging in list.html we appended many empty items.
                Array.prototype.clean = function() {
                    for (var i = 0; i < this.length; i++) {
                        if (this[i].item == '') {
                            this.splice(i, 1);
                            i--;
                        }
                    }
                    return this;
                };
                    dataService.products().clean();    // Clean remove elements from array which don't have item.
            }

        };
    })
    .factory('jsonFactory',function(dataService,cleanProductsFactory){
        return{
            loadData: function(){
                var jsonObj = localStorage.getItem('jsonObj');
                console.log(JSON.parse(jsonObj));
            },
            saveData: function(){
                var jsonObj = [];
                cleanProductsFactory.removeEmptyItem();
                jsonObj = [
                    [JSON.stringify(dataService.products()),JSON.stringify(dataService.cartsArray())]
                ];
//                jsonObj[0].splice(2,1);
                console.log(jsonObj[0]);
                localStorage.setItem('jsonObj',jsonObj[0])


            }
        }
    });