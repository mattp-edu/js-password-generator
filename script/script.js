// Array of special characters to be included in password
var specialCharacters = [
  '@',
  '%',
  '+',
  '\\',
  '/',
  "'",
  '!',
  '#',
  '$',
  '^',
  '?',
  ':',
  ',',
  ')',
  '(',
  '}',
  '{',
  ']',
  '[',
  '~',
  '-',
  '_',
  '.'
];

// Array of numeric characters to be included in password
var numericCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

// Array of lowercase characters to be included in password
var lowerCasedCharacters = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z'
];

// Array of uppercase characters to be included in password
var upperCasedCharacters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

// Function to prompt user for password options
function getPasswordOptions() {
  // no need for this function, I'm not taking this out as this was part of the starter code
  // this part is handled by a modal
}

// Function for getting a random element from an array
function getRandom(arr) {
  // failsafe in case empty array
  if (arr.length < 1 ) return;
  
  return arr[Math.round((Math.random() * (arr.length - 1)))];
}

// Function to generate password with user input
function generatePassword(settings) {
  if ( !(8 <= settings.len <= 128) ) return 101;          // check if password in 8-128 letter range
  if ( !(settings.lower || settings.upper) ) return 102;  // check if at least one type of character has been selected


  // building up generation array based on settings
  var gen = [];
  if (settings.lower) gen = gen.concat(lowerCasedCharacters);
  if (settings.upper) gen = gen.concat(upperCasedCharacters);
  if (settings.num) gen = gen.concat(numericCharacters);
  if (settings.spec) gen = gen.concat(specialCharacters);

  //initialize passphrase variable and iterate on given range to get random letters
  var passphrase = "";
  for (let index = 0; index < settings.len; index++) {
    passphrase = passphrase.concat(getRandom(gen));
  }

  return passphrase;
}

// Get references to the #generate element
var generateBtn = document.querySelector('#generate');
var rangeElement = document.querySelector('#passwordRange');
var upperElement = document.querySelector('#upper');
var lowerElement = document.querySelector('#lower');
var numElement = document.querySelector('#num');
var specElement = document.querySelector('#spec');

// Write password to the #password input
function writePassword() {
  if ( !(typeof(parseInt(rangeElement.value)) == 'number') ) return alert('Given range wasn\'t a valid number!');
  var password = generatePassword({
    len : parseInt(rangeElement.value),
    lower : lowerElement.checked,
    upper: upperElement.checked,
    num : numElement.checked,
    spec : specElement.checked
  });

  if ( password == 101 ) return alert('Password length wasn\'t in the 8 - 128 range.');
  if ( password == 102 ) return alert('Password should contain at least one character type.');

  var passwordText = document.querySelector('#password');

  passwordText.value = password;
}


// Add event listener to generate button
generateBtn.addEventListener('click', writePassword);

// event listeners for form manipulation
upperElement.addEventListener('change', validateForm);
lowerElement.addEventListener('change', validateForm);
rangeElement.addEventListener('change', updateRangeValueText);
document.querySelector('#rangeValue').innerHTML = rangeElement.value = 12;

// function to display value of the trackbar
function updateRangeValueText() {
  document.querySelector('#rangeValue').innerHTML = rangeElement.value;
}

// validate form for at least one type of regular character and enable / disable submisson button
function validateForm() {
  if(upperElement.checked || lowerElement.checked) {
    generateBtn.disabled = false;
  } else {
    generateBtn.disabled = true;
  }
}