// Файл содержит маленький кусочек основного модуля демонстрационного
// прикладного приложения, загружаемого в песочницу демонстрационным
// кусочком фреймворка. Читайте README.md в нем задания.

require("util");
// Вывод из глобального контекста модуля
console.log('From application global context');

module.exports = function() {
  // Вывод из контекста экспортируемой функции
  console.log('From application exported function');
};

console.log("From wrapped console.log()");

console.dir(global);


//add new key to global
global.func = function(a,b){
  return a + b;
}