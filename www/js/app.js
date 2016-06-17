// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', "duScroll"])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.controller('myCtrl', function(){
  //var server = "http://" + window.location.hostname + ":" + window.location.port;
  //var socket = io.connect(server, { forceNew: true });
  //socket.on("bot-message", function(data) {

  //});
})/*
.run(function($http){
  var req = {
    method: 'GET',
    url: 'https://gateway.watsonplatform.net/dialog/api/v1/dialogs',
    data:{
      username: '11ce1eae-bb90-4935-8a8b-8d27e697eecc',
      password: 'YaRf2x61ceT8'
    },
    headers: { "Accept": "application/json" },

  } // req
  //$http.defaults.headers.common.Authorization = 'Basic YaRf2x61ceT8';
  $http(req).then(function mySuccess(response){
      console.log(response);
    }, function myError(response){

  });
})  // run */
.run(function($http){
  var item = {
        "text": "bcc is good",
        "isDone": false
      }
  var req = {
    method: 'GET',
    url: 'http://localhost:6002/products/123',
    //data: JSON.stringify(item),
    headers: { "Accept": "application/json" },

  } // req
  //$http.defaults.headers.common.Authorization = 'Basic YaRf2x61ceT8';
  /*$http(req).then(function mySuccess(response){
      console.log(response);
    }, function myError(response){

  });*/
})  // run */
.directive('chat', function($document, $sce){
  return {
    restrict: "E",
    templateUrl: "templates/chat.html",
    link: function($scope){
      var conversationId;
      var clientId;

      // A reference to the 'a' element that scrolls the conversation down.
      var scroller = document.getElementById("tzsklxyjeurwykbf");

      // A reference user input box.
      var input = document.getElementById("xuafdwulathjbujs");
      //input.focus();

      // The conversation lines.
      $scope.conversation = [];

      // Execute the given function in a safe way.
      function safeApply(fn) {
          switch ($scope.$root.$$phase) {
              case "$apply":
              case "$digest":
                  fn();
                  break;
              default:
                  $scope.$apply(fn);
                  break;
          }
      }
      // Push a conversation line to the collection.
      function pushConversationLine(speaker, message) {

          // Add the conversation line -callback, do in a safe way-.
          safeApply(function() {
              $scope.conversation.push({
                  speaker: speaker,
                  message: $sce.trustAsHtml(message),
                  timestamp: new Date().getTime()
              });
          });

          // Hack: scroll the conversation down.
          //scroller.click();
      }

      // Push a server message to the conversation.
      function serverSay(message) {
          console.log(message);
          pushConversationLine("server", message);
      }

      // Push an user message to the conversation.
      function userSay(message) {
          pushConversationLine("user", message);
      }
      // Send the user message to the server.
      $scope.userMessageBoxKeyUp = function(e) {
        // In case the user pressed the 'enter' key.
        if ((e.keyCode || e.which) === 13) {
          // If the message is not empty.
          if (input.value) {
              // Push it to the conversation.
              userSay(input.value);
              // Clean and focus the box.
              input.value = "";
              input.focus();
          }
        }
      };
    }
  }
});
