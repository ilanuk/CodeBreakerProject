let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    // console.log(attempt.value);
    //add functionality to guess function here
    if(answer.value == '' || attempt.value == '') {
        setHiddenFields();
    }
    if(!validateInput(input.value)) {
        return false;
    }
    else {
        document.getElementById('attempt').value = parseInt(attempt.value)+1;
    }
    if(getResults(input.value)) {
        setMessage("You Win! :)");
        showAnswer(true);
        showReplay();
    }
    else if ((getResults(input.value)==false) && (attempt.value>=10)){
        setMessage("You Lose! :(");
        showAnswer(false);
        showReplay();
    }
    else {
        setMessage("Incorrect, try again.");
    }
}

//implement new functions here
function setHiddenFields() {
    let tempval = Math.floor(Math.random() * 9999).toString();
    
    while (tempval.length < 4) {
        tempval = '0'+ tempval;
    }
    answer.value = tempval;
    attempt.value = 0;
}

function setMessage( mymessage) {
   document.getElementById('message').innerHTML =  mymessage;
}

function validateInput(input) {
    if(input.length == 4) {
       return true; 
    }
    else {
        setMessage("Guesses must be exactly 4 characters long.");
        return false;
    }
}

function getResults(param) {
    // console.log(param);
    // console.log(attempt + ":"+answer.value);
    let heading = '<div class="row"><strong class="col-md-6">Guess</strong><strong class="col-md-6">Result</strong></div>';
    let myguess = '<div class="row"><span class="col-md-6">' + param + '</span><div class="col-md-6">';
    //let myresult = '<span class="col-md-6">' + answer.value + '</span><div class="col-md-6"></div>';
    let chAnswer = answer.value.split('');
    let chGuess = param.split('');
    let hint = '';
    let count = 0;
    for(let i =0; i< 4; i++) {
        if(chAnswer[i]==chGuess[i]) {
            count = count+1;
            hint = hint + '<span class="glyphicon glyphicon-ok"></span>';
        }
        else {
            let checkflag = false;
            for(let j =0; j< 4; j++) {
                if((chAnswer[j]==chGuess[i]) &&!(checkflag)) {
                    hint = hint + '<span class="glyphicon glyphicon-transfer"></span>';
                    checkflag = true;
                    break;
                }
             }
             if(!(checkflag)) {
                 hint = hint + '<span class="glyphicon glyphicon-remove"></span>';
             }
        }
    }
    if(attempt.value<1) {
        document.getElementById('results').innerHTML =  heading + myguess + hint;    
    }
    else {
        let oldVal = document.getElementById('results').innerHTML;
        document.getElementById('results').innerHTML =  oldVal + myguess + hint;
    }
    if(count==4) {
        return true;
    }
    else {
        return false;
    }
}

function showAnswer(decision) {
    document.getElementById('code').innerHTML =  answer.value;
    var oldclass = document.getElementById('code').className;
    if(decision) {
        document.getElementById('code').className = oldclass + " success" ;
    }
    else {
        document.getElementById('code').className = oldclass + " failure" ;        
    }
}

function showReplay() {
    document.getElementById('guessing-div').style.display = "none";
    document.getElementById('replay-div').style.display = "block";
}