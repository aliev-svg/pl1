const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// Добавь эти две строки:
const path = require('path');
app.use(express.static('public'));

// Важно! Чтобы читать JSON из тела запроса
app.use(express.json());

// Простое хранилище пользователей (в реальном проекте будет база данных)
let users = [];

// ====================== 1. КАСТОМНАЯ РЕГИСТРАЦИЯ ======================
app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Простая проверка, что поля заполнены
    if (!username || !password) {
        return res.status(400).json({ message: 'Укажи username и password' });
    }

    // Проверяем, есть ли уже такой пользователь
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    // Хэшируем пароль (это важно для безопасности!)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Сохраняем пользователя
    users.push({
        username: username,
        password: hashedPassword
    });

    res.json({ message: 'Регистрация прошла успешно! ✅' });
});

// ====================== 2. АВТОРИЗАЦИЯ (логин + проверка пароля) ======================
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Укажи username и password' });
    }

    // Ищем пользователя
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ message: 'Неверный логин или пароль' });
    }

    // Проверяем пароль
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Неверный логин или пароль' });
    }

    // Создаём JWT-токен
    const token = jwt.sign(
        { username: user.username },     // что храним в токене
        'МОЙ_СЕКРЕТНЫЙ_КЛЮЧ',           // в реальном проекте положи в .env
        { expiresIn: '1h' }              // токен живёт 1 час
    );

    res.json({
        message: 'Вход выполнен успешно! ✅',
        token: token
    });
});

// ====================== 3. MIDDLEWARE ЗАЩИТЫ (проверка токена) ======================
const authMiddleware = (req, res, next) => {
    // Берём токен из заголовка Authorization: Bearer <token>
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Токен не найден. Войди в систему!' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, 'МОЙ_СЕКРЕТНЫЙ_КЛЮЧ');
        req.user = decoded;   // теперь в req.user лежит { username: '...' }
        next();               // пропускаем запрос дальше
    } catch (err) {
        return res.status(401).json({ message: 'Неверный или просроченный токен' });
    }
};

// ====================== ЗАЩИЩЁННЫЙ МАРШРУТ (пример) ======================
app.get('/profile', authMiddleware, (req, res) => {
    res.json({
        message: 'Это твой защищённый профиль!',
        user: req.user
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущен: http://localhost:${PORT}`);
    console.log('Доступные маршруты:');
    console.log('   POST /register');
    console.log('   POST /login');
    console.log('   GET  /profile  ← защищён middleware');
});