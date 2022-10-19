import { ShoppingCartIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { urlFor } from '../../lib/client'
import { onAdd } from '../../redux/cartSlice'

interface Props {
    product: Product,
}

const Product = ({ product }: Props) => {

    const dispatch = useDispatch()
    const { title, price, image } = product

    const addToCart = () => {
        dispatch(onAdd({ product }))

        toast.success(`${title} added to Cart`, {
            position: 'bottom-center',
        })
    }

    return (
        <div className="flex h-fit w-[300px] select-none flex-col space-y-3 rounded-xl bg-[#35383C] p-8 md:h-[500px] md:w-[400px] md:p-10">
            <div className="relative h-64 w-full md:h-72">
                <Image
                    src={urlFor(image[0]).url()}
                    layout="fill"
                    objectFit="contain"
                />
            </div>

            <div className="flex flex-1 items-center justify-between space-x-3">
                <div className="space-y-2 text-xl text-white md:text-2xl">
                    <p>{title}</p>
                    <p className='text-[#d2d259]' >${price}</p>
                </div>

                <div
                    className="flex h-16 w-16 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 md:h-[70px] md:w-[70px] duration-200 hover:scale-110"
                    onClick={addToCart}
                >
                    <ShoppingCartIcon className="h-8 w-8 text-white " />
                </div>
            </div>
        </div>
    )
}

export default Product