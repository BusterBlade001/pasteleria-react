// Karma configuration
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (e.g. files, exclude)
    basePath: '',

    // frameworks to use
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'src/**/*.test.js',
      // Si tienes archivos .spec.js, descomenta la siguiente línea:
      // 'src/**/*.spec.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    preprocessors: {
      'src/**/*.js': ['webpack', 'coverage'], // APLICAR WEBPACK Y COBERTURA A TODOS LOS JS
      'src/**/*.jsx': ['webpack', 'coverage'], // Si usas JSX
      'src/**/*.test.js': ['webpack']
    },

    // AÑADIR 'coverage' A LOS PLUGINS
    plugins: [
        'karma-jasmine',
        'karma-chrome-launcher',
        'karma-webpack',
        'karma-coverage' // Asegura que el plugin esté disponible
    ],


    // test results reporter to use
    // NOTA: 'coverage' solo funciona si está instalado (ver Paso 1)
    reporters: ['progress', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false, // Cambiado a 'false' ya que usas --single-run

    // start these browsers
    browsers: ['ChromeHeadless'], // Recuerda exportar CHROME_BIN

    // Continuous Integration mode
    singleRun: true,

    // Concurrency level
    concurrency: Infinity,
    
    // Configuraciones de cobertura
    coverageReporter: {
        dir : 'coverage/',
        reporters: [
            { type: 'html', subdir: 'html' },
            { type: 'text-summary' }
        ]
    },

    // Configuración de Webpack para el preprocesador
    webpack: {
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react']
                        }
                    }
                },
                // Regla para archivos CSS
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                },
                // Regla para manejar archivos de imagen (CORRECCIÓN)
               {
                    test: /\.(png|jpe?g|gif|svg|ico)$/i,
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        esModule: false // <-- Asegúrate de que esta línea esté aquí
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.js', '.jsx']
        }
    }
  });
};