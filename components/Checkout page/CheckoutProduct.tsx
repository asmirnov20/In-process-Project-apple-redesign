import { ChevronDownIcon, XCircleIcon } from "@heroicons/react/outline"
import Image from "next/image"
import { urlFor } from '../../lib/client'
import Currency from 'react-currency-formatter'
import { useDispatch } from "react-redux"
import { removeFromCart } from "../../redux/cartSlice"
import { useState } from 'react'
import toast from "react-hot-toast"
import QuantityCounter from "./QuantityCounter"


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

    return (
        <div className="flex flex-col gap-x4 border-b border-gray-300 pb-5 lg:flex-row lg:items-center">
            <div className="relative h-96 w-96 m-auto lg:h-44 lg:w-44 lg:m-0">
                <Image
                    src={urlFor(image && image[0]).url()}
                    layout='fill'
                    objectFit="contain"
                />
            </div>

            <div className="flex flex-1 justify-between flex-row">
                <div className="flex text-xl flex-col lg:text-2xl justify-between space-y-8 md:w-[23%]">
                    <h4 className="font-semibold ">
                        {title}
                    </h4>
                    <QuantityCounter quantity={quantity} id={id} />
                </div>
                <p className="text-sm text-justify  m-auto w-[55%] hidden md:inline-block">
                    {description}
                </p>
                <div className="flex justify-between flex-col items-end w-[20%]">
                    <XCircleIcon className="h-8 w-8 cursor-pointer text-red-600 duration-200 hover:scale-125" onClick={removeItem} />
                    <h4 className="text-xl font-semibold lg:text-2xl">
                        <Currency
                            quantity={getPrice(item)}
                        />
                    </h4>
                </div>
            </div>
        </div>
    )
}
export default CheckoutProduct