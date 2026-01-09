<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

class ExpenseController extends Controller
{
    public function index()
    {
        return Expense::with('responsible')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'concept' => 'required|string',
            'amount' => 'required|numeric',
            'responsible_id' => 'nullable|exists:collaborators,id',
            'date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        return Expense::create($request->all());
    }

    public function show($id)
    {
        return Expense::with('responsible')->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $expense = Expense::findOrFail($id);
        $expense->update($request->all());

        return $expense;
    }

    public function destroy($id)
    {
        Expense::findOrFail($id)->delete();

        return response()->json(['message' => 'Gasto eliminado']);
    }
}
