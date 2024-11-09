import { getProducts } from "@/lib/actions";
import { redirect } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';
import { Product } from "@/types";
import { formatNumber } from "@/lib/utils";

type Props = {
    params: {id: string}
}

const ProductDetails = async ({params: {id}}: Props) => {
    const product: Product = await getProducts(id);

    if(!product) redirect('/');

  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
            <Image 
              src={product.image} 
              alt={product.title} 
              width={200} 
              height={200} 
              className='mx-auto'
            />
        </div>
        <div className="flex-1 flex flex-col">
            <div className="justify-between items-start gap-5 flex-wrap pb-6">
                <div className="flex flex-col gap3">
                    <p className="text-[28px] text-secondary font-semibold">
                        {product.title}
                    </p>
                    <Link 
                        href={product.url}
                        target="_blank"
                        className="text-base mt-3 ml-1 text-black opacity-50 hover:text-teal-500"
                    >
                        View Product Details
                    </Link>
                </div>
                <div className="flex items-center gap-3 my-3">
                    <div className="product-hearts">
                        <Image 
                            src='/assets/icons/red-heart.svg' 
                            alt='heart' 
                            width={20}
                            height={20} 
                        />
                        <p className="text-base font-semibold text-[#D46F77]">
                            {product.reviewsCount}
                        </p>
                    </div>
                    <div className="p-2 bg-white-200 rounded-10">
                        <Image
                            src='/assets/icons/bookmark.svg'
                            alt='bookmark'
                            width={20}
                            height={20}
                        />
                    </div>
                    <div className="p-2 bg-white-200 rounded-10">
                        <Image
                            src='/assets/icons/share.svg'
                            alt='share'
                            width={20}
                            height={20}
                        />
                    </div>
                </div>
            </div>
            <div className="product-info">
                <div className="flex flex-col gap-2">
                    <p className="text-[34px] text-secondary font-bold">
                        {product.currency} {formatNumber(product.currentPrice)}
                    </p>
                    {product.currentPrice !== product.originalPrice && (
                    <p className="text-[21px] text-secondary opacity-50 line-through">
                        {product.currency} {formatNumber(product.originalPrice)}
                    </p>
                )}
                </div>
                <div>
                    <div className="flex gap-3">
                        <div className="product-stars">
                            <Image 
                                src='/assets/icons/star.svg' 
                                alt='star' 
                                width={20}
                                height={20} 
                            />
                            <p className="text-sm font-semibold text-[#929BA9]">
                                {product.stars||'20'}
                            </p>
                        </div>
                        <div className="product-reviews">
                            <Image 
                                src='/assets/icons/comment.svg' 
                                alt='star' 
                                width={20}
                                height={20} 
                            />
                            <p className="text-sm font-semibold text-[#929BA9]">
                                {product.reviewsCount} Reviews
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
