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
}

export interface FetchGenresResponse {
    id: number;
    genres: Genre[];
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
  const [genres, setGenres] = useState<Set<string>>(new Set());
  let aggregatedGenres = new Set<string>();

  async function fetchGenresForAllGames(games: Game[], controller: AbortController) {
    for (const game of games) {
      try {
        const res2 = await apiClient.get<FetchGenresResponse>(`/games/${game.id}`, { signal: controller.signal });
        res2.data.genres.forEach((genre) => {
          //console.log("Genres of GameId:" + game.id + " is " + genre.name);
          aggregatedGenres.add(genre.name);
        });
      } catch (err: any) {
        if (axios.isCancel(err)) continue;
        setError(err.message);
      }
    }
    setGenres(aggregatedGenres);

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

  return { games, error, isLoading, genres};
}

export default useGames;