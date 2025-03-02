function generateRandomNumber(length) {
    let number = "";
    for (let i = 0; i < length; i++) {
        number += Math.floor(Math.random() * 10);
    }
    return number;
}

function calculateLuhnCheckDigit(number) {
    let sum = 0;
    let alternate = false;
    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number[i], 10);
        if (alternate) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        alternate = !alternate;
    }
    return (sum * 9) % 10;
}

function generateCreditCard(brand) {
    let prefix, length;

    switch (brand.toLowerCase()) {
        case "visa":
            prefix = "4";
            length = 16;
            break;
        case "mastercard":
            prefix = ["51", "52", "53", "54", "55"][Math.floor(Math.random() * 5)];
            length = 16;
            break;
        case "amex":
            prefix = ["34", "37"][Math.floor(Math.random() * 2)];
            length = 15;
            break;
        default:
            throw new Error("Invalid brand");
    }

    let cardNumber = prefix + generateRandomNumber(length - prefix.length - 1);
    let checkDigit = calculateLuhnCheckDigit(cardNumber);
    return cardNumber + checkDigit;
}

module.exports = generateCreditCard;
