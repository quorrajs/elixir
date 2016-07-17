/**
 * Load any official Elixir extensions, if
 * they have been installed by the user.
 */
function loadOfficialExtensions() {
    loadExtension('@positron/elixir-browsersync');
    loadExtension('@positron/elixir-rollup');
    loadExtension('@positron/elixir-webpack');

    require('require-dir')('../tasks/recipes');
}

/**
 * Load a single Elixir extension, while
 * suppressing any errors.
 *
 * @param  {string} name
 */
function loadExtension(name) {
    try {
        require(name);
    } catch (e) {
    }
}

loadOfficialExtensions();