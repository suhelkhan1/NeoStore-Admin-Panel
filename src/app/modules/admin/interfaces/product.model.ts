export interface IProduct {
    product_name: string,
    categoryId: string,
    product_producer: string,
    product_description: string,
    product_cost: number,
    product_avg_rating: number,
    product_view_count: number,
    product_stock: number,
    product_color: string,
    product_dimension: string,
    product_material: string,
    id: string,
    productimage: IProductImage
}

export interface IProductImage {
    image_url: string,
    image_isactive: true,
    id: string
}


export interface IProductCategory {
  id: string,
  category_name: string,
  category_description: string,
  category_isactive: boolean
}