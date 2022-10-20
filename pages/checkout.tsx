import Header from '../components/Header'
import { useSelector } from 'react-redux'
import { selectCartItems, selectCartTotalPrice } from '../redux/cartSlice'
import Button from '../components/Button'
import { useRouter } from 'next/router'
import CheckoutProduct from '../components/Checkout page/CheckoutProduct'
import Charge from '../components/Charge'
import CheckoutOptions from '../components/Checkout page/CheckoutOptions'
import { motion } from 'framer-motion'


const checkout = () => {

    const items = useSelector(selectCartItems)
    const router = useRouter()
    const totalPrice = useSelector(selectCartTotalPrice)

    return (
        <motion.div className='min-h-screen overflow-hidden bg-[#E7ECEE]'>

            <Header />

            <main className='mx-auto max-w-5xl pb-24'>

                <div className='flex flex-col items-center'>
                    <h1 className='my-4 text-3xl font-semibold lg:text-4xl'>
                        {items.length > 0 ? 'Review Your Bag' : 'Your Bag is Empty'}
                    </h1>
                    <p className='my-4'>Free delivery and returns</p>
                </div>

                {items.length > 0
                    ? (
                        <div className='mx-5 md:mx-8'>
                            {items.map(product => (
                                <CheckoutProduct id={product?._id} key={product?._id} item={product} />
                            ))}

                            <motion.div className="my-12 mt-6 ml-auto" layout>
                                <Charge totalPrice={totalPrice} />
                                <CheckoutOptions totalPrice={totalPrice} items={items} />
                            </motion.div>
                        </div>
                    )
                    : (
                        <div className='flex justify-center'>
                            <Button
                                title='Continue Shopping'
                                onClick={() => router.push('/')}
                            />
                        </div>
                    )}
            </main >
        </motion.div >


    )
}

export default checkout