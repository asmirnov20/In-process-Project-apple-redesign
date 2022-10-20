import Image from "next/image"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { useMediaQuery } from "react-responsive"
import { urlFor } from "../../lib/client"
import { onAdd } from "../../redux/cartSlice"
import Button from "../Button"
import { motion } from 'framer-motion'
import { fadeButtons, fadeInRight, fadeInUp, stagger } from "../../animation/animations"

interface Props {
    banner: HeroBanner,
    products: Product[]
}

const Hero = ({ banner, products }: Props) => {

    const dispatch = useDispatch()
    const router = useRouter()

    const handleBuyNow = () => {
        const product = products.find(item => item.title === banner.title)

        if (product) {
            dispatch(onAdd({ product }))
        }
        router.push("/checkout")
    }

    const isTabletScreen = useMediaQuery({ query: '(max-width : 768px)' })

    return (
        <section className="sticky top-0 mx-auto flex  h-screen max-w-[1350px] items-center justify-between px-8" >

            <div className="space-y-12 m-auto">
                <motion.h1 className="space-y-3 text-5xl font-semibold tracking-wide lg:text-6xl xl:text-7xl" variants={stagger} initial='initial' animate='animate'>
                    <motion.span className="block bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text" variants={fadeInRight}>Powered</motion.span>
                    <motion.span className="block" variants={fadeInRight}>By Intellect</motion.span>
                    <motion.span className="block" variants={fadeInRight}>Driven By Values</motion.span>
                </motion.h1>

                <motion.div className="md:space-x-8 flex items-center" variants={fadeButtons}>
                    <Button title='Buy Now' onClick={handleBuyNow} hidden={isTabletScreen ? true : false} />
                    <a className="link" href="https://www.apple.com/iphone-14-pro/" target='_blank'>Learn More</a>
                </motion.div>
            </div>

            <motion.div className="relative hidden h-[450px] w-[450px] transition-all duration-500 md:inline lg:h-[650px] lg:w-[600px]" variants={fadeInUp} initial='initial' animate='animate'>
                <Image src={urlFor(banner.image).url()} layout="fill" objectFit="contain" />
            </motion.div>

        </section >
    )
}

export default Hero

