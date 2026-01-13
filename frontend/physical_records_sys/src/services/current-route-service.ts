import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrentRouteService {
  public getStringifiedIdFromRequestBody(currentRoute: ActivatedRoute): string | null {
    return currentRoute.snapshot.paramMap.get('id');
  }
}
