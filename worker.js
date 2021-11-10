
var BreakException = {}
currentSudoku = {}
template = {}
currentCan = {}

easySudoku = {
    11: 1,
    12: 8,
    13: 5,
    21: 9,
    22: 7,
    23: 3,
    25: 8,
    27: 6,
    28: 4,
    36: 3,
    38: 7,
    39: 8,
    41: 6,
    42: 9,
    44: 4,
    48: 5,
    49: 3,
    51: 8,
    52: 4,
    56: 1,
    58: 6,
    62: 3,
    64: 6,
    69: 1,
    71: 3,
    73: 4,
    74: 8,
    77: 2,
    81: 2,
    82: 5,
    85: 6,
    89: 7,
    91: 7,
    92: 6,
    94: 2,
    95: 1
}

mediumSudoku = {
    13: 2,
    14: 5,
    16: 4,
    18: 6,
    21: 6,
    25: 3,
    29: 9,
    32: 8,
    34: 9,
    39: 5,
    41: 8,
    44: 2,
    47: 5,
    48: 1,
    52: 7,
    54: 3,
    57: 9,
    65: 5,
    66: 1,
    68: 8,
    73: 6,
    75: 1,
    76: 5,
    79: 4,
    81: 5,
    82: 9,
    87: 6,
    91: 2,
    95: 9,
    99: 1
}

hardSudoku = {
    15: 2,
    16: 4,
    17: 6,
    21: 6,
    22: 9,
    29: 8,
    31: 7,
    33: 4,
    35: 6,
    43: 1,
    44: 7,
    46: 3,
    51: 2,
    52: 8,
    58: 3,
    59: 7,
    61: 4,
    64: 2,
    67: 1,
    77: 5,
    79: 9,
    82: 4,
    86: 2,
    91: 5,
    93: 2,
    94: 1,
    98: 8

}

veryHardSudoku = {
    12: 1,
    17: 2,
    22: 7,
    24: 1,
    35: 6,
    37: 5,
    44: 2,
    48: 8,
    51: 4,
    52: 3,
    59: 2,
    63: 2,
    64: 9,
    66: 3,
    69: 7,
    71: 7,
    74: 3,
    76: 9,
    83: 4,
    88: 9,
    89: 5,
    91: 5,
    95: 8,
    98: 6
}

veryHardSudoku2 = {
    11: 1,
    13: 4,
    19: 2,
    21: 9,
    23: 2,
    26: 7,
    27: 8,
    37: 1,
    38: 5,
    44: 9,
    45: 3,
    46: 6,
    48: 2,
    52: 9,
    54: 1,
    59: 6,
    61: 8,
    68: 4,
    72: 4,
    75: 8,
    76: 9,
    83: 6,
    84: 4,
    99: 3
}

expert = {
    13: 4,
    14: 6,
    17: 3,
    23: 9,
    24: 4,
    25: 3,
    26: 2,
    32: 8,
    39: 5,
    46: 5,
    49: 7,
    55: 2,
    57: 8,
    62: 9,
    68: 1,
    71: 1,
    82: 5,
    84: 7,
    88: 8,
    89: 9,
    93: 3,
    96: 6
}

getRowIDs = (id) => {
    var toReturn = []
    Object.keys(currentSudoku).forEach(key => {
        if (key.toString()[1] == id.toString()[1]) toReturn.push(key)
    })
    return toReturn
}
getNumbersOnRow = (id) => {
    var toReturn = []
    getRowIDs(id).forEach(i => {
        if (currentSudoku[i] != 0) toReturn.push(currentSudoku[i])
    })
    return toReturn
}

getColumnIDs = (id) => {
    var toReturn = []
    Object.keys(currentSudoku).forEach(key => {
        if (key.toString()[0] == id.toString()[0]) toReturn.push(key)
    })
    return toReturn
}
getNumbersOnColumn = (id) => {
    var toReturn = []
    getColumnIDs(id).forEach(i => {
        if (currentSudoku[i] != 0) toReturn.push(currentSudoku[i])
    })
    return toReturn
}

getBoxIDs = (id) => {
    var toReturn = []
    rowRange = id.toString()[1] < 4 ? [1,2,3] : id.toString()[1] > 6 ? [7,8,9] : [4,5,6]
    columnRange = id.toString()[0] < 4 ? [1,2,3] : id.toString()[0] > 6 ? [7,8,9] : [4,5,6]
    Object.keys(currentSudoku).forEach(key => {
        if (rowRange.includes(parseInt(key.toString()[1])) && columnRange.includes(parseInt(key.toString()[0]))) toReturn.push(key)
    })
    return toReturn
}
getNumbersOnBox = (id) => {
    var toReturn = []
    getBoxIDs(id).forEach(i => {
        if (currentSudoku[i] != 0) toReturn.push(currentSudoku[i])
    })
    return toReturn
}

loadSudoku = (toLoad) => {
    data = {}
    for (i = 11; i < 100; i++){
        if (i % 10 == 0) continue
        data[i] = 0;
    }
    Object.keys(toLoad).forEach(key => {
        data[key] = toLoad[key]
    })
    currentSudoku = data
}

drawSudoku = (toDraw = currentSudoku) => {
    console.log("DRAWING SUDOKU")
    console.log(
        "" + toDraw[19] + toDraw[29] + toDraw[39] + "|" + toDraw[49] + toDraw[59] + toDraw[69] + "|" + toDraw[79] + toDraw[89] + toDraw[99] + "\n" +
        "" + toDraw[18] + toDraw[28] + toDraw[38] + "|" + toDraw[48] + toDraw[58] + toDraw[68] + "|" + toDraw[78] + toDraw[88] + toDraw[98] + "\n" +
        "" + toDraw[17] + toDraw[27] + toDraw[37] + "|" + toDraw[47] + toDraw[57] + toDraw[67] + "|" + toDraw[77] + toDraw[87] + toDraw[97] + "\n" +
        "" + "-----------" + "\n" +
        "" + toDraw[16] + toDraw[26] + toDraw[36] + "|" + toDraw[46] + toDraw[56] + toDraw[66] + "|" + toDraw[76] + toDraw[86] + toDraw[96] + "\n" +
        "" + toDraw[15] + toDraw[25] + toDraw[35] + "|" + toDraw[45] + toDraw[55] + toDraw[65] + "|" + toDraw[75] + toDraw[85] + toDraw[95] + "\n" +
        "" + toDraw[14] + toDraw[24] + toDraw[34] + "|" + toDraw[44] + toDraw[54] + toDraw[64] + "|" + toDraw[74] + toDraw[84] + toDraw[94] + "\n" +
        "" + "-----------" + "\n" +
        "" + toDraw[13] + toDraw[23] + toDraw[33] + "|" + toDraw[43] + toDraw[53] + toDraw[63] + "|" + toDraw[73] + toDraw[83] + toDraw[93] + "\n" +
        "" + toDraw[12] + toDraw[22] + toDraw[32] + "|" + toDraw[42] + toDraw[52] + toDraw[62] + "|" + toDraw[72] + toDraw[82] + toDraw[92] + "\n" +
        "" + toDraw[11] + toDraw[21] + toDraw[31] + "|" + toDraw[41] + toDraw[51] + toDraw[61] + "|" + toDraw[71] + toDraw[81] + toDraw[91] + "\n"
    )

    // console.log(currentSudoku)
}

drawSudoku2 = (toDraw = currentSudoku) => {
    console.log("\nDRAWING SUDOKU")
    var orderIds = []
    for (i = 9; i > 0; i--){
        getRowIDs(parseInt("1"+i.toString())).forEach(id => {orderIds.push(id)})
    }
    // console.log(orderIds)
    stringToWrite = ""
    counter = 0;
    orderIds.forEach(id => {
        columnNumber = parseInt(id.toString()[0])
        if (counter != 0 && counter % 9 == 0) stringToWrite += "\n";
        if (counter == 27 || counter == 54) stringToWrite += "-----------------------------\n";
        if (columnNumber == 4 || columnNumber == 7) {
            stringToWrite += "|";
            // console.log(parseInt(id.toString()[0]))
        }

        if (template[id]){
            stringToWrite += " " + toDraw[id] + "'"
        }
        else {
            stringToWrite += " " + (toDraw[id] ? toDraw[id] : ".") + " "
        }

        counter++;
    })
    console.log(stringToWrite)
}

placeNumber = (id, number) => {
    currentSudoku[id] = number
    // console.log("" + id + " = " + (currentCan[id] ? currentCan[id] : "gone"))
    delete currentCan[id]
    // console.log("" + id + " = " + (currentCan[id] ? currentCan[id] : "gone"))
    // console.log("Found: " + id + " was: " + number)
}

checkIfSolved = (toPrint = false) => {
    total = 0;
    Object.keys(currentSudoku).forEach(key => {
        total += currentSudoku[key]
    })
    if (toPrint){
        console.log(""+total + " / " + 405)
        for (i = 1; i < 10; i++) {
            rowVal = getNumbersOnRow(parseInt("1" + i.toString())).reduce((a, b) => a + b, 0)
            rowVal == 45 ? null : console.log("row " + i + ":\t\t" + rowVal + " / " + 45)
            columnVal = getNumbersOnColumn(parseInt(i.toString() + "1")).reduce((a, b) => a + b, 0)
            columnVal == 45 ? null : console.log("column " + i + ":\t" + columnVal + " / " + 45)
        }
    }

    if (total == 405) return true;
    else return false;
}

checkIfNumbersAreCorrect = (sudoku = currentSudoku) => {
    Object.keys(sudoku).forEach(key => {
        if (getNumbersOnRow(key).includes(sudoku[key])) return false
        else if (getNumbersOnColumn(key).includes(sudoku[key])) return false
        else if (getNumbersOnBox(key).includes(sudoku[key])) return false
    })
    return true
}

solveCan1 = () => { //if field only have 1 candidate
    var foundANumber = false;
    Object.keys(currentCan).forEach(key => {
        //we might need a way to break after we found a number
        if (!foundANumber) {
            if (currentCan[key].length == 1){
                placeNumber(key, currentCan[key][0])
                foundANumber = true;
            }
        }
    })
    return foundANumber
}

solveRows = () => { //if the row only have 1 field with a specific candidate
    var foundANumber = false;
    for (ii = 1; ii < 10; ii++) {
        rowId = parseInt("1" + ii.toString())
        if (foundANumber) break;
        ids = getRowIDs(rowId)
        for (i = 1; i < 10; i++){
            if (foundANumber) break;
            foundAt = null;
            timesFound = 0;
            ids.forEach(id => {
                if (currentCan[id] && currentCan[id].includes(i)){
                    timesFound++;
                    foundAt = id;
                }
            })
            if (timesFound == 1){
                // console.log("we only have one of: " + i + " at " + foundAt)
                placeNumber(foundAt, i);
                foundANumber = true;
            }
        }
    }
    return foundANumber
}

solveColumns = () => { //if the column only have 1 field with a specific candidate
    var foundANumber = false;
    for (ii = 1; ii < 10; ii++) {
        columnId = parseInt(ii.toString() + "1")
        if (foundANumber) break;
        ids = getColumnIDs(columnId)
        for (i = 1; i < 10; i++){
            if (foundANumber) break;
            foundAt = null;
            timesFound = 0;
            ids.forEach(id => {
                if (currentCan[id] && currentCan[id].includes(i)){
                    timesFound++;
                    foundAt = id;
                }
            })
            if (timesFound == 1){
                // console.log("we only have one of: " + i + " at " + foundAt)
                placeNumber(foundAt, i);
                foundANumber = true;
            }
        }
    }
    return foundANumber
}

solveSquares = () => {
    var foundANumber = false;
    for (ii = 1; ii < 10; ii++) {
        boxId = 
        ii == 1 ? 22 :
        ii == 2 ? 52 :
        ii == 3 ? 72 :
        ii == 4 ? 25 :
        ii == 5 ? 55 :
        ii == 6 ? 75 :
        ii == 7 ? 27 :
        ii == 8 ? 57 :
        ii == 9 ? 77 : 0
        if (foundANumber) break;
        ids = getBoxIDs(boxId)
        for (i = 1; i < 10; i++){
            if (foundANumber) break;
            foundAt = null;
            timesFound = 0;
            ids.forEach(id => {
                if (currentCan[id] && currentCan[id].includes(i)){
                    timesFound++;
                    foundAt = id;
                }
            })
            if (timesFound == 1){
                // console.log("we only have one of: " + i + " at " + foundAt)
                placeNumber(foundAt, i);
                foundANumber = true;
            }
        }
    }
    return foundANumber
}

guess = (superBackupSudoku, superBackupCan, key, can) => {
    weFoundTheAnswer = false;
    placeNumber(key, can)
    tryToSolve()
    if (checkIfNumbersAreCorrect() && checkIfSolved()) {
        weFoundTheAnswer = true
    }
    else {
        currentCan = {...superBackupCan}
        currentSudoku = {...superBackupSudoku}
    }
    return weFoundTheAnswer
}

guessing = () => { 
    if (typeof grade == "undefined") grade = 1
    maxGrade = 3;

    console.log("\n-------------------------------------------")
    console.log("       NOW WE ARE STARTING TO GUESS        ")
    console.log("-------------------------------------------\n")

    superBackupSudoku = {...currentSudoku}
    superBackupCan = {...currentCan}
    weFoundTheAnswer = false;
    if (typeof weFoundTheAnswer == "undefined") weFoundTheAnswer = false

    calcCan1()
    while (true){
        if (!calcCan2()) break
    }
    Object.keys(currentCan).sort(() => Math.random() - 0.5).forEach(key => {
        if (!weFoundTheAnswer) {
            console.log("gussing of 1. grade: " + key)
            currentCan[key].forEach(can => {
                if (!weFoundTheAnswer){
                    if (grade >= 2){
                        placeNumber(key, can)

                        calcCan1()
                        while (true){
                            if (!calcCan2()) break
                        }
                        console.log("\tgussing of 2. grade: " + key + "=" + can)
                        Object.keys(currentCan).sort(() => Math.random() - 0.5).forEach(key2 => {
                            if (!weFoundTheAnswer){
                                currentCan[key2].forEach(can2 => {
                                    if (!weFoundTheAnswer){
                                        if (grade >= 3){
                                            placeNumber(key2, can2)

                                            calcCan1()
                                            while (true){
                                                if (!calcCan2()) break
                                            }
                                            console.log("\t\tgussing of 3. grade: " + key2 + "=" + can2)
                                            Object.keys(currentCan).sort(() => Math.random() - 0.5).forEach(key3 => {
                                                if (!weFoundTheAnswer){
                                                    currentCan[key3].forEach(can3 => {
                                                        if (!weFoundTheAnswer){
                                                            // console.log("guessed that " + key3 + " is " + can3 + " inside of " + key2 + "=" + can2 + " inside of " + key + "=" + can)
                                                            weFoundTheAnswer = guess({...currentSudoku}, {...currentCan}, key3, can3)
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                        else {
                                            // console.log("guessed that " + key2 + " is " + can2 + " inside of " + key + "=" + can)
                                            weFoundTheAnswer = guess({...currentSudoku}, {...currentCan}, key2, can2)
                                        }
                                    }
                                })
                            }
                        })
                    }
                    else {
                        // console.log("guessed that " + key + " is " + can)
                        weFoundTheAnswer = guess({...currentSudoku}, {...currentCan}, key, can)
                    }
                }
            })
        }
        if (!weFoundTheAnswer){
            currentCan = {...superBackupCan}
            currentSudoku = {...superBackupSudoku}
        }
    })

    // weFoundTheAnswer = guess({...currentSudoku}, {...currentCan})

    if (!weFoundTheAnswer){
        console.log("gussing of " + grade + ". grade didnt find the answer")
        if (grade < maxGrade){
            grade++
            guessing()
        } 
        else {
            //this is the last code run in this method with no success
            currentCan = {...superBackupCan}
            currentSudoku = {...superBackupSudoku}
        }
    } 
    else {
        console.log("gussing of " + grade + ". grade found the answer")
    }
}

calcCan1 = () => {
    currentCan = {}
    Object.keys(currentSudoku).forEach(key => {
        if (currentSudoku[key] == 0){
            posCandidates = []
            for (i = 1; i < 10; i++){
                if (getNumbersOnRow(key).includes(i)) continue
                if (getNumbersOnColumn(key).includes(i)) continue
                if (getNumbersOnBox(key).includes(i)) continue
                posCandidates.push(i)
            }
            currentCan[key] = posCandidates
        }
    })
}

calcCan2 = () => { //look in square, if candidates are on a row or column, all other candidates of that number can be removed
    didAnyThing = false;
    for (ii = 1; ii < 10; ii++) {
        boxId = 
        ii == 1 ? 22 :
        ii == 2 ? 52 :
        ii == 3 ? 82 :
        ii == 4 ? 25 :
        ii == 5 ? 55 :
        ii == 6 ? 85 :
        ii == 7 ? 28 :
        ii == 8 ? 58 :
        ii == 9 ? 88 : 0

        ids = getBoxIDs(boxId)
        for (i = 1; i < 10; i++){
            var numberWasFoundIn = []
            ids.forEach(id => {
                if (currentCan[id] && currentCan[id].includes(i)) numberWasFoundIn.push(id)
            })
            if (numberWasFoundIn.length > 1 && numberWasFoundIn.length <= 3){
                // console.log("number " + i + " was found in: " + numberWasFoundIn)

                rowsNumberWasFound = []
                numberWasFoundIn.forEach(id => {rowsNumberWasFound.push(parseInt(id.toString()[1]))})
                // console.log("number " + i + " was on following rows: " + rowsNumberWasFound + " - " + rowsNumberWasFound)
                // if ((rowsNumberWasFound.reduce((a, b) => a + b, 0) / numberWasFoundIn.length) == rowsNumberWasFound[0]){
                if (rowsNumberWasFound.filter(row => row == rowsNumberWasFound[0]).length == rowsNumberWasFound.length){
                    // console.log("TEST: " + rowsNumberWasFound.filter(row => row == rowsNumberWasFound[0]).length)
                    // console.log("TEST2: " + (rowsNumberWasFound.filter(row => row == rowsNumberWasFound[0]).length == rowsNumberWasFound.length))
                    // console.log("number " + i + " is located on row " + rowsNumberWasFound[0])
                    getRowIDs(numberWasFoundIn[0]).forEach(id =>{
                        if (!numberWasFoundIn.includes(id) && currentCan[id] && currentCan[id].includes(i)){
                            // ----------------------------------------
                            // console.log("removing candidate " + i + " from " + id + " (row)")
                            // ----------------------------------------
                            // console.log("old can: " + currentCan[id])
                            currentCan[id] = currentCan[id].filter(can => can != i)
                            // console.log("new can: " + currentCan[id])
                            i = 1000;
                            ii = 1000;
                            didAnyThing = true;
                        }
                    })
                }

                columnsNumberWasFound = []
                numberWasFoundIn.forEach(id => {columnsNumberWasFound.push(parseInt(id.toString()[0]))})
                // console.log("number " + i + " was on following columns: " + columnsNumberWasFound)
                // if ((columnsNumberWasFound.reduce((a, b) => a + b, 0) / numberWasFoundIn.length) == columnsNumberWasFound[0]){
                if (columnsNumberWasFound.filter(row => row == columnsNumberWasFound[0]).length == columnsNumberWasFound.length){
                    // console.log("" + columnsNumberWasFound.reduce((a, b) => a + b, 0) + " / " + numberWasFoundIn.length + "(= "+columnsNumberWasFound.reduce((a, b) => a + b, 0) / numberWasFoundIn.length+") == " + columnsNumberWasFound[0])
                    // console.log("number " + i + " is located on column " + columnsNumberWasFound[0])
                    getColumnIDs(numberWasFoundIn[0]).forEach(id =>{
                        if (!numberWasFoundIn.includes(id) && currentCan[id] && currentCan[id].includes(i)){
                            // ----------------------------------------
                            // console.log("removing candidate " + i + " from " + id + " (column)")
                            // ----------------------------------------
                            // console.log("old can: " + currentCan[id])
                            currentCan[id] = currentCan[id].filter(can => can != i)
                            // console.log("new can: " + currentCan[id])
                            i = 1000;
                            ii = 1000;
                            didAnyThing = true;
                        }
                    })
                }
            }
        }
    }
    return didAnyThing
}

tryToSolve = () => {
    numbersFoundBySolveCan1 = 0;
    numbersFoundBySolveRows = 0;
    numbersFoundBySolveColumns = 0;
    numbersFoundBySolveSquares = 0;
    toBreak = false
    while (true){
        if (toBreak) break;
        calcCan1()
        while (true){
            if (!calcCan2()) break
        }
        solveCan1() ? numbersFoundBySolveCan1++ : 
        solveRows() ? numbersFoundBySolveRows++ : 
        solveColumns() ? numbersFoundBySolveColumns++ : 
        solveSquares() ? numbersFoundBySolveSquares++ : 
        true ? toBreak = true : null
    }
}

function msToTime(s) {

    // Pad to 2 or 3 digits, default is 2
    function pad(n, z) {
        z = z || 2;
        return ('00' + n).slice(-z);
    }

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
}

startTime = new Date();
template = expert
loadSudoku(template)
drawSudoku2()

numbersFoundBySolveCan1 = 0;
numbersFoundBySolveRows = 0;
numbersFoundBySolveColumns = 0;
numbersFoundBySolveSquares = 0;
done = false;
maxTries = 5;
currentTries = 0;
while (!done){
    if (currentTries >= maxTries) break;
    tryToSolve()
    currentTries++
}

if (checkIfSolved()){
    done = true
    currentTries = 0
}

if (!done) {
    drawSudoku2()
    guessing()
}

drawSudoku2()

if (false){//show stats
    console.log("\nFOUND")
    console.log("-----------------")
    console.log("SolveCan1:\t" + numbersFoundBySolveCan1)
    console.log("SolveRows:\t" + numbersFoundBySolveRows)
    console.log("SolveColumns:\t" + numbersFoundBySolveColumns)
    console.log("SolveSquares:\t" + numbersFoundBySolveSquares)
    console.log("-----------------")
    console.log("InTotal:\t" + (numbersFoundBySolveCan1 + numbersFoundBySolveRows + numbersFoundBySolveColumns + numbersFoundBySolveSquares) + "\n")
}

checkIfSolved(true)

endTime = new Date()
console.log("Finished in: " + msToTime(endTime - startTime))
