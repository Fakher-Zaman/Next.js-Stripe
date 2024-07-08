import Cart from "@/components/Cart";
import Product from "@/components/Product";

const products: Product[] = [
  {
    id: "1",
    name: 'GoPro',
    price: 57,
    quantity: 0,
  },
  {
    id: "2",
    name: 'Triped',
    price: 7.99,
    quantity: 0,
  },
  {
    id: "3",
    name: 'Bag',
    price: 4.99,
    quantity: 0,
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-10">
      <div className="flex flex-col gap-8">
        <h1 className="sm:text-3xl text-2xl text-center">E-Commerce Cart System</h1>
        <div className="grid md:grid-cols-3 gap-4">
          {products.map((product) => {
            return (
              <Product key={product.id} product={product} />
            );
          })}
        </div>
        <Cart />
      </div>
    </main>
  );
}
