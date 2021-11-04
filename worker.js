
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
    delete currentCan[id]
    // console.log("Found: " + id + " was: " + number)
}

checkIfSolved = () => {
    total = 0;
    Object.keys(currentSudoku).forEach(key => {
        total += currentSudoku[key]
    })
    console.log(""+total + " / " + 405)

    for (i = 1; i < 10; i++) {
        rowVal = getNumbersOnRow(parseInt("1" + i.toString())).reduce((a, b) => a + b, 0)
        rowVal == 45 ? null : console.log("row " + i + ":\t\t" + rowVal + " / " + 45)
        columnVal = getNumbersOnColumn(parseInt(i.toString() + "1")).reduce((a, b) => a + b, 0)
        columnVal == 45 ? null : console.log("column " + i + ":\t" + columnVal + " / " + 45)
    }
}

solveCan1 = () => { //if field only have 1 candidate
    var foundANumber = false;
    try {
        Object.keys(currentCan).forEach(key => {
            if (foundANumber) throw BreakException;
            if (currentCan[key].length == 1){
                // currentSudoku[key] = currentCan[key][0]

                // delete currentCan[key]
                // console.log("Found: " + key + " was: " + currentSudoku[key])
                placeNumber(key, currentCan[key][0])
                foundANumber = true;
            }
        })
    } catch (e) {
        if (e !== BreakException) throw e;
    }
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

calcCan1 = () => {
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
    //if it removed some candidates, run itself again
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

        ids = getBoxIDs(boxId)
        for (i = 1; i < 10; i++){
            var numberWasFoundIn = []
            ids.forEach(id => {
                if (currentCan[id] && currentCan[id].includes(i)) numberWasFoundIn.push(id)
            })
            if (numberWasFoundIn.length > 0 && numberWasFoundIn.length <= 3){
                // console.log("number " + i + " was found in: " + numberWasFoundIn)

                rowsNumberWasFound = []
                numberWasFoundIn.forEach(id => {rowsNumberWasFound.push(parseInt(id.toString()[1]))})
                // console.log("number " + i + " was on following rows: " + rowsNumberWasFound + " - " + rowsNumberWasFound)
                if (rowsNumberWasFound.reduce((a, b) => a + b, 0) / numberWasFoundIn.length == rowsNumberWasFound[0]){
                    // console.log("number " + i + " is located on row " + rowsNumberWasFound[0])
                    getRowIDs(numberWasFoundIn[0]).forEach(id =>{
                        if (!numberWasFoundIn.includes(id) && currentCan[id] && currentCan[id].includes(i)){
                            console.log("removing candidate " + i + " from " + id)
                            // console.log("old can: " + currentCan[id])
                            currentCan[id] = currentCan[id].filter(can => can != i)
                            // console.log("new can: " + currentCan[id])
                            calcCan2()
                        }
                    })
                }

                columnsNumberWasFound = []
                numberWasFoundIn.forEach(id => {columnsNumberWasFound.push(parseInt(id.toString()[0]))})
                // console.log("number " + i + " was on following columns: " + columnsNumberWasFound)
                if (columnsNumberWasFound.reduce((a, b) => a + b, 0) / numberWasFoundIn.length == columnsNumberWasFound[0]){
                    // console.log("number " + i + " is located on column " + columnsNumberWasFound[0])
                    getColumnIDs(numberWasFoundIn[0]).forEach(id =>{
                        if (!numberWasFoundIn.includes(id) && currentCan[id] && currentCan[id].includes(i)){
                            console.log("removing candidate " + i + " from " + id)
                            // console.log("old can: " + currentCan[id])
                            currentCan[id] = currentCan[id].filter(can => can != i)
                            // console.log("new can: " + currentCan[id])
                            calcCan2()
                        }
                    })
                }
            }
        }
    }
    return false
}

template = hardSudoku
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
    calcCan1()
    calcCan2()
    solveCan1() ? numbersFoundBySolveCan1++ : 
    solveRows() ? numbersFoundBySolveRows++ : 
    solveColumns() ? numbersFoundBySolveColumns++ : 
    solveSquares() ? numbersFoundBySolveSquares++ : 
    true ? currentTries++ : null
}

drawSudoku2()

if (true){//show stats
    console.log("\nFOUND")
    console.log("-----------------")
    console.log("SolveCan1:\t\t" + numbersFoundBySolveCan1)
    console.log("SolveRows:\t\t" + numbersFoundBySolveRows)
    console.log("SolveColumns:\t" + numbersFoundBySolveColumns)
    console.log("SolveSquares:\t" + numbersFoundBySolveSquares)
    console.log("-----------------")
    console.log("InTotal:\t\t" + (numbersFoundBySolveCan1 + numbersFoundBySolveRows + numbersFoundBySolveColumns + numbersFoundBySolveSquares) + "\n")
}

checkIfSolved()

// calcCan2()

// getBoxIDs(75).forEach(id => {currentCan[id] ? console.log(id + ": " + currentCan[id]) : null})
// console.log(currentCan)