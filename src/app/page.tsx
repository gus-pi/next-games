'use client';

import { Game } from '@/types/Game';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function Home() {
  const key = process.env.NEXT_PUBLIC_API_KEY;

  const [games, setGames] = useState<Game[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${key}&page=${currentPage}&search=${query}`
        );
        const data = await response.json();
        setTotalResults(data.count);
        setGames(data.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, [currentPage, query]);

  const totalPages = Math.ceil(totalResults / 20);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('Searching...', query);
      setQuery(e.target.value);
    },
    300
  );

  return (
    <div>
      <h1 className="text-center text-2xl font-bold">Games</h1>
      <div className="text-center">
        <input
          type="text"
          onChange={handleChange}
          placeholder="Search..."
          className="border-1 border-black rounded-md bg-slate-100 text-center"
        />
      </div>
      <div className="text-center">
        {games.length === 0 ? (
          <p>Nothing found</p>
        ) : (
          <div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ul>
                {games.map((game) => (
                  <li key={game.id}>{game.name}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
      <div className="text-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="disabled:opacity-40 px-2"
        >
          &gt; Prev
        </button>
        page {currentPage} of {totalPages}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="disabled:opacity-40 px-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}
