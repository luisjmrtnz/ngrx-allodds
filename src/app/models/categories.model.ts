export interface Category {
    category_id: number;
    category_name: string;
    selected: boolean;
}

export interface CategoryState {
    list: Category[];
    loading: boolean;
    show: boolean;
}