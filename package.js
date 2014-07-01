Package.describe({
    summary: 'Google Maps wrapper with gmaps.js plugin'
});

Package.on_use(function (api) {
    api.add_files(['templates.js','vazco-maps.js'], 'client');
    api.export('VazcoMaps');
});