// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('compass', ['ionic','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    // select the right Ad Id according to platform
    var admobid = {};
    if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos
        admobid = {
            banner: 'ca-app-pub-7023023584987784/6489408150', // or DFP format "/6253334/dfp_example_ad"
            interstitial: 'ca-app-pub-7023023584987784/7966141355'
        };
        // it will display smart banner at top center, using the default options
        if(AdMob) AdMob.createBanner( {
          adId: admobid.banner,
          position: AdMob.AD_POSITION.TOP_CENTER,
          autoShow: true } );
          // preppare and load ad resource in background, e.g. at begining of game level
if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );

// show the interstitial later, e.g. at end of game level
if(AdMob) AdMob.showInterstitial();
    } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) { // for ios
        admobid = {
            banner: 'ca-app-pub-7023023584987784/4873074155', // or DFP format "/6253334/dfp_example_ad"
            interstitial: 'ca-app-pub-7023023584987784/1919607754'
        };
        // it will display smart banner at top center, using the default options
        if(AdMob) AdMob.createBanner({
          adId: admobid.banner,
          position: AdMob.AD_POSITION.TOP_CENTER,
          autoShow: true });
          // preppare and load ad resource in background, e.g. at begining of game level
if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );

// show the interstitial later, e.g. at end of game level
if(AdMob) AdMob.showInterstitial();
    }
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  })
})
.controller('HomeCtrl', function($ionicPlatform,$scope) {
  $ionicPlatform.ready(function(){
    $scope.onSuccess = function(heading) {
      $scope.$apply(function(){
        if(heading.magneticHeading >= 0 && heading.magneticHeading < 90){
          $scope.heading = heading.magneticHeading + '\xB0 N';
        }
        if(heading.magneticHeading >= 90 && heading.magneticHeading < 180){
          $scope.heading = heading.magneticHeading + '\xB0 E';
        }
        if(heading.magneticHeading >= 180 && heading.magneticHeading < 270){
          $scope.heading = heading.magneticHeading + '\xB0 S';
        }
        if(heading.magneticHeading >= 270 && heading.magneticHeading < 360){
          $scope.heading = heading.magneticHeading + '\xB0 W';
        }
      });

};

  $scope.onError = function(compassError) {
    alert('Compass error: ' + compassError.code);
};

  $scope.options = {
    frequency: 30
}; // Update every 3 seconds

  $scope.watchID = navigator.compass.watchHeading($scope.onSuccess, $scope.onError, $scope.options);
  });

});
