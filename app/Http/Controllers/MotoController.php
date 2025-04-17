<?php

namespace App\Http\Controllers;

use App\Models\Moto;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class MotoController extends Controller
{
    public function index()
    {
        $motos = Moto::where('user_id', auth()->user()->id)->get();
        
        return Inertia::render('Motos/Index', [
            'motos' => $motos,
        ]);
    }

    public function create()
    {
        return Inertia::render('Motos/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'marque' => 'required|string|max:255',
            'modele' => 'required|string|max:255',
            'annee' => 'required|integer',
            'kilometrage' => 'required|integer',
            'etat' => 'required|string',
            'prix' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('motos', 'public');
            $validated['image'] = $imagePath;
        }

        $validated['user_id'] = auth()->id();
        Moto::create($validated);

        return redirect()->route('motos.index');
    }

    public function show(Moto $moto)
    {
        return Inertia::render('Motos/Show', [
            'moto' => $moto,
        ]);
    }

    public function edit(Moto $moto)
    {
        return Inertia::render('Motos/Edit', [
            'moto' => $moto,
        ]);
    }

    public function update(Request $request, Moto $moto)
    {
        $validated = $request->validate([
            'marque' => 'required|string|max:255',
            'modele' => 'required|string|max:255',
            'annee' => 'required|integer',
            'kilometrage' => 'required|integer',
            'etat' => 'required|string',
            'prix' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($moto->image) {
                Storage::delete('public/' . $moto->image);
            }
            $imagePath = $request->file('image')->store('motos', 'public');
            $validated['image'] = $imagePath;
        }

        $moto->update($validated);

        return redirect()->route('motos.index');
    }

    public function destroy(Moto $moto)
    {
        if ($moto->image) {
            Storage::delete('public/' . $moto->image);
        }

        $moto->delete();

        return redirect()->route('motos.index');
    }
} 