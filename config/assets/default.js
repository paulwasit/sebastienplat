'use strict';

module.exports = {
  server: {
    //gruntConfig: 'gruntfile.js',
    //gulpConfig: 'gulpfile.js',
		allJS:   ['server.js', 'config/**/*.js', 'server/modules/**/*.js'],
    models: 	'server/modules/*/models/**/*.js',
    routes:  ['server/modules/!(core)/routes/**/*.js', 'server/modules/core/routes/**/*.js'],
    sockets: 	'server/modules/*/sockets/**/*.js',
    config: 	'server/modules/*/config/*.js',
    policies: 'server/modules/*/policies/*.js',
    views:		'server/modules/*/views/*.html'
  },
	client: {
		lib: {
			css:"https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.6.0/katex.min.css", 
			js: [
			  "https://public.tableau.com/javascripts/api/tableau-2.0.0.min.js",
				"public/modules/articles/helpers/highlightjs/highlight.pack.js"
			]
		},
		js: [],
		css: []
	}
};