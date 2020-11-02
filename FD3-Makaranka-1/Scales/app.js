var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        if (this.addedProducts.length) {
            var sumScale = this.addedProducts.reduce(function (sum, current) { return sum + current.productScale; }, 0);
            return sumScale;
        }
        else {
            return 0;
        }
    };
    Scales.prototype.getNameList = function () {
        var productsName = [];
        if (this.addedProducts.length) {
            for (var i = 0; i < this.addedProducts.length; i++) {
                productsName.push(this.addedProducts[i].productName);
            }
            return productsName;
        }
        else {
            return productsName;
        }
    };
    return Scales;
}());
var Product = /** @class */ (function () {
    function Product() {
    }
    Product.prototype.getName = function () {
        return this.productName;
    };
    Product.prototype.getScale = function () {
        return this.productScale;
    };
    return Product;
}());
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple(_productName, _productScale) {
        var _this = _super.call(this) || this;
        _this.productName = _productName;
        _this.productScale = _productScale;
        return _this;
    }
    return Apple;
}(Product));
var Tomato = /** @class */ (function (_super) {
    __extends(Tomato, _super);
    function Tomato(_productName, _productScale) {
        var _this = _super.call(this) || this;
        _this.productName = _productName;
        _this.productScale = _productScale;
        return _this;
    }
    return Tomato;
}(Product));
var Carrot = /** @class */ (function (_super) {
    __extends(Carrot, _super);
    function Carrot(_productName, _productScale) {
        var _this = _super.call(this) || this;
        _this.productName = _productName;
        _this.productScale = _productScale;
        return _this;
    }
    return Carrot;
}(Product));
var scales = new Scales();
console.log('...создаем три объекта apple, tomato, carrot');
var apple = new Apple('Яблоко', 100);
var tomato = new Tomato('Томат', 50);
var carrot = new Carrot('Морковь', 150);
console.log("...\u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0435\u043C \u0432\u0441\u0435 \u043F\u0440\u043E\u0434\u0443\u043A\u0442\u044B \u043D\u0430 \u0432\u0435\u0441\u044B");
scales.add(apple, tomato, carrot);
console.log("...\u043C\u0435\u0442\u043E\u0434 getSumScale \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442: " + scales.getSumScale());
console.log("...\u043C\u0435\u0442\u043E\u0434 getNameList \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442: " + scales.getNameList());
//# sourceMappingURL=app.js.map
