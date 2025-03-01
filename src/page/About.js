import React, { useState } from 'react';
import Logo from '../images/logo.jpeg';
import Site from '../images/data.jpg';
import { Link } from 'react-router-dom';
import { IoIosSearch, IoIosMenu, IoIosClose } from 'react-icons/io';
import Content from './components/Content';
import Value from './components/Value';
import Footer from './components/Footer';

const About = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage hamburger menu visibility
  const [searchQuery, setSearchQuery] = useState(''); // State to store the search query
  const [searchResults, setSearchResults] = useState([]); // State to store search results

  // Dummy data for search (replace with your actual data)
  const dummyData = [
    {
      id: 1,
      title: 'Home',
      link: '/',
      description: 'Welcome to PlanWorks, your partner in construction and project management.',
    },
    {
      id: 2,
      title: 'About',
      link: '/about',
      description: 'Learn more about our mission, vision, and values at PlanWorks.',
    },
    {
      id: 3,
      title: 'Services',
      link: '/services',
      description: 'We offer end-to-end services including project planning, scheduling, and resource management.',
    },
    {
      id: 4,
      title: 'Our Team',
      link: '/team',
      description: 'Meet our team of experts dedicated to delivering excellence in every project.',
    },
    {
      id: 5,
      title: 'Projects',
      link: '/projects',
      description: 'Explore our portfolio of successful projects in construction and oil & gas industries.',
    },
    {
      id: 6,
      title: 'Blog',
      link: '/blog',
      description: 'Stay updated with the latest trends and insights in the construction industry.',
    },
    {
      id: 7,
      title: 'CSR',
      link: '/csr',
      description: 'Our commitment to corporate social responsibility and community development.',
    },
    {
      id: 8,
      title: 'Careers',
      link: '/careers',
      description: 'Join our team and build a rewarding career with PlanWorks.',
    },
    {
      id: 9,
      title: 'Contact',
      link: '/contact',
      description: 'Get in touch with us for inquiries, partnerships, or support.',
    },
  ];

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible); // Toggle popup visibility
    setSearchQuery(''); // Clear search query when popup is closed
    setSearchResults([]); // Clear search results when popup is closed
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle hamburger menu visibility
  };

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Perform search
    if (query.trim() === '') {
      setSearchResults([]); // Clear results if query is empty
    } else {
      const results = dummyData.filter((item) => {
        // Search in both title and description
        return (
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase())
        );
      });
      setSearchResults(results); // Update search results
    }
  };

  // Function to highlight matched words in the search results
  const highlightText = (text, query) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-yellow-200">{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className='text-white'>
      {/* Header with Background Image */}
      <div
        className="h-[400px] relative bg-cover bg-center text-white"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 255, 0.7), rgba(0, 0, 139, 0.9)), url(${Site})` }}
      >
        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-opacity-50"></div>

        <main className="relative z-10">
          <ul className="ml-5 lg:ml-20 flex flex-row items-center justify-between">
            <li className="flex flex-row items-center">
              <img
                src={Logo}
                alt="PlanWorks"
                className="w-[50px] h-[50px] mt-10 mr-5 rounded-3xl"
              />
              <span className="text-3xl text-white mt-7">Planworks</span>
            </li>

            {/* Hamburger Icon for Mobile */}
            <li
              className="mt-[45px] mr-5 lg:hidden text-2xl text-white cursor-pointer"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <IoIosClose className="text-3xl" /> : <IoIosMenu className="text-3xl" />}
            </li>

            {/* Navigation Links */}
            <li
              className={`mt-[45px] ml-20 text-2xl flex flex-row gap-6 text-white lg:flex bg-black ${isMenuOpen ? 'flex' : 'hidden'} flex-col lg:flex-row absolute lg:static top-24 left-0 bg-opacity-90 w-full lg:w-auto p-5 lg:p-0`}
            >
              <Link to="/" className="hover:underline p-2 lg:p-0">Home</Link>
              <Link to="/about" className="hover:underline p-2 lg:p-0">About</Link>
              <Link to="/services" className="hover:underline p-2 lg:p-0">Services</Link>
              <Link to="/team" className="hover:underline p-2 lg:p-0">Our Team</Link>
              <Link to="/projects" className="hover:underline p-2 lg:p-0">Projects</Link>
              <Link to="/blog" className="hover:underline p-2 lg:p-0">Blog</Link>
              <Link to="/csr" className="hover:underline p-2 lg:p-0">CSR</Link>
              <Link to="/careers" className="hover:underline p-2 lg:p-0">Careers</Link>
              <Link to="/contact" className="hover:underline p-2 lg:p-0">Contact</Link>
            </li>

            {/* Search Icon (Hidden on Mobile) */}
            <li
              className="ml-[150px] mt-[45px] text-white cursor-pointer lg:block hidden"
              onClick={togglePopup}
            >
              <IoIosSearch className="text-3xl ml-20" />
            </li>
          </ul>

          {/* Search Popup */}
          <div
            className={`fixed top-0 left-0 w-full bg-black bg-opacity-90 transition-transform duration-500 ease-in-out ${
              isPopupVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
          >
            <div className="container mx-auto p-5 flex flex-col justify-center items-center h-[300px]">
              <input
                type="text"
                placeholder="Search..."
                className="w-1/2 p-3 rounded-lg bg-white text-black focus:outline-none"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              {/* Display search results */}
              {searchResults.length > 0 && (
                <div className="w-1/2 bg-white mt-5 rounded-lg shadow-lg max-h-[200px] overflow-y-auto">
                  {searchResults.map((result) => (
                    <Link
                      key={result.id}
                      to={result.link}
                      className="block p-3 hover:bg-gray-100 text-black"
                      onClick={togglePopup}
                    >
                      <div className="font-bold">{highlightText(result.title, searchQuery)}</div>
                      <div className="text-sm">{highlightText(result.description, searchQuery)}</div>
                    </Link>
                  ))}
                </div>
              )}
              <button
                className="ml-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-5"
                onClick={togglePopup}
              >
                Close
              </button>
            </div>
          </div>
        </main>
        <h1 className='text-3xl text-white mt-[200px] ml-[20px] lg:ml-[100px]'>About</h1>
      </div>

      {/* Content Sections */}
      <Content />
      <Value />

      {/* Call to Action Section */}
      <div className='bg-white w-full h-[50px] text-black text-center mx-auto mt-10 mb-10'>
        <h1 className='text-2xl text-black pt-20'>Let's build the future. Together</h1>
        <button className='text-4xl mt-10 border-[5px] border-black p-5 hover:bg-orange-500 hover:text-white hover:border-gray-500'>
          CONTACT US
        </button>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default About;