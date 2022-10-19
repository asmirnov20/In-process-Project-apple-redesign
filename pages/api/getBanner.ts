import type { NextApiRequest, NextApiResponse } from 'next'
import { groq } from 'next-sanity'
import { sanityClient } from '../../lib/client'

const query = groq`*[_type == 'banner'] {
    ...
}`

type Data = {
    banner: HeroBanner
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const banner = await sanityClient.fetch(query)
    res.status(200).json({ banner })
}