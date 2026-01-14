import { WritableSignal } from '@angular/core';
import { FormatsService } from "../services/formats-service";

export interface FormatsRepository {
  getAllFormats(formatsService: FormatsService, formats: WritableSignal<string[]>): void;
}
