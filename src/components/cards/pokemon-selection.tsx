"use client";

import { useEffect, useState } from "react";
import { getPokemonDetails, getAllPokemonList } from "@/src/api/api-teste";
import PokemonDetails from "@/src/components/cards/pokemon-details";
import { Button } from "../ui/button";
import Image from "next/image";

interface PokedexType {
  name: string;
}

interface PokemonImage {
  name: string;
  imageUrl: string;
}

const itemsPerPage = 12;

export default function PokemonSelection() {
  const [pokemonList, setPokemonList] = useState<PokedexType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedPokemon, setSelectedPokemon] = useState<PokedexType | null>(
    null
  );
  const [pokemonImages, setPokemonImages] = useState<PokemonImage[]>([]);
  const totalPages = Math.ceil(1300 / itemsPerPage);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const offset = (currentPage - 1) * itemsPerPage;
      const data = await getAllPokemonList(offset, itemsPerPage);
      setPokemonList(data.results);
      fetchPokemonImages(data.results);
    } catch (error) {
      console.error("Error fetching pokemon list:", error);
    }
  };

  const fetchPokemonImages = async (pokemonList: PokedexType[]) => {
    try {
      const imagesPromises = pokemonList.map(async (pokemon) => {
        const details = await getPokemonDetails(pokemon.name);
        return {
          name: pokemon.name,
          imageUrl: details.sprites.front_default,
        };
      });
      const images = await Promise.all(imagesPromises);
      setPokemonImages(images);
    } catch (error) {
      console.error("Error fetching pokemon images:", error);
    }
  };

  const handlePokemonSelect = async (name: string) => {
    try {
      const pokemonDetails = await getPokemonDetails(name);
      setSelectedPokemon(pokemonDetails);
    } catch (error) {
      console.error("Error fetching pokemon details:", error);
    }
  };

  return (
    <main className="">
      <div className="">
        <div className="flex flex-wrap">
          {pokemonImages.map((pokemon, index) => (
            <div key={index} className="p-2 flex flex-col items-center">
              <Image
                src={pokemon.imageUrl}
                alt="Pokemon Image"
                width={100}
                height={100}
              />
              <h1 className="font-semibold">{pokemon.name}</h1>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <Button
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>

      <div className="pt-10">
        {selectedPokemon && (
          <PokemonDetails pokemonName={selectedPokemon.name} />
        )}
      </div>
    </main>
  );
}
