import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Navbar></Navbar>
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center bg-gray-100">
        <div className="text-center items-center justify-center rounded-lg">  {/*w-40 h-40 bg-gray-300*/}
          <h2 className="text-[#022bf8] text-4xl font-bold">Sahaayak is a platform that connects candidates with trusted scribes.</h2>
          <h2 className='text-2xl mt-4'>Whether you are a student preparing for exams or a volunteer willing to help, Sahaayak makes the process of finding and registering scribes easier, faster, and reliable.</h2>
        </div>
      </section>

      {/* Content Section */}
      <section className="bg-white p-10 text-center">
        <h2 className="text-lg font-semibold mb-3">
          General Instructions for Candidate and Scribe
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Quidam alii sunt, et non est in nostra potestate. Quae omnia in nostra
          sententia, persuit, cupiditatem, adversatio, ex quibus in Verbo,
          quicquid non suis actibus nostris.
        </p>

        <h2 className="text-lg font-semibold mb-3">About Sahaayak</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Quidam alii sunt, et non est in nostra potestate. Quae omnia in nostra
          sententia, persuit, cupiditatem, adversatio, ex quibus in Verbo,
          quicquid non suis actibus nostris.
        </p>
      </section>
      <Footer></Footer>
    </div>
  )
}

export default Home
