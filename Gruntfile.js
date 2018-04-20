"use strict";
module.exports = grunt => {
  // Display the elapsed execution time of grunt tasks
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt, {
    includereplace: 'grunt-include-replace',
    uglify: 'grunt-contrib-uglify-es',
  });
  // Project configuration.
  const mozjpeg = require('imagemin-mozjpeg');
  const imagemin = require('imagemin');
  const imageminMozjpeg = require('imagemin-mozjpeg');
  const imageminOptipng = require('imagemin-optipng');
  const imageminSvgo = require('imagemin-svgo');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['build/*', 'dist/*'],
    copy: {
      html: {
        expand: true,
        flatten: true,
        cwd: 'src',
        src: '*.html',
        dest: 'build/',
        filter: 'isFile',
      },
      assets: {
        expand: true,
        flatten: true,
        cwd: 'src/assets/',
        src: '*.*',
        dest: 'dist/',
        filter: 'isFile',
      },
      share: {
        expand: true,
        cwd: './',
        src: ['**/*', '!**/node_modules/**'],
        dest: '/Volumes/GoogleDrive/Team\ Drives/ACT\ like\ an\ ACE/Production\ Work/<%= grunt.config("developerName") %>/<%= pkg.name %>/<%= pkg.version %>'
      }
    },
    eslint: {
      target: ['src/js/*.js']
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['src/js/*.js'],
        dest: 'build/script.min.js',
      },
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'build/script.min.js': ['build/script.min.js']
        }
      }
    },

    sass: {
      build: {
          options: {
            outputStyle: 'compressed' //Seems to be the same as minified
          },
        files: {
          'build/style.min.css': 'src/css/style.scss',
        }
      }
    },

    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3,
          svgoPlugins: [{removeViewBox: false}],
          use: [mozjpeg(), imageminOptipng(), imageminSvgo()]
        },
        files: [{
          expand: true,
          cwd: 'src/assets/',
          src: ['**/*.{png,jpg,gif,svg}'],
          dest: 'dist/'
        }]
      }
    },

    maxFilesize: {
      images: {
        options: {
          maxBytes: 204800 // 200kb
        },
        src: ['dist/*.jpg', 'dist/*.gif', 'dist/*.svg', 'dist/*.png']
      },
      videos: {
        options: {
          maxBytes: 2306867 // 2.2mb
        },
        src: ['dist/*.mp4', 'dist/*.webm']
      },
      css: {
        options: {
          maxBytes: 204800 // 200kb
        },
        src: ['dist/*.css']
      },
      javascript: {
        options: {
          maxBytes: 204800 // 200kb
        },
        src: ['dist/*.js']
      },
      html: {
        options: {
          maxBytes: 204800 // 200kb
        },
        src: ['dist/*.html', 'dist/*.htm']
      },
      other: {
        options: {
          maxBytes: 204800 // 200kb
        },
        src: ['app/*']
      },
    },

    size_report: {
      ad: {
        options: {
          header: 'Ad size report',
          showStatistics: false
        },
        files: {
          list: ['dist/*']
        }
      }
    },

    bytesize: {
      all: {
        src: [
          'dist/*'
        ]
      }
    },

    includereplace: {
      dist: {
        files: [
          {src: '*.html', dest: 'dist/', expand: true, flatten: true, cwd: 'build/'}
        ]
      }
    },

    watch: {
      html: {
        files: ['src/*.html'],
        tasks: ['copy:html', 'includereplace:dist'],
      },
      sass: {
        files: ['src/css/*.scss', 'src/css/*.css', 'src/css/**/*.scss', 'src/css/**/*.css'],
        tasks: ['sass', 'includereplace:dist'],
      },
      js: {
        files: ['src/js/*.js', 'src/js/**/*.js'],
        // tasks: ['eslint', 'concat', 'uglify', 'includereplace:dist'],
        tasks: ['concat', 'uglify', 'includereplace:dist'],
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src : [
            '*.html',
            'dist/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "./dist",
            directory: true
          }
        }
      }
    }

  });

  grunt.registerTask('bundle', ['compile']);
  grunt.registerTask('compile', ['username','clean', 'concat', 'uglify', 'sass', 'imagemin', 'copy:html', 'copy:assets', 'includereplace:dist', 'maxFilesize', 'size_report', 'bytesize'/*, 'copy:share' */]); // Compile would be around 1s faster without the eslint task.
  grunt.registerTask('default', ['clean', /* 'eslint', */ 'compile', 'browserSync', 'watch']);

  grunt.registerTask('username', '',
    function () {
      var done = this.async();
      grunt.util.spawn({
        cmd: 'finger',
        args: ['-lp']
      }, function (err, result, code) {
        var username = '';
        var output = result.stdout;
        if (output) {
          var matches = result.stdout.match(/Login: ([a-zA-Z0-9]+)[\s\t]+Name: ([a-zA-Z0-9 ]+)/);
          var login = matches[1];
          var username = (login).toLowerCase();
        }
        grunt.config('developerName', username);
        done();
      });
    });
};
