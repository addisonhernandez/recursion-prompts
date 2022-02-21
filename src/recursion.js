/* jshint esversion: 6 */
Array.prototype.last = function () { return this[this.length - 1]; };

// Solve the following prompts using recursion.

// 1. Calculate the factorial of a number. The factorial of a non-negative integer n,
// denoted by n!, is the product of all positive integers less than or equal to n.
// Example: 5! = 5 x 4 x 3 x 2 x 1 = 120
// factorial(5); // 120
var factorial = function(n) {
  if (n < 0) {
    return null;
  }

  if (n < 2) {
    return 1;
  }

  return n * factorial(n - 1);
};

// 2. Compute the sum of an array of integers.
// sum([1,2,3,4,5,6]); // 21
var sum = function(array) {
  if (array.length === 0) {
    return 0;
  }

  return array[0] + sum(array.slice(1));
};

// 3. Sum all numbers in an array containing nested arrays.
// arraySum([1,[2,3],[[4]],5]); // 15
var arraySum = function(array) {
  if (array.length === 0) {
    return 0;
  }

  const firstElem = (Array.isArray(array[0])) ? arraySum(array[0]) : array[0];

  return firstElem + arraySum(array.slice(1));
};

// 4. Check if a number is even.
var isEven = function(n) {
  // Base Cases:
  if (n === 0) {
    return true;
  }

  if (n === 1) {
    return false;
  }

  // Handle Edge Case: n < 0
  // if (n < 0) {
  //   return isEven(-n);
  // }

  // Method 1:
  // Subtracting 1 flips parity
  // return !isEven(n - 1);

  // Method 2:
  // Subtracting 2 maintains parity
  // return isEven(n - 2);

  // Method 3: (Really fast hack)
  // Consider only the final bit of twos-complement binary number (n & 1):
    // For all odd numbers  -> LSB := 1
    // For all even numbers -> LSB := 0
  // This reduces our max recursion depth to two!
  return isEven(n & 1);
};

// 5. Sum all integers below a given integer.
// sumBelow(10); // 45
// sumBelow(7); // 21
var sumBelow = function(n) {
  if (n  === 0) {
    return 0;
  }

  if (n < 0) {
    return -sumBelow(-n);
  }

  return (n - 1) + sumBelow(n - 1);
};

// 6. Get the integers within a range (x, y).
// range(2,9); // [3,4,5,6,7,8]
var range = function(x, y) {
  // Handle Edge Case: start (x) > end (y)
  if (x > y) {
    return range(y, x).reverse();
  }


  if (x + 1 >= y) {
    return [];
  }

  return [x + 1, ...range(x + 1, y)];

  // ES5 equivalent:
  // const result = [x + 1];

  // Array.prototype.push.apply(result, range(x + 1, y));

  // return result;
};

// 7. Compute the exponent of a number.
// The exponent of a number says how many times the base number is used as a factor.
// 8^2 = 8 x 8 = 64. Here, 8 is the base and 2 is the exponent.
// exponent(4,3); // 64
// https://www.khanacademy.org/computing/computer-science/algorithms/recursive-algorithms/a/computing-powers-of-a-number
var exponent = function(base, exp) {
  // Base Case:
  if (exp === 0) {
    return 1;
  }

  if (exp < 0) {
    return 1 / exponent(base, -exp);
  }

  // If exp is positive and even:
  if (isEven(exp)) {
    const result = exponent(base, exp / 2);
    return result * result;
  }

  // If exp is positive and odd:
  return base * exponent(base, exp - 1);
};

// 8. Determine if a number is a power of two.
// powerOfTwo(1); // true
// powerOfTwo(16); // true
// powerOfTwo(10); // false
var powerOfTwo = function(n) {
  // Base Case:
  if (n === 1) {
    return true;
  }

  return isEven(n) && (n !== 0) && powerOfTwo(n / 2);
};

// 9. Write a function that reverses a string.
var reverse = function(string) {
  if (string.length === 0) {
    return '';
  }

  return reverse(string.slice(1)) + string[0];
};

// 10. Write a function that determines if a string is a palindrome.
var palindrome = function(string) {
  string = string.toLowerCase().replace(/\s/g, '');

  if (string.length <= 1) {
    return true;
  }

  return string.endsWith(string[0]) && palindrome(string.slice(1, -1));
};

// 11. Write a function that returns the remainder of x divided by y without using the
// modulo (%) operator.
// modulo(5,2) // 1
// modulo(17,5) // 2
// modulo(22,6) // 4
var modulo = function(x, y) {
  if (x < 0) {
    return -modulo(-x, y);
  }
  if (y < 0) {
    return modulo(x, -y);
  }

  if (y === 0) {
    return NaN;
  }

  if (x < y) {
    return x;
  }

  return modulo(x - y, y);
}; // lol, it fails if I add comments ¯\_(ツ)_/¯

// 12. Write a function that multiplies two numbers without using the * operator or
// Math methods.
var multiply = function(x, y) {
  if (x === 0 || y === 0) {
    return 0;
  }

  if (y < 0) {
    return -multiply(x, -y);
  }

  if (y === 1) {
    return x;
  }

  return x + multiply(x, y - 1);
};

// 13. Write a function that divides two numbers without using the / operator or
// Math methods to arrive at an approximate quotient (ignore decimal endings).
var divide = function(x, y) {
  if (y === 0) {
    return NaN;
  }

  if (y < 0) {
    return -divide(x, -y);
  }

  if (x < 0) {
    return -divide(-x, y);
  }

  if (x < y) {
    return 0;
  }

  return 1 + divide(x - y, y);
};

// 14. Find the greatest common divisor (gcd) of two positive numbers. The GCD of two
// integers is the greatest integer that divides both x and y with no remainder.
// gcd(4,36); // 4
// http://www.cse.wustl.edu/~kjg/cse131/Notes/Recursion/recursion.html
// https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/the-euclidean-algorithm
var gcd = function(x, y) {
  if (y === 0) {
    return x;
  }

  if (x < 0 || y < 0) {
    return null;
  }

  return gcd(y, x % y);
};

// 15. Write a function that compares each character of two strings and returns true if
// both are identical.
// compareStr('house', 'houses') // false
// compareStr('tomato', 'tomato') // true
var compareStr = function(str1, str2) {
  if (str1 === '') {
    return str2 === '';
  }

  return (str1[0] === str2[0]) && compareStr(str1.slice(1), str2.slice(1));
};

// 16. Write a function that accepts a string and creates an array where each letter
// occupies an index of the array.
var createArray = function(str) {
  if (str === '') {
    return [];
  }

  /* Using push.apply to extend an array (tail recursion) */
  // var charArray = [str[0]];
  // Array.prototype.push.apply(charArray, createArray(str.slice(1)));
  // return charArray;

  /* Using head recurison to build an array, then pushing the last element */
  var charArray = createArray(str.slice(0, -1));
  charArray.push(str.slice(-1));
  return charArray;
};

// 17. Reverse the order of an array
var reverseArr = function(array) {
  if (array.length === 0) {
    return [];
  }

  /* Same head recursion as createArray, just on the opposite end of the array */
  var reversedArray = reverseArr(array.slice(1));
  reversedArray.push(array[0]);
  return reversedArray;
};

// 18. Create a new array with a given value and length.
// buildList(0,5) // [0,0,0,0,0]
// buildList(7,3) // [7,7,7]
var buildList = function(value, length) {
  if (length === 0) {
    return [];
  }

  var filledList = buildList(value, length - 1);
  filledList.push(value);
  return filledList;
};

// 19. Implement FizzBuzz. Given integer n, return an array of the string representations of 1 to n.
// For multiples of three, output 'Fizz' instead of the number.
// For multiples of five, output 'Buzz' instead of the number.
// For numbers which are multiples of both three and five, output “FizzBuzz” instead of the number.
// fizzBuzz(5) // ['1','2','Fizz','4','Buzz']
var fizzBuzz = function(n) {
  if (n === 0) {
    return [];
  }

  var huh = fizzBuzz(n - 1);

  var yee = ''
  var what = n % 15 === 0;
  var uh = n % 5 === 0;
  var yeah = n % 3 === 0;

  if (what) {
    yee += 'FizzBuzz';
  } else if (uh) {
    yee += 'Buzz';
  } else if (yeah) {
    yee += 'Fizz';
  } else {
    yee += n;
  }

  huh.push(yee);
  return huh;
};

// 20. Count the occurrence of a value in a list.
// countOccurrence([2,7,4,4,1,4], 4) // 3
// countOccurrence([2,'banana',4,4,1,'banana'], 'banana') // 2
var countOccurrence = function(array, value) {
  if (array.length === 0) {
    return 0;
  }

  var count = countOccurrence(array.slice(1), value);
  return (array[0] === value) ? count + 1 : count;
};

// 21. Write a recursive version of map.
// rMap([1,2,3], timesTwo); // [2,4,6]
var rMap = function(array, callback) {
  if (array.length === 0) {
    return [];
  }

  var mappedArray = [callback(array[0])];
  mappedArray.push.apply(mappedArray, rMap(array.slice(1), callback));
  return mappedArray;
};

// 22. Write a function that counts the number of times a key occurs in an object.
// var obj = {'e':{'x':'y'},'t':{'r':{'e':'r'},'p':{'y':'r'}},'y':'e'};
// countKeysInObj(obj, 'r') // 1
// countKeysInObj(obj, 'e') // 2
var countKeysInObj = function(obj, key) {
  if (typeof obj !== 'object') {
    return 0;
  }

  var keyCount = 0;

  for (var property in obj) {
    if (property === key) {
      keyCount++;
    }

    keyCount += countKeysInObj(obj[property], key);
  }

  return keyCount;
};

// 23. Write a function that counts the number of times a value occurs in an object.
// var obj = {'e':{'x':'y'},'t':{'r':{'e':'r'},'p':{'y':'r'}},'y':'e'};
// countValuesInObj(obj, 'r') // 2
// countValuesInObj(obj, 'e') // 1
var countValuesInObj = function(obj, value) {
  let count = 0;

  for (const val of Object.values(obj)) {
    if (typeof val === 'object') {
      count += countValuesInObj(val, value);
    }

    if (val === value) {
      count += 1;
    }
  }

  return count;
};

// 24. Find all keys in an object (and nested objects) by a provided name and rename
// them to a provided new name while preserving the value stored at that key.
var replaceKeysInObj = function(obj, oldKey, newKey) {
  for (const [key, val] of Object.entries(obj)) {
    if (key === oldKey) {
      obj[newKey] = val;
      delete obj[oldKey]
    }

    if (typeof val === 'object') {
      replaceKeysInObj(val, oldKey, newKey);
    }
  }

  return obj;
};

// 25. Get the first n Fibonacci numbers. In the Fibonacci sequence, each subsequent
// number is the sum of the previous two.
// Example: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34.....
// fibonacci(5); // [0,1,1,2,3,5]
// Note: The 0 is not counted.
var fibonacci = function(n) {
  if (n < 1) {
    return null;
  }
  if (n === 1) {
    return [0, 1];
  }

  var fibArray = fibonacci(n - 1);
  var arrSum = function (arr) { return arr.reduce((a, b) => a + b); };
  fibArray.push(arrSum(fibArray.slice(-2)));
  return fibArray;
};

// 26. Return the Fibonacci number located at index n of the Fibonacci sequence.
// [0,1,1,2,3,5,8,13,21]
// nthFibo(5); // 5
// nthFibo(7); // 13
// nthFibo(3); // 2
var nthFibo = function(n) {
  if (n < 0) {
    return null;
  }
  if (n <= 1) {
    return n;
  }

  return nthFibo(n - 1) + nthFibo(n - 2);
};

// 27. Given an array of words, return a new array containing each word capitalized.
// var words = ['i', 'am', 'learning', 'recursion'];
// capitalizedWords(words); // ['I', 'AM', 'LEARNING', 'RECURSION']
var capitalizeWords = function(array) {
  if (array.length === 0) {
    return [];
  }

  var capitalWords = [array[0].toUpperCase()];
  capitalWords.push.apply(capitalWords, capitalizeWords(array.slice(1)));
  return capitalWords
};

// 28. Given an array of strings, capitalize the first letter of each index.
// capitalizeFirst(['car','poop','banana']); // ['Car','Poop','Banana']
var capitalizeFirst = function(array) {
  if (array.length === 0) {
    return [];
  }

  var capitalizeFirstLetter = function (word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }

  var properNouns = [capitalizeFirstLetter(array[0])];
  properNouns.push.apply(properNouns, capitalizeFirst(array.slice(1)));
  return properNouns;
};

// 29. Return the sum of all even numbers in an object containing nested objects.
// var obj1 = {
//   a: 2,
//   b: {b: 2, bb: {b: 3, bb: {b: 2}}},
//   c: {c: {c: 2}, cc: 'ball', ccc: 5},
//   d: 1,
//   e: {e: {e: 2}, ee: 'car'}
// };
// nestedEvenSum(obj1); // 10
var nestedEvenSum = function(obj) {
  var sum = 0;

  for (var value of Object.values(obj)) {
    if (typeof value === 'object') {
      sum += nestedEvenSum(value);
    } else if (value % 2 === 0) {
      sum += value;
    }
  }

  return sum;
};

// 30. Flatten an array containing nested arrays.
// flatten([1,[2],[3,[[4]]],5]); // [1,2,3,4,5]
var flatten = function(array) {
  var flatArray = [];

  array.forEach(function (element) {
    if (Array.isArray(element)) {
      flatArray.push.apply(flatArray, flatten(element));
    } else {
      flatArray.push(element);
    }
  });

  return flatArray;
};

// 31. Given a string, return an object containing tallies of each letter.
// letterTally('potato'); // {p:1, o:2, t:2, a:1}
var letterTally = function(str, obj) {
  if (str === '') {
    return;
  }

  obj = obj || {};

  obj[str[0]] = (obj[str[0]] || 0) + 1;

  letterTally(str.slice(1), obj);

  return obj;
};

// 32. Eliminate consecutive duplicates in a list. If the list contains repeated
// elements they should be replaced with a single copy of the element. The order of the
// elements should not be changed.
// compress([1,2,2,3,4,4,5,5,5]) // [1,2,3,4,5]
// compress([1,2,2,3,4,4,2,5,5,5,4,4]) // [1,2,3,4,2,5,4]
var compress = function(list) {
  if (list.length === 1) {
    return list;
  }

  var compressedList = compress(list.slice(1));

  // compressed list now has the tail of list
  // if head of list != head of compressed, unshift

  if (list[0] !== compressedList[0]) {
    compressedList.unshift(list[0]);
  }

  return compressedList;
};

// 33. Augment every element in a list with a new value where each element is an array
// itself.
// augmentElements([[],[3],[7]], 5); // [[5],[3,5],[7,5]]
var augmentElements = function(array, aug) {
  if (array.length === 0) {
    return;
  }

  array[0].push(aug);

  augmentElements(array.slice(1), aug);

  return array;
};

// 34. Reduce a series of zeroes to a single 0.
// minimizeZeroes([2,0,0,0,1,4]) // [2,0,1,4]
// minimizeZeroes([2,0,0,0,1,0,0,4]) // [2,0,1,0,4]
var minimizeZeroes = function(array) {
  if (array.length === 1) {
    return array;
  }

  var minimizedArray = minimizeZeroes(array.slice(0, -1));

  // minimized has the head of array
  // push if last of array != 0
  // or if last of array is 0 and last of minimized != 0

  if (array.last() !== 0 || minimizedArray.last() !== 0) {
    minimizedArray.push(array.last());
  }

  return minimizedArray;
};

// 35. Alternate the numbers in an array between positive and negative regardless of
// their original sign. The first number in the index always needs to be positive.
// alternateSign([2,7,8,3,1,4]) // [2,-7,8,-3,1,-4]
// alternateSign([-2,-7,8,3,-1,4]) // [2,-7,8,-3,1,-4]
var alternateSign = function(array) {
  if (array.length === 1) {
    return [Math.abs(array[0])];
  }

  var alternatingArray = alternateSign(array.slice(0, -1));

  // alternating now has head of array
  // if last elem is + -> push -abs(next)
  // if last elem is - -> push abs(next)

  var nextElem = 0;

  if (alternatingArray.last() > 0) {
    nextElem = -Math.abs(array.last());
  } else if (alternatingArray.last() < 0) {
    nextElem = Math.abs(array.last());
  }
  // if last elem == 0, don't do anything

  alternatingArray.push(nextElem);

  return alternatingArray;
};

// 36. Given a string, return a string with digits converted to their word equivalent.
// Assume all numbers are single digits (less than 10).
// numToText("I have 5 dogs and 6 ponies"); // "I have five dogs and six ponies"
var numToText = function(str) {
  if (str === '') {
    return str;
  }

  var numLookup = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine'
  }

  return (numLookup[str[0]] || str[0]) + numToText(str.slice(1));
};


// *** EXTRA CREDIT ***

// 37. Return the number of times a tag occurs in the DOM.
var tagCount = function(tag, node=document.body) {
  tag = tag.toUpperCase();

  const kids = Array.from(node.children);
  const kidCountHelper = (count, kid) => count + tagCount(tag, kid);

  // using type coersion: true ~> 1, false ~> 0
  return (node.tagName === tag) + kids.reduce(kidCountHelper, 0);
};

// 38. Write a function for binary search.
// var array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
// binarySearch(array, 5) // 5
// https://www.khanacademy.org/computing/computer-science/algorithms/binary-search/a/binary-search
var binarySearch = function (array, target, min = 0, max = array.length - 1) {
  if (min > max) {
    return null;
  }

  const mid = Math.trunc((min + max) / 2);

  if (array[mid] < target) {
    // search the right half
    return binarySearch(array, target, mid + 1, max);
  }

  if (array[mid] > target) {
    // search the left half
    return binarySearch(array, target, min, mid - 1);
  }

  return mid;
};

// 39. Write a merge sort function.
// mergeSort([34,7,23,32,5,62]) // [5,7,23,32,34,62]
// https://www.khanacademy.org/computing/computer-science/algorithms/merge-sort/a/divide-and-conquer-algorithms
var mergeSort = function(array) {
  if (array.length <= 1) {
    return array;
  }

  // DIVIDE
  var pivot = Math.floor(array.length / 2);

  var leftHalf = mergeSort(array.slice(0, pivot));
  var rightHalf = mergeSort(array.slice(pivot));

  // CONQUER
  var merged = [];

  while (leftHalf.length && rightHalf.length) {
    if (leftHalf[0] < rightHalf[0]) {
      merged.push(leftHalf.shift());
    } else {
      merged.push(rightHalf.shift());
    }
  }

  // handle the leftovers
  // merged.push.apply(merged, leftHalf);
  // merged.push.apply(merged, rightHalf);
  merged = [...merged, ...leftHalf, ...rightHalf];

  return merged;
};

// 40. Deeply clone objects and arrays.
// var obj1 = {a:1,b:{bb:{bbb:2}},c:3};
// var obj2 = clone(obj1);
// console.log(obj2); // {a:1,b:{bb:{bbb:2}},c:3}
// obj1 === obj2 // false
var clone = function(input) {
  if (typeof input !== 'object') {
    return input;
  }

  if (Array.isArray(input)) {
    return input.map(elem => clone(elem));
  }

  const result = {};
  for (const key in input) {
    result[key] = clone(input[key]);
  }
  return result;
};
