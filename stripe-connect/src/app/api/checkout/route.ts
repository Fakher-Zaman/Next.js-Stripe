import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const getActiveProducts = async () => {
    const checkProducts = await stripe.products.list();
    const availableProducts = checkProducts.data.filter(
        (product: any) => product.active === true
    );
    return availableProducts;
};

export const POST = async (request: any) => {
    const { products } = await request.json();
    const data: Product[] = products;

    let activeProducts = await getActiveProducts();

    try {
        for (const product of data) {
            const stripeProduct = activeProducts?.find(
                (stripeProduct: any) =>
                    stripeProduct?.name?.toLowerCase() === product?.name?.toLowerCase()
            );

            if (!stripeProduct) {
                await stripe.products.create({
                    name: product.name,
                    default_price_data: {
                        currency: 'eur',
                        unit_amount: product.price * 100, // Convert price to cents
                    },
                });
            }
        }
    } catch (error) {
        console.error("Error in creating a new product", error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }

    activeProducts = await getActiveProducts();
    let stripeItems: any = [];

    for (const product of data) {
        const stripeProduct = activeProducts?.find(
            (prod: any) => prod?.name?.toLowerCase() === product?.name?.toLowerCase()
        );

        if (stripeProduct) {
            stripeItems.push({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: stripeProduct.name,
                    },
                    unit_amount: product.price * 100, // Convert to cents
                },
                quantity: product.quantity,
            });
        }
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card', 'klarna'],
            line_items: stripeItems,
            mode: 'payment',
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Error in creating checkout session", error);
        return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
    }
};