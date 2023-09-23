export interface IProduct {
  /* tipo de dato para value={dataForm[element?.value]} */
  [key: string]: any;

  id_product?: number;
  id_user?: number | null;
  name_product: string;
  price: number;
  reference: string;
  size: string;
  color: string;
  category: string;
  URL: string;
}
