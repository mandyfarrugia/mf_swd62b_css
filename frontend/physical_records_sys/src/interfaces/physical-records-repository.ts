import { PhysicalRecordDto } from '../dtos/physical-records-dto';

export interface PhysicalRecordsRepository {
  delete(id: number, callback: () => void) : void;
  update(id: number, physicalRecordToUpdate: PhysicalRecordDto) : void;
}
