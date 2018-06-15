export interface Package {
    name?: string;
    tv?: {
        selected?: boolean;
        tvType?: string;
        package?: string;
        spanish?: boolean;
        numberofTVs?: number;
        costOfExtraTvs?: number;
        base?: number;
        discount?: number;
        regional?: boolean;
    };
    internet?: {
        selected?: boolean;
        internetSpeed?: string;
        base?: number;
        discountBundled?: number;
        discount1Year?: number;
        bundled?: boolean;
    };
    phone?: {
        selected?: boolean;
        phoneService?: string;
        base?: number;
        discount?: number;
    };
    year1Pricing?: number;
    year2Pricing?: number;
    year1Discount?: number;
    year2Discount?: number;
    discounts?: any[];
}
