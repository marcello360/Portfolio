/*
 * Name: Nick VerMulm
 * Date: 10.12.22
 * Code: Javascript page that runs the 
         password generation functions
*/
var GEN = {
	
	//Load function to get user inputs 
    load: function()
    {
        this.pass = document.getElementById('password');
        this.linput = document.getElementById('length-input');
        this.einput = document.getElementById('effort-input');
        this.error = document.getElementById('error');
        this.eoutput = document.getElementById('effort-output');
        var self = this;
    },
	
	//Click function runs the generate function after 0 seconds
    clk: function()
    {
        var t = setTimeout(GEN.gen(), 0);
    },
	
	//Generate function runs algorithm to generate password
    gen: function()
    {
		//Resets error message on reload
		this.error.innerHTML = "";
		
		//Declares variables for the function
        var pool, shiftMap, keyData, password, i, effortCache, keys, numTriads, totalEffort,
            c1, c2, c3, triad, pHand, row1, row2, row3, drMaxAbs, drMax, pRow, finger1, finger2,
            finger3, pFinger;

        //String of 83 characters used to generate the password
        pool = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz123456789!@#$%^&*()-=[];,./_+{}:<>?';
		
        //Remaps characters if a shift key is pressed. ~ = left, | = right.
        shiftMap = {
            '!': '~1', '@': '~2', '#': '~3', '$': '~4', '%': '~5', '^': '~6', '&': '|7', '*': '|8',
            '(': '|9', ')': '|0', '_': '|-', '+': '|=', 'Q': '~q', 'W': '~w', 'E': '~e', 'R': '~r',
            'T': '~t', 'Y': '|y', 'U': '|u', 'P': '|p', '{': '|[', '}': '|]', 'A': '~a', 'S': '~s',
            'D': '~d', 'F': '~f', 'G': '~g', 'H': '|h', 'J': '|j', 'K': '|k', 'L': '|l', ':': '|;',
            'Z': '~z', 'X': '~x', 'C': '~c', 'V': '~v', 'B': '~b', 'N': '|n', 'M': '|m', '<': '|,',
            '>': '|.', '?': '|/'
        };
		
        //Nested arrays define preset data for each key. (distance, penalty, hand, row, finger).
        keyData = {
            '1': [5,   3.2606, 0, 0, 1], '2': [4,   3.2606, 0, 0, 1], '3': [4,   1.9632, 0, 0, 2],
            '4': [4,   1.9632, 0, 0, 2], '5': [4,   1.9632, 0, 0, 3], '6': [4.5, 1.9632, 0, 0, 3],
            '7': [4,   1.9632, 1, 0, 6], '8': [4,   1.9632, 1, 0, 7], '9': [4,   1.9632, 1, 0, 7],
            '0': [4,   3.2606, 1, 0, 8], '-': [4.5, 4.558,  1, 0, 8], '=': [5.5, 4.558,  1, 0, 8],
            'q': [2,   3.2492, 0, 1, 1], 'w': [2,   1.9518, 0, 1, 1], 'e': [2,   0.6544, 0, 1, 2],
            'r': [2,   0.6544, 0, 1, 3], 't': [2.5, 0.6544, 0, 1, 3], 'y': [3,   0.6544, 1, 1, 6],
            'u': [2,   0.6544, 1, 1, 6], 'i': [2,   0.6544, 1, 1, 7], 'p': [2,   3.2492, 1, 1, 9],
            '[': [2.5, 3.2492, 1, 1, 9], ']': [4,   3.2492, 1, 1, 9], 'a': [0,   2.5948, 0, 2, 0],
            's': [0,   1.2974, 0, 2, 1], 'd': [0,   0,      0, 2, 2], 'f': [0,   0,      0, 2, 3],
            'g': [2,   0,      0, 2, 3], 'h': [2,   0,      1, 2, 6], 'j': [0,   0,      1, 2, 6],
            'k': [0,   0,      1, 2, 7], 'l': [0,   1.2974, 1, 2, 8], ';': [0,   2.5948, 1, 2, 9],
            'z': [2,   3.9036, 0, 3, 0], 'x': [2,   2.6062, 0, 3, 1], 'c': [2,   1.3088, 0, 3, 2],
            'v': [2,   1.3088, 0, 3, 3], 'b': [3.5, 1.3088, 0, 3, 3], 'n': [2,   1.3088, 1, 3, 6],
            'm': [2,   1.3088, 1, 3, 6], ',': [2,   1.3088, 1, 3, 7], '.': [2,   2.6062, 1, 3, 8],
            '/': [2,   3.9036, 1, 3, 9], '~': [5,   3.9036, 0, 3, 0], '|': [6,   3.9036, 1, 3, 9]
        };
		
		//Sets length and effort variables; errors when out of bounds
		if (Number(this.linput.value) < Number(8) || Number(this.linput.value) > Number(20)) { 
			length = 8;
			this.error.innerHTML = "ERROR: Length field out of bounds. Defaulted to 8.<br>";
		} else {
			length = this.linput.value;
		}
		if (Number(this.einput.value) < Number(0) || Number(this.einput.value) > Number(15)) { 
			maxEffort = 4;
			this.error.innerHTML += "ERROR: Effort field out of bounds. Defaulted to 2.<br><br>";
		} else {
			maxEffort = Number(this.einput.value) + Number(2);
		}

        //Generates the initial random password.
        password = '';
        for (i = 0; i < length; ++i) {
            password += pool[Math.floor(Math.random() * 83)];
        }

        //Stores triad calculations so they aren't recalculated every iteration
        effortCache = {};
		
		//Do-While loop that updates password every iteration
		// until it meets the desired parameters
        do {
			
            //Replaces a random character in the password
            i = Math.floor(Math.random() * length);
            password = password.substr(0, i) +
                pool[Math.floor(Math.random() * 83)] +
                password.substr(i + 1);

            //Translates every key that requires a shipt
            keys = '';
            for (i = 0; i < length; ++i) {
                keys += shiftMap[password[i]] !== undefined ? shiftMap[password[i]] : password[i];
            }

            //Gets the total number of triads
            numTriads = keys.length - 2;
			
            //Presets the password effort value
            totalEffort = 0;
			
			//For loop that calculates the effort value
            for (i = 0; i < numTriads; ++i) {
				
				//Builds the triad
                c1 = keys[i];
                c2 = keys[i + 1];
                c3 = keys[i + 2];
                triad = c1 + c2 + c3;
				
				//Skips iteration if the triad value has already been calculated
                if (effortCache[triad] !== undefined) {
                    totalEffort += effortCache[triad];
                    continue;
                }

                //Base penalties for each key
                triadEffort  = 0.3555 * keyData[c1][0] *
                    (1 + 0.367 * keyData[c2][0] * (1 + 0.235 * keyData[c3][0]));
                triadEffort += 0.6423 * keyData[c1][1] *
                    (1 + 0.367 * keyData[c2][1] * (1 + 0.235 * keyData[c3][1]));

                //Calculates hand penalty
                if (keyData[c1][2] === keyData[c3][2]) {
                    if (keyData[c2][2] === keyData[c3][2]) {
                        pHand = 2;   //Same hand
                    } else {
                        pHand = 1;   //Alternating
                    }
                } else {
                    pHand = 0;       //Both used sequentially
                }

                //Sets row penalty variables
                row1 = keyData[c1][3];
                row2 = keyData[c2][3];
                row3 = keyData[c3][3];
                drMaxAbs = 0;
                drMax = 0;
				
				//Ifs that calculate the row change value (drmax)
				// and the absolute version if it is negative.
                if (Math.abs(row1 - row2) > drMaxAbs) {
                    drMax = row1 - row2;
                    drMaxAbs = Math.abs(drMax);
                }
                if (Math.abs(row1 - row3) > drMaxAbs) {
                    drMax = row1 - row3;
                    drMaxAbs = Math.abs(drMax);
                }
                if (Math.abs(row2 - row3) > drMaxAbs) {
                    drMax = row2 - row3;
                    drMaxAbs = Math.abs(drMax);
                }
				
				//Nested ifs that calculate the row-alternation
				// value for each interaction in the triad
                if (row1 < row2) {
                    if (row3 === row2) {
                        pRow = 1;
                    } else if (row2 < row3) {
                        pRow = 4;
                    } else if (drMaxAbs === 1) {
                        pRow = 3;
                    } else {
                        if (drMax < 0) {
                            pRow = 7;
                        } else {
                            pRow = 5;
                        }
                    }
                } else if (row1 > row2) {
                    if (row3 === row2) {
                        pRow = 2;
                    } else if (row2 > row3) {
                        pRow = 6;
                    } else if (drMaxAbs === 1) {
                        pRow = 3;
                    } else {
                        if (drMax < 0) {
                            pRow = 7;
                        } else {
                            pRow = 5;
                        }
                    }
                } else {
                    if (row2 > row3) {
                        pRow = 2;
                    } else if (row2 < row3) {
                        pRow = 1;
                    } else {
                        pRow = 0;
                    }
                }

                //Finger penalty calculations
                finger1 = keyData[c1][4];
                finger2 = keyData[c2][4];
                finger3 = keyData[c3][4];
				
				//Nested ifs that calculate the finger-alternation
				//value for each interaction in the triad
                if (finger1 > finger2) {
                    if (finger2 > finger3) {
                        pFinger = 0;
                    } else if (finger2 === finger3) {
                        if (c2 === c3) {
                            pFinger = 1;
                        } else {
                            pFinger = 6;
                        }
                    } else if (finger3 === finger1) {
                        pFinger = 4;
                    } else if (finger1 > finger3 && finger3 > finger2) {
                        pFinger = 2;
                    } else {
                        pFinger = 3;
                    }
                } else if (finger1 < finger2) {
                    if (finger2 < finger3) {
                        pFinger = 0;
                    } else if (finger2 === finger3) {
                        if (c2 === c3) {
                            pFinger = 1;
                        } else {
                            pFinger = 6;
                        }
                    } else if (finger3 === finger1) {
                        pFinger = 4;
                    } else if (finger1 < finger3 && finger3 < finger2) {
                        pFinger = 2;
                    } else {
                        pFinger = 3;
                    }
                } else if (finger1 === finger2) {
                    if (finger2 < finger3 || finger3 < finger1) {
                        if (c1 === c2) {
                            pFinger = 1;
                        } else {
                            pFinger = 6;
                        }
                    } else if (finger2 === finger3) {
                        if (c1 !== c2 && c2 !== c3 && c1 !== c3) {
                            pFinger = 7;
                        } else {
                            pFinger = 5;
                        }
                    }
                }

                //Calculates the "stroke path" effort
                triadEffort += 0.4268 * (pHand + 0.3 * pRow + 0.3 * pFinger);
				
				//Adds calculation to the cached list
                effortCache[triad] = triadEffort;
				
				//Adds the triad to the total effort value
                totalEffort += triadEffort;
            }
			
			//After the triad calculations are done, finds
			// the average effort value of the password
            totalEffort = totalEffort / numTriads;
			
        } while (totalEffort > maxEffort
            || !password.match(/[0-9]/)          //Must contain a number
            || !password.match(/[A-Z]/)			 //Must contain a capital
            || !password.match(/[a-z]/)			 //Must contain a lowercase
            || !password.match(/[^0-9A-Za-z]/)	 //Must contain a special char
        );
		
		//Displays the final adjusted effort value 
		this.eoutput.innerHTML = Math.round(Number((totalEffort) - Number(2)) * 100) / 100;
		
		//Replaces any < and > in the final password with their character references 
        password = password.replace('<', '&lt;').replace('>', '&gt;');
		
		//Displays the final password
        this.pass.innerHTML = password;
    }
};