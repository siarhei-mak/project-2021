var Scales = /** @class */ (function () {

    function Scales() {
        this.addedProducts = []; //массив добавленных продуктов
    }
    Scales.prototype.add = function (_product) {
        var _this = this;
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        this.addedProducts.push(_product); //добавляем продукт на весы
        if (rest) {
            rest.forEach(function (item) {
                _this.addedProducts.push(item);
            });
        }
    };
    Scales.prototype.getSumScale = function () {
        var sumScale = this.addedProducts.reduce(function (sum, current) { return sum + current.productScale; }, 0);
        return sumScale;
    };
    Scales.prototype.getNameList = function () {
        var productsName = [];
        for (var i = 0; i < this.addedProducts.length; i++) {
            productsName.push(this.addedProducts[i].productName);
        }
        return productsName;
    };
    return Scales;
}());
var Product = /** @class */ (function () {
    function Product(_productName, _productScale) {
        this.productName = _productName;
        this.productScale = _productScale;
    }
    Product.prototype.getName = function () {
        return this.productName;
    };
    Product.prototype.getScale = function () {
        return this.productScale;
    };
    return Product;
}());
var scales = new Scales();
console.log('...создаем три объекта apple, tomato, carrot');
var apple = new Product('Яблоко', 100);
var tomato = new Product('Томат', 50);
var carrot = new Product('Морковь', 150);
console.log("...\u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0435\u043C \u0432\u0441\u0435 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u044B \u043D\u0430 \u0432\u0435\u0441\u044B");
// scales.add(apple, tomato, carrot);
console.log("...\u043C\u0435\u0442\u043E\u0434 getSumScale \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442: " + scales.getSumScale());
console.log("...\u043C\u0435\u0442\u043E\u0434 getNameList \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442: " + scales.getNameList());
//# sourceMappingURL=app.js.map
