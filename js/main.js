/*
File: main.js
GUI Assignment: HW3 Multiplication Table for 4610
Shawn MacFarland, UMass Lowell Computer Science, shawn_macfarland@student.uml.edu
Copyright (c) 2023 by Shawn MacFarland. All rights reserved. All uses, copies, excerpts
are reaserved exclusively for the author. May not be reused in anyway or cited in anyway 
without author's explicit permission.
created by SM 2023-06-15 07:17PM
Instructor: Professor Wenjin Zhou
Overview: Contains code for input validation and table gneratioon
*/

// Warning Color Toggles
var colorHide = "#8ecae6";
var colorWarn = "#FFB703";
var colorNotice = "#FB8500";

const btn = document.getElementById("generate");

btn.addEventListener('click', Generate);

function Validate() {

    // Get the Form Fields
    const mincol = document.getElementById("mincol");
    const maxcol = document.getElementById("maxcol");
    const minrow = document.getElementById("minrow");
    const maxrow = document.getElementById("maxrow");

    // Get the Field Error Messages
    const mincol_message = document.getElementById("mincol_msg");
    const maxcol_message = document.getElementById("maxcol_msg");
    const minrow_message = document.getElementById("minrow_msg");
    const maxrow_message = document.getElementById("maxrow_msg");
    const error_message = document.getElementById("error_msg");

    // Field Error Message Strings
    let mincol_error = '';
    let maxcol_error = '';
    let minrow_error = '';
    let maxrow_error = '';

    let controlArray = new Array();
    controlArray[0] = [mincol, mincol_message, mincol_error];
    controlArray[1] = [maxcol, maxcol_message, maxcol_error];
    controlArray[2] = [minrow, minrow_message, minrow_error];
    controlArray[3] = [maxrow, maxrow_message, maxrow_error];

    let errors = false;
    for (let i = 0; i < controlArray.length; i++) {
        resetWarning(controlArray[i]);
        if (!checkValue(controlArray[i]) ) errors=true;
        if ( (i == 1) || (i == 3) ) {
            if (!checkBounds(controlArray[i-1],controlArray[i]) ) {
                let swap = controlArray[i][0].value;
                controlArray[i][0].value = controlArray[i-1][0].value;
                controlArray[i-1][0].value= swap;
            }	
            SetError(controlArray[i-1]);
            SetError(controlArray[i]);
        }
    }

    // Handle Warning Notice
    //Reset Warning Notice
    error_message.innerHTML = "";
    error_message.style.backgroundColor = colorHide;

    if (errors) {
        let textNode = document.createTextNode("⚠ Input Warnings");
        error_message.appendChild(textNode);
        error_message.style.backgroundColor = colorNotice;
        return false;
    } else {
        return true;
    }
}

// Erase Previous Error Message and reset color
function resetWarning(control){
    control[1].innerHTML = control[2];
    control[1].style.backgroundColor = colorHide;
}

//Check Inputs for valid entry
function checkValue(control){
    let err_noValue = "Please enter an integer from -50 to 50";
    if ((control[0].value.length == 0) || !IsIntInRange(control[0].value)) {
        control[2] += err_noValue;   
        return false;
    }
    return true;
}

// Tests the string by constructing a number and checking range 
function IsIntInRange(value) {
    const num = Number(value);
    if (isNaN(num)) {
        return false;
    }
    if (!Number.isInteger(num)) {
        return false;
    } 
    if ( (num < -50) || (num > 50) ) {
        return false
    }
    return true;
}

// Check max > min
function checkBounds (min, max) {
    let err_Bounds = "Min exceeds Max. Values have been swapped in use.";
    if ( (min[2].length == 0) && (max[2].length == 0) && (Number(min[0].value) > Number(max[0].value)) ) {
        min[2] += err_Bounds;
        max[2] += err_Bounds;
        return false;
    }
    return true;
 }

// Tests if Errors have been found and then adds them with warning color
function SetError(control) {
    if (control[2].length > 0) {
        let textNode = document.createTextNode(control[2]);
        control[1].appendChild(textNode);
        control[1].style.backgroundColor = colorWarn;
    } 
}

function Generate() {

    //Grab and Reset outputTitle and output
    const outputTitle =document.getElementById("outputTitle")
    outputTitle.innerHTML="";
    const output = document.getElementById("output");
    output.innerHTML="";

    if (Validate()) {
        // Get the Form Fields
        const mincol = document.getElementById("mincol");
        const maxcol = document.getElementById("maxcol");
        const minrow = document.getElementById("minrow");
        const maxrow = document.getElementById("maxrow");

        //Create non-scrollable title
        const header = document.createElement('h1');
        header.appendChild(document.createTextNode("Multiplication Table"));
        outputTitle.appendChild(header);

        //Create Table with validated bounds
        const table = document.createElement('table');
        output.appendChild(table);
        min_col = Number(mincol.value);
        max_col = Number(maxcol.value);
        min_row = Number(minrow.value);
        max_row = Number(maxrow.value);
        for (let row = min_row-1; row < max_row+1; row++) {
            const current_row = document.createElement('tr');
            for (let col = min_col-1; col < max_col+1; col++) {
                const cell = document.createElement('td');
				if (row == (min_row-1) )  {
					if (col == (min_col-1)) {
                    } else {
                        cell.appendChild(document.createTextNode(col));
                    }
                } else {
                    if (col == min_col-1) {
                        cell.appendChild(document.createTextNode(row));
                    } else {
                        cell.appendChild(document.createTextNode(row*col));
                    }
                }
				current_row.appendChild(cell);
            }
        table.appendChild(current_row);
        }
    }
}