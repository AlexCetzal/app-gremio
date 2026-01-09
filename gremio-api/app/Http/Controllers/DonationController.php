<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\Request;

class DonationController extends Controller
{
    public function index()
    {
        return Donation::with('collaborator')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'collaborator_id' => 'nullable|exists:collaborators,id',
            'product' => 'required|string',
            'quantity' => 'required|numeric',
            'unit' => 'required|string',
            'estimated_value' => 'nullable|numeric',
            'date' => 'required|date',
        ]);

        return Donation::create($request->all());
    }

    public function show($id)
    {
        return Donation::with('collaborator')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $donation = Donation::findOrFail($id);
        $donation->update($request->all());

        return $donation;
    }

    public function destroy($id)
    {
        Donation::findOrFail($id)->delete();

        return response()->json(['message' => 'Donación eliminada']);
    }
}
