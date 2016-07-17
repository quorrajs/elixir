/**
 * TestingTask.js
 *
 * @author: Harish Anchu <harishanchu@gmail.com>
 * @copyright Copyright (c) 2015-2016, QuorraJS.
 * @license See LICENSE.txt
 */

var util = require('util');

/**
 * Create a new TestingTask instance.
 *
 * @param  {string}      name
 * @param  {string|null} src
 * @param  {string|null} command
 */
function TestingTask(name, src, command) {
    this.src = src;
    this.command = command;

    Elixir.Task.call(this, name);
}

util.inherits(TestingTask, Elixir.Task);

/**
 * Build up the Gulp task.
 */
TestingTask.prototype.gulpTask = function () {
    return (
        gulp
            .src('')
            .pipe(this.runTests())
            .on('error', this.onError())
            .pipe(this.onSuccess())
    );
};


/**
 * Register file watchers.
 */
TestingTask.prototype.registerWatchers = function () {
    this.watch(this.src || this.pluginConfig('path') + this.pluginConfig('search'))
        .watch(Elixir.config.appPath + '/**/*.js', 'tdd')
};


/**
 * Trigger the test suite.
 */
TestingTask.prototype.runTests = function () {
    var command = this.command || this.pluginConfig('command');

    this.recordStep('Executing ' + this.ucName());

    return Elixir.Plugins.shell(command);
};


/**
 * Handle any errors.
 */
TestingTask.prototype.onError = function () {
    var task = this.name;

    return function (e) {
        Elixir.Notification.forFailedTests(e, task);

        this.emit('end');
    };
};


/**
 * Handle a "green" test suite.
 */
TestingTask.prototype.onSuccess = function () {
    return Elixir.Notification.forPassedTests(this.name);
};


/**
 * Retrieve the test suite configuration.
 *
 * @param {string} prop
 */
TestingTask.prototype.pluginConfig = function (prop) {
    return Elixir.config.testing[this.name][prop];
};


module.exports = TestingTask;