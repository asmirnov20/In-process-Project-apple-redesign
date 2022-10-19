import { useDispatch } from "react-redux"
import { increment, decrement, removeFromCart } from "../../redux/cartSlice"

interface Props {
    quantity: number,
    id: string
}

const QuantityCounter = ({ quantity, id }: Props) => {

    const dispatch = useDispatch()

    const increaseNumber = () => dispatch(increment({ id }))

    const decreaseNumber = () => {
        dispatch(decrement({ id }))
        if (quantity == 1) {
            dispatch(removeFromCart({ id }))
        }
    }

    return (
        <div className="h-10 w-32 flex justify-center">
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
    )
}

export default QuantityCounter