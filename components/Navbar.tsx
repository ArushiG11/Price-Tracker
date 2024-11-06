import Link from 'next/link'
import Image from 'next/image'
import React from 'react'


const navitems = [
    { src: '/assets/icons/search.svg', alt: 'Search' },
    { src: '/assets/icons/black-heart.svg', alt: 'Like' },
    { src: '/assets/icons/user.svg', alt: 'Profile' },
]
const Navbar = () => {
  return (
    <header className='w-full'>
        <nav className='nav'>
            <Link href='/' className='flex item-center gap-1'>
                <Image 
                    src='/assets/icons/price-tag-logo.svg'
                    alt='Pricewatch' 
                    width = {28}
                    height={28} 
                />
                <p className='nav-logo'>
                    Price<span className='text-teal-500'>Watch</span>
                </p>
            </Link>

        <div className='flex item-center gap-5'>
            {navitems.map((icon) => (
                <Image 
                    key={icon.alt}
                    src={icon.src}
                    alt={icon.alt} 
                    width={28}
                    height={28} 
                    className='object-contain'
                />
                ))}
        </div>
        </nav>
    </header>
  )
}

export default Navbar


