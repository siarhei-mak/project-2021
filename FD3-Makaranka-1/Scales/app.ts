class Scales {
    addedProducts:Product[]; //добавленные продукты будут храниться в массиве в виде объектов классов

    constructor() {
        this.addedProducts = []; //массив добавленных продуктов
    }

    add(_product:Product, ...rest:Product[]):void{ //добавление продукта
        this.addedProducts.push(_product); //добавляем продукт на весы
        if(rest) {
            rest.forEach((item:Product)=>{
                this.addedProducts.push(item);
            });
        }
    }

    getSumScale():number{ //суммарный вес продуктов
        if(this.addedProducts.length) {
            let sumScale:number = this.addedProducts.reduce((sum:number, current:Product) => sum+current.productScale, 0);
            return sumScale;
        } else {
            return 0;
        }
    }

    getNameList():string[] { //массив наименований продуктов
        let productsName:string[] = [];
        if(this.addedProducts.length) {
            for(let i:number=0; i<this.addedProducts.length; i++) {
                productsName.push(this.addedProducts[i].productName);
            }
            return productsName;
        } else {
            return productsName;
        }
    }
}


class Product {
    productName:string;
    productScale:number;

    getName():string {
        return this.productName;
    }

    getScale():number {
        return this.productScale;
    }
}

class Apple extends Product {
    constructor(_productName:string, _productScale:number) {
        super();
        this.productName = _productName;
        this.productScale = _productScale;
    }
}

class Tomato extends Product {
    constructor(_productName:string, _productScale:number) {
        super();
        this.productName = _productName;
        this.productScale = _productScale;
    }
}

class Carrot extends Product {
    constructor(_productName:string, _productScale:number) {
        super();
        this.productName = _productName;
        this.productScale = _productScale;
    }
}


let scales = new Scales();

console.log('...создаем три объекта apple, tomato, carrot');

let apple = new Apple('Яблоко', 100);
let tomato = new Tomato('Томат', 50);
let carrot = new Carrot('Морковь', 150);

console.log(`...добавляем все продукты на весы`)
scales.add(apple, tomato, carrot);

console.log(`...метод getSumScale возвращает: ${scales.getSumScale()}`);
console.log(`...метод getNameList возвращает: ${scales.getNameList()}`)
