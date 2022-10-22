import { Tab } from '@headlessui/react'
import Product from './Product'
import { motion } from 'framer-motion'
import { useState } from 'react';

interface Props {
    categories: Category[],
    products: Product[]
}

const TabGroup = ({ categories, products }: Props) => {

    const [focused, setFocused] = useState<string | null>();
    const [selected, setSelected] = useState(categories[0].title);

    // filter by category and render requested products
    const filterProducts = (category: number) => {

        return products
            .filter(item => item.category._ref === categories[category]._id)
            .map(item =>

                <Product product={item} key={item._id} />
            )
    }

    return (
        <div className='space-y-10 py-16'>
            <h1 className="text-center text-4xl font-medium tracking-wide text-white md:text-5xl">
                New Promos
            </h1>

            <Tab.Group>
                <Tab.List className="flex justify-center" onMouseLeave={() => setFocused(null)} >
                    {categories.map(category => (
                        <Tab
                            key={category._id}
                            id={category._id}
                            onClick={() => setSelected(category.title)}
                            onFocus={() => setFocused(category.title)}
                            onMouseEnter={() => setFocused(category.title)}
                            className='hitespace-nowrap rounded-t-lg py-2 px-5 text-md font-light outline-none md:my-2 md:mx-1 md:text-lg relative z-10  text-[#d8d87f]'
                        >
                            <span className='z-10 relative'>{category.title}</span>

                            {/* Tab switching animations */}
                            {focused === category.title
                                ? (
                                    <motion.div
                                        transition={{
                                            layout: {
                                                duration: 0.2,
                                                ease: 'easeOut',
                                            },
                                        }}
                                        className='absolute -bottom-1 left-0 right-0 w-auto h-[110%] bg-[#23272F] rounded-[8px] -z-10'
                                        layoutId="highlight"
                                    />
                                )
                                : null}

                            {selected === category.title
                                ? (
                                    <motion.div
                                        className='absolute -bottom-4 left-[25%] right-0 h-2 w-1/2  bg-[#5686F5] rounded-[8px] z-1000'
                                        layoutId="underline" />
                                )
                                : null}
                        </Tab>
                    ))}
                </Tab.List>

                <Tab.Panels className="mx-auto max-w-fit pt-10 pb-24 sm:px-4" >
                    <Tab.Panel className="tabPanel">{filterProducts(0)}</Tab.Panel>
                    <Tab.Panel className="tabPanel">{filterProducts(1)}</Tab.Panel>
                    <Tab.Panel className="tabPanel">{filterProducts(2)}</Tab.Panel>
                    <Tab.Panel className="tabPanel">{filterProducts(3)}</Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div >
    )
}

export default TabGroup

