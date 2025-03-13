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

const modifyGameswithMockValues = (results: Game[]) => {
    return results.map((game) => ({
        ...game,
        id: game.id,
        metacritic: Math.trunc(100 * Math.random()), 
      }));
}

const useGames = (selectedGenre: string | null) => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");
  const [isLoadingGames, setLoadingGames] = useState(false);
  const [isLoadingGenres, setLoadingGenres] = useState(false);

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

    setLoadingGenres(false);
  }


  async function fetchGamesById(controller: AbortController)  {
    setLoadingGames(true);      
    let aggregatedGames: Game[] = [];
    let i = 0;

    for (const game of games) {

      try {
        console.log("before fetch.   " + game.metacritic );

        const res = await apiClient.get<FetchGenresResponse>(`/games/${game.id}`, { signal: controller.signal });
        let gamesTemp: Game[] = [];  
        console.log("before foreach.   " );

        res.data.genres.forEach((currentGameGenre) => {
            console.log("before if.  currentGameGenre.name: " +currentGameGenre.name);

            if(selectedGenre == currentGameGenre.name){
              //gamesTemp[gamesTemp.length] = game;
              //gamesTemp.map((game)=> console.log("game in gamesTemp: " + game.name))
              //console.log("----------");
              aggregatedGames[i] = game;
              aggregatedGames.map((game)=> console.log("game in gamesTemp: " + game.name))
              console.log("----------");
            } 
        });
      } 
      catch (err: any) {
        console.log("error is:   " + err);

        if (axios.isCancel(err) || err instanceof TypeError) continue;
        setError(err.message);
      }
      i++;  
      
      console.log("increasing i " + i);
    }
    const modifiedGames = modifyGameswithMockValues(aggregatedGames);
    setGames(modifiedGames);
    setLoadingGames(false);  
  }
  

  const fetchGames = (controller: AbortController) => {
    setLoadingGames(true);
    setLoadingGenres(true);

    apiClient
    .get<FetchGamesResponse>("/games", {signal: controller.signal})
    .then((res1) => {
      const modifiedGames = modifyGameswithMockValues(res1.data.results);
      setGames((prevGames) => [...prevGames, ...modifiedGames]);
      setLoadingGames(false);

      fetchGenresForAllGames(res1.data.results, controller);
    })
    .catch((err) => {
      if(axios.isCancel(err)) return;
      console.log("setting error to: " + err.message);
      setError(err.message)});
      //setLoadingGames(false);
  };

  useEffect(() => {
    const controller = new AbortController();

    //fetchGames(controller);
    

    if (selectedGenre){
      const genreController = new AbortController();
      fetchGamesById(genreController);
    } else {
      fetchGames(controller);
    }

    return () => controller.abort();
  }, [selectedGenre]);

  return { games, error, isLoadingGames, isLoadingGenres, gatheredGenres};
}

export default useGames;