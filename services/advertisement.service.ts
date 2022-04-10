import { IAdvertisement } from '../interfaces/IAdvertisement.ts'

const dataSource: string = './data/adverts.json';

/**
 * Reads JSON data based on dataSource path
 * @returns parsed IAdvertisement array containing adverts
 */
export const readData = (): IAdvertisement[] => {
  return <IAdvertisement[]>JSON.parse(Deno.readTextFileSync(dataSource));
}

/**
 * @param advertisement 
 * @returns parsed IAdvertisement array containing adverts
 */
export const updateData = (advertisement: IAdvertisement): IAdvertisement[] | null => {
  let retrievedData: IAdvertisement[] = readData();  

  // Verify if user has sent valid Advertisement object
  if (retrievedData != null && dataHasRequiredAdvertisementFields(advertisement)) {
    // Create ID and createDate for advert
    advertisement.id = crypto.randomUUID();
    advertisement.createDate = new Date();

    retrievedData.push(advertisement);
    Deno.writeTextFileSync(dataSource, JSON.stringify(retrievedData));

    return retrievedData;
  }
  throw new Error('Invalid data.');
}

/**
 * @param id of advertisement to remove 
 * @returns boolean information about status of operation 
 */
export const removeData = (id: string): IAdvertisement[] | null => {
  let retrievedData: IAdvertisement[] = readData();

  if (retrievedData != null) {
    // Filter out array by excluding element with passed id
    let filteredData: IAdvertisement[] = retrievedData.filter(advert => {
      return advert.id !== id;
    });
    Deno.writeTextFileSync(dataSource, JSON.stringify(filteredData));

    return filteredData;
  }

  return null;
}

const dataHasRequiredAdvertisementFields = (data: any): boolean => {
  return data.hasOwnProperty('title')
    && data.hasOwnProperty('price')
    && data.hasOwnProperty('location')
    && data.hasOwnProperty('description')
    && data.hasOwnProperty('category');
};