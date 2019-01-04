/**
 * Re. 7_6 Creating a Custom Filter
 *
 * Vue filters allow you to easily transform data in your templates.
 * (Think filter as in Photoshop = transform c.f. filter as in search fny = restricting number)
 */
export default function(amount, symbol){
    return `${symbol}${amount.toFixed(2)}`;
}