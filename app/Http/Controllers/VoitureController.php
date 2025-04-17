<?php
namespace App\Http\Controllers;
use App\Models\Voiture;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
class VoitureController extends Controller
{
    public function index()
    {
        // dd(auth()->user()->id);
        $voitures = Voiture::where('user_id', auth()->user()->id)->get();
        
        return inertia('Voitures/Index', [
            'voitures' => $voitures,
        ]);
    }
    public function create()
    {
        return Inertia::render('Voitures/Create');
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'marque' => 'required|string|max:255',
            'modele' => 'required|string|max:255',
            'annee' => 'required|integer',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public'); 
            $validated['image'] = $imagePath; 
        }
        $validated['user_id'] = auth()->id();
        Voiture::create($validated);
        return redirect()->route('voitures.index');
    }
    public function edit(Voiture $voiture)
    {
        return Inertia::render('Voitures/Edit', ['voiture' => $voiture]);
    }
    public function update(Request $request, Voiture $voiture)
    {
        $request->validate([
            'marque' => 'required|string',
            'modele' => 'required|string',
            'annee' => 'required|integer',
        ]);
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public'); 
            $voiture->image = $imagePath; 
        }
        $voiture->update([
            'marque' => $request->marque,
            'modele' => $request->modele,
            'annee' => $request->annee,
            'image' => $voiture->image ?? $request->image,
        ]);
        return redirect()->route('voitures.index');
    }
    public function destroy(Voiture $voiture)
    {
        if ($voiture->image) {
            Storage::delete('public/' . $voiture->image);
        }

        $voiture->delete();
        return redirect()->route('voitures.index');
    }
    public function show(Voiture $voiture)
    {
        return Inertia::render('Voitures/Show', [
            'voiture' => $voiture,
        ]);
    }
}
