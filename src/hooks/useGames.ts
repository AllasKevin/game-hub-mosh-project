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

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const modifyGameswithMockValues = (results: AxiosResponse<FetchGamesResponse, any>) => {
    return results.data.results.map((game) => ({
        ...game,
        id: game.id * Math.random(),
        metacritic: Math.trunc(100 * Math.random()), 
      }));
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const fetchGames = (controller: AbortController) => {
    setLoading(true);
    apiClient
    .get<FetchGamesResponse>("/games", {signal: controller.signal})
    .then((res) => {
      const modifiedGames = modifyGameswithMockValues(res);
      setGames((prevGames) => [...prevGames, ...modifiedGames]);
      setLoading(false);
    })
    .catch((err) => {
      if(axios.isCancel(err)) return;
      console.log("setting error to: " + err.message);
      setError(err.message)});
      //setLoading(false);
  };

  useEffect(() => {
    const controller = new AbortController();

    fetchGames(controller);
    fetchGames(controller);

    return () => controller.abort();
  }, []);

  return { games, error, isLoading};
}

export default useGames;