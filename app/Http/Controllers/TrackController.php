<?php

namespace App\Http\Controllers;

use App\Models\Track;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TrackController extends Controller
{
    public function index()
    {
        return Inertia::render('Tracks/Index', [
            'tracks' => Track::where('user_id', auth()->id())->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Tracks/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'length' => 'required|integer',
            'description' => 'nullable|string',
            'difficulty' => 'required|string|in:easy,medium,hard'
        ]);

        $track = Track::create([
            'user_id' => auth()->id(),
            ...$validated
        ]);

        return redirect()->route('tracks.index');
    }

    public function show(Track $track)
    {
        return Inertia::render('Tracks/Show', [
            'track' => $track
        ]);
    }

    public function edit(Track $track)
    {
        return Inertia::render('Tracks/Edit', [
            'track' => $track
        ]);
    }

    public function update(Request $request, Track $track)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'length' => 'required|integer',
            'description' => 'nullable|string',
            'difficulty' => 'required|string|in:easy,medium,hard'
        ]);

        $track->update($validated);

        return redirect()->route('tracks.index');
    }

    public function destroy(Track $track)
    {
        $track->delete();
        return redirect()->route('tracks.index');
    }
} 