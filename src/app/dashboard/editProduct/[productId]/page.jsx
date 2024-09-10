import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export default function Page({ params }) {
    // return <div>My Post: {params.productId}</div>
    return(
        <>
        <Header/>
        <div>
        My Post: {params.productId}
        </div>
        <Footer/>
        </>
    )
  }