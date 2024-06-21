import { ICityDataModel } from './i-city-data-model';

export interface ILocationDataModel {
  id: number;
  code: string;
  name: string;
  namePrimaryLang: string;
  nameSecondaryLang: string;
  cityDataModels: ICityDataModel[];
}
