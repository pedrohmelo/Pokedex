"use server";

export async function getAllPokemonList(offset: number, limit: number) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Pokemon list");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching pokemon list:", error);
    return [];
  }
}

export async function getPokemonDetails(pokemonName: string) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch pokemon details");
  }

  return response.json();
}
