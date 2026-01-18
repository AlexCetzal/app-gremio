<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\CollaboratorController;
use App\Http\Controllers\ContributionController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\AuthController;


use App\Http\Controllers\UserController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/users', [UserController::class, 'store']);
});


Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::apiResource('collaborators', CollaboratorController::class);
    Route::apiResource('contributions', ContributionController::class);
    Route::apiResource('donations', DonationController::class);
    Route::apiResource('sales', SaleController::class);
    Route::apiResource('expenses', ExpenseController::class);
});

