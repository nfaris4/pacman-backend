<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

function createJWT($userId, $username)
{
    $key = getenv('JWT_SECRET');
    $payload = [
        'iss' => 'pacman_api',
        'iat' => time(),
        'exp' => time() + 3600, // 1 hora
        'uid' => $userId,
        'username' => $username
    ];

    return JWT::encode($payload, $key, 'HS256');
}

function validateJWT($token)
{
    $key = getenv('JWT_SECRET');
    return JWT::decode($token, new Key($key, 'HS256'));
}
