interface Props {
    totalPrice: number,
    textStyle?: string,
    priceFormatter: Intl.NumberFormat
}

const Charge = ({ totalPrice, textStyle, priceFormatter }: Props) => {

    return (
        <div className="divide-y divide-gray-300">
            <div className={`space-y-1 ${textStyle ? 'py-4' : 'pb-4'}`}>
                <div className={`flex justify-between ${textStyle ? textStyle : null}`}>
                    <p className={`${textStyle ? 'text-[gray]' : null}`}>Subtotal:</p>
                    <p className="font-medium">
                        <span>{priceFormatter.format(totalPrice)}</span>
                    </p>
                </div>
                <div className={`flex justify-between ${textStyle ? textStyle : null}`}>
                    <p className={`${textStyle ? 'text-[gray]' : null}`}>Discount:</p>
                    <p className='text-[gray]'>No discount </p>
                </div>
                <div className={`flex justify-between ${textStyle ? textStyle : null}`}>
                    <p className={`${textStyle ? 'text-[gray]' : null}`}>Shipping:</p>
                    <p className="font-medium">
                        <span>$20</span>
                    </p>
                </div>
            </div>
            <div className="flex justify-between pt-4 text-xl font-semibold">
                <p>Total</p>
                <p className="flex items-center gap-x-2 text-xs text-[gray]">
                    <span className="text-xl font-medium text-black">
                        <span>{priceFormatter.format(totalPrice + 20)}</span>
                    </span>
                </p>
            </div>
        </div >
    )
}

export default Charge