"use client";

import Image from "next/image";
import { useState } from "react";

import PokemonLogo from "@/public/images/pokemonLogo.webp";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <main>
      <div className="flex items-center justify-between px-4 ">
        <Image src={PokemonLogo} alt="Pokémon Logo" className="w-28" />
        <div className="text-white" onClick={toggleMenu}>
          AAA
        </div>
        {menuOpen && (
          <div>
            <div className="text-white" onClick={toggleMenu}>
              AAA
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Navbar;
