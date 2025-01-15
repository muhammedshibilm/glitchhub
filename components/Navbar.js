'use client'; 

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaHome, FaComments, FaUser, FaMap, FaWallet } from 'react-icons/fa';

export default function BottomNavbar() {
  const [isMounted, setIsMounted] = useState(false);
  const [pathname, setPathname] = useState('');
  
  useEffect(() => {
    setIsMounted(true);
    setPathname(window.location.pathname); 
  }, []);

  const getActiveClass = (path) => {
    return pathname === path ? 'text-[#44cc00] relative -top-3' : 'text-white';
  };

  if (!isMounted) return null; 
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-100 rounded-t-xl  flex justify-around p-4">
      <Link href="/" className={` bg-black p-4 rounded-full  ${getActiveClass('/')}`}>
        
          <FaHome size={24} />
         
        
      </Link>
      <Link href="/map" className={`bg-black p-4 rounded-full ${getActiveClass('/map')}`}>
        
          <FaMap size={24} />
          
        
      </Link>
      <Link href="/wallet" className={`bg-black p-4 rounded-full ${getActiveClass('/wallet')}`}>
    
          <FaWallet size={24} />
         
        
      </Link>
      <Link href="/profile" className={`bg-black p-4 rounded-full ${getActiveClass('/profile')}`}>
        
          <FaUser size={24} />
       
        
      </Link>
    </div>
  );
};


