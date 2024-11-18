export const formatePrize = (amount) => {
    // console.log(amount)
    if (typeof amount !== 'number' || isNaN(amount)) {
        throw new TypeError('Amount must be valid number.')
    }
    const formtatedAmount = new Intl.NumberFormat().format(amount.toFixed(2))
    return `$${formtatedAmount}`
}