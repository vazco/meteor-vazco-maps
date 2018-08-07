<h1 align="center">
    <a href="https://github.com/vazco">vazco</a>/Vazco Maps
</h1>

&nbsp;

<h3 align="center">
  -- Abandonware. This package is deprecated! --
</h3>

&nbsp;

##### based on great stuff from:
- <a href="http://hpneo.github.io/gmaps/">http://hpneo.github.io/gmaps/</a>
- <a href="https://github.com/drewjw81/meteor-googlemaps/">https://github.com/drewjw81/meteor-googlemaps/</a>

### Demo

[http://vazco-maps-demo.meteor.com](http://vazco-maps-demo.meteor.com)

### Demo code

[https://github.com/vazco/vazco-maps-demo-app](https://github.com/vazco/vazco-maps-demo-app)

### Usage example:

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

### Map settings example:

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

### gMaps.js plugin documentation and demos
<a href="http://hpneo.github.io/gmaps/">http://hpneo.github.io/gmaps/</a>

### License

<img src="https://vazco.eu/banner.png" align="right">

**Like every package maintained by [Vazco](https://vazco.eu/), Vazco Maps is [MIT licensed](https://github.com/vazco/uniforms/blob/master/LICENSE).**
