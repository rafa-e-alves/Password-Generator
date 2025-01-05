function generatePassword() {
    let length = parseInt(document.getElementById('length').value);

    if (length < 4 || length > 20) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Erro: O tamanho da senha deve ser entre 4 e 20 caracteres.';
        errorMessage.style.display = 'block';
        
        document.getElementById('passwordOutput').textContent = '';
        document.getElementById('passwordStrength').textContent = '';
        return;
    }

    const errorMessage = document.getElementById('error-message');
    errorMessage.style.display = 'none';

    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;

    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+[]{}|;:,.<>?';

    let allChars = lowerCaseChars;
    if (includeUppercase) allChars += upperCaseChars;
    if (includeNumbers) allChars += numberChars;
    if (includeSymbols) allChars += symbolChars;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
    }

    document.getElementById('passwordOutput').textContent = password;
    document.getElementById('passwordStrength').textContent = evaluateStrength(password);
}

function copyPassword() {
    const passwordText = document.getElementById('passwordOutput').textContent;
    if (!passwordText) return;

    const tempInput = document.createElement('input');
    tempInput.value = passwordText;
    document.body.appendChild(tempInput);

    tempInput.select();
    document.execCommand('copy');

    document.body.removeChild(tempInput);

    alert('Senha copiada com sucesso!');
}

function evaluateStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    switch (strength) {
        case 4: return 'Muito Forte';
        case 3: return 'Forte';
        case 2: return 'Moderada';
        default: return 'Fraca';
    }
}

document.getElementById('length').addEventListener('input', function(event) {
    let value = event.target.value;
    if (value.includes('.')) {
        event.target.value = value.split('.')[0];
    }
});

document.getElementById('length').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        generatePassword();
    }
});
