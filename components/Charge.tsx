import Currency from 'react-currency-formatter'

interface Props {
    totalPrice: number,
    textStyle?: string
}

const Charge = ({ totalPrice, textStyle }: Props) => {

    return (
        <div className="divide-y divide-gray-300">
            <div className={`space-y-1 ${textStyle ? 'py-4' : 'pb-4'}`}>
                <div className={`flex justify-between ${textStyle ? textStyle : null}`}>
                    <p className={`${textStyle ? 'text-[gray]' : null}`}>Subtotal:</p>
                    <p className="font-medium">
                        <Currency quantity={totalPrice} />
                    </p>
                </div>
                <div className={`flex justify-between ${textStyle ? textStyle : null}`}>
                    <p className={`${textStyle ? 'text-[gray]' : null}`}>Discount:</p>
                    <p className='text-[gray]'>No discount </p>
                </div>
                <div className={`flex justify-between ${textStyle ? textStyle : null}`}>
                    <p className={`${textStyle ? 'text-[gray]' : null}`}>Shipping:</p>
                    <p className="font-medium">
                        <Currency quantity={20} currency="USD" />
                    </p>
                </div>
            </div>
            <div className="flex justify-between pt-4 text-xl font-semibold">
                <p>Total</p>
                <p className="flex items-center gap-x-2 text-xs text-[gray]">
                    <span className="text-xl font-medium text-black">
                        <Currency quantity={totalPrice + 20} />
                    </span>
                </p>
            </div>
        </div >
    )
}

export default Charge