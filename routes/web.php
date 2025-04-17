<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\VoitureController;
use App\Http\Controllers\MotoController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\POSController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // POS Routes
    Route::get('/pos', [POSController::class, 'index'])->name('pos.index');
    Route::post('/pos/order', [POSController::class, 'createOrder'])->name('pos.order');

    // Voiture routes
    Route::resource('voitures', VoitureController::class);
    Route::get('/voitures/{voiture}/show', [VoitureController::class, 'show'])->name('voitures.show');
    
    // Moto routes
    Route::resource('motos', MotoController::class);
    Route::get('/motos/{moto}/show', [MotoController::class, 'show'])->name('motos.show');
    
    // Track views
    Route::get('/tracks', function () {
        return Inertia::render('Tracks/Index');
    })->name('tracks.index');
    
    Route::get('/tracks/create', function () {
        return Inertia::render('Tracks/Create');
    })->name('tracks.create');
    
    Route::get('/tracks/{track}/edit', function (App\Models\Track $track) {
        return Inertia::render('Tracks/Edit', ['track' => $track]);
    })->name('tracks.edit');
    
    Route::get('/tracks/{track}', function (App\Models\Track $track) {
        return Inertia::render('Tracks/Show', ['track' => $track]);
    })->name('tracks.show');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
