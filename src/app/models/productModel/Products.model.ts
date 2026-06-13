export interface Products{
    productId : number,
    productName : string,
    quantity : number,
    sellPrice : number,
    importPrice : number,
    productionDate : string,
    expery : string,
    imageUrl : string,
    supplierId : number,
    unitId : number,
    unit?: Unit;
}
export interface Unit {
  unitId: number;
  unitName: string;
  description?: string;
  isActive?: boolean;
}
