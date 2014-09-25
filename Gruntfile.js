module.exports = function(grunt) {
    require('time-grunt')(grunt);
    require('jit-grunt')(grunt);

    grunt.initConfig({
        uglify: {
            options: {
                mangle: {
                    except: ['jQuery']
                }
            },
            my_target: {
                files: {
                    'js/scripts.min.js': ['js/picturefill.min.js', 'js/jquery-2.1.1.min.js', 'js/TweenMax.min.js', 'js/ScrollToPlugin.min.js', 'js/bezier-easing.js', 'js/modernizr.custom.97074.js', 'js/jquery.hoverdir.js', 'js/main.js']
                }
            }
        }
    });

    grunt.registerTask('default', [
        'uglify'
    ]);
};
