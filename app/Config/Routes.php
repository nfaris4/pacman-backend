<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');

$routes->group('v1', function ($routes) {
    $routes->post('create_user', 'V1\Auth::createUser');
    $routes->post('login', 'V1\Auth::login');
    $routes->get('logged', 'V1\Auth::logged');
    $routes->post('logout', 'V1\Auth::logout');
    $routes->post('update_user', 'V1\Auth::updateUser');
    $routes->post('config_game', 'V1\Auth::configGame');
    $routes->post('update_config_game', 'V1\Auth::updateConfigGame');
    $routes->post('add_game', 'V1\Auth::addGame');
    $routes->get('get_user_last_games', 'V1\Auth::getUserLastGames');
    $routes->get('get_user_stats', 'V1\Auth::getUserStats');
    $routes->get('get_top_users', 'V1\Auth::getTopUsers');
});

$routes->options('(:any)', function () {
    return response()
        ->setHeader('Access-Control-Allow-Origin', '*')
        ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
        ->setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type')
        ->setStatusCode(200);
});


