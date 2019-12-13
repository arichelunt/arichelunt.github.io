/**
 * googlemaps.js
 *
 * @date 2015-02-12
 */

var CHRONOBA = window.CHRONOBA || {};

CHRONOBA.Googlemap = function () {

  var _init = function _init() {
    setGoogleMaps();
  };

  var setGoogleMaps = function setGoogleMaps() {

    var initialize = function initialize() {
      var mapStyles = [{
        'stylers': [{ 'visibility': 'off' }]
      }, {
        'featureType': 'road.local',
        'stylers': [{ 'visibility': 'on' }, { 'weight': 1.2 }]
      }, {
        'featureType': 'road.arterial',
        'stylers': [{ 'visibility': 'on' }, { 'saturation': -100 }]
      }, {
        'featureType': 'transit.line',
        'stylers': [{ 'visibility': 'on' }]
      }, {
        'featureType': 'road.local',
        'elementType': 'geometry.stroke',
        'stylers': [{ 'visibility': 'off' }]
      }, {
        'featureType': 'road.arterial',
        'elementType': 'geometry.stroke',
        'stylers': [{ 'visibility': 'off' }]
      }, {
        'featureType': 'road.local',
        'elementType': 'labels',
        'stylers': [{ 'visibility': 'off' }]
      }, {
        'featureType': 'transit.station',
        'elementType': 'geometry',
        'stylers': [{ 'visibility': 'on' }, { 'color': '#cccccc' }, { 'gamma': 0.68 }]
      }, {
        'featureType': 'transit.station',
        'elementType': 'labels',
        'stylers': [{ 'saturation': -100 }, { 'gamma': 0.64 }, { 'visibility': 'simplified' }]
      }, {
        'featureType': 'poi.business',
        'stylers': [{ 'visibility': 'on' }, { 'saturation': -100 }]
      }, {
        'featureType': 'poi.business',
        'elementType': 'labels.text',
        'stylers': [{ 'visibility': 'off' }]
      }, {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [{ 'saturation': -93 }, { 'visibility': 'simplified' }]
      }, {
        'featureType': 'poi.park',
        'elementType': 'geometry',
        'stylers': [{ 'visibility': 'on' }, { 'gamma': 3.84 }, { 'saturation': -100 }]
      }, {
        'featureType': 'poi.school',
        'elementType': 'labels',
        'stylers': [{ 'visibility': 'simplified' }, { 'lightness': 40 }, { 'saturation': -100 }]
      }, {
        'featureType': 'poi.business',
        'elementType': 'labels',
        'stylers': [{ 'saturation': -100 }, { 'lightness': 40 }, { 'visibility': 'simplified' }]
      }, {
        'featureType': 'poi.medical',
        'elementType': 'labels',
        'stylers': [{ 'visibility': 'simplified' }, { 'saturation': -100 }, { 'lightness': 40 }]
      }, {}];

      (function () {
        var canvas = document.getElementById('map_tokyo') || null;

        if (canvas === null) {
          return false;
        }
        var latlng = new google.maps.LatLng(35.664088, 139.70275);
        var myOptions = {
          zoom: 15,
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          scrollwheel: false,
          scaleControl: true,
          styles: mapStyles
        };
        var map = new google.maps.Map(canvas, myOptions);

        var icon = void 0;
        if (window.matchMedia('screen and (max-width: 767px)').matches) {
          icon = {
            url: '/assets/img/about/map_pin_tokyo_sm.png',
            size: new google.maps.Size(150, 170),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(40, 88),
            scaledSize: new google.maps.Size(75, 85)
          };
        } else {
          icon = {
            url: '/assets/img/about/map_pin_tokyo.png',
            size: new google.maps.Size(100, 114),
            origin: new google.maps.Point(0, 0)
          };
        }

        var markerOptions = {
          position: latlng,
          map: map,
          icon: icon,
          title: 'クロノバデザイン株式会社 東京事務所'
        };
        new google.maps.Marker(markerOptions);
      })();

      (function () {
        var canvas = document.getElementById('map_osaka') || null;

        if (canvas === null) {
          return false;
        }
        var latlng = new google.maps.LatLng(34.672371, 135.493672);
        var myOptions = {
          zoom: 15,
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          scrollwheel: false,
          scaleControl: true,
          styles: mapStyles
        };
        var map = new google.maps.Map(canvas, myOptions);

        var icon = void 0;
        if (window.matchMedia('screen and (max-width: 767px)').matches) {
          icon = {
            url: '/assets/img/about/map_pin_osaka_sm.png',
            size: new google.maps.Size(150, 170),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(38, 84),
            scaledSize: new google.maps.Size(75, 85)
          };
        } else {
          icon = {
            url: '/assets/img/about/map_pin_osaka.png',
            size: new google.maps.Size(100, 114),
            origin: new google.maps.Point(0, 0)
          };
        }

        var markerOptions = {
          position: latlng,
          map: map,
          icon: icon,
          title: 'クロノバデザイン株式会社 大阪事務所'
        };
        new google.maps.Marker(markerOptions);
      })();
    };
    google.maps.event.addDomListener(window, 'load', function () {
      setTimeout(function () {
        initialize();
      }, 2500);
    });
  };

  return {
    init: _init
  };
}();

CHRONOBA.Googlemap.init();