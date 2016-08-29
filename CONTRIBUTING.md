# Guidelines

## React

### Create a new component

* Create new folder named after the component's name
* Add a `index.js` file for the component (see also [React Component] (react.md))
* Add a `index.css` if component needs style
* Define `propTypes` to set default values to props
* Define `defaultProps` to set the type of each props
* Define `state` to set default value to state
* Write a small test in a \__tests__ folder to check at least that the
component is rendering (eg. [example] (/web_modules/\_example/\__tests__/index.js))

### Component guidelines

* Write components name / variables name in English
* Write very small components. Don't hesitate to create multiple small components
* Respect following order for properties (Eslint sort-comp rule):
    1. Everything-else
    2. Lifecycle
    3. Render
* Use shortcut for conditional component :

Example:  

    {
        programs.loading &&
        <Loader />
    }


**No underscore** for private methods

## Misc

* Use ES6 `export default` to export an object. NOT `module.exports`
