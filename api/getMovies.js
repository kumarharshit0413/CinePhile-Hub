// File path: /api/getMovies.js
export default async function handler(request, response) {
  const apiKey = process.env.VITE_API_KEY;
  const movieId = request.query.id || '550';

  try {
    const tmdbResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos,recommendations`
    );

    if (!tmdbResponse.ok) {
      return response
        .status(tmdbResponse.status)
        .json({ message: 'Error fetching from TMDB' });
    }

    const movieData = await tmdbResponse.json();

    return response.status(200).json(movieData);

  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}
