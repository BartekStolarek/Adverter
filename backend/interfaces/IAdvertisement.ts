import { Category } from '../enums/Category.ts';

export interface IAdvertisement {
  id: string;
  title: string;
  price: number;
  location: string;
  phoneNumber?: number;
  emailAddress?: string;
  description: string;
  category: Category;
  createDate: Date;
}