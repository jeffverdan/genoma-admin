import React from 'react';
import Header from '@/components/HeaderBar/HeaderBar';

export default function Layout({ children }: {children: React.ReactNode}) {
    console.log('Admin Layout rendered');
  
    return (
      <section>
        <Header />
        {children}
      </section>      
    )
}