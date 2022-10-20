import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Home page/Hero'
import CartIcon from '../components/Home page/CartIcon'
import TabGroup from '../components/Home page/TabGroup';
import { Session } from 'next-auth'
import type { GetServerSideProps } from 'next'
import { fetchCategories, fetchProducts } from '../lib/utils'
import { getSession } from 'next-auth/react'
import fetchBanner from '../lib/utils/fetchBanner';
import { motion } from 'framer-motion'

interface Props {
  heroBanner: HeroBanner[]
  categories: Category[],
  products: Product[],
  session: Session | null
}


const Home = ({ heroBanner, categories, products }: Props) => {

  return (
    <motion.div exit={{ opacity: 0 }}>
      <Head>
        <title>Apple shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className='relative h-[200vh] bg-[#E7ECEE]'>
        <Hero banner={heroBanner[0]} products={products} />
      </main>

      <section className="relative z-40 -mt-[100vh] min-h-screen bg-[#1B1B1B]">
        <TabGroup categories={categories} products={products} />
        <CartIcon />
      </section>

    </motion.div>
  );
};

export default Home

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {

  const heroBanner = await fetchBanner()
  const categories = await fetchCategories()
  const products = await fetchProducts()
  const session = await getSession(context)

  return {
    props: {
      heroBanner,
      categories,
      products,
      session
    }
  }
}


