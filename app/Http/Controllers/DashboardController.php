<?php

namespace App\Http\Controllers;

use App\Models\Voiture;
use App\Models\Moto;
use App\Models\Track;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        
        // Get total counts
        $totalVoitures = Voiture::where('user_id', $user->id)->count();
        $totalMotos = Moto::where('user_id', $user->id)->count();
        $totalTracks = Track::where('user_id', $user->id)->count();
        
        // Get recent vehicles (last 5)
        $recentVoitures = Voiture::where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get(['id', 'marque', 'modele', 'annee', 'created_at']);
            
        $recentMotos = Moto::where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get(['id', 'marque', 'modele', 'annee', 'created_at']);
            
        $recentTracks = Track::where('user_id', $user->id)
            ->latest()
            ->take(5)
            ->get(['id', 'name', 'location', 'created_at']);

        // Get most popular brands
        $popularVoitureBrand = Voiture::where('user_id', $user->id)
            ->select('marque')
            ->groupBy('marque')
            ->orderByRaw('COUNT(*) DESC')
            ->first();

        $popularMotoBrand = Moto::where('user_id', $user->id)
            ->select('marque')
            ->groupBy('marque')
            ->orderByRaw('COUNT(*) DESC')
            ->first();

        // Get average year
        $averageVoitureYear = Voiture::where('user_id', $user->id)->avg('annee');
        $averageMotoYear = Moto::where('user_id', $user->id)->avg('annee');

        return Inertia::render('Dashboard', [
            'statistics' => [
                'totalVoitures' => $totalVoitures,
                'totalMotos' => $totalMotos,
                'totalTracks' => $totalTracks,
                'popularVoitureBrand' => $popularVoitureBrand ? $popularVoitureBrand->marque : 'N/A',
                'popularMotoBrand' => $popularMotoBrand ? $popularMotoBrand->marque : 'N/A',
                'averageVoitureYear' => round($averageVoitureYear),
                'averageMotoYear' => round($averageMotoYear),
            ],
            'recentVehicles' => [
                'voitures' => $recentVoitures,
                'motos' => $recentMotos,
                'tracks' => $recentTracks,
            ]
        ]);
    }
} 