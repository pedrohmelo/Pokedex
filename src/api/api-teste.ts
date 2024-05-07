"use server";

export async function getPokemonList() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
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
    throw new Error("Feiled to fetch pokemon details");
  }

  return response.json();
}
