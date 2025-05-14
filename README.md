# 🎮 Projecte Pacman API + Frontend

Pràctica M6 i M7 - DAW  
Aplicació completa amb backend en CodeIgniter 4 i frontend HTML/JS integrat amb JWT

---

## 🧠 Funcionalitats

- Autenticació amb JSON Web Tokens (JWT)
- Registre i login d’usuaris
- Configuració personalitzada del joc
- Partides guardades a base de dades
- Estadístiques i rànquing per usuari
- Joc interactiu Pacman amb p5.js

---

## 🚀 Requisits

- PHP 8.x
- Composer
- MySQL
- Node.js + npm

---

## 🔧 Instal·lació

### 1. Backend (CodeIgniter)

```bash
composer install
cp .env.example .env
# Editem la config .env:
# database.default.database = pacman
# database.default.username = root
# JWT_SECRET=""
php spark migrate
php spark serve


