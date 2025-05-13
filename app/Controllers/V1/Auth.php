<?php

namespace App\Controllers\V1;

use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;

helper('jwt');

class Auth extends ResourceController
{
    public function createUser()
    {
        $data = $this->request->getJSON(true);

        if (!isset($data['nom_usuari'], $data['password_usuari'], $data['mail'], $data['edat'], $data['pais'])) {
            return $this->failValidationErrors("Falten camps obligatoris");
        }

        $userModel = new UserModel();

        // Comprovem si ja existeix
        if ($userModel->where('nom_usuari', $data['nom_usuari'])->first()) {
            return $this->failResourceExists("Aquest nom d'usuari ja existeix");
        }

        $hash = password_hash($data['password_usuari'], PASSWORD_DEFAULT);

        $userModel->insert([
            'nom_usuari' => $data['nom_usuari'],
            'password_usuari' => $hash,
            'mail' => $data['mail'],
            'edat' => $data['edat'],
            'pais' => $data['pais']
        ]);

        return $this->respond([
            'status' => 'ok',
            'message' => 'Usuari creat correctament'
        ], 201);
    }

    public function login()
    {
        $data = $this->request->getJSON(true);
        $userModel = new UserModel();
        $user = $userModel->where('nom_usuari', $data['nom_usuari'])->first();

        if (!$user || !password_verify($data['password_usuari'], $user['password_usuari'])) {
            return $this->failUnauthorized('Credencials incorrectes');
        }

        $token = createJWT($user['id'], $user['nom_usuari']);

        return $this->respond([
            'status' => 'ok',
            'token' => $token
        ]);
    }

    public function logged()
    {
        helper('jwt');

        $authHeader = $this->request->getHeaderLine('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return $this->failUnauthorized('Token no proporcionat');
        }

        $token = str_replace('Bearer ', '', $authHeader);

        try {
            $decoded = validateJWT($token);

            return $this->respond([
                'status' => 'ok',
                'logged' => true,
                'user_id' => $decoded->uid,
                'username' => $decoded->username
            ]);

        } catch (\Exception $e) {
            return $this->failUnauthorized('Token invàlid o caducat');
        }
    }

    public function configGame()
    {
        helper('jwt');
        $userId = $this->getUserIdFromToken();

        $data = $this->request->getJSON(true);

        $db = \Config\Database::connect();
        $builder = $db->table('configuracions');
        $builder->insert([
            'usuari_id' => $userId,
            'tema' => $data['tema'],
            'musica' => $data['musica'],
            'dificultat' => $data['dificultat']
        ]);

        return $this->respond(['status' => 'ok', 'message' => 'Configuració desada']);
    }

    public function updateConfigGame()
    {
        helper('jwt');
        $userId = $this->getUserIdFromToken();
        $data = $this->request->getJSON(true);

        $db = \Config\Database::connect();
        $builder = $db->table('configuracions');
        $builder->where('usuari_id', $userId)->update($data);

        return $this->respond(['status' => 'ok', 'message' => 'Configuració actualitzada']);
    }

    public function addGame()
    {
        helper('jwt');
        $userId = $this->getUserIdFromToken();
        $data = $this->request->getJSON(true);

        $db = \Config\Database::connect();
        $builder = $db->table('partides');
        $builder->insert([
            'usuari_id' => $userId,
            'data' => $data['data'],
            'guanyat' => $data['guanyat'],
            'punts' => $data['punts'],
            'durada' => $data['durada']
        ]);

        return $this->respond(['status' => 'ok', 'message' => 'Partida registrada'], 201);
    }

    public function getUserLastGames()
    {
        helper('jwt');
        $userId = $this->getUserIdFromToken();

        $db = \Config\Database::connect();
        $query = $db->query("SELECT data, guanyat, punts, durada FROM partides WHERE usuari_id = ? ORDER BY data DESC LIMIT 10", [$userId]);

        return $this->respond([
            'status' => 'ok',
            'partides' => $query->getResult()
        ]);
    }

    public function getUserStats()
    {
        helper('jwt');
        $userId = $this->getUserIdFromToken();

        $db = \Config\Database::connect();
        $builder = $db->table('partides')->where('usuari_id', $userId);
        $total = $builder->countAllResults(false);
        $guanyades = $builder->where('guanyat', true)->countAllResults(false);
        $perdudes = $total - $guanyades;

        $query = $builder->select('AVG(punts) as mitjana_punts, AVG(durada) as mitjana_durada')->get()->getRow();

        $percentatge = $total > 0 ? round(($guanyades / $total) * 100) : 0;

        return $this->respond([
            'status' => 'ok',
            'total' => $total,
            'guanyades' => $guanyades,
            'perdudes' => $perdudes,
            'percentatge_victories' => $percentatge,
            'mitjana_punts' => (int) $query->mitjana_punts,
            'mitjana_durada' => (int) $query->mitjana_durada
        ]);
    }

    public function getTopUsers()
    {
        $db = \Config\Database::connect();
        $query = $db->query("
        SELECT 
            u.nom_usuari, 
            COUNT(p.id) as partides, 
            SUM(p.guanyat) as victories,
            COUNT(p.id) - SUM(p.guanyat) as derrotes,
            SUM(p.punts) as punts_totals
        FROM usuaris u
        JOIN partides p ON u.id = p.usuari_id
        GROUP BY u.id
        ORDER BY punts_totals DESC
        LIMIT 10
    ");

        $result = $query->getResultArray();

        return $this->respond([
            'status' => 'ok',
            'jugadors' => $result
        ]);
    }

    public function updateUser()
    {
        helper('jwt');
        $userId = $this->getUserIdFromToken();
        $data = $this->request->getJSON(true);

        $userModel = new UserModel();
        $userModel->update($userId, $data);

        return $this->respond([
            'status' => 'ok',
            'message' => 'Dades actualitzades'
        ]);
    }

    public function logout()
    {
        return $this->respond([
            'status' => 'ok',
            'message' => 'Sessió tancada'
        ]);
    }

    private function getUserIdFromToken()
    {
        $authHeader = $this->request->getHeaderLine('Authorization');
        $token = str_replace('Bearer ', '', $authHeader);
        $decoded = validateJWT($token);
        return $decoded->uid;
    }



}
