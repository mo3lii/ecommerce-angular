import { IStreetDataModel } from './i-street-data-model';

export interface IAreaDataModel {
  id: number;
  code: string;
  name: string;
  namePrimaryLang: string;
  nameSecondaryLang: string;
  streetDataModels: IStreetDataModel[];
}
