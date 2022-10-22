import Image from "next/image"
import Link from "next/link"
import { ShoppingBagIcon, UserIcon, } from '@heroicons/react/outline'
import { useSelector } from "react-redux"
import { selectCartItems, selectTotalQuantity } from "../redux/cartSlice"
import { signIn, signOut, useSession } from "next-auth/react";


const Header = () => {

    const items = useSelector(selectCartItems)
    const quantity = useSelector(selectTotalQuantity)
    const { data: session } = useSession()

    return (
        <header className="sticky top-0 z-30 flex w-full items-center justify-between bg-[#E7EcEE] p-4">
            <div className="flex items-center justify-center w-1/6">
                <Link href='/'>
                    <div className="relative h-10 w-6 cursor-pointer opacity-75 transition hover:opacity-100  duration-200 hover:scale-110">
                        <Image
                            src="https://rb.gy/vsvv2o"
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </Link>
            </div>

            <div className="hidden flex-1 items-center justify-center gap-x-8 md:flex xl:px-8 ">
                <a className="headerLink">Product</a>
                <a className="headerLink">Explore</a>
                <a className="headerLink">Support</a>
                <a className="headerLink">Business</a>
            </div>

            <div className="flex items-center justify-center gap-x-4 md:w-1/5 ">
                <Link href='/checkout'>
                    <div className="relative cursor-pointer duration-200 hover:scale-110">
                        {items.length > 0 && (
                            <span className="absolute -right-2 -top-1 z-50 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-|10px| text-white "
                            >
                                {quantity}
                            </span>
                        )}
                        <ShoppingBagIcon className="headerIcon" />
                    </div>
                </Link>

                {session ? (
                    <Image
                        src={
                            session.user?.image ||
                            "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                        }
                        alt=""
                        className="cursor-pointer rounded-full"
                        width={34}
                        height={34}
                        onClick={() => signOut()}
                    />
                ) : (
                    <UserIcon className="headerIcon duration-200 hover:scale-110" onClick={() => signIn()} />
                )}
            </div>
        </header >
    )
}

export default Header