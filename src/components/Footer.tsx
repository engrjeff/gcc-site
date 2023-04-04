import Link from "next/link";

import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/solid";

const footerLinks = [
  {
    path: "/",
    label: "What We Believe",
  },
  {
    path: "/",
    label: "Church Purpose",
  },
  {
    path: "/",
    label: "Resources",
  },
  {
    path: "/",
    label: "The Gospel",
  },
  {
    path: "/",
    label: "Events",
  },
];

function Footer() {
  return (
    <footer className='dark:bg-slate-900 dark:text-white border-t border-gray-200 dark:border-slate-800 text-sm'>
      <div className='container mx-auto max-w-6xl flex py-16'>
        <ul className='space-y-3'>
          <li className='mb-8'>
            <p className='text-2xl font-semibold'>Contact Us</p>
          </li>
          <li className='flex items-center gap-2 dark:text-slate-400'>
            <EnvelopeIcon className='w-5 h-5' />
            <span>Email: </span>
            <a
              href='mailto:abundant.grace.city@gmail.com'
              className='dark:text-white'
            >
              <span>abundant.grace.city@gmail.com</span>
            </a>
          </li>
          <li className='flex items-center gap-2 dark:text-slate-400'>
            <PhoneIcon className='w-5 h-5' />
            <span>Phone: </span>
            <a href='tel:+639212882165' className='dark:text-white'>
              <span>+639212882165</span>
            </a>
          </li>
          <li className='flex md:items-center gap-2 dark:text-slate-400'>
            <MapPinIcon className='w-6 h-6' />
            <span>Address: </span>
            <span className='dark:text-white'>
              <span>
                Sitio Ziplang, Barangay San Guillermo, Morong, Rizal,
                Philippines
              </span>
            </span>
          </li>
        </ul>
      </div>
      <div className='py-16 border-t border-gray-200 dark:border-slate-800 text-center'>
        <p>All rights reserved. Copyright &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}

export default Footer;
