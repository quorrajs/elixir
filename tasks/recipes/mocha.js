/**
 * mocha.js
 *
 * @author: Harish Anchu <harishanchu@gmail.com>
 * @copyright Copyright (c) 2015-2016, QuorraJS.
 * @license See LICENSE.txt
 */

var TestingTask = require('../TestingTask');

/*
 |----------------------------------------------------------------
 | Mocha Testing
 |----------------------------------------------------------------
 |
 | This task will trigger your entire Mocha test suite and it
 | will show notifications indicating the success or failure
 | of that test suite. It works great with your tdd task.
 |
 */

Elixir.extend('mocha', function (src, command) {
    new TestingTask('mocha', src, command);
});