export const utilFunc = {
    stringifyUrl: (type, value) => {

        if (type === 'category') {
            const categoryUrl = `&category=${value}`;
            return categoryUrl;
        } else if (type === 'price') {
            const priceUrl = `&price=${value}`;
            return priceUrl;
        }
        else if (type === 'size') {
            let sizeUrl = `&size=${value.toString()}`;
            return sizeUrl;
        }
        else if (type === 'color') {
            let colorUrl = `&color=${value.toString()}`;
            return colorUrl;
        }
    }
}