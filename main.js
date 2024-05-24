const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const directions = ['up', 'down', 'right', 'left'];
let exitGame = false;
let playPosX = 0;
let playPosY = 0;


// Field class, defines a field and holds where the user in in field with x and y coordinates
class Field {
    constructor(field) {
        this.field = field,
        this.x = 0,
        this.y = 0
    }
    printField() {
        this.field.map((line) => {
            console.log(line.join())
        } )
        
    }
}


//Example of field for testing

const field = new Field ([
    [pathCharacter, fieldCharacter, fieldCharacter],
    [fieldCharacter, fieldCharacter, hole],
    [fieldCharacter, fieldCharacter, hat]
])
field.printField();



const checkOutOfBounds = (playPosX, playPosY) => {
    if (playPosY < 0 || playPosX < 0) {
        return true;
    } else if (playPosY >= field.field.length) {
        return true;
    } else if (playPosX >= field.field[0].length){
        return true;
        }
}

//Loop to control game
while (!exitGame) {

    let move = prompt('Make you move: ').toLowerCase();

    if (directions.includes(move)) {
        //Logic to determine where the player moves on the grid
        switch(move) {
            case 'up': 
                playPosY -= 1;
                break;
            case 'down':
                playPosY += 1;
                break;
            case 'left':
                playPosX -=1;
                break;
            case 'right':
                playPosX +=1;
                break;

        }
        if (checkOutOfBounds(playPosX, playPosY)) {
            console.log('You are out of bounds! Game over')
            exitGame = true;
            break;
        }
       
        console.log(field.field[playPosY][playPosX])
        if (field.field[playPosY][playPosX] === hole) {
            console.log('You fell down a hole! - Game over')
            exitGame = true;
            break;

        } else if (field.field[playPosY][playPosX] === hat) {
            console.log('Congratulations! You found your hat! You win!')
            exitGame = true;
            break;
        }
 
        field.field[playPosY][playPosX] = pathCharacter;
        field.printField();
    }
    else {
        console.log('Choose one of the following directions: up, down, left, right');
        ;
    }


}
