import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenreColourCodingService {
  private readonly genresMappedToCssClasses: Record<string, string> = {
    'rock': 'rock-genre',
    'pop': 'pop-genre',
    'jazz': 'jazz-genre',
    'hip-hop': 'hip-hop-genre',
    'reggae': 'reggae-genre',
    'alternative': 'alternative-genre',
    'classical': 'classical-genre',
    'electronic': 'electronic-genre'
  }

  public getCssClassForColourCodedGenre(genre: string) {
    return this.genresMappedToCssClasses[genre.toLocaleLowerCase()] ?? 'fallback-genre';
  }
}
