<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // ADMIN
        User::firstOrCreate(
            ['email' => 'admin@gremio.com'],
            [
                'name' => 'Administrador',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
            ]
        );

        // DESARROLLADOR
        User::firstOrCreate(
            ['email' => 'dev@gremio.com'],
            [
                'name' => 'Desarrollador',
                'password' => Hash::make('dev123'),
                'role' => 'developer',
            ]
        );

        // USUARIO NORMAL
        User::firstOrCreate(
            ['email' => 'user@gremio.com'],
            [
                'name' => 'Usuario',
                'password' => Hash::make('user123'),
                'role' => 'user',
            ]
        );
    }
}
