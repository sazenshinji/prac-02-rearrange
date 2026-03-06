<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TopPageController;
use App\Http\Controllers\PractiseController;
use App\Http\Controllers\TestController;

Route::get('/', [TopPageController::class, 'index']);
