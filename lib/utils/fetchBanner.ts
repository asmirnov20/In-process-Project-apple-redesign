export const fetchBanner = async () => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getBanner`)
    const data = await response.json()

    const banner: HeroBanner = data.banner

    return banner
}

export default fetchBanner