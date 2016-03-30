// Пример оборачивания функции в песочнице

var fs = require('fs'),
    vm = require('vm');


// Объявляем хеш из которого сделаем контекст-песочницу
/*var context = {
  module: {},
  console: console,
  // Оборачиваем функцию setTimeout в песочнице
  setTimeout: function(callback, timeout) {
    // Добавляем поведение при вызове setTimeout
    console.log(
      'Call: setTimeout, ' +
      'callback function: ' + callback.name + ', ' +
      'timeout: ' + timeout
    );
    setTimeout(function() {
      // Добавляем поведение при срабатывании таймера
      console.log('Event: setTimeout, before callback');
      // Вызываем функцию пользователя на событии таймера
      callback();
      console.log('Event: setTimeout, after callback');
    }, timeout);
  }
};*/


//Логируем вызовы функций, колбеков и сумарной считаной памяти (вывод каждые 10 сек)
var functionCalls = 0;
var functionCallbacks = 0;
var totalReadMemory = 0;
setInterval(logOutput, 10000);


function logOutput(){
  console.log("Calls to functions: " + functionCalls);
  console.log("Calls to Callbacks: " + functionCallbacks);
  console.log("Total read memory: " + totalReadMemory);
}


var context = {
  module: {},
  console: console,
  setInterval: setInterval,
  fs: cloneInterface(fs)
}

function cloneInterface(anInterface) {
  var clone = {};
  for (var key in anInterface) {
    clone[key] = wrapFunction(key,anInterface[key]);
  }
  return clone;
}

function wrapFunction(fnName, fn) {
  return function wrapper() {
    var args = [];
    Array.prototype.push.apply(args, arguments);
    if(typeof(args[args.length-1]) == typeof(Function)){
      args[args.length - 1] = wrapFunction(args[args.length - 1].name, args[args.length - 1]);
      functionCallbacks++;

    }
    console.log('Call: ' + fnName);
    if(args[1] instanceof Buffer){
      totalReadMemory += args[1].length;
    }
    console.dir(args[1].length);
    functionCalls++;
    return fn.apply(undefined, args);
  }
}

// Преобразовываем хеш в контекст
context.global = context;
var sandbox = vm.createContext(context);

// Читаем исходный код приложения из файла
var fileName = './application.js';
fs.readFile(fileName, function(err, src) {
  // Запускаем код приложения в песочнице
  var script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);
});


