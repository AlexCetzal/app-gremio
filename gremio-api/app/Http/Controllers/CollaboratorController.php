<?php

namespace App\Http\Controllers;

use App\Models\Collaborator;
use Illuminate\Http\Request;

class CollaboratorController extends Controller
{
    public function index()
    {
        return Collaborator::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'phone' => 'nullable|string',
            'notes' => 'nullable|string',
        ]);

        return Collaborator::create($request->all());
    }

    public function show($id)
    {
        return Collaborator::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $collaborator = Collaborator::findOrFail($id);

        $collaborator->update($request->all());

        return $collaborator;
    }

    public function destroy($id)
    {
        $collaborator = Collaborator::findOrFail($id);
        $collaborator->delete();

        return response()->json(['message' => 'Colaborador eliminado']);
    }
}
