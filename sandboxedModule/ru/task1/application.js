// Файл содержит маленький кусочек основного модуля демонстрационного
// прикладного приложения, загружаемого в песочницу демонстрационным
// кусочком фреймворка. Читайте README.md в нем задания.

// Вывод из глобального контекста модуля
console.log('From application global context');

module.exports = function() {
  // Вывод из контекста экспортируемой функции
  console.log('From application exported function');
};


var timeOut = function () {
  setTimeout(function () {
    console.log("From setTimeout");
  },3000);
};

var interval = function(){
  var intervalOutput = setInterval(function(){
    console.log("From setInterval");
  },1000);
  intervalOutput.unref();
};

interval();
timeOut();





