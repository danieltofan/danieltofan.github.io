var config = {
    apiKey: "AIzaSyCjChKa5b6u-hFuDToIrdAPnw2J4d-mlMI",
    authDomain: "periodictable-ecb78.firebaseapp.com",
    databaseURL: "https://periodictable-ecb78.firebaseio.com",
    projectId: "periodictable-ecb78",
    storageBucket: "periodictable-ecb78.appspot.com",
    messagingSenderId: "210810578532"
  };

firebase.initializeApp(config);

var app = angular.module("PeriodicTable", ["firebase"]);

app.controller("TableController", ['$scope', '$firebaseArray', '$http', '$interval', '$timeout', function ($scope, $firebaseArray, $http, $interval, $timeout){
		$scope.init = function()
		{
			$scope.groupNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
			$scope.matrix = [
				[1,2],
				[3,4,5,6,7,8,9,10],
				[11,12,13,14,15,16,17,18],
				[19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],
				[37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54],
				[55,56,57,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86],
				[87,88,89,104,105,106,107,108,109,110,111,112],
				[58,59,60,61,62,63,64,65,66,67,68,69,70,71],
				[90,91,92,93,94,95,96,97,98,99,100,101,102,103]
			];
			
			var root = firebase.database().ref().child("elements");
			$scope.elements = $firebaseArray(root);
		}
}]);

$(document).ready(function(){
	$('.elementBox, h2.title, .groupNumber, .labelLa, .labelAc').each(function(){
		var duration = Math.floor(3000.0 + Math.random() * 5000.0);
		var delay = Math.floor(1000.0 + Math.random() * 5000.0);
		var opacity = Math.random();
		
		if ($(this).is('.elementBox')) $(this).css('background-color', 'rgba(0, 127, 127,' + opacity + ')');
		$(this).velocity('transition.bounceDownIn', {duration: duration, delay: delay});
		$(this).velocity({opacity: 1});
	});
	
	$('.elementBox').velocity({backgroundColorAlpha: 0.3}, {complete: registerClickHandler});
	
	TweenLite.set('.container', {css: {perspective:500}});
	
	var tl;
	var t2;
	
	function registerClickHandler()
	{
		$('.elementBox').click(function(){
			if (!$(this).hasClass('blownUp'))
			{
				bringForward($(this));
			}
			else
			{
				putBack($(this), tl);
			}
		});
	}
	
	function bringForward(element)
	{
		var centerX = viewportSize.getWidth() / 2;
		var centerY = viewportSize.getHeight() / 2 + 200;
		var left = element.offset().left;
		var top = element.offset().top;
		var moveX = centerX - left - element.width()/2;
		var moveY = centerY - top - element.height()/2 + $(document).scrollTop();
		
		tl = new TimelineLite();
		t2 = new TimelineLite();
		t2.to('.glassPane', 0.5, {zIndex: 5, visibility: 'visible'});
		tl.to(element, 0.2, {className: "+=blownUp"});
		tl.to(element, 0.6, {scaleX: '5.0', scaleY: '5.0', backgroundColor: 'rgba(0, 12, 12, 1)', rotationY: '+=360_ccw', zIndex: 10, x: moveX + 'px', y: moveY + 'px', force3D: 'auto', filter: 'blur(0)'});
	}
	
	function putBack(element, tl)
	{
		tl.reverse();
		t2.reverse();
	}
	
	$('.glassPane').click(function(){tl.reverse(); t2.reverse()});
});