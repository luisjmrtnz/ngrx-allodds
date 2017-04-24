export interface Category {
    category_id: number,
    category_name: string
}

export interface CategoryState {
    list: Category[];
    selected: Category,
}