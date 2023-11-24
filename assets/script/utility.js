'use strict';

/*
    As our program grows bigger, it may contain many lines of code. Instead of
    putting everything in a single file, you can use modules to separate codes
    in separate files as per their functionality. This makes our code organized
    and easier to maintain and update.

    A module is a file that contains code to perform a specific task. A module
    may contain variables, functions, classses, etc..
*/

// Add event listener
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}
  
// Get HTML element by id
function selectById(selector, parent = document) {
    return parent.getElementById(selector);
}
  
// Select HTML element
function select(selector, parent = document) {
    return parent.querySelector(selector);
}
  
// Get a (node) list of HTML elements
function selectAll(selector, parent = document) {
    return [...parent.querySelectorAll(selector)];
}
  
// Print
function print(arg) {
    console.log(arg);
}

export { onEvent, select, selectById, selectAll, print }