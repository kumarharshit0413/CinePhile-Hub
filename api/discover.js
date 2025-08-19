// File: /api/discover.js

export default async function handler(request, response) {
  const apiKey = process.env.VITE_API_KEY;

  // Get parameters from the frontend's request
  const page = request.query.page || '1';
  const sortBy = request.query.sortBy || 'popularity.desc';
  const genre = request.query.genre || '';

  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}&sort_by=${sortBy}`;

  if (genre) {
    url += `&with_genres=${genre}`;
  }

  try {
    const tmdbResponse = await fetch(url);
    if (!tmdbResponse.ok) {
      throw new Error(`TMDB API error: ${tmdbResponse.statusText}`);
    }
    const data = await tmdbResponse.json();
    response.status(200).json(data);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}