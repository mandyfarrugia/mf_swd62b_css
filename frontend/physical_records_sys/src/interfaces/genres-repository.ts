import { Signal, WritableSignal } from '@angular/core';
import { GenresService } from "../services/genres-service";

export interface GenresRepository {
  getAllGenres(genresService: GenresService, genres: Signal<string[]>, error: WritableSignal<string | null>): void;
}
