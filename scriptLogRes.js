const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const loginForm = document.querySelector('.form-box.Login form');
const registerForm = document.querySelector('.form-box.Register form');
const errorElement = document.createElement('p');
errorElement.style.color = 'red';
registerForm.appendChild(errorElement);

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Hindari pengiriman formulir bawaan

    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');

    if (email === storedEmail && password === storedPassword) {
        const successMessage = document.createElement('p');
        successMessage.style.color = 'green';
        successMessage.style.alignItems = 'center';
        successMessage.style.justifyContent  = 'center';
        successMessage.style.display = 'flex';
        successMessage.textContent = 'Berhasil Login!';
        successMessage.classList.add('success-message');
        loginForm.parentNode.appendChild(successMessage); 
        setTimeout(() => {
            successMessage.remove();
        }, 1000);

    } else {
        errorElement.textContent = 'Email atau password salah. Silakan coba lagi.';
        loginForm.appendChild(errorElement); 
    }
});


registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = registerForm.querySelector('input[type="text"]').value;
    const email = registerForm.querySelector('input[type="email"]').value;
    const password = registerForm.querySelector('input[type="password"]').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_{|}~]/.test(password);

    errorElement.textContent = '';

    if (!username) {
        errorElement.textContent = 'Silakan masukkan nama pengguna';
        return;
    }

    if (!emailRegex.test(email)) {
        errorElement.textContent = 'Email tidak valid';
        return;
    }

    if (password.length < 8) {
        errorElement.textContent = 'Kata sandi harus terdiri dari minimal 8 karakter';
        return;
    }

    if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecialChar) {
        errorElement.textContent = 'Kata sandi harus mengandung minimal 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 karakter khusus';
        return;
    }

    const successMessage = document.createElement('p');
    successMessage.style.color = 'green';
    successMessage.style.alignItems = 'center';
    successMessage.style.justifyContent  = 'center';
    successMessage.style.display = 'flex';
    successMessage.textContent = 'Registrasi berhasil!';
    successMessage.classList.add('success-message');
    registerForm.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
        registerForm.querySelector('input[type="text"]').value = '';
        registerForm.querySelector('input[type="email"]').value = '';
        registerForm.querySelector('input[type="password"]').value = '';
        wrapper.classList.remove('active');
    }, 1000);

    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
});
