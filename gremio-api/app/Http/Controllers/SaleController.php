<?php

namespace App\Http\Controllers;

use App\Models\Sale;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    public function index()
    {
        return Sale::with('responsible')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'event_type' => 'required|string',
            'amount' => 'required|numeric',
            'responsible_id' => 'nullable|exists:collaborators,id',
            'date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        return Sale::create($request->all());
    }

    public function show($id)
    {
        return Sale::with('responsible')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $sale = Sale::findOrFail($id);
        $sale->update($request->all());

        return $sale;
    }

    public function destroy($id)
    {
        Sale::findOrFail($id)->delete();

        return response()->json(['message' => 'Venta eliminada']);
    }
}
