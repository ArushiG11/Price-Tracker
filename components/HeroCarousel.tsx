"use client"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image'

const hero_components = [
    {imgurl:'/assets/images/hero-1.svg', alt: 'SmartWatch'},
    {imgurl:'/assets/images/hero-2.svg', alt: 'Bag'},
    {imgurl:'/assets/images/hero-3.svg', alt: 'Lamp'},
    {imgurl:'/assets/images/hero-4.svg', alt: 'Air Fryer'},
    {imgurl:'/assets/images/hero-5.svg', alt: 'Chair'}
]
const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
      showThumbs= {false}
      infiniteLoop
      showStatus={false}
      autoPlay={true}
      interval={2000}
      showArrows={false}
      >
        {hero_components.map((component)=>(
            <Image
                src={component.imgurl}
                alt={component.alt} 
                key={component.alt} 
                width={484} 
                height={484} 
                className='object-contain' 
            />
            ))}
              
                
  </Carousel>

  <Image src = 'assets/icons/hand-drawn-arrow.svg'
  alt='arrow'
  width = {175}
  height = {175}
  className="max-xl:hidden absolute -left-[15%] bottom-0 z-0" />
    </div>

  )
}

export default HeroCarousel
