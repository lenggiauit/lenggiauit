import React, { ReactElement, useRef, useState } from 'react';
import Layout from '../../components/layout'; 
import HomeAnimations from '../../components/homeAnimations'; 
 
const Home: React.FC = (): ReactElement => { 
  return (
    <>
      <Layout isPublic={true}>
        <section id="home" className="bg-white pb-0 position-relative" >
          <HomeAnimations /> 
          </section>
      </Layout>
    </>
  );
}

export default Home;