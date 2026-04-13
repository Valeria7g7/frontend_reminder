import { useEffect, useState } from 'react';
import ProductResource from '../resources/Product.resource';
import type { IProduct } from '../interface/Product.interface';

export default function ProductListPage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await ProductResource.search('');
            setProducts(data as IProduct[]);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
                Cargando...
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6">

                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Productos
                </h1>

                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">

                        {/* HEADER */}
                        <thead className="bg-gray-200 text-gray-700">
                            <tr>
                                <th className="px-4 py-3 text-left border-b">Nombre</th>
                                <th className="px-4 py-3 text-left border-b">Precio</th>
                                <th className="px-4 py-3 text-left border-b">Descripción</th>
                            </tr>
                        </thead>

                        {/* BODY */}
                        <tbody className="text-gray-700">
                            {products.map((product) => (
                                <tr
                                    key={product.id}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3">
                                        {product.name}
                                    </td>
                                    <td className="px-4 py-3 font-semibold text-green-600">
                                        ${product.price}
                                    </td>
                                    <td className="px-4 py-3">
                                        {product.description ?? '—'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}