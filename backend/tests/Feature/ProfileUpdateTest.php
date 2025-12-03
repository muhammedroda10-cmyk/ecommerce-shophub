<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProfileUpdateTest extends TestCase
{
    use \Illuminate\Foundation\Testing\RefreshDatabase;

    public function test_user_can_update_profile()
    {
        $this->seed(\Database\Seeders\RoleSeeder::class);
        $user = \App\Models\User::factory()->create();
        $user->assignRole('customer');

        $response = $this->actingAs($user)->putJson('/api/v1/auth/profile', [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
        ]);
    }

    public function test_user_can_update_password()
    {
        $this->seed(\Database\Seeders\RoleSeeder::class);
        $user = \App\Models\User::factory()->create([
            'password' => bcrypt('old_password'),
        ]);
        $user->assignRole('customer');

        $response = $this->actingAs($user)->putJson('/api/v1/auth/password', [
            'current_password' => 'old_password',
            'password' => 'new_password',
            'password_confirmation' => 'new_password',
        ]);

        $response->assertStatus(200);

        // Verify new password works
        $this->assertTrue(\Illuminate\Support\Facades\Hash::check('new_password', $user->fresh()->password));
    }
}
