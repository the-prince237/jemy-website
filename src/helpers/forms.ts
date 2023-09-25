import moment from 'moment';

export const parseDateTime = (date: string | number | Date, time: string) => {
  if (date) {
    const formattedDate = moment(date).format('DD MM YYYY');
    const timeString = `${formattedDate} ${time}`;
    const ret = moment(timeString, 'DD MM YYYY HH:mm', true).toISOString();
    return ret;
  }
  return null;
};

export const getSelectValue = (object: any) => {
  return object ? object.value : null;
};

export const getSelectValues = (list: any[]) => {
  return list?.map((item) => getSelectValue(item)) || null;
};

export const getPayloadImage = (image: { file: any; imagePreview: any }) => {
  return image ? image.file : null;
};

export const formatToSelectValue = ({ label, value }: { label?: string; value: string }) => {
  return {
    label: label || value,
    value,
  };
};
