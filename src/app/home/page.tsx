'use client'
import Cart from "@/components/cart";
import { useAllProductsQuery } from "@/redux/api/foodApi"


export interface TProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    image: string;
    currency: "BDT" | "USD";
  }

  

const Products = () => {
    const {data} = useAllProductsQuery(undefined)

    
  return (
    <div className="px-3 md:px-14 lg:px-24  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16">
      {data?.data?.map((product: TProduct) => (
        <Cart key={product._id} product={product} />
      ))}
    </div>
  )
}

export default Products