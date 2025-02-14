import React, { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
  ChevronRight,
  Calendar,
  Users,
  Bell,
} from "lucide-react";

const IndexPage = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    {
      url: "/event1.png",
      title: "Sports Tournament",
      description: "Inter-college championships",
    },
    {
      url: "/event1.png",
      title: "College Cultural Fest",
      description: "Annual celebration of art, music, and dance",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header remains the same */}
      <header className="fixed w-full z-50 px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-full mt-4 shadow-lg mx-auto max-w-[1200px]">
          <div className="w-full px-8 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold flex items-center">
              <img src="/nova.png" alt="NOVA HUB Logo" className="h-10 mr-2" />
            </h1>
            <nav className="flex space-x-8">
              <a
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                About
              </a>
              <a
                href="/#contact"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Contact
              </a>
              <a
                href="/UserLogin"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                Login
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Modified Hero Section */}
      <main className="flex-grow">
        <div className="relative">
          {/* Background image with increased blur */}
          <div
            style={{ backgroundImage: `url(${images[currentImage].url})` }}
            className="absolute inset-0 bg-cover bg-center blur-sm"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 to-purple-600/40" />

          <div className="relative pt-32 px-4">
            <div className="max-w-6xl mx-auto text-white">
              {/* Hero Content */}
              <div className="min-h-[60vh] flex items-center">
                <div className="space-y-8 bg-black/30 p-8 rounded-2xl backdrop-blur-sm max-w-2xl">
                  <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                    Connect With Your College Community
                  </h2>
                  <p className="text-xl text-gray-100">
                    Discover events, join activities, and stay connected with
                    what's happening on campus.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="/UserLogin"
                      className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center"
                    >
                      Get Started <ChevronRight className="ml-2" />
                    </a>
                    <a
                      href="/#features"
                      className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-200"
                    >
                      Learn More
                    </a>
                  </div>
                </div>
              </div>

              {/* Features Grid - Moved below hero content */}
              <div className="grid md:grid-cols-4 gap-4 py-12">
                <div className="bg-black/30 backdrop-blur-sm p-6 rounded-2xl hover:bg-black/40 transition-all duration-300">
                  <Calendar className="w-8 h-8 text-white mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    Upcoming Events
                  </h3>
                  <p className="text-gray-200">
                    Stay updated with the latest campus activities
                  </p>
                </div>
                <div className="bg-black/30 backdrop-blur-sm p-6 rounded-2xl hover:bg-black/40 transition-all duration-300">
                  <Users className="w-8 h-8 text-white mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Community</h3>
                  <p className="text-gray-200">
                    Connect with fellow students and groups
                  </p>
                </div>
                <div className="bg-black/30 backdrop-blur-sm p-6 rounded-2xl hover:bg-black/40 transition-all duration-300">
                  <Bell className="w-8 h-8 text-white mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Notifications</h3>
                  <p className="text-gray-200">Never miss important updates</p>
                </div>
                <div className="bg-black/30 backdrop-blur-sm p-6 rounded-2xl hover:bg-black/40 transition-all duration-300">
                  <MessageCircle className="w-8 h-8 text-white mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Discussions</h3>
                  <p className="text-gray-200">
                    Engage in meaningful conversations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer remains the same */}
      <footer className="bg-black/90 backdrop-blur-md text-gray-300">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">NOVA HUB</h3>
              <p className="text-gray-400">
                Your gateway to campus life and community engagement.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Quick Links</h3>
              <nav className="flex flex-col space-y-2">
                <a
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  About Us
                </a>
                <a
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Features
                </a>
                <a
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Events
                </a>
                <a
                  href="/"
                  className="hover:text-white transition-colors duration-200"
                >
                  Contact
                </a>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Contact</h3>
              <div className="space-y-3">
                <a
                  href="mailto:contact@novahub.com"
                  className="flex items-center hover:text-white transition-colors duration-200"
                >
                  <Mail className="mr-3 w-5 h-5" />
                  novahubevents@gmail.com
                </a>
                <a
                  href="tel:+1234567890"
                  className="flex items-center hover:text-white transition-colors duration-200"
                >
                  <Phone className="mr-3 w-5 h-5" />
                  +98 766 55432
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500">
              &copy; {new Date().getFullYear()} NOVA HUB. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IndexPage;
