(function () {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function (val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function (array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function (array, n) {
    //return the last number if n is not defined
    //if n defined return the the the value starting at negative n and ending at the last value in the array
    //if n equal to 0 do .slice(-n, 0)
    return n === undefined ? array[array.length - 1] : array.slice(-n, (n === 0 ? 0 : array.length));  //migth change in the future
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function (collection, iterator) {
    //check if the collection is an array
    if (Array.isArray(collection)) {
      //loop through the given collection
      for (let i = 0; i < collection.length; i++) {
        //run the iterator and give it the current value, it's index, and the array itself 
        iterator(collection[i], i, collection)
      }
      //run if collection is a object
    } else {
      //loop through the given collection
      for (let key in collection) {
        //run the iterator and give it the current value, it's key name, and the object itself 
        iterator(collection[key], key, collection)
      }

    }

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function (array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    let result = -1;

    _.each(array, (item, index) => {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function (collection, test) {
    //create an empty array
    let value = [];
    //loop through the collection
    for (let i = 0; i < collection.length; i++) {
      //check if the given test return true after given it the current value, index and the collection itself
      if (test(collection[i], i, collection)) {
        //push the current value into the value array 
        value.push(collection[i]);
      }
    }
    //return value
    return value;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function (collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    //create two array where one will hold values that past the test and the other array will be empty
    let True = _.filter(collection, test);
    let False = []
    //loop through the collection
    for (let i = 0; i < collection.length; i++) {
      //check if the current value is not in the True array
      if (!True.includes(collection[i])) {
        //push the current value into the false array
        False.push(collection[i])
      }
    }
    //return the false array
    return False;
  };

  // make an iterated array to keep track of iterated items
  // determine if iterator exists
  // if it does, iterate over array and push iterator(item) to iterated
  // if iterated does not include iterator(item), push item to result
  // if it does not, iterate over array and push item to iterated
  // Produce a duplicate-free version of the array.

  _.uniq = function (array, isSorted, iterator) {
    //create a empty array
    let arr = [];
    let arr2 = [];
    //check if isSorted is given or false
    if (!isSorted) {
      //loop through the given array
      for (let i = 0; i < array.length; i++) {
        //check if arr doesn't has a value equal to the current value
        if (!arr.includes(array[i])) {
          //push the current value into arr
          arr.push(array[i]);
        }
      }
      //run if isSorted is true
    } else {
      //loop through the given array
      for (let i = 0; i < array.length; i++) {
        if (!arr2.includes(iterator(array[i]))) {
          arr.push(array[i]);
          arr2.push(iterator(array[i]));
        }
      }
    }
    //return arr
    return arr
  };

  // Return the results of applying an iterator to each element.
  _.map = function (collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    //create a empty array
    var arr = [];
    //loop through the collection 
    for (let i = 0; i < collection.length; i++) {
      //push the the value return from iterator that was given the current value, it index, and the collection it self
      arr.push(iterator(collection[i], i, collection))
    }
    //return arr
    return arr;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function (collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, (item) => {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   const numbers = [1,2,3];
  //   const sum = _.reduce(numbers, (total, number) => {
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   const identity = _.reduce([5], (total, number) => {
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function (collection, iterator, accumulator) {
    //check if accumulator is defined
    if (accumulator === undefined) {
      //set the accumulator to equal the first value in the collection
      accumulator = collection[0];
      //loop through the collection
      for (let i = 1; i < collection.length; i++) {
        //set the accumulator equal to the return value of the iterator after give it the accumulator, the current value, the index, and the collection
        accumulator = iterator(accumulator, collection[i], i, collection)
      }
      //return the accumulator
      return accumulator
    }
    //loop through the collection
    for (let i = 0; i < collection.length; i++) {
      //set the accumulator equal to the return value of the iterator after give it the accumulator, the current value, the index, and the collection
      accumulator = iterator(accumulator, collection[i], i, collection)
    }
    //return the accumulator
    return accumulator
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function (collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    //create a empty variable
    let array;
    //check if collection is an array or object
    if (Array.isArray(collection)) {
      //set array to equal the collection
      array = collection;
      //run if collection is a object
    } else {
      //set array to equal a empty array
      array = [];
      //loop through the collection
      for (let key in collection) {
        //push the value from the current key into array
        array.push(collection[key]);
      }
    }
    //return the value from reduce that was given the array, a function, and a false value
    return _.reduce(array, (wasFound, item) => {
      //check if wasFound equal true
      if (wasFound) {
        //return true
        return true;
      }
      //return true or false if the current item is equal to the given target
      return item === target;

    }, false);
  }



  // Determine whether all of the elements match a truth test.
  _.every = function (collection, iterator) {
    // TIP: Try re-using reduce() here.
    //check if collection is an array
    if (Array.isArray(collection)) {
      //create a variable that will equal the return value of _.reduce
      let test = _.reduce(collection, function (value, cur) {
        //check if the iterator is defined
        if (iterator === undefined) {
          //check if the cur value is false or the value value is false
          if (cur === false || value === false) {
            //if so return false
            return false
            //run if cur or value is true
          } else {
            //return true
            return true
          }
        }
        //check if the cur value after running through the iterator is false or the value value is false
        if (!iterator(cur) || value === false) {
          //return false
          return false
        }
        //return true
        return true
      }, true)
      //return test
      return test
    }
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function (collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    //check if the collection is defined and has a value in it's array
    if (collection === undefined || !Array.isArray(collection) || collection.length === 0) {
      //return false
      return false
    }
    //check if iterator is undefined
    if (iterator === undefined) {
      //create a variable that will equal the return value of _.reduce
      let noIterator = _.reduce(collection, function (seed, value) {
        //check if the value value is false or the seed value is false
        if (value === true || seed === true) {
          //return true
          return true
          //run if value and seed equal false
        } else {
          //return true
          return false
        }
      }, false)
      //return onIterator
      return noIterator
    }

    //create a variable that hold a true or false value after running the _.every function
    //this test if there at least one false value in the collection
    let test = _.every(collection, function (value) {
      //check if the iterator return false
      if (!iterator(value)) {
        //return true
        return true
        //run if iterator return true
      } else {
        //return false
        return false
      }
    })
    //create a variable that hold a true or false value after running the _.every function
    //this test if all values in the collection are true
    let test2 = _.every(collection, iterator)
    //check if test 2 equal
    if (test2 === true) {
      //return true
      return true
      //check if test equal true
    } else if (test === true) {
      //return false
      return false
      //check if test equal false
    } else if (test === false) {
      //return true
      return true
    }
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   const obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function (obj, ...obj2) {
    //loop through obj2
    for (let i = 0; i < obj2.length; i++) {
      //loop through the current object in obj2
      for (let key in obj2[i]) {
        //set the current key in obj to equal the current key in the current object in obj2
        //or create a new key in obj with current key in the current object in obj2
        obj[key] = obj2[i][key]
      }
    }
    //return obj
    return obj
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function (obj, ...obj2) {
    //loop through obj2
    for (let i = 0; i < obj2.length; i++) {
      //loop through the current object in obj2
      for (let key in obj2[i]) {
        //check if obj doesn't have key that has the same name as the current key in the current object in obj2 
        if (obj[key] === undefined) {
          //create a new key in onj with current key in the current object in obj2
          obj[key] = obj2[i][key];
        }
      }
    }
    //return obj
    return obj
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function (func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    let alreadyCalled = false;
    let result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function () {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function (func) {
    //create an empty object
    const call = { f: undefined };
    //check if that function is in call
    if (func in call.f === func) {
      //return the called function in call
      return call[func];
    } else {
      //create that function in call
      call[func] = func;
      //return that given function
      return func
    }

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function (func, wait, a, b) {
    //check if a and b has a value
    if (a !== undefined && b !== undefined) {
      //give the function a and b then run it after a certain amount of time
      setTimeout(func(a, b), wait)
      //run if only A has a value
    } else if (a !== undefined) {
      //give the function A then run it after a certain amount of time
      setTimeout(func(a), wait)
      //run if a and b are not defined
    } else {
      //run the function after a certain amount of time
      setTimeout(func, wait)
    }
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function (array) {
  };


  /**
   * ADVANCED
   * =================
   *
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function (collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function (collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function () {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function (nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function () {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function (array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function (func, wait) {
  };
}());
