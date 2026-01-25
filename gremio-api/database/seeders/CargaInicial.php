<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class CargaInicial extends Seeder
{
    public function run(): void
    {
        $this->call(UserSeeder::class);
    }
}
