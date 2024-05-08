"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

import { FiMenu, FiX } from "react-icons/fi";
import PokemonLogo from "@/public/images/pokemonLogo.webp";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <main>
      <div className="flex items-center justify-between px-4 relative">
        <div>
          <FiMenu onClick={toggleMenu} />
        </div>
        <Image src={PokemonLogo} alt="Pokémon Logo" className="w-28" />
        <div
          className={`fixed top-0 left-0 h-full w-3/4 bg-[#fff] z-50 transition-transform duration-300 ease-in-out transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4">
            <div className="flex justify-end">
              <FiX className="cursor-pointer" onClick={toggleMenu} />
            </div>
            <div className="mt-4">
              <h1 className="text-xl font-bold">Menu</h1>
              <ul className="flex flex-col gap-y-2 mt-2">
                <li className="text-lg cursor-pointer">
                  <Link href={"/pokedex"}>Pokedex</Link>
                </li>
                <li className="text-lg cursor-pointer">
                  <Link href={"/cardgames"}>Card Game</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Navbar;
