import * as fs from "fs";
import * as _ from "lodash";

class ListaDeCosas {
  name: string;
  cosas: any[] = [];
  constructor(name: string) {
    // nombre de esta lista
    this.name = name;
  }
  add(nuevaCosa) {
    this.cosas.push(nuevaCosa);
  }
  getCosas() {
    return this.cosas;
  }
}

class Product {
  name: string;
  price: number;
  id: number;
  constructor(name: string, price: number, id: number) {
    this.name = name;
    this.price = price;
    this.id = id;
  }
}

class ListaDeProductos extends ListaDeCosas {
  constructor(nombre: string) {
    super(nombre);
    const jsonProducts = JSON.parse(
      fs.readFileSync(__dirname + "/products.json").toString()
    );
    jsonProducts.forEach((p) => {
      this.addProduct(p);
    });
  }

  addProduct(product: Product): void {
    this.add(product);
  }

  getProduct(id: number): Product {
    return this.getCosas().find((p) => p.id == id);
  }

  removeProduct(id: number) {
    _.remove(this.getCosas(), (c) => c.id == id);
  }

  getSortedByPrice(order: "asc" | "desc") {
    return _.orderBy(this.getCosas(), "price", order);
  }
}

export { ListaDeProductos, Product };
