// Вывод из глобального контекста модуля
console.log('From application global context');

// Объявляем функцию для события таймера
function timerEvent() {
  console.log('From application timer event');
}




var fileName = './README.md';

var read = function() {
  console.log('Application going to read ' + fileName);
  fs.readFile(fileName, function (err, src) {
    console.log('File ' + fileName + ' size ' + src.length);
  });
}

var open = function(){
  console.log("Opening file " + fileName);
  fs.open(fileName,'r',  function(err, src){
      console.log("File opened");
  })
}

var dir  = function(){
  fs.readdir('./', function(err, dir){
    console.log(dir);
  })
}

// Устанавливаем функции работы с файлами на таймер
setInterval(read, 3000);
setInterval(open, 5000);
setInterval(dir, 7000);