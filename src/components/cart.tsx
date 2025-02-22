'use client'
import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import Link from "next/link";

interface TProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  currency: "BDT" | "USD";
}


interface CartProps {
  product: TProduct;
}

const Cart: React.FC<CartProps> = ({ product }) => {

  console.log({ product })



  return (
    <div className="relative group p-4 flex flex-col items-center ">

      <Link href={`/home/${product._id}`}>
      <div>
        <Image
          src={product?.image}
          width={200}
          height={500}
          alt={product?.name}
        />
      </div>
      </Link>

      <div className="absolute  bottom-[-70px]  left-0 bg-white p-2 w-full transition-transform duration-300 transform translate-y-0 group-hover:translate-y-[-40px]">
        <p className="font-semibold mt-2 text-black_color ">{product.name}</p>
        <p className="text-black_color mt-2">${product.price}</p>

        <div className="flex justify-between items-center mt-1">

          <div className="flex items-center gap-2 ">
            <FaCartArrowDown className="text-primary_color opacity-0 group-hover:opacity-95 transition-opacity" />
            <button className="text-primary_color opacity-0 group-hover:opacity-95 transition-opacity">
              Add to cart
            </button>
          </div>

          <span className="opacity-0 group-hover:opacity-95 transition-opacity" > <FaEyeSlash /> </span>
          <span className="opacity-0 group-hover:opacity-95 transition-opacity" > <FaRegHeart /> </span>
        </div>
      </div>
    </div>

  );
};

export default Cart;
