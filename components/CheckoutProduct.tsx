import { ChevronDownIcon } from "@heroicons/react/outline"
import Image from "next/image"
import { urlFor } from '../lib/client'
import Currency from 'react-currency-formatter'
import { useDispatch } from "react-redux"
import { removeFromCart } from "../redux/cartSlice"
import { useState } from 'react'


interface Props {
    item: Product,
    id: string
}

const CheckoutProduct = ({ item, id }: Props) => {

    const [showDetails, setShowDetails] = useState(false)
    const dispatch = useDispatch()

    const removeItem = () => {
        console.log('removed');

        dispatch(removeFromCart({ id }))
    }

    const toggleDetails = () => {
        setShowDetails(prev => !prev)
    }

    // console.log(item.description.children[0].text);


    return (
        <div className="flex flex-col gap-x4 border-b border-gray-300 pb-5 lg:flex-row lg:items-center">
            <div className="relative h-44 w-44">
                <Image
                    src={urlFor(item.image[0]).url()}
                    layout='fill'
                    objectFit="contain"
                />
            </div>

            <div className="flex flex-1 items-end lg:items-center">
                <div className="flex-1 space-y-4">
                    <div className="flex flex-col gap-x-8 text-xl lg:flex-row lg:text-2xl">
                        <h4 className="font-semibold lg:w-96">
                            {item.title}
                        </h4>
                        <p className="flex items-end gap-x-1 font-semibold">
                            {/* {item.quantity} */}4
                            <ChevronDownIcon className="h6 w-6 text-blue-500 cursor-pointer" />
                        </p>
                    </div>

                    <p className="flex cursor-pointer items-end text-blue-500 hover:underline">
                        Show product details
                        <ChevronDownIcon className="h-6 w-6" onClick={toggleDetails} />
                        {showDetails && (
                            <p>
                                {/* {item.description.children[0].text} */}
                            </p>
                        )}
                    </p>
                </div>

                <div className="flex flex-col items-end space-y-4">
                    <h4 className="text-xl font-semibold lg:text-2xl">
                        {/* <Currency
                            quantity={item.map((product: string) => product.price * product.quantity)}
                        /> */}
                    </h4>
                    <button
                        onClick={removeItem}
                        className='text-blue-500 hover:underline'
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CheckoutProduct