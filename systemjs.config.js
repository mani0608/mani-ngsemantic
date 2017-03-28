/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {

  var angular2SemanticUiPackages = [
    'ng2-semantic-ui',
    'ng2-semantic-ui/components/checkbox',
    'ng2-semantic-ui/components/dimmer',
    'ng2-semantic-ui/components/dropdown',
    'ng2-semantic-ui/components/loader',
    'ng2-semantic-ui/components/modal',
    'ng2-semantic-ui/components/progress',
    'ng2-semantic-ui/components/tab',
    'ng2-semantic-ui/components/accordion',
    'ng2-semantic-ui/components/accordion_panel',
    'ng2-semantic-ui/components/popup',
    'ng2-semantic-ui/components/pagination',
    'ng2-semantic-ui/components/tags-input',
    'ng2-semantic-ui/components/rating'
  ]

  var config = {

    meta: {
      '*.js': {
        babelOptions: {
          presets: ['es2015']
        }
      }
    },

    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      'ng2-semantic-ui': 'npm:ng2-semantic-ui',
      'lodash': 'node_modules/lodash',
      'ts': 'node_modules/plugin-typescript/lib',
      'typescript': 'node_modules/typescript',
      'element-closest': 'node_modules/element-closest/element-closest.js',
      // other libraries
      'rxjs': 'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
    },

    transpiler: 'ts',

    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js',
      },
      "ts": {
        "main": "plugin.js"
      },
      "typescript": {
        "main": "lib/typescript.js",
        "meta": {
          "lib/typescript.js": {
            "exports": "ts"
          }
        }
      },
      rxjs: {
        main: 'bundles/Rx.min.js',
        defaultExtension: 'js'
      },
      'lodash': {
        main: 'index.js', defaultExtension: 'js'
      }
    }
  }

  angular2SemanticUiPackages.forEach(function (item) {
    config.map[item] = 'npm:' + item;
    config.packages[item] = {
      main: './components/index.js',
      defaultExtension: 'js'
    }
  });

  System.config(config);
})(this);
