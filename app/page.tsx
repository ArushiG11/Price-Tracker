import Image from "next/image"
import Searchbar from "@/components/Searchbar"
import HeroCarousel from "@/components/HeroCarousel"

const Home = () => {
  return (
    <>
      <section className = 'px-6 md:px-20 py-24'>
        <div className = 'flex max-xl:flex-col gap-16'>
          <div className = 'flex flex-col justify-center'>
            <p className="small-text">
            Unlock the Best Deals
            <Image 
              src='/assets/icons/arrow-right.svg'
              alt='arrow-right'
              width = {16}
              height = {16}
              className="icon"
              // style={{
              //   filter: 'invert(30%) sepia(1) saturate(10) hue-rotate(180deg)', // Adjust for desired color
              // }}
              />
            </p>
            <h1 className = 'head-text'>
            Unlock the Power of    
            <span className="text-teal-500"> PriceWatch</span>
              </h1>
            <p className = 'mt-6'>
            Prices Fluctuate, Your Savings Shouldn't. Track your favorite products and save money on your online shopping.
            </p>
            <Searchbar/>

          </div>
          {/* <div className = 'flex-shrink-0'>
            <Image 
              src='/assets/images/price-watch-hero.png' 
              alt='Price Watch Hero' 
              width={400} 
              height={300} 
              className='object-contain' 
            />
          </div> */}
          <HeroCarousel/>
        </div>
      </section>
      <section className="trending-section">
        <h2 className="section-text">
          Trending Now
        </h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {['Iphone', 'Airposd', 'Insax Cam'].map(
            (product, index)=>(
              <div key = {index}>{product}</div>
            )
          )}
        </div>
      </section>
    </>
  )
}

export default Home
