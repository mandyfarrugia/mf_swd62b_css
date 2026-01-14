import { Signal } from '@angular/core';
import { GenresService } from "../services/genres-service";

export interface GenresRepository {
  getAllGenres(genresService: GenresService, genres: Signal<string[]>): void;
}
