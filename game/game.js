const MAX_ATTEMPTS = 10;

let currentColor = 0;
let colorTable = ['purple', 'red', 'blue', 'green', 'white'];

let answerInput = [' ', ' ', ' ', ' '];
const password = ['red', 'green', 'blue', 'green'];

let correctPos = 0;
let correctColor = 0;

let currentRow = 1;

/**
 * This method changes color of each button of each attempt
 * 
 * @param {*} elementId 
 * 
 * @author Arthur Zuliani
 * @since 20220223
 */
function changeColor(elementId) {

    //Detect element position in the game
    let colIndex = 0;

    if(elementId.length < 5) {
        colIndex = Number(elementId.substring(3, 4) - 1);
    } else {
        colIndex = Number(elementId.substring(4, 5) - 1);
    } 

    //Detects the current color of the button
    switch (answerInput[colIndex]) {
        case 'purple':
            currentColor = 0;
            break;
        case 'red':
            currentColor = 1;
            break;
        case 'blue':
            currentColor = 2;
            break;
        case 'green':
            currentColor = 3;
            break;
        case 'white':
            currentColor = 4;
            break;
        default:
            currentColor = 4;
            break;
    }

    //Change the color
    currentColor += 1;

    //Ensures that colors change within the limits
    if (currentColor > colorTable.length - 1) {
        currentColor = 0;
    }

    //Save input answer
    answerInput[colIndex] = colorTable[currentColor];
    //Change button background color
    document.getElementById(elementId).style.backgroundColor = answerInput[colIndex];

}

/**
 * This method verifies if the input answer is correct (position and colors)
 * If position & color are correct, it will increment correctPos
 * if just the guessed color is correct, it will increment correctColor
 *
 * @author Arthur Zuliani
 * @since 20220223
 */
function checkAnswer() {

    let bufInput = answerInput.map((x) => x);
    let bufPass = password.map((x) => x);

    correctColor = 0;
    correctPos = 0;
    let passMatch = true;

    console.log('----------- Before checking --------------');
    console.log('Ans    ' + answerInput);
    console.log('BufAns ' + bufInput);
    console.log('BufPas ' + bufPass);
    console.log('Pas    ' + password);
    console.log('-------------------------');

    //First check if the colors are in the right position
    for (let i = 0; i < password.length; i++) {

        if (password[i].valueOf() == answerInput[i].valueOf()) {

            bufInput[i] = ' ';
            bufPass[i] = 'checked';
            correctPos++;

        } else {
            passMatch = false;
        }
    }

    console.log('----------- After checking --------------');
    console.log('Ans    ' + answerInput);
    console.log('BufAns ' + bufInput);
    console.log('BufPas ' + bufPass);
    console.log('Pas    ' + password);
    console.log('-------------------------');

    //Check how many colors are correct in input answer
    for (let i = 0; i < password.length; i++) {

        //Debug info
        //console.log('i(' + i + ') ' + bufInput);
        for (let j = 0; j < bufInput.length; j++) {

            if (bufPass[i].valueOf() === bufInput[j].valueOf()) {

                let index = bufInput.indexOf(bufPass[i].valueOf());
                bufInput[index] = ' ';

                correctColor++;
                break;
            }
        }
        //console.log('Color #: ' + correctColor + ' Pos #: ' + correctPos);
    }

    //Debug info
    console.log('final value: ' + bufInput);
    console.log(`row count (${currentRow})`);

    if (passMatch) {
        alert('You won!!!');
        location.reload();
    } else {
        //Change the color of tip circles
        changeTipColor();
        
        //Lock previous row buttons
        lockButtons();
        
        //Change for the next attempt (row)
        currentRow++;

        if (currentRow <= MAX_ATTEMPTS) {
            document.getElementById('row' + currentRow).style.display = 'flex';
            answerInput = ['white', 'white', 'white', 'white'];
            //createNewRow();
        } else {
            alert('Game over!!!');
            alert(password);
        }
    }
}

/**
 * This method change the background color of the answer tip
 * Green - when there is a correct color in the game
 * Black - when there is a correct color in the correct spot (overwrite the green)
 *
 * @author Arthur Zuliani
 * @since 20220223
 */
function changeTipColor() {

    for (let i = 0; i < password.length; i++) {
        let elementId = 'ar' + currentRow + 'c' + (i + 1);
        console.log(elementId);

        if (correctPos > 0) {
            correctPos--;
            document.getElementById(elementId).style.backgroundColor = 'black';
        } else if (correctColor > 0) {
            correctColor--;
            document.getElementById(elementId).style.backgroundColor = 'yellow';
        } else {
            document.getElementById(elementId).style.backgroundColor = 'white';
        }
    }

}

/**
 * This function disable all buttons for the current row (preventing any alteration of the entered answer
 *
 * @author Arthur Zuliani
 * @since 20220223
 */
function lockButtons() {

    for (let i = 0; i < password.length; i++) {
        let elementId = 'r' + currentRow + 'c' + (i + 1);
        document.getElementById(elementId).disabled = true;
    }

    document.getElementById('buttonRow' + currentRow).style.display = 'none';
}

/**
 * This function generates the password randomically
 * 
 * @author Arthur Zuliani
 * @since 20220223
 */
function passGenerator() {

    for (let i = 0; i < password.length; i++) {
        let currentDigit = getRndInteger(0,4);

        switch (currentDigit) {
            case 0:
                password[i] = 'purple';
                break;
            case 1:
                password[i] = 'red';
                break;
            case 2:
                password[i] = 'blue';
                break;
            case 3:
                password[i] = 'green';
                break;
            case 4:
                password[i] = 'white';
                break;
        }
    }

    console.log(password);
}

/**
 * This function generates a number randomically
 * 
 * @param min
 * @param max
 * 
 * @author Arthur Zuliani
 * @since 20220223
 */
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
