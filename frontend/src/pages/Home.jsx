import React from 'react'
import Hero from '../components/Hero'
import Latest from '../components/Latest'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterBox from '../components/NewsLetterBox'
const Home = () => {
  return (
    <div>
      <Hero/>
      <Latest/>
      <BestSeller/>
      <OurPolicy/>
      <NewsLetterBox/>
    </div>
  )
}

export default Home
