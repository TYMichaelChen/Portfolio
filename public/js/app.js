'use strict';

// Declare app level module which depends on views, and components
angular.module('portfolioApp', [
  'ngRoute',
  'projectCtrl',
  'skillsCtrl',
  'ui.bootstrap'
])
.controller('mainController', function($scope,$log,$location,anchorSmoothScroll) {	
	$scope.gotoElement = function (eID){
      anchorSmoothScroll.scrollTo(eID);      
    };
})
.controller('homeController', function($scope,$log) {	
	
})
.config(['$routeProvider','$locationProvider', function($routeProvider,$locationProvider) {
	$routeProvider.when('/', {
		templateUrl: 'main.html'
	});
  $routeProvider.otherwise({redirectTo: '/'});
  $locationProvider.html5Mode(true);
}])
.service('anchorSmoothScroll', function(){
    
    this.scrollTo = function(eID) {

        // This scrolling function 
        // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript
        
        var startY = currentYPosition();
        var stopY = elmYPosition(eID);
        var distance = stopY > startY ? stopY - startY : startY - stopY;
        if (distance < 100) {
            scrollTo(0, stopY); return;
        }
        var speed = Math.round(distance / 125);
        if (speed >= 20) speed = 20;
        var step = Math.round(distance / 55);
        var leapY = stopY > startY ? startY + step : startY - step;
        var timer = 0;
        if (stopY > startY) {
            for ( var i=startY; i<stopY; i+=step ) {
                setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                leapY += step; if (leapY > stopY) leapY = stopY; timer++;
            } return;
        }
        for ( var i=startY; i>stopY; i-=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
        }
        
        function currentYPosition() {
            // Firefox, Chrome, Opera, Safari
            if (self.pageYOffset) return self.pageYOffset;
            // Internet Explorer 6 - standards mode
            if (document.documentElement && document.documentElement.scrollTop)
                return document.documentElement.scrollTop;
            // Internet Explorer 6, 7 and 8
            if (document.body.scrollTop) return document.body.scrollTop;
            return 0;
        }
        
        function elmYPosition(eID) {
            var elm = document.getElementById(eID);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            } return y;
        }

    };
    
})
.directive("stickyNav", function stickyNav($window){  
  function stickyNavLink(scope, element){
    var w = angular.element($window),
        size = element[0].clientHeight,
        top = 0;

    function toggleStickyNav(){
      if(!element.hasClass('controls-fixed') && $window.pageYOffset > top + size){
        element.addClass('controls-fixed');
      } else if(element.hasClass('controls-fixed') && $window.pageYOffset <= top + size){
        element.removeClass('controls-fixed');
      }
    }

    scope.$watch(function(){
      return element[0].getBoundingClientRect().top + $window.pageYOffset;
    }, function(newValue, oldValue){
      if(newValue !== oldValue && !element.hasClass('controls-fixed')){
        top = newValue;
      }
    });

    w.bind('resize', function stickyNavResize(){
      element.removeClass('controls-fixed');
      top = element[0].getBoundingClientRect().top + $window.pageYOffset;
      toggleStickyNav();
    });
    w.bind('scroll', toggleStickyNav);
  }

  return {
    scope: {},
    restrict: 'A',
    link: stickyNavLink
  };
});