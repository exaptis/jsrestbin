//noinspection JSLint

({
    appDir: '../',
    baseUrl: 'js',
    dir: '../../release',
    paths: {
        jquery: 'libs/jquery/jquery-min',
        underscore: 'libs/underscore/underscore',
        backbone: 'libs/backbone/backbone',
        text: 'libs/require/text',
        templates: '../templates'
    },
    optimize: 'uglify',
    modules: [
        {
            name: 'main',
            exclude: ['jquery', 'underscore', 'backbone', 'text']
        }
    ]
});