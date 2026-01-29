<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ChatController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Halaman Landing Page (pages/landing/index.jsx)
Route::get('/', function () {
    return Inertia::render('landing/index'); 
})->name('landing');

// Halaman Login (pages/auth/login.jsx)
Route::get('/login', function () {
    return Inertia::render('login/index'); 
})->name('login');

// Halaman Chat Utama (pages/roomchat/index.jsx)
Route::get('/chat', function () {
    return Inertia::render('roomchat/index'); 
})->name('chat.room');

// Grouping API Chat untuk Controller
Route::prefix('api/chat')->group(function () {
    // Mengambil riwayat chat untuk ditampilkan di Sidebar
    Route::get('/history', [ChatController::class, 'getHistory']); 
    
    // Mengambil detail pesan saat item history diklik
    Route::get('/details', [ChatController::class, 'getChat']); 
    
    // Mengirim pesan baru dari ChatBar
    Route::post('/send', [ChatController::class, 'sendMessage']); 
    
    // Membuat sesi percakapan baru
    Route::post('/new', [ChatController::class, 'createNewChat']); 
});