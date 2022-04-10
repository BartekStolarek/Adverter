import { IAdvertisement } from '../interfaces/IAdvertisement.ts'
import { updateData, readData, removeData } from '../services/advertisement.service.ts';

export const getAdvertisements = ({ response }: { response: any }) => {
  try {
    let advertisements = readData();

    response.body = {
      success: true,
      data: advertisements
    };
  } catch (error) {
    response.status = 500;
    response.body = {
      success: false,
      message: 'Failed to process this request.'
    }
  }
};

export const updateAdvertisements = async ({ request, response }: { request: any, response: any }) => {
  try {
    const advertisement: any = await request.body().value;

    if (advertisement) {
      const advertisements: IAdvertisement[] | null = updateData(advertisement);
  
      response.status = 200;
      response.body = {
        success: true,
        message: 'Advertisements updated successfully.',
        data: advertisements
      };
    } else {
      response.status = 400;
      response.body = {
        success: false,
        message: 'Failed to update advertisement. You need to provide a valid avertisement.'
      }
    }
  } catch (error) {
    response.status = 500;
    response.body = {
      success: false,
      message: 'Failed to process this request.'
    }
  }
};

export const removeAdvertisements = async ({ request, response }: { request: any, response: any }) => {
  try {
    const body: any = await request.body().value;

    if (body && body.id) {
      const advertisements: IAdvertisement[] | null = removeData(body.id);
  
      response.status = 200;
      response.body = {
        success: true,
        message: 'Advertisements updated successfully.',
        data: advertisements
      };
    } else {
      response.status = 400;
      response.body = {
        success: false,
        message: 'Failed to update advertisement. You need to provide a valid advertisement id.'
      }
    }
  } catch (error) {
    response.status = 500;
    response.body = {
      success: false,
      message: 'Failed to process this request.'
    }
  }
};