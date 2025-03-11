import apiClient from "@/services/api-client";
import { useEffect, useState } from "react";
import CanceledError from "axios";
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
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}


const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  const fetchGames = (controller: AbortController) => {
    apiClient
    .get<FetchGamesResponse>("/games", {signal: controller.signal})
    .then((res) => {
      const modifiedGames = res.data.results.map((game) => ({
        ...game,
        id: game.id * Math.random(), // Example transformation
      }));

      setGames((prevGames) => [...prevGames, ...modifiedGames]);
    })
    .catch((err) => {
      if(axios.isCancel(err)) return;
      console.log("setting error to: " + err.message);
      setError(err.message)});

  };

  useEffect(() => {
    const controller = new AbortController();

    fetchGames(controller);
    fetchGames(controller);

    return () => controller.abort();
  }, []);

  return { games, error};
}

export default useGames;