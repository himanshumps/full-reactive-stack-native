export class Quote {
  movieId: number;
  movie: string;
  plot: string;

  constructor( movieId: number, movie: string, plot: string) {
    this.movieId = movieId;
    this.movie = movie;
    this.plot = plot;
  }
}
