// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'uploadService'])

.run(function($ionicPlatform) {
 $ionicPlatform.ready(function() {
  if (window.cordova && window.cordova.plugins.Keyboard) {
   // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
   // for form inputs)
   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

   // Don't remove this line unless you know what you are doing. It stops the viewport
   // from snapping when text inputs are focused. Ionic handles this internally for
   // a much nicer keyboard experience.
   cordova.plugins.Keyboard.disableScroll(true);
  }
  if (window.StatusBar) {
   StatusBar.styleDefault();
  }
 });
})

.controller('SlideController', function($scope) {
  
  $scope.myActiveSlide = 1;
  
})

.controller("ExampleController", function($scope, $cordovaCamera, $http, upload) {

$scope.images = [];

 $scope.takePhoto = function() {
  var options = {
   quality: 50,
   destinationType: Camera.DestinationType.DATA_URL,
   sourceType: Camera.PictureSourceType.CAMERA,
   allowEdit: true,
   targetWidth: 1320,
   targetHeight: 581,
   encodingType: Camera.EncodingType.JPEG,
   popoverOptions: CameraPopoverOptions,
   saveToPhotoAlbum: true
  };

  $cordovaCamera.getPicture(options).then(function(imageData) {
   $scope.imgURI = "data:image/jpeg;base64," + imageData;
   $scope.images.push($scope.imgURI); 
   $scope.data.image = $scope.imgURI;
  

  }, function(err) {
   // An error occured. Show a message to the user
  });

 $scope.submit = function() {
   var link = 'http://162.243.19.27:8000/api/systems';
   $http.post(link, {data: $scope.data.image}).then(function(res) {
    $scope.response = res.data;

   });
  };
 }
 // $scope.captureVideo = function() {
 //    var options = { limit: 3, duration: 15 };

 //    $cordovaCapture.captureVideo(options).then(function(videoData) {
 //      // Success! Video data is here
 //      $scope.video = videoData;

 //    }, function(err) {
 //      // An error occurred. Show a message to the user
 //    });
 //  }

$scope.sendAll = function() {
 angular.forEach($scope.images, function(obj, i){
   var link = 'http://162.243.19.27:8000/api/systems';
   $http.post(link, { data: obj }).then(function(res) {
    $scope.response = res.data;

   });
  })
};



 // $scope.sendAll = function() {
 //   var link = 'http://162.243.19.27:8000/api/systems';
 //   $http.post(link, { data: $scope.images}).then(function(res) {
 //    $scope.response = res.data;

 //   });
 //  };

 $scope.choosePhoto = function() {
  var options = {
   quality: 50,
   destinationType: Camera.DestinationType.DATA_URL,
   sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
   allowEdit: true,
   targetWidth: 1320,
   targetHeight: 581,
   encodingType: Camera.EncodingType.JPEG,
   popoverOptions: CameraPopoverOptions,
   saveToPhotoAlbum: false
  };

  $scope.removeAll = function(){
    $scope.images = [];
  }

  $scope.remove = function() {
    unset($scope.images[$scope])
  }

  $cordovaCamera.getPicture(options).then(function(imageData) {
   $scope.imgURI = "data:image/jpeg;base64," + imageData;
   // console.log(imageData);
    $scope.images.push($scope.imgURI); 

   $scope.data.image = $scope.imgURI;
  
  }, function(err) {
   // An error occured. Show a message to the user
  });

 $scope.submit = function() {
   var link = 'http://162.243.19.27:8000/api/systems';
   $http.post(link, { data: $scope.data.image}).then(function(res) {
    $scope.response = res.data;

   });
  };


 }
})





.controller("videoController",function($scope,$cordovaCamera,$cordovaCapture,$http){

    $scope.captureVideo = function() {
    var options = { limit: 3, duration: 15 };

     $cordovaCapture.captureVideo(options).then(function(videoData) {
      // Success! Video data is here

        $scope.video = {};
     
            var i, path, len;
            for (i = 0, len = videoData.length; i < len; i += 1) {
            path = videoData[i].fullPath;
            }

        $scope.video.save = path;
        console.log($scope.video.save);

        }, function(err) {
      // An error occurred. Show a message to the user
    });

     $scope.upload = function() {
        var options = {
            fileKey: "avatar",
            fileName: "filename.mp4",
            chunkedMode: false,
            mimeType: "video/mp4"
        };
        $cordovaFileTransfer.upload("http://162.243.19.27:8000/api/systems", $scope.video.save, options).then(function(result) {
            console.log("SUCCESS: " + JSON.stringify(result.response));
        }, function(err) {
            console.log("ERROR: " + JSON.stringify(err));
        }, function (progress) {
            // constant progress updates
        });
    }
}


});