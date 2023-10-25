class ProductManager{
    constructor(){

        this.file = "data.json";
        this.path = "./";
        this.createfile(this.file);
        
    }

        getCatalogue (fileName){
            const fs = require('fs');
            if(fs.existsSync(this.path + fileName)){
                let catalogueJSON = fs.readFileSync(fileName, 'utf-8');
                let catalogue = JSON.parse(catalogueJSON);
                return catalogue;
            }else{
                console.log("File not found!");
                
            }

        }

        createfile (fileName) {
            const fs = require('fs');
            let catalogue = [];
            const jsonData = JSON.stringify(catalogue, null, 2);
            fs.writeFileSync(this.path + fileName, jsonData);
            }

                       
        addProduct (title, description, price, thumbnail, code, stock) {
            const fs = require('fs');
        

        try { if(title.length == 0 || description.length == 0 || price.length == 0 || thumbnail.length == 0 || code.length == 0 || stock.length == 0){console.log("Surprise MotherFather!");}
            }

        catch (e) {
            console.error("Data product incomplete!");
            return;
                       
        }

        let flag = true;

        let catalogue = this.getCatalogue(this.path + this.file);

        catalogue.map((product)=>{
            if (product.code === code){
                flag = false;
                console.log("Code already in use!");
            }
        })

        if (flag){
        
        let id;

        try {id = catalogue.slice(-1)[0].id;}

        catch(error){
            id = 0;
        }finally{id++}
       
        catalogue.push({title, description, price, thumbnail, code, stock, id})
        const jsonData = JSON.stringify(catalogue, null, 2);
        fs.writeFileSync(this.path + this.file, jsonData);
        console.log("File updated successfully!")
        }
                
        }                          
        
        getProducts () {
            let catalogue = this.getCatalogue(this.path + this.file);
            return console.log(catalogue);
        }

        getProductsById (id) {
            const fs = require('fs');

            let catalogue = this.getCatalogue(this.path + this.file); 
            
            let flag = false;

            catalogue.map((product)=>{
                                             
                if(product.id === id){
                    flag = true;
                    console.log(product);
                    }
                
            }
            )
            if(!flag){
                        console.log("Product not found!");
            } 
        }
        deleteProduct (id){
            const fs = require('fs');
        
            let catalogue = this.getCatalogue(this.path + this.file); 
        
            const index = catalogue.findIndex(product => product.id === id);

            if (index !== -1){
                let newCatalogue = [...catalogue.slice(0, index), ...catalogue.slice(index + 1)];
                const jsonData = JSON.stringify(newCatalogue, null, 2);
                fs.writeFileSync(this.path + this.file, jsonData);
                console.log("Product erased!");
            }else{
                console.log("product not found!");
            }
       
        }
        updateProduct(id, field, fieldValue){
            const fs = require('fs');
            let catalogue = this.getCatalogue(this.path + this.file);
            const index = catalogue.findIndex(product => product.id === id);
            if(index !== -1){
                                            
                catalogue[index][field] = fieldValue;
                const jsonData = JSON.stringify(catalogue, null, 2);
                fs.writeFileSync(this.path + this.file, jsonData);
                console.log("Product updated!");

            }else{
                console.log("Product not found!");
            }
        }
        }

    console.log("-TEST-");

    const newProduct = new ProductManager;
    newProduct.getProducts();
    newProduct.addProduct("producto prueba",
        "Producto a prueba",
        200,
        "Sin imagen",
        "12345abcd",
        25
        );
    newProduct.getProducts();
    console.log("Get products by id");
    newProduct.getProductsById(1);
    console.log("Get products by wrong id");
    newProduct.getProductsById(3);
    newProduct.updateProduct(1, "description", "Se cambio la descripción");
    newProduct.getProductsById(1);
    newProduct.deleteProduct(3);
    newProduct.deleteProduct(1);
    newProduct.getProducts();
    