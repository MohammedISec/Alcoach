import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/alcoach",
      icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/96653118280",
      icon: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@alcoach",
      icon: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@alcoach",
      icon: "https://cdn-icons-png.flaticon.com/512/3046/3046120.png",
    },
  ];

  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center  px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 bg-[#F5F5F5] text-gray-500">
        <div className="w-full md:flex">
          <Image className="w-28 md:w-32 " src={assets.alcoach} alt="logo" />
          <p className="mt-6 text-md ">
            <strong>ALCOACH</strong> is your trusted destination for fitness. We
            provide premium supplements and workout gear to help you reach your
            health goals and push your limits. Train stronger, live better.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center ">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:underline transition" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  About us
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  Contact us
                </a>
              </li>
              <li>
                <a className="hover:underline transition" href="#">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>(+966) 53118280</p>
              <p>Alcoach.saudia@gmail.com</p>
            </div>
            <div className="flex items-center justify-center gap-5 mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  className="hover:scale-110 transition-transform"
                >
                  <img src={link.icon} alt={link.name} className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs bg-gray-100 md:text-sm">
        Copyright 2025 © CodePoint All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
