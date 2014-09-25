Package.describe({
    name: 'vazco:maps',
    summary: 'Google Maps wrapper with gmaps.js plugin'
});

Package.onUse(function (api) {
    api.addFiles(['vazco-maps.js'], 'client');
    api.addFiles(['markerclusterer.js'], 'client');
    api.addFiles(['templates.js','vazco-maps.js'], 'client');
    api.export('VazcoMaps');
});