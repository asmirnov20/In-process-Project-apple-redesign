import Button from '../Button'
import Currency from 'react-currency-formatter'
import { useState } from 'react'
import Stripe from 'stripe'
import { fetchPostJSON } from '../../lib/utils/api-helpers'
import getStripe from '../../lib/utils/getStripe'

interface Props {
    totalPrice: number,
    items: Product[]
}

const CheckoutOptions = ({ totalPrice, items }: Props) => {

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
    )
}

export default CheckoutOptions