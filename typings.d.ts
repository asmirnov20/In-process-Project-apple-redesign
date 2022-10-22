interface HeroBanner {
    _id: string,
    _type: 'banner'
    image: Image
    title: string,
}

interface Category {
    _id: string;
    _type: 'category';
    slug: {
        _type: 'slug';
        current: string;
    };
    title: string
}

interface Product {
    map: any;
    _id: string;
    _type: 'product';
    price: number;
    quantity: number;
    category: {
        _ref: string;
        _type: 'reference';
    };
    description: string;
    slug: {
        _type: 'slug';
        current: string;
    };
    title: string;
    image: Image[]
}

interface Image {
    asset: {
        url: string;
    };
}

interface StripeProduct {
    id: string;
    amount_discount: number;
    amount_subtotal: number;
    amount_tax: number;
    amount_total: number;
    currency: string;
    description: string;
    object: string;
    quantity: number;
    price: {
        unit_amount: number;
    };
}

type GetServerSideProps<
    P extends { [key: string]: any } = { [key: string]: any },
    Q extends ParsedUrlQuery = ParsedUrlQuery
    > = (
        context: GetServerSidePropsContext<Q>
    ) => Promise<GetServerSidePropsResult<P>>
