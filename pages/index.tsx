import type { GetServerSideProps} from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import { fetchCategories, fetchProducts } from '../lib/utils'
import { Tab } from '@headlessui/react'
import Product from '../components/Product'
import Cart from '../components/Cart'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../redux/cartSlice'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'

interface Props {
  categories: Category[],
  products: Product[],
  session: Session | null
}

const Home = ({ categories, products }: Props) => {

  const filterProducts = (category: number) => {
    // filter by category
    return products
      .filter(item => item.category._ref === categories[category]._id)
      .map(item =>
        <Product product={item} key={item._id} />
      )
  }

  return (
    <div>
      <Head>
        <title>Apple redesign</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Cart />

      <main className='relative h-[200vh] bg-[#E7ECEE]'>
        <Hero />
      </main>
      <section className="relative z-40 -mt-[100vh] min-h-screen bg-[#1B1B1B]">
        <div className='space-y-10 py-16'>
          <h1 className="text-center text-4xl font-medium tracking-wide text-white md:text-5xl">
            New Promos
          </h1>

          <Tab.Group>
            <Tab.List className="flex justify-center">
              {categories.map(category => (
                <Tab
                  key={category._id}
                  id={category._id}
                  className={({ selected }) =>
                    `whitespace-nowrap rounded-t-lg py-3 px-5 text-sm font-light outline-none md:py-4 md:px-6 md:text-base ${selected
                      ? "borderGradient bg-[#35383C] text-white"
                      : "border-b-2 border-[#35383C] text-[#747474]"
                    }`
                  }
                >
                  {category.title}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mx-auto max-w-fit pt-10 pb-24 sm:px-4">
              <Tab.Panel className="tabPanel">{filterProducts(0)}</Tab.Panel>
              <Tab.Panel className="tabPanel">{filterProducts(1)}</Tab.Panel>
              <Tab.Panel className="tabPanel">{filterProducts(2)}</Tab.Panel>
              <Tab.Panel className="tabPanel">{filterProducts(3)}</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </section>
    </div>
  );
};

export default Home


export const getServerSideProps: GetServerSideProps<Props> = async (context) => {

  const categories = await fetchCategories()
  const products = await fetchProducts()
  const session = await getSession(context)

  return {
    props: {
      categories,
      products,
      session
    }
  }
}