
appModule
    .factory('routeChangeFactory',function(dataService){     //Function that need to be performed when route changes are defined here.
        return{
            removeEmptyItem: function(event, next, current){    // Clean remove elements from array which don't have item. Need to use this because for paging in list.html we appended many empty items.
                Array.prototype.clean = function() {
                    for (var i = 0; i < this.length; i++) {
                        if (this[i].item == '') {
                            this.splice(i, 1);
                            i--;
                        }
                    }
                    return this;
                };
                if(next.templateUrl!=current.templateUrl){  //Check if next route is not same as current route.
                    dataService.products().clean();    // Clean remove elements from array which don't have item.
                }
            }

        };
    })
    .factory('readXML',function(dataService){
        return{

        }
    });