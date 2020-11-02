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
            let sumScale:number = this.addedProducts.reduce((sum:number, current:Product) => sum+current.productScale, 0);
            
            return sumScale;
    }

    getNameList():string[] { //массив наименований продуктов
        let productsName:string[] = [];
        for(let i:number=0; i<this.addedProducts.length; i++) {
            productsName.push(this.addedProducts[i].productName);
        }

        return productsName;
    }
}

interface IScalable {
    getName():string;
    getScale():number;
}

class Product implements IScalable {
    productName:string;
    productScale:number;

    constructor(_productName:string, _productScale:number) {
        this.productName = _productName;
        this.productScale = _productScale;
    }

    getName(){
        return this.productName;
    }

    getScale() {
        return this.productScale;
    }
}

let scales = new Scales();

console.log('...создаем три объекта apple, tomato, carrot');

let apple = new Product('Яблоко', 100);
let tomato = new Product('Томат', 50);
let carrot = new Product('Морковь', 150);

console.log(`...добавляем все продукты на весы`)
// scales.add(apple, tomato, carrot);

console.log(`...метод getSumScale возвращает: ${scales.getSumScale()}`);
console.log(`...метод getNameList возвращает: ${scales.getNameList()}`)
