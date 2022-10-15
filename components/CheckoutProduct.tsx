import { ChevronDownIcon } from "@heroicons/react/outline"
import Image from "next/image"
import { urlFor } from '../lib/client'
import Currency from 'react-currency-formatter'
import { useDispatch } from "react-redux"
import { removeFromCart, toggleItemQuantity } from "../redux/cartSlice"
import { useState } from 'react'
import toast from "react-hot-toast"


interface Props {
    item: Product,
    id: string
}

const CheckoutProduct = ({ item, id }: Props) => {

    const { title, image, quantity, description } = item
    const [showDetails, setShowDetails] = useState(false)
    const dispatch = useDispatch()

    const removeItem = () => {
        dispatch(removeFromCart({ id }))

        toast.error(`${title} removed from Cart`, {
            position: "bottom-center"
        })
    }

    const toggleDetails = () => {
        setShowDetails(prev => !prev)
    }

    const getPrice = (product: Product) => {
        return product.quantity * product.price
    }

    const increaseNumber = () => dispatch(toggleItemQuantity({ id, value: "increment" }))

    const decreaseNumber = () => {
        dispatch(toggleItemQuantity({ id, value: "decrement" }))
        if (quantity == 1) {
            dispatch(removeFromCart({ id }))
        }
    }


    return (
        <div className="flex flex-col gap-x4 border-b border-gray-300 pb-5 lg:flex-row lg:items-center">
            <div className="relative h-44 w-44">
                <Image
                    src={urlFor(image && image[0]).url()}
                    layout='fill'
                    objectFit="contain"
                />
            </div>
            <div className="flex flex-1 items-end lg:items-center">
                <div className="flex-1 space-y-4 ">

                    {/* Name, Quantity and Price Part */}
                    <div className="flex text-xl lg:flex-row lg:text-2xl justify-between">
                        <h4 className="font-semibold  inline-block  lg:w-48 ">
                            {title}
                        </h4>

                        {/* Quantity input */}
                        <div className="h-10 w-32 flex">
                            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1 ">
                                <button className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none" onClick={decreaseNumber}>
                                    <span className="m-auto text-2xl font-thin" >
                                        −
                                    </span>
                                </button>
                                <input
                                    className="outline-none text-center bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 border-x-2 border-gray-400 caret-transparent select-none -px-4 w-12  "
                                    value={quantity}
                                />
                                <button className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer" onClick={increaseNumber}>
                                    <span className="m-auto text-2xl font-thin">
                                        +
                                    </span>
                                </button>
                            </div>
                        </div>
                        <h4 className="text-xl font-semibold lg:text-2xl">
                            <Currency
                                quantity={getPrice(item)}
                            />
                        </h4>
                    </div>

                    <div className="flex justify-between ">
                        <div className="relative">
                            <p
                                className="flex cursor-pointer items-end text-blue-500 hover:underline"
                                onClick={toggleDetails}
                            >
                                Show product details
                                <ChevronDownIcon className="h-6 w-6" />
                            </p>
                            {showDetails && (
                                <p className=" absolute block text-justify -bottom-19 ">
                                    {description}
                                </p>
                            )}
                        </div>
                        <button
                            onClick={removeItem}
                            className='text-blue-500 hover:underline'
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div >
        </div>
    )
}
export default CheckoutProduct