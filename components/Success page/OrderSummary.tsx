import { ChevronDownIcon, ChevronUpIcon, ShoppingCartIcon } from "@heroicons/react/outline/"
import SuccessProduct from './SuccessProduct'
import { useMediaQuery } from "react-responsive"
import { useEffect, useState } from "react"
import Charge from "../Charge"

interface Props {
    products: StripeProduct[],
    priceFormatter: Intl.NumberFormat
}

const OrderSummary = ({ products, priceFormatter }: Props) => {

    const [showOrderSummary, setShowOrderSummary] = useState(false)

    // showOrderSummary is true for desktop but not for tablet or less
    const isTabletSize = useMediaQuery({ query: '(max-width : 1024px)' })

    useEffect(() => {
        setShowOrderSummary(isTabletSize ? false : true)
    }, [isTabletSize])

    const handleShowOrderSummary = () => {
        setShowOrderSummary(!showOrderSummary);
    };

    const subtotal = products.reduce((total: number, item: StripeProduct) => total += item.price.unit_amount / 100, 0)

    return (
        <section className="overflow-y-scroll border-y border-l border-gray-300 bg-[#FAFAFA] lg:order-2 lg:col-span-4 lg:h-screen lg:border-y-0 lg:pr-16 lg:pt-28 xl:pl-16">

            <div className={`w-full ${showOrderSummary && "border-b"} border-gray-300 text-sm`}>
                <div className="mx-auto flex max-w-xl items-center justify-between px-4 py-6">
                    <button
                        onClick={handleShowOrderSummary}
                        className="flex items-center space-x-2"
                    >
                        <ShoppingCartIcon className="h-6 w-6" />
                        <p>Order summary</p>
                        {showOrderSummary ? (
                            <ChevronUpIcon className="h-4 w-4" />
                        ) : (
                            <ChevronDownIcon className="h-4 w-4" />
                        )}
                    </button>

                    <p className="text-xl font-medium text-black">
                        {priceFormatter.format(subtotal + 20)}
                    </p>
                </div>
            </div>

            {showOrderSummary && (
                <div className="mx-auto max-w-xl divide-y border-gray-300 px-4 py-4 lg:mx-0 lg:max-w-lg lg:pl-12 lg:py-12">
                    <div className="space-y-4 pb-4">
                        {products.map(product => (
                            <SuccessProduct product={product} key={product.id} priceFormatter={priceFormatter} />
                        ))}
                    </div>

                    <Charge totalPrice={subtotal} textStyle={'text-sm'} priceFormatter={priceFormatter} />
                </div>
            )}
        </section>
    )
}

export default OrderSummary