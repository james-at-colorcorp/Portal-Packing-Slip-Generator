// Augment the window object to include the CDN libraries
declare global {
  interface Window {
    jspdf: { jsPDF: any };
    html2canvas: any;
  }
}

export interface Address {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  phone: string;
}

export interface Billing extends Address {
  email: string;
}

export interface Image {
  id: string;
  src: string;
}

export interface MetaData {
  id: number;
  key: string;
  value: any;
  display_key?: string;
  display_value?: any;
}

export interface LineItem {
  id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  sku: string;
  price: number;
  image: Image;
  meta_data: MetaData[];
}

export interface Order {
  id: number;
  number: string;
  date_created: string;
  shipping: Address;
  billing: Billing;
  line_items: LineItem[];
}