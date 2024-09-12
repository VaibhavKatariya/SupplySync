'use client'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from '../firebase/config';
import { useRouter } from 'next/navigation'
import { IconFidgetSpinner } from '@tabler/icons-react'
import Breadcrum from './components/Breadcrum';
import Tables from './components/Tables';
import AddModal from './components/addModal';
import UpdateModal from './components/updateModal';
import { collection, query, getDocs } from 'firebase/firestore';

function Page() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [productList, setProductList] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [customLoading, setCustomLoading] = useState(true);
  const [checkingVerification, setCheckingVerification] = useState(true); // New state for verification checking

  useEffect(() => {
    setCustomLoading(loading);
  }, [loading]);

  // Check if user is verified and handle redirection
  useEffect(() => {
    const checkEmailVerification = async () => {
      if (user) {
        await user.reload(); // Reload user data to get the latest email verification status
        if (!user.emailVerified) {
          router.push('/verifyEmail'); // Redirect to email verification page if not verified
        } else {
          setCheckingVerification(false); // Stop checking if user is verified
        }
      }
    };

    if (!loading && user) {
      checkEmailVerification();
    } else if (!loading && !user) {
      router.push('/sign-in'); // Redirect to sign-in if no user is logged in
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (user && user.emailVerified) {
        const userId = user.uid;
        const productsRef = collection(db, `products/${userId}/userProducts`);
        const q = query(productsRef);
        const querySnapshot = await getDocs(q);
        let products = [];

        querySnapshot.forEach((doc) => {
          products.push({ id: doc.id, ...doc.data() });
        });

        setProductList(products);
        setIsLoadingProducts(false);
      }
    };

    if (user && user.emailVerified) {
      fetchProducts();
    }
  }, [user]);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const openUpdateModal = (product) => {
    setCurrentProduct(product);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentProduct(null);
  };

  const refreshProducts = async () => {
    const userId = user.uid;
    const productsRef = collection(db, `products/${userId}/userProducts`);
    const q = query(productsRef);
    const querySnapshot = await getDocs(q);
    let products = [];

    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    setProductList(products);
  };

  const handleProductUpdate = async () => {
    await refreshProducts();
  };

  if (customLoading || loading || isLoadingProducts || checkingVerification) {
    return (
      <>
        <Header page="home" />
        <IconFidgetSpinner className='animate-spin w-12 min-h-screen mx-auto' />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header page="dashboard" />
      <Breadcrum />
      <div className="min-h-screen bg-[#1f2937] text-white rounded-md">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Product Dashboard</h1>
          <p className='p-2'>Hi {user?.displayName || "user"}! ({user?.email || "email"}), Here is a list of your products:</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
            onClick={openAddModal}
          >
            Add Product
          </button>
          {productList.length === 0 ? (
            <div className="text-center mt-4">
              <p className="text-lg">No products, start by adding one!</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={openAddModal}
              >
                Add Product
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Tables productList={productList} onEdit={openUpdateModal} />
            </div>
          )}
        </div>
      </div>

      <AddModal isOpen={isAddModalOpen} closeModal={closeAddModal} user={user} onAdd={refreshProducts} />
      {currentProduct && (
        <UpdateModal 
          isOpen={isUpdateModalOpen} 
          closeModal={closeUpdateModal} 
          product={currentProduct} 
          onUpdate={handleProductUpdate} 
          user={user}
        />
      )}
      <Footer />
    </>
  );
}

export default Page;
