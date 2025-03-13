import apiClient from "@/services/api-client";
import { useEffect, useState } from "react";
import CanceledError, { AxiosResponse } from "axios";
import axios from "axios";

export interface Platform {
  id: number;
  name: string;
  slug: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  platforms: { platform: Platform}[];
  metacritic: number;
}

export interface Genre {
    id: number;
    name: string;
    image: string;
}

export interface GatheredGenres {
    genres: Set<string>;
    images: string[];
}

export interface FetchGenresResponse {
    id: number;
    genres: Genre[];
    box_image: string;
}

export interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const modifyGameswithMockValues = (results: AxiosResponse<FetchGamesResponse, any>) => {
    return results.data.results.map((game) => ({
        ...game,
        id: game.id,
        metacritic: Math.trunc(100 * Math.random()), 
      }));
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  let aggregatedGenres = new Set<string>();
  let aggregatedImages: string[] = [];
  const [gatheredGenres, setGenres] = useState<GatheredGenres>({
    genres: aggregatedGenres,
    images: aggregatedImages,
  });


  async function fetchGenresForAllGames(games: Game[], controller: AbortController) {
    for (const game of games) {
      try {
        const res2 = await apiClient.get<FetchGenresResponse>(`/games/${game.id}`, { signal: controller.signal });
        res2.data.genres.forEach((genre) => {
          //console.log("Genres of GameId:" + game.id + " is " + genre.name);
          aggregatedGenres.add(genre.name);
          aggregatedImages[aggregatedGenres.size -1] = res2.data.box_image;
        });
      } catch (err: any) {
        if (axios.isCancel(err)) continue;
        setError(err.message);
      }
    }

    const aggregatedGatheredGenres : GatheredGenres = {
      genres: aggregatedGenres,
      images: aggregatedImages,
    }
    setGenres(aggregatedGatheredGenres);

    setLoading(false);
  }

  const fetchGames = (controller: AbortController) => {
    setLoading(true);
    apiClient
    .get<FetchGamesResponse>("/games", {signal: controller.signal})
    .then((res1) => {
      const modifiedGames = modifyGameswithMockValues(res1);
      setGames((prevGames) => [...prevGames, ...modifiedGames]);
      setLoading(false);

      fetchGenresForAllGames(res1.data.results, controller);
    })
    .catch((err) => {
      if(axios.isCancel(err)) return;
      console.log("setting error to: " + err.message);
      setError(err.message)});
      //setLoading(false);
  };

  useEffect(() => {
    const controller = new AbortController();

    //fetchGames(controller);
    fetchGames(controller);
    return () => controller.abort();
  }, []);
  const valuesArray = [...aggregatedGenres];

  return { games, error, isLoading, gatheredGenres};
}

export default useGames;