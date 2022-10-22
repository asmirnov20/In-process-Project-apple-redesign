import Image from 'next/image'

interface Props {
    product: StripeProduct,
    priceFormatter: Intl.NumberFormat
}

const SuccessProduct = ({ product, priceFormatter }: Props) => {
    return (
        <div className="flex items-center space-x-4 text-sm font-medium">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-md border border-gray-300 bg-[#F1F1F1] text-xs text-white">
                <div className="relative h-7 w-7 animate-bounce rounded-md">
                    <Image
                        src="https://rb.gy/vsvv2o"
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[gray] text-xs">
                    {product.quantity}
                </div>
            </div>
            <p className="flex-1">{product.description}</p>
            <p>
                {priceFormatter.format(product.price.unit_amount / 100)}
            </p>
        </div>
    )
}

export default SuccessProduct
