<?php

namespace App\Http\Controllers;

use App\Models\Contribution;
use Illuminate\Http\Request;

class ContributionController extends Controller
{
    public function index()
    {
        return Contribution::with('collaborator')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'collaborator_id' => 'required|exists:collaborators,id',
            'amount' => 'required|numeric',
            'type' => 'required|in:obligatoria,adicional,venta,otro',
            'date' => 'required|date',
        ]);

        return Contribution::create($request->all());
    }

    public function show($id)
    {
        return Contribution::with('collaborator')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $contribution = Contribution::findOrFail($id);

        $contribution->update($request->all());

        return $contribution;
    }

    public function destroy($id)
    {
        Contribution::findOrFail($id)->delete();

        return response()->json(['message' => 'Aportación eliminada']);
    }
}
