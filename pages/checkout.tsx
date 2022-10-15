import Header from '../components/Header'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotalPrice } from '../redux/cartSlice'
import Button from '../components/Button'
import { useRouter } from 'next/router'
import CheckoutProduct from '../components/CheckoutProduct'
import Currency from 'react-currency-formatter'
import { ChevronDownIcon } from "@heroicons/react/outline"
import { useState } from 'react'
import Stripe from 'stripe'
import { fetchPostJSON } from '../lib/utils/api-helpers'
import getStripe from '../lib/utils/getStripe'


const checkout = () => {

    const items = useSelector(selectCartItems)
    const router = useRouter()
    const totalPrice = useSelector(selectCartTotalPrice)
    const [loading, setLoading] = useState(false)

    const createCheckoutSession = async () => {
        setLoading(true)

        const checkoutSession: Stripe.Checkout.Session = await fetchPostJSON('/api/checkout_sessions', { items: items })

        // Internal Server Error
        if ((checkoutSession as any).statusCode === 500) {
            alert((checkoutSession as any).message)
            return
        }

        // Redirect to Checkout
        const stripe = await getStripe()
        const { error } = await stripe!.redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so it's a parameter here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: checkoutSession.id,
        })

        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message 
        alert(error.message);

        setLoading(false);
    }

    return (
        <div className='min-h-screen overflow-hidden bg-[#E7ECEE]'>
            <Header />

            <main className='mx-auto max-w-5xl pb-24'>
                <div className='flex flex-col items-center'>
                    <h1 className='my-4 text-3xl font-semibold lg:text-4xl'>
                        {items.length > 0 ? 'Review Your Bag' : 'Your Bag is Empty'}
                    </h1>
                    <p className='my-4'>Free delivery and returns</p>
                </div>

                {/* Products in Cart */}
                {items.length === 0
                    ? (
                        <div className='flex justify-center'>
                            <Button
                                title='Continue Shopping'
                                onClick={() => router.push('/')}
                            />
                        </div>

                    )
                    : (
                        <div className='mx-5 md:mx-8'>
                            {items.map(product => (
                                <CheckoutProduct id={product?._id} key={product?._id} item={product} />
                            ))}

                            {/* Bottom part */}
                            <div className="my-12 mt-6 ml-auto">
                                <div className="divide-y divide-gray-300">
                                    <div className="pb-4">
                                        <div className="flex justify-between">
                                            <p>Subtotal</p>
                                            <p>
                                                <Currency quantity={totalPrice} currency="USD" />
                                            </p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p>Shipping</p>
                                            <p>FREE</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="flex flex-col gap-x-1 lg:flex-row">
                                                Estimated tax for:{" "}
                                                <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
                                                    Enter zip code
                                                    <ChevronDownIcon className="h-6 w-6" />
                                                </p>
                                            </div>
                                            <p>$ -</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between pt-4 text-xl font-semibold">
                                        <h4>Total</h4>
                                        <h4>
                                            <Currency quantity={totalPrice} currency="USD" />
                                        </h4>
                                    </div>
                                </div>

                                <div className="my-14 space-y-4">
                                    <h4 className="text-xl font-semibold">
                                        How would you like to check out?
                                    </h4>
                                    <div className="flex flex-col gap-4 md:flex-row">
                                        <div className="order-2 flex flex-1 flex-col items-center rounded-xl bg-gray-200 p-8 py-12 text-center">
                                            <h4 className="mb-4 flex flex-col text-xl font-semibold">
                                                <span>Pay Monthly</span>
                                                <span>with Apple Card</span>
                                                <span>
                                                    $283.16/mo. at 0% APR<sup className="-top-1">◊</sup>
                                                </span>
                                            </h4>
                                            <Button title="Check Out with Apple Card Monthly Installments" />
                                            <p className="mt-2 max-w-[240px] text-[13px]">
                                                $0.00 due today, which includes applicable full-price
                                                items, down payments, shipping, and taxes.
                                            </p>
                                        </div>

                                        <div className="flex flex-1 flex-col items-center space-y-8 rounded-xl bg-gray-200 p-8 py-12 md:order-2">
                                            <h4 className="mb-4 flex flex-col text-xl font-semibold">
                                                Pay in full
                                                <span>
                                                    <Currency quantity={totalPrice} currency="USD" />
                                                </span>
                                            </h4>

                                            <Button
                                                noIcon
                                                loading={loading}
                                                title="Check Out"
                                                width="w-full"
                                                onClick={createCheckoutSession}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </main >
        </div >


    )
}

export default checkout