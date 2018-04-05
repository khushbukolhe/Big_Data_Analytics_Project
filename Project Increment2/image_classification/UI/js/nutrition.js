'use strict';

angular.module('myApp', [])
    .controller('NutritionController', function ($scope, $http) {

          $scope.getNutrition = function () {
            var itemSelected = window.predictedResult;
            if (itemSelected != null) {

                var handler = $http.get('https://api.nutritionix.com/v1_1/search/'+ itemSelected+'?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=481404ea&appKey=c624ca0b5e85f2f234653dfd8d5fa9c3');
                handler.success(function (result) {
                    console.log(itemSelected);
                    console.log(result);
                    // $scope.foodItems
                    var foodItemName = result.hits[0].fields.item_name;

                    console.log(foodItemName);


                    $scope.nutritionresults = [];
                    if (
                        result.hits[0].hasOwnProperty('fields') &&
                        result.hits[0].fields.hasOwnProperty('nf_calories') &&
                        result.hits[0].fields.hasOwnProperty('nf_serving_size_qty')
                    )
                    {
                        $scope.calories = result.hits[0].fields.nf_calories;
                        $scope.noOfServings = result.hits[0].fields.nf_serving_size_qty;
//                        $scope.nutritionresults.push(result.hits[0].fields.nf_calories);
//                        $scope.nutritionresults.push(result.hits[0].fields.nf_serving_size_qty);
                    }
                    console.log("Calories: " + $scope.calories + " ServingSize: " + $scope.noOfServings);

                });
                handler.error(function (result) {
                    alert("There was some error processing your request. Please try after some time.")
                })
            }

        }

    });