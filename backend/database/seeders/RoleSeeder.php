<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Roles
        $adminRole = \Spatie\Permission\Models\Role::create(['name' => 'admin', 'guard_name' => 'web']);
        $sellerRole = \Spatie\Permission\Models\Role::create(['name' => 'seller', 'guard_name' => 'web']);
        $customerRole = \Spatie\Permission\Models\Role::create(['name' => 'customer', 'guard_name' => 'web']);

        // Create Permissions (optional, can add later)
        // \Spatie\Permission\Models\Permission::create(['name' => 'edit articles']);
    }
}
