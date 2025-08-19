// File: /api/search.js

export default async function handler(request, response) {
  const apiKey = process.env.VITE_API_KEY;
  const query = request.query.query || '';

  if (!query) {
    return response.status(400).json({ message: 'Search query is required.' });
  }

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

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