"use client";

import { useState, useEffect } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";

import pokeballImage from "@/public/images/pokeball8bits.webp";
import pokemonAPIFetch from "@/src/axios/config";

interface PokemonDetails {
  name: string;
  sprites: {
    front_default: string;
  };
}

const Pokedex = () => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 12;

  useEffect(() => {
    const fetchPokemonList = async () => {
      setLoading(true);
      try {
        const response = await pokemonAPIFetch.get(
          `/pokemon/?limit=${itemsPerPage}&offset=${
            (currentPage - 1) * itemsPerPage
          }`
        );
        const pokemonNames = response.data.results.map((pokemon: any) => ({
          name: pokemon.name,
          sprites: {},
        }));
        await getPokemonData(pokemonNames);
      } catch (error) {
        setError("Error fetching Pokemon list");
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonList();
  }, [currentPage]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredPokemonList(pokemonList);
    } else {
      const filtered = pokemonList.filter((pokemon: PokemonDetails) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPokemonList(filtered);
    }
  }, [searchTerm, pokemonList]);

  const getPokemonData = async (pokemonNames: any[]) => {
    try {
      const updatedPokemonList = await Promise.all(
        pokemonNames.map(async (pokemon: any) => {
          const response = await pokemonAPIFetch.get(
            `/pokemon/${pokemon.name}`
          );
          return response.data;
        })
      );
      setPokemonList(updatedPokemonList);
      setFilteredPokemonList(updatedPokemonList);
    } catch (error) {
      setError("Error fetching Pokemon individual data");
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <main className="px-4">
      <div className="flex gap-x-2 mb-4">
        <Input
          type="text"
          placeholder="Search Pokemon"
          className="w-72"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button className="flex gap-x-2 items-center justify-center">
          <Image src={pokeballImage} alt="Pokeball Image" className="w-6" />
          Search
        </Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ul className="grid grid-cols-3 gap-4">
            {filteredPokemonList.map(
              (pokemon: PokemonDetails, index: number) => (
                <li key={index}>
                  <div className="flex flex-col items-center justify-center border rounded-md bg-slate-100 hover:bg-slate-200">
                    <Image
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      width={100}
                      height={100}
                    />
                    <p className="font-medium">{pokemon.name}</p>
                  </div>
                </li>
              )
            )}
          </ul>
          <div className="mt-4 flex justify-between">
            <Button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </Button>
            <Button
              onClick={handleNextPage}
              disabled={filteredPokemonList.length < itemsPerPage}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Pokedex;
