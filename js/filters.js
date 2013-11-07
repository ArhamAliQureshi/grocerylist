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