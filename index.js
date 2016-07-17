/**
 * index.js
 *
 * @author: Harish Anchu <harishanchu@gmail.com>
 * @copyright Copyright (c) 2015-2016, QuorraJS.
 * @license See LICENSE.txt
 */

var path = require('path');
var _ = require('lodash');

function elixir() {
    require('laravel-elixir');
    overrideConfig();
    require('./bootstrap/loadExtensions');
    overrideTasks();

    return Elixir;
}

/**
 * Allow for config overrides, via an elixirConfig.js file.
 */
function overrideConfig() {
    _.merge(Elixir.config, require(path.join(process.cwd(), 'elixirConfig.js')));
}

/**
 * Ovrride some of the tasks provided by the laravel-elixir module
 */
function overrideTasks() {
    function noop() {
        Elixir.log.heading.error('Quorra don\'t have php tests!')
    }

    Elixir.extend('phpSpec', noop);
    Elixir.extend('phpunit', noop);
    Elixir.extend('babel', function () {
        new Elixir.Task('babel', function () {
            Elixir.log.heading('Alert!').heading("'mix.babel()' is not supported in Quorra Elixir. " +
            "You'll want to instead call 'mix.rollup().'");

            process.exit(1);
        });
    });
}

module.exports = elixir();