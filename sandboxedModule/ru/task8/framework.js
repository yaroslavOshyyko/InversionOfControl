// Файл, демонстрирующий то, как фреймворк создает среду (песочницу) для
// исполнения приложения, загружает приложение, передает ему песочницу в
// качестве глобального контекста и получает ссылу на экспортируемый
// приложением интерфейс. Читайте README.md в нем задания.

// Фреймворк может явно зависеть от библиотек через dependency lookup
var fs = require('fs'),
    vm = require('vm'),
    path  = require('path'),
    app = require("./application.js");


// Создаем контекст-песочницу, которая станет глобальным контекстом приложения
var context = {
    module: {},
    console: {
        log: function(message){
            var date = new Date();
            if(process.argv.length == 3){
                applicationName = path.basename(process.argv[2]);
            }
            else{
                applicationName = "application";
            }
            var time = date.getDate() + ':' + (date.getMonth()+1) + ':' + date.getFullYear() + '  ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            console.log(applicationName + ' ' + time + ': ' + message);

            fs.writeFile("output.txt", applicationName + ' ' + time + ': ' + message, function(err, info){
                if (err) throw err;
            });
        },
        dir: console.dir

    },


    require: function(file){
        var res = require(file);
        var date = new Date();
        var time = date.getDate() + ':' + (date.getMonth()+1) + ':' + date.getFullYear() + '  ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        fs.writeFile("requireLog.txt", time + ' ' + file, function(err, info){
            if (err) throw err;
        });
        return res;
    }


};
context.global = context;
var sandbox = vm.createContext(context);

// Читаем исходный код приложения из файла
var fileName;
if(process.argv.length == 3){
    fileName = process.argv[2] + ".js";
}
else{
    fileName = "application.js";
}


fs.readFile(fileName, function(err, src) {
  // Тут нужно обработать ошибки
  //TODO
  // Запускаем код приложения в песочнице
  var script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);
  
  // Забираем ссылку из sandbox.module.exports, можем ее исполнить,
  // сохранить в кеш, вывести на экран исходный код приложения и т.д.
    console.log(sandbox.module.exports.func.toString());
    console.log();
});

