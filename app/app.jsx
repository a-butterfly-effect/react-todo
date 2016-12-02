// Require dependencies
// React
const React = require('react');
const ReactDOM = require('react-dom');
// ES6/ES2015: Object destructuring
// Pull off four new variables
// let {Route, Router, IndexRoute, hashHistory} = require('react-router');
let {hashHistory} = require('react-router');
// ES5
// let Route = require('react-router').Route;
// let Router = require('react-router').Router;
// let IndexRouter = require('react-router').IndexRouter;
// let hashHistory = require('react-router').hashHistory;

// Redux
let {Provider} = require('react-redux');

// Components
let Main = require('Main');
// Connected version
// import Login from 'Login';
// let TodoApp = require('TodoApp');
// import TodoApp from 'TodoApp';
import firebase from 'app/firebase/';
import router from 'app/router/';

// If user argument is present then someone is logged in
// If user argument is missing then someone logged out
firebase.auth().onAuthStateChanged((user) => {
    // Redirect the user
    if (user) {
        // Save uid in the redux store
        store.dispatch(actions.login(user.uid));
        // Grab to do of logged in user
        store.dispatch(actions.startAddTodos());
        // Swap out the URL with something new
        hashHistory.push('/todos');
    } else {
        store.dispatch(actions.logout());
        store.dispatch(actions.removeTodos());
        hashHistory.push('/');
    }
});

// My Redux
let actions = require('actions');
let store = require('configureStore').configure();

// Custom APIs
// let TodoAPI = require('TodoAPI');

// No need to use from since we don't care about creating any variables via the modules exports
// import './../playground/firebase/index';

// No doing these
// store.subscribe(() => {
//     // debugger;
//
//     let state = store.getState();
//     // BAD BAD BAD but used this to fix an issue where a todo was added
//     // state.todos = [];
//     console.log('New state', state);
//     // Get todos that were previously saved
//     TodoAPI.setTodos(state.todos);
// });
// let initialTodos = TodoAPI.getTodos();
// store.dispatch(actions.addTodos(initialTodos));

// Create defaults
// store.dispatch(actions.addTodo('Do something'));
// store.dispatch(actions.setSearchText('something'));
// store.dispatch(actions.toggleShowCompleted());

// Load foundation (css!) and inject to HTML (style!)
// require('style!css!foundation-sites/dist/foundation.min.css');

// Fire up foundation
$(document).foundation();

// Same as above for app.scss plus fire the sass loader (sass!)
require('style!css!sass!applicationStyles');

// Render to the HTML DOM
// The Main component will be in charge of rendering the main app
// The weather component is our index/home
ReactDOM.render(
    // The ToDoApp component as well as all of its children are gonna be able to access
    // the data on the store as well as the dispatch actions
    <Provider store={store}>
        {router}
    </Provider>,
    document.getElementById('app')
);
