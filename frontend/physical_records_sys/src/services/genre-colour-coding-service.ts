import { Injectable } from '@angular/core';
import { GenreColourCodedTypes } from '../types/genre-colour-coded-types';

@Injectable({
  providedIn: 'root',
})
export class GenreColourCodingService {
  private readonly genresMappedToCssClasses: Record<string, GenreColourCodedTypes> = {
    'rock': { cssClass: 'rock-genre', backgroundHexColour: '#bc0f0f', foregroundHexColour: '#ffffff' },
    'pop': { cssClass: 'pop-genre', backgroundHexColour: '#ed3fd0', foregroundHexColour: '#ffffff' },
    'jazz': { cssClass: 'jazz-genre', backgroundHexColour: '#eeee54', foregroundHexColour: '#000000' },
    'hip-hop': { cssClass: 'hip-hop-genre', backgroundHexColour: '#7a2b94', foregroundHexColour: '#ffffff' },
    'reggae': { cssClass: 'reggae-genre', backgroundHexColour: '#ff8121', foregroundHexColour: '#ffffff' },
    'alternative': { cssClass: 'alternative-genre', backgroundHexColour: '#60f52a', foregroundHexColour: '#000000' },
    'classical': { cssClass: 'classical-genre', backgroundHexColour: '#5a51ff', foregroundHexColour: '#ffffff' },
    'electronic': { cssClass: 'electronic-genre', backgroundHexColour: '#34b4ac', foregroundHexColour: '#000000' }
  };

  public getCssClassForGenre(genre: string) : string {
    if(!genre) return 'fallback-genre';
    return this.genresMappedToCssClasses[genre.toLocaleLowerCase()].cssClass ?? 'fallback-genre';
  }

  public getBackgroundHexColourForGenre(genre: string) {
    if(!genre) return 'fallback-genre';
    return this.genresMappedToCssClasses[genre.toLocaleLowerCase()].backgroundHexColour ?? '#ffffff';
  }

  public getForegroundHexColourForGenre(genre: string) {
    if(!genre) return 'fallback-genre';
    return this.genresMappedToCssClasses[genre.toLocaleLowerCase()].foregroundHexColour ?? '#000000';
  }
}
