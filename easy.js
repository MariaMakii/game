var num = 0;

var game = document.querySelector(".game-area");

var win = ['123','456','789','147','258','369','159','357']; // варианты выигрышей 
var indexMas = ['1','2','3','4','5','6','7','8','9'];

var textResult = document.querySelector('.result-area');

var allChecked = 0;

var blueWinner = '';
var redWinner = '';
var result = false;

var cells = document.querySelectorAll('.cell'); // ячейки

game.onclick = function(event){
    if(result === false){
    let target = event.target;
    if(target.classList.contains('cell')){
        if(target.classList.contains('checked')){}
        else{
            target.classList.add('checked'); // отмечаем, что ячейка уже заполнена
            if(game.classList.contains('user-play')){ // включен режим user
                userGame(target);
            } 
            else if(game.classList.contains('comp-play')){ // включен режим comp
                    compGame(target);
            }
      }
    }
  }   else{
         console.log('игра уже пройдена');
        }
}

function userGame(target){
    if(num>0){
            target.style.backgroundColor = 'red';
            redWinner += target.dataset.number;
            for(var i=0; i<8;i++){
                let variant = win[i];
                let count = 0;
                for(var j = 0; j<3; j++){
                    let letter = variant[j];
                    if(redWinner.includes(letter)){
                        count++;
                       }
                }
                if(count == 3){
                   i = 8;
                    result = true;
                    textResult.value = 'Победил красный!';
                    console.log('Победил красный!');
                   }
            }
        
            allChecked++;
            if(allChecked == 9 && result == false){
               result = true;
                textResult.value = 'Ничья';
               console.log('Ничья');
               }
            num--;   
     }
        else{
            target.style.backgroundColor = 'blue';
            blueWinner += target.dataset.number;
            for(var i=0; i<8;i++){
               let variant = win[i];
                let count = 0;
                for(var j = 0; j<3; j++){
                    let letter = variant[j];
                    if(blueWinner.includes(letter)){
                        count++;
                       }
                }
                if(count == 3){
                   i = 8;
                    result = true;
                    textResult.value = 'Победил синий!';
                    console.log('Победил синий!');
                   }
            }
            allChecked++;
            if(allChecked == 9 && result == false){
               result = true;
                textResult.value = 'Ничья';
               console.log('Ничья');
               }
            num++; 
    }
}



function compGame(target){
    //ход юзера
    target.style.backgroundColor = 'blue'; // первый ход юзера - синий
    blueWinner += target.dataset.number;
    
    var numberToDell = target.dataset.number; // элемент, который нужно удалить
    var indexToDell;
    for(var i = 0; i<indexMas.length; i++){
        if(indexMas[i] == numberToDell){
           indexToDell = i;
           }
    }
    indexMas.splice(indexToDell,1); // удаление элемента массива
    
    for(var i=0; i<8;i++){ // проверка победы
               let variant = win[i];
                let count = 0;
                for(var j = 0; j<3; j++){
                    let letter = variant[j];
                    if(blueWinner.includes(letter)){
                        count++;
                       }
                }
                if(count == 3){
                   i = 8;
                    result = true;
                    textResult.value = 'Победил синий!';
                    console.log('Победил синий!');
                   }
            }
            allChecked++;
            if(allChecked == 9 && result == false){ // ??
               result = true;
                textResult.value = 'Ничья';
               console.log('Ничья');
               }
    
    // ход компьютера
    // компьютер выбирает пустую клетку и заполняет ее
    var randomIndex = Math.floor(Math.random() * ((indexMas.length-1) - 0 + 1)) + 0; // индекс элемента, который будет закрашен и удален
     var randomCell = indexMas[randomIndex]; // элемент который нужно удалить из массива
     console.log(randomCell);
    indexMas.splice(randomIndex, 1);
    
     for(var cell of cells){
         if(cell.dataset.number == randomCell){
             cell.style.backgroundColor = 'red';
             redWinner += randomCell;
            }
        }
    
    for(var i=0; i<8;i++){
                let variant = win[i];
                let count = 0;
                for(var j = 0; j<3; j++){
                    let letter = variant[j];
                    if(redWinner.includes(letter)){
                        count++;
                       }
                }
                if(count == 3){
                   i = 8;
                    result = true;
                    textResult.value = 'Победил красный!';
                    console.log('Победил красный!');
                   }
            }
        
            allChecked++;
            if(allChecked == 9 && result == false){
               result = true;
                textResult.value = 'Ничья';
               console.log('Ничья');
               }
    
}

     
     



var compButton = document.querySelector(".comp"); // включение режима comp

compButton.onclick = function(){
    if(game.classList.contains('user-play')){ // если был включен режим юзер
        game.classList.remove('user-play'); // отключаем юзера 
        console.log('режим юзер отключен');
        if(!game.classList.contains('comp-play')){ // если класс комп не был подключен
        game.classList.add('comp-play'); // подключаем режим комп
        console.log('подключен режим комп');
        reload();
        }
        else{ // если класс уже есть
            console.log('класс комп уже подключен');
            console.log('user is dead');
            reload();
        }
    }
    else{ // если режим юзер до этого не был включен
        if(!game.classList.contains('comp-play')){ // если класс комп не был подключен
        game.classList.add('comp-play'); // подключаем режим комп
        console.log('подключен режим комп');
        reload();
        }
        else{ // если класс уже есть
            console.log('класс комп уже подключен');
            console.log('user is dead');
            reload();
        }
    }
}


var userButton = document.querySelector(".user"); // включение режима user

userButton.onclick = function(){
    if(game.classList.contains('comp-play')){ // если переключен режим с компьютера
        game.classList.remove('comp-play');
        console.log('отключен режим комп');
        if(!game.classList.contains('user-play')){ // если класс не подключен
        game.classList.add('user-play');
        console.log('режим юзер подключен');
        reload();
        }
        else{ 
        console.log('режим юзер уже подключен'); // если класс уже есть
        reload();
    }
}    else{ // если режим комп до этого не был включен
        console.log('режим комп до этого не был включен');
        if(!game.classList.contains('user-play')){ // если класс не подключен
        game.classList.add('режим юзер подключен'); // добавляем класс юзер
        reload();
        }
        else{  // если класс уже есть
        console.log('режим юзер уже подключен');
        reload();
        }
     }
}

// очещает данные о ходах, состоянии выигрыша и очищает игровое поле
function reload(){
        for(var cell of cells){
            cell.style.backgroundColor = 'darkcyan';
            if(cell.classList.contains('checked')){
               cell.classList.remove('checked');
                console.log('checked отключен');
          }
        }
    redWinner = '';
    blueWinner = '';
    result = false;
    num = 0;
    indexMas = ['1','2','3','4','5','6','7','8','9'];
    allChecked = 0;
    textResult.value = 'Результат';
}

