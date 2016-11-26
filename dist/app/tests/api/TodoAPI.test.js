'use strict';

var expect = require('expect');

var TodoAPI = require('TodoAPI');

describe('TodoAPI', function () {
    // Clean the localStorage value
    beforeEach(function () {
        localStorage.removeItem('todos');
    });

    it('should exist', function () {
        expect(TodoAPI).toExist();
    });

    describe('setTodos', function () {
        it('should set valid todos array', function () {
            var todos = [{
                id: 1992,
                text: 'Set birth year',
                completed: false
            }];

            TodoAPI.setTodos(todos);
            var actualTodos = JSON.parse(localStorage.getItem('todos'));

            // toBe() checks if they are the same exact object or array in memory
            // toEqual() just compares the value on them
            // toEqual() is better for objects or arrays to check each value
            expect(actualTodos).toEqual(todos);
        });

        it('should not set invalid todos array', function () {
            var badTodos = {
                x: 22,
                y: 'sss',
                z: function z() {
                    return 2;
                }
            };

            TodoAPI.setTodos(badTodos);

            expect(localStorage.getItem('todos')).toBe(null);
        });
    });

    describe('getTodos', function () {
        it('should return empty array for bad localStorage data', function () {
            // We cleaned up the localStorage value in the beginning
            var actualTodos = TodoAPI.getTodos();
            // toBe() would fail because 2 arrays are different references to the memory
            expect(actualTodos).toEqual([]);
        });

        it('should return todo if valid array in localStorage', function () {
            var todos = [{
                id: 1992,
                text: 'Set birth year',
                completed: false
            }];

            // It's good to not use other functions implemented in the same object
            localStorage.setItem('todos', JSON.stringify(todos));
            var actualTodos = TodoAPI.getTodos();

            expect(actualTodos).toEqual(todos);
        });
    });

    describe('filterTodos', function () {
        var todos = [{
            id: 1,
            text: 'Eat apple',
            completed: true
        }, {
            id: 44,
            text: 'Go apple !!!',
            completed: false
        }, {
            id: 2212,
            text: 'SHAYMAN',
            completed: true
        }];

        it('should return all todos if showCompleted is true', function () {
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos.length).toBe(3);
        });

        it('should return non-completed todos when showCompleted is false', function () {
            var filteredTodos = TodoAPI.filterTodos(todos, false, '');
            expect(filteredTodos.length).toBe(1);
        });

        it('should sort todos by completed status', function () {
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos[0].completed).toBe(false);
        });

        it('should return all todos if searchText is empty', function () {
            var filteredTodos = TodoAPI.filterTodos(todos, true, '');
            expect(filteredTodos.length).toBe(3);
        });

        it('should filter todos by searchText \'apple\'', function () {
            var filteredTodos = TodoAPI.filterTodos(todos, true, 'aPpLe');
            expect(filteredTodos.length).toBe(2);
        });
    });
});
//# sourceMappingURL=TodoAPI.test.js.map