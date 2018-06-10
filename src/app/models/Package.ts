export interface Package {
    name?: string;
    tv?: {
        selected?: boolean;
        tvType?: string;
        package?: string;
        base?: number;
        discount?: number;
    };
    internet?: {
        selected?: boolean;
        tvType?: string;
        base?: number;
        discount?: number;
    };
    phone?: {
        selected?: boolean;
        tvType?: string;
        base?: number;
        discount?: number;
    };
    discounts?: any[];
}
