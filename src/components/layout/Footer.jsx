import React from 'react'
 
 const Footer = () => {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} My App. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="/privacy" className="text-sm text-gray-600 hover:text-primary">
              Privacy Policy
            </a>
            <a href="/terms" className="text-sm text-gray-600 hover:text-primary">
              Terms of Service
            </a>
            <a href="/contact" className="text-sm text-gray-600 hover:text-primary">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}


export default Footer;