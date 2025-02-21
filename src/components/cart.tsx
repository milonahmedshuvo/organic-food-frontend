import Image from "next/image"


const Cart = () => {

  return (
    <div className="relative group">

        <div>
            <Image src='https://htmldemo.net/jena/jena/assets/img/shop/2.webp' width={260} height={500} alt="items" />
        </div>
         
         <div className="absolute bottom-0 left-0 group-hover:translate-y-[-40px] transition-transform duration-300 ">
            <p>product name</p>
            <p>price</p>
            <button className="add text-primary_color opacity-0 group-hover:opacity-95  transition-opacity ">Add to cart</button>
         </div>



    </div>
  )
}

export default Cart;