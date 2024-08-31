let inputSlider = document.getElementById("inputSlider");
let sliderValue = document.getElementById("sliderValue");
let passBox = document.getElementById("passBox");
let lowercase = document.getElementById("lowercase");
let uppercase = document.getElementById("uppercase");
let numbers = document.getElementById("numbers");
let symbols = document.getElementById("symbols");
let genBtn = document.getElementById("genBtn");
let copyIcon = document.getElementById("copyIcon");

// Displaying the input slider value
sliderValue.textContent = inputSlider.value;
inputSlider.addEventListener('input', () => {
    sliderValue.textContent = inputSlider.value;
});

genBtn.addEventListener('click', () => {
    const generatedPassword = generatePassword();
    passBox.value = generatedPassword;
    updateStrengthMeter(generatedPassword);
});

let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let allNumbers = "0123456789";
let allSymbols = "~!@#$%^&*";

// Function to generate the password
function generatePassword() {
    let genPassword = "";
    let allChars = "";

    if (lowercase.checked) allChars += lowerChars;
    if (uppercase.checked) allChars += upperChars;
    if (numbers.checked) allChars += allNumbers;
    if (symbols.checked) allChars += allSymbols;

    if (allChars.length === 0) return genPassword;

    for (let i = 0; i < inputSlider.value; i++) {
        genPassword += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    return genPassword;
}

// Copy password to clipboard
copyIcon.addEventListener('click', () => {
    if (passBox.value) {
        navigator.clipboard.writeText(passBox.value).then(() => {
            // Change icon to indicate copying success
            copyIcon.textContent = "check"; // Show a checkmark
            copyIcon.style.color = "#00ff00"; // Change color to green

            setTimeout(() => {
                copyIcon.textContent = "content_copy"; // Revert to original icon
                copyIcon.style.color = "#fff"; // Revert to original color
            }, 2000); // Revert back after 2 seconds
        }).catch(err => {
            console.error("Failed to copy text: ", err);
        });
    }
});
// Update strength meter based on password strength
function calculateStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    return strength;
}

function updateStrengthMeter(password) {
    const strengthMeter = document.querySelector('.strengthMeter div');
    const strength = calculateStrength(password);

    if (strength < 3) {
        strengthMeter.style.width = '33%';
        strengthMeter.className = 'weak';
    } else if (strength < 5) {
        strengthMeter.style.width = '66%';
        strengthMeter.className = 'moderate';
    } else {
        strengthMeter.style.width = '100%';
        strengthMeter.className = 'strong';
    }
}

// Real-time password preview and update strength meter
const updatePassword = () => {
    const generatedPassword = generatePassword();
    passBox.value = generatedPassword;
    updateStrengthMeter(generatedPassword);
};

lowercase.addEventListener('change', updatePassword);
uppercase.addEventListener('change', updatePassword);
numbers.addEventListener('change', updatePassword);
symbols.addEventListener('change', updatePassword);
inputSlider.addEventListener('input', updatePassword);
