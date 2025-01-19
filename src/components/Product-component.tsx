import { Link } from "react-router-dom";
import { Product } from "../model/Product";
export function ProductApp(product: Product) {
    return (
        <Link key={product.id} to={`/product/${product.id}`} className="group">
            <div className="h-full overflow-hidden rounded-2xl border bg-white shadow-none transition duration-300 hover:shadow-lg">
                <div className="h-64 overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="size-full object-contain px-6 py-8"
                    />
                </div>
                <div className="flex flex-col justify-between gap-3 px-4 py-8">
                    <h6 className="line-clamp-2 text-sm group-hover:text-pink-800">
                        {product.title}
                    </h6>
                    <p className="text-lg font-bold">{product.price.toFixed(2)} MAD</p>
                </div>
            </div>
        </Link>

    );
}
