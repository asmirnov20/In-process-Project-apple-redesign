interface Category {
    _id: string;
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    _type: 'category';
    slug: {
        _type: 'slug';
        current: string;
    };
    title: string
}

interface Product {
    _id: string;
    _createdAt: string;
    _updatedAt: string;
    _rev: string;
    _type: 'product';
    price: number;
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
    _key: string;
    _type: "image";
    asset: {
        url: string;
    };
}