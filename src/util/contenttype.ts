interface Tag {
    _id: string;
    title: string;
  }
  
  interface User {
    _id: string;
    name: string;
    email: string;
  }
  
  export interface DataItem {
    _id: string;
    createdAt: string;
    updatedAt: string;
    link: string;
    title: string;
    type: string;
    userId: User;
    tags: Tag[];
    __v: number;
  }
  
  export type DataArray = DataItem[];
  