import { IAreaDataModel } from './i-area-data-model';

export interface ICityDataModel {
  id: number;
  code: string;
  name: string;
  namePrimaryLang: string;
  nameSecondaryLang: string;
  areaDataModels: IAreaDataModel[];
}
