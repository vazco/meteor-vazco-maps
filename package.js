Package.describe({
    name: 'vazco:maps',
    summary: 'Google Maps wrapper with gmaps.js plugin',
    git: 'https://github.com/vazco/meteor-vazco-maps.git'
});

Package.onUse(function (api) {
    api.addFiles(['vazco-maps.js'], 'client');
    api.addFiles(['markerclusterer.js'], 'client');
    api.addFiles(['templates.js','vazco-maps.js'], 'client');
    api.export('VazcoMaps');
});