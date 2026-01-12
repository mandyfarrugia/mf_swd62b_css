import { Injectable } from '@angular/core';
import { GenreColourCodedTypes } from '../types/genre-colour-coded-types';

@Injectable({
  providedIn: 'root',
})
export class GenreColourCodingService {
  private readonly genresMappedToCssClasses: Record<string, GenreColourCodedTypes> = {
    'rock': { cssClass: 'rock-genre', backgroundHexColour: '#bc0f0f', foregroundHexColour: '#ffffff', argbBackgroundHexColour: '#FFBC0F0F', argbForegroundHexColour: '#ffffffff' },
    'pop': { cssClass: 'pop-genre', backgroundHexColour: '#ed3fd0', foregroundHexColour: '#ffffff', argbBackgroundHexColour: '#ffed3fd0', argbForegroundHexColour: '#ffffffff' },
    'jazz': { cssClass: 'jazz-genre', backgroundHexColour: '#eeee54', foregroundHexColour: '#000000', argbBackgroundHexColour: '#ffee54ee', argbForegroundHexColour: '#00000000' },
    'hip-hop': { cssClass: 'hip-hop-genre', backgroundHexColour: '#7a2b94', foregroundHexColour: '#ffffff', argbBackgroundHexColour: '#ff7a2b94', argbForegroundHexColour: '#ffffffff' },
    'reggae': { cssClass: 'reggae-genre', backgroundHexColour: '#ff8121', foregroundHexColour: '#ffffff', argbBackgroundHexColour: '#ffff8121', argbForegroundHexColour: '#ffffffff' },
    'alternative': { cssClass: 'alternative-genre', backgroundHexColour: '#60f52a', foregroundHexColour: '#000000', argbBackgroundHexColour: '#ff60f52a', argbForegroundHexColour: '#00000000' },
    'classical': { cssClass: 'classical-genre', backgroundHexColour: '#5a51ff', foregroundHexColour: '#ffffff', argbBackgroundHexColour: '#ff5a51ff', argbForegroundHexColour: '#ffffffff' },
    'electronic': { cssClass: 'electronic-genre', backgroundHexColour: '#34b4ac', foregroundHexColour: '#000000', argbBackgroundHexColour: '#ff34b4ac', argbForegroundHexColour: '#00000000' }
  };

  public getCssClassForGenre(genre: string | undefined) : string {
    if(!genre) return 'fallback-genre';
    return this.genresMappedToCssClasses[genre.toLocaleLowerCase()].cssClass ?? 'fallback-genre';
  }

  public getBackgroundHexColourForGenre(genre: string | undefined) {
    if(!genre) return '#ffffff';
    return this.genresMappedToCssClasses[genre.toLocaleLowerCase()].backgroundHexColour ?? '#ffffff';
  }

  public getForegroundHexColourForGenre(genre: string | undefined) {
    if(!genre) return '#000000';
    return this.genresMappedToCssClasses[genre.toLocaleLowerCase()].foregroundHexColour ?? '#000000';
  }

  public getArgbBackgroundHexColourForGenre(genre: string | undefined) {
    if(!genre) return '#00000000';
    return this.genresMappedToCssClasses[genre.toLocaleLowerCase()].argbBackgroundHexColour ?? '#000000';
  }

  public getArgbForegroundHexColourForGenre(genre: string | undefined) {
    if(!genre) return '#ffffffff';
    return this.genresMappedToCssClasses[genre.toLocaleLowerCase()].argbForegroundHexColour ?? '#ffffff';
  }
}
