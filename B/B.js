function calc(initialValue) {

    if (typeof initialValue !== 'number') {
        throw new Error("the argument is not a number");
    }

    let result = initialValue;


    function nextOperation(operator, value) {
        if (typeof value !== 'number') {
            throw new Error("the argument is not a number");
        }

        switch (operator) {
            case '+':
                result += value;
                break;
            case '-':
                result -= value;
                break;
            case '*':
                result *= value;
                break;
            case '/':
                result /= value;
                break;
            case '%':
                result %= value;
                break;
            case '**':
                result **= value;
                break;
            default:
                throw new Error("unsupported sign");
        }
        return nextOperation;
    }

    nextOperation.valueOf = function () {
        return result;
    };

    return nextOperation;
}

module.exports = calc;
