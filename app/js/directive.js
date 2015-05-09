/**
 * Created by wxy on 2015/5/9.
 */
'use strict'

var directiveModule = angular.module('directiveModule',[]);

directiveModule.directive('accordin',function(){
   return{
       restrict: 'EA',
       replace: true,
       transclude: true,
       template: '<div ng-transclude></div>',
       controller: function(){
           var expanders = [];
           this.gotOpened = function(selectedExpander){
               angular.forEach(expanders, function(expander){
                   if(selectedExpander != expander){
                       expander.showMe = false;
                   }
               });
           }
           this.addExpander = function(expander){
               expanders.push(expander);
           }
       }
   }

});

directiveModule.directive('expander', function(){
   return {
       restrict: 'EA',
       replace: true,
       transclude: true,
       require: '?^accordin',
       scope: {
           title: '=expanderTitle'
       },
       template:'<div>' +
       '<div class="title" ng-click="toggle()">{{title}}</div>'
       + '<div class="body" ng-show="showMe" ng-transclude></div>'
       + '</div>',
       link: function(scope,element,attrs,accordinController){
           scope.showMe = false;
           accordinController.addExpander(scope);
           scope.toggle = function toggle(){
               scope.showMe = !scope.showMe;
               accordinController.gotOpened(scope);
           }
       }
   }
});

directiveModule.controller('directiveModuleCtrl',function($scope){
   $scope.expanders=[{
       title : 'Click me to expand',
       text : 'Hi there folks, I am the content that was hidden but is now shown.'
   }, {
       title : 'Click this',
       text : 'I am even better text than you have seen previously'
   }, {
       title : 'Test',
       text : 'test'
   }];
});