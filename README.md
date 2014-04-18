## VazcoMaps - Google Maps Wrapper
##### based on great stuff from: 
- [http://hpneo.github.io/gmaps/](gmaps)
- [https://github.com/drewjw81/meteor-googlemaps/](meteor-googlemaps)

### Map Init:

    var tmpl = this; //template rendered
    VazcoMaps.init({
        'sensor': true, //optional
        'key': 'MY-GOOGLEMAPS-API-KEY', //optional
        'language': 'de' //optional
    }, function() {
    
        // your map code with gMaps.js plugin:
        
        tmpl.mapEngine = VazcoMaps.gMaps();

        tmpl.newMap = new tmpl.mapEngine({
            div: '#map-canvas',
            lat: 52.22968,
            lng: 21.01223
        });
        
        // your map code with standard Google Api:
        // var mapOptions = {
        //     zoom: 13
        // };
        // tmpl.newMap = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    });

### Example:

#### HTML:

    <template name="MapDemoIndex">
      <div class="map row">
          {{> mapCanvas2}}
      </div>
    </template>
    
    <template name="mapCanvas2">
        <div id="map-canvas2" class="map-canvas"></div>
    </template>
    
#### JS (init)

    Template.mapCanvas2.rendered = function () {
        var tmpl = this;

        VazcoMaps.init({}, function() {
    
            tmpl.mapEngine = VazcoMaps.gMaps();
    
            tmpl.newMap2 = new tmpl.mapEngine({ 
                div: '#map-canvas2',
                lat: 51.10789,
                lng: 17.03854,
                zoom: 6
            });
    
            tmpl.newMap2.drawRoute({
                origin: [51.10789, 17.03854],
                destination: [52.22968, 21.01223],
                travelMode: 'driving',
                strokeColor: '#131540',
                strokeOpacity: 0.6,
                strokeWeight: 6
            });
    
        });

    };
    
#### JS (events)

    Template.mapCanvas.events({
        'submit form': function(e, tmpl) {
          e.preventDefault();
          var searchInput = $(e.target).find('#address');
          
          tmpl.newMap.removeMarkers();
          tmpl.mapEngine.geocode({
            address: searchInput.val(),
            callback: function(results, status) {
              if (status == 'OK') {
                var latlng = results[0].geometry.location;
                tmpl.newMap.setCenter(latlng.lat(), latlng.lng());
                tmpl.newMap.addMarker({
                  lat: latlng.lat(),
                  lng: latlng.lng(),
                  draggable: true,
                  dragend: function() {
                    var point = this.getPosition();
                    tmpl.mapEngine.geocode({location: point, callback: function(results) {
                      searchInput.val(results[0].formatted_address);
                      tmpl.newMap.setCenter(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                    }});
                  }
                });
                searchInput.val(results[0].formatted_address);
              } else {
                console.log(status);
              }
            }
          });
          
        }
    });
    
### gMaps.js plugin documentation and demos
[http://hpneo.github.io/gmaps/](gmaps)
