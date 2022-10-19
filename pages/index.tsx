import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Home page/Hero'
import CartIcon from '../components/Home page/CartIcon'
import TabGroup from '../components/Home page/TabGroup';
import Product from '../components/Home page/Product'
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

  // filter by category and render requested products
  const filterProducts = (category: number) => {

    return products
      .filter(item => item.category._ref === categories[category]._id)
      .map(item =>

        <Product product={item} key={item._id} />
      )
  }

  return (
    <div>
      <Head>
        <title>Apple shop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className='relative h-[200vh] bg-[#E7ECEE]'>
        <Hero banner={heroBanner[0]} products={products} />
      </main>

      <section className="relative z-40 -mt-[100vh] min-h-screen bg-[#1B1B1B]">
        <TabGroup categories={categories} filterProducts={filterProducts} />
        <CartIcon />
      </section>

    </div>
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


