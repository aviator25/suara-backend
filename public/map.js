// Callback function for google API
function initialize() {
  initMap();
}

function initMap() {
  var infowindow;
  var locations = [];
  // Initiate new google map with custome style and options
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat: 3.559997, lng: 107.380378},
    styles: styles,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false
  });

  // Credits to https://github.com/TindakMalaysia
  map.data.loadGeoJson('../public/map-data/malaysia-parliament.json',{}, function (features) {  
    // Custom algorithm to mark the center for all parliament areas
    var datas = [];
    var paths = [];
    const findCenter = function (paths) {  
      var polygon = new google.maps.Polygon({
        paths: paths,
      });
    
      google.maps.Polygon.prototype.getBoundingBox = function() {
        var bounds = new google.maps.LatLngBounds();
        this.getPath().forEach(function(element,index) {
          bounds.extend(element)
        });
        return(bounds);
      };

      google.maps.Polygon.prototype.getApproximateCenter = function() {
        var boundsHeight = 0,
            boundsWidth = 0,
            centerPoint,
            heightIncr = 0,
            maxSearchLoops,
            maxSearchSteps = 10,
            n = 1,
            northWest,
            polygonBounds = this.getBoundingBox(),
            testPos,
            widthIncr = 0;
        // Get polygon Centroid
        centerPoint = polygonBounds.getCenter();
        if (google.maps.geometry.poly.containsLocation(centerPoint, this))
        {
          // Nothing to do Centroid is in polygon use it as is
          return centerPoint;
        } else {
          maxSearchLoops = maxSearchSteps / 2;
          // Calculate NorthWest point so we can work out 
          // height of polygon NW->SE
          northWest = new google.maps.LatLng(
            polygonBounds.getNorthEast().lat(),
            polygonBounds.getSouthWest().lng()
          );
          // Work out how tall and wide the bounds are and what our search
          // increment will be
          boundsHeight =
            google.maps.geometry.spherical.computeDistanceBetween(
              northWest,
              polygonBounds.getSouthWest()
            );
          heightIncr = boundsHeight / maxSearchSteps;
          boundsWidth = 
            google.maps.geometry.spherical.computeDistanceBetween(
              northWest,
              polygonBounds.getNorthEast()
            );
          widthIncr = boundsWidth / maxSearchSteps;
          // Expand out from Centroid and find a point within polygon at
          // 0, 90, 180, 270 degrees
          for (; n <= maxSearchSteps; n++) {
            // Test point North of Centroid
            testPos = google.maps.geometry.spherical.computeOffset(
              centerPoint,
              (heightIncr * n),
              0
            );
            if (google.maps.geometry.poly.containsLocation(
              testPos, 
              this)
            ) {
              break;
            }
            // Test point East of Centroid
            testPos = google.maps.geometry.spherical.computeOffset(
              centerPoint,
              (widthIncr * n),
              90
            );
            if (google.maps.geometry.poly.containsLocation(
              testPos, 
              this)
            ) {
              break;
            }
            // Test point South of Centroid
            testPos = google.maps.geometry.spherical.computeOffset(
              centerPoint,
              (heightIncr * n),
              180
            );
            if (google.maps.geometry.poly.containsLocation(
              testPos, 
              this)
            ) {
              break;
            }
            // Test point West of Centroid
            testPos = google.maps.geometry.spherical.computeOffset(
              centerPoint,
              (widthIncr * n),
              270
            );
            if (google.maps.geometry.poly.containsLocation(
              testPos, 
              this)
            ) {
              break;
            }
          }
          return(testPos);
        }
      };
      return(polygon.getBoundingBox().getCenter());
    }
    features.forEach(ans => {
      datas.push(ans);
    });
    datas.forEach(data=>{
      data.getGeometry().getArray().forEach(nest1 => {
        nest1.forEachLatLng((ans,index) => {
          paths.push(ans.toJSON());
        });
      })
      locations.push(findCenter(paths).toJSON());
      paths = [];
    })
    // Marker clustering
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
    var markers = locations.map(function(location, i) {
      return new google.maps.Marker({
        position: location,
        label: labels[i % labels.length]
      });
    });
    var markerCluster = new MarkerClusterer(map, markers,
      {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
  });
  
  // Outline style for each parliament
  map.data.setStyle(function(feature) {
    var color = 'white';
    if (feature.getProperty('isColorful')) {
      color = feature.getProperty('color');
    }
    return /** @type {!google.maps.Data.StyleOptions} */({
      fillColor: color,
      strokeColor: color,
      strokeWeight: 1,
      strokeOpacity: 0.2
    });
  });
  
  // Add mouseover event for data layer
  map.data.addListener('mouseover', function(event) {
    //Infowindow variables
    const KodPAR = event.feature.getProperty('kodpar');
    const Parliament = event.feature.getProperty('parliament');
    const State = event.feature.getProperty('state');
    const MP = event.feature.getProperty('mp');
    
    // Set Infowindow content
    infowindow = new google.maps.InfoWindow({
      content: `<b>State: </b> ${State}  <br />  
                <b>Parliament: </b> ${Parliament}  <br /> 
                <b>MP: </b> ${MP}`,
      });
              
    //Highlight region with custom style
    map.data.revertStyle();
    map.data.overrideStyle(event.feature, {strokeWeight: 8, strokeColor: "red"});
    document.getElementById('info-box').textContent = `${State} - ${Parliament}`
  });
  // Click to show infowindow and zoom in based on the size of each Parliament area
  map.data.addListener('click', function(event) {
    let size = event.feature.getProperty('area_sqkm');
    console.log(size);
    infowindow.setPosition(event.latLng)
    map.setCenter(event.latLng);
    infowindow.open(map);
    if (size < 500) {
      map.setZoom(11);
    } else if (size>2000){
      map.setZoom(8);
    } else {
      map.setZoom(9);
    }
  });
  
  // Close infowindow and revert style when mouseout
  map.data.addListener('mouseout', function(event) {
    map.data.revertStyle();
    infowindow.close()
  });


  
  
  
}

