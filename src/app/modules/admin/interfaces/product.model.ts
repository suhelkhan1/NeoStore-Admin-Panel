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
    images: IProductImage[]
}

export interface IProductImage {
    ImgURL: string,
    ThumbURL100: string,
    ThumbURL250: string
    container: string
    id: string
    isActive: boolean
    name: string
    productId: string
    type: string
}


export interface IProductCategory {
  id: string,
  category_name: string,
  category_description: string,
  category_isactive: boolean,
  images: IProductCategoryImage[]
}

export interface IProductCategoryImage {
    ImgURL: string,
    ThumbURL100: string,
    ThumbURL250: string
    container: string
    id: string
    isActive: boolean
    name: string
    productId: string
    type: string
}