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
