appModule
    .service('dataService',function($rootScope){
        var products = [
            {item:'Potato', quantity: 3, status: false, unitPrice: 5, cost: 0, cartID: ''},
            {item:'Tomato', quantity: 1, status: false, unitPrice: 0, cost: 0, cartID: ''},
            {item:'Banana', quantity: 2, status: false, unitPrice: 0, cost: 0, cartID: ''}
        ];
        window.test = products;
        var cartsArray=[{name:"Babo Baniya", paidCash: '0'},{name:"Memon Baniya", paidCash: '0'}]; //Contains the list of carts
        var nav= {listBtn: true, editBtn: true, removeBtn: true, cartBtn: true};

        var listIndex; //Contains the loaded list index value of jsonObj.
        var activeRow = products.length;       //Contains the index of the click row in edit mode.

        return{
            getNav: function(){
                return nav;
            },
            products: function(value){
                if(value){products = value;}
                else
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
                    return activeRow;},

            listIndex: function(value){
                if(value){ listIndex = value; }
                else
                    return listIndex;
            }
        }
    });