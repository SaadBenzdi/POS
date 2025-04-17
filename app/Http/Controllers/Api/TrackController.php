<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Track;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TrackController extends Controller
{
    public function index()
    {
        $tracks = Track::where('user_id', auth()->id())->get();
        return response()->json($tracks);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'length' => 'required|integer',
            'description' => 'nullable|string',
            'difficulty' => 'required|string|in:easy,medium,hard'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $track = Track::create([
            'user_id' => auth()->id(),
            'name' => $request->name,
            'location' => $request->location,
            'length' => $request->length,
            'description' => $request->description,
            'difficulty' => $request->difficulty
        ]);

        return response()->json($track, 201);
    }

    public function show(Track $track)
    {
        if ($track->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }
        return response()->json($track);
    }

    public function update(Request $request, Track $track)
    {
        if ($track->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'length' => 'required|integer',
            'description' => 'nullable|string',
            'difficulty' => 'required|string|in:easy,medium,hard'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $track->update($request->all());
        return response()->json($track);
    }

    public function destroy(Track $track)
    {
        if ($track->user_id !== auth()->id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $track->delete();
        return response()->json(null, 204);
    }
} 