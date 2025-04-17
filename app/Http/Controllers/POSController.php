<?php
namespace App\Http\Controllers;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
class POSController extends Controller
{
    public function index()
    {
        return Inertia::render('POS/Index', [
            'products' => [
                [
                    'id' => 1,
                    'name' => 'Corner Desk Left Sit',
                    'description' => 'Ergonomic corner desk setup',
                    'price' => 97.75,
                    'image' => asset('storage/images/ARNTBFgediEGWxQoDuNjSAZEidU536NhvNeKLRZZ.png'),
                    'category' => 'Desks'
                ],
                [
                    'id' => 2,
                    'name' => 'Corner Desk Right Sit',
                    'description' => 'Right-handed corner desk configuration',
                    'price' => 169.05,
                    'image' => asset('storage/images/ARNTBFgediEGWxQoDuNjSAZEidU536NhvNeKLRZZ.png'),
                    'category' => 'Desks'
                ],
                [
                    'id' => 3,
                    'name' => 'Customizable Desk',
                    'description' => 'Adjustable height desk',
                    'price' => 920.46,
                    'image' => asset('storage/images/ARNTBFgediEGWxQoDuNjSAZEidU536NhvNeKLRZZ.png'),
                    'category' => 'Desks'
                ],
                // Add more sucts
            ],
            'categories' => [
                ['id' => 1, 'name' => 'Desks'],
                ['id' => 2, 'name' => 'Chairs'],
                ['id' => 3, 'name' => 'Storage'],
                ['id' => 4, 'name' => 'Accessories']
            ]
        ]);
    }

    public function createOrder(Request $request)
    {
        $validated = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|integer',
            'items.*.quantity' => 'required|numeric|min:0.01',
            'total' => 'required|numeric|min:0',
            'taxes' => 'required|numeric|min:0',
        ]);

        // Here you would typically:
        // 1. Create the order in your database
        // 2. Update inventory
        // 3. Calculate and update loyalty points
        // 4. Generate receipt/invoice

        return response()->json([
            'success' => true,
            'message' => 'Order created successfully',
            // Add any additional data you want to return
        ]);
    }
} 