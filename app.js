let products = [];


        
        function toShort(str, max=50){

            if(str.length > max ){
                return str.substring(0, max) + "....." ;
            }

            return str;
        };



        function toShow(x){

            $("#product").empty();

             
            x.map( product => {
                $("#product").append(`
                
                    <div class="card product pt-3 rounded ">
                        <img src="${product.image}" class="card-img-top" alt="">
                        <div class="card-body">

                            <p class="card-title font-weight-bold text-nowrap overflow-hidden">${product.title}</p>

                            <small class=text-muted>${toShort(product.description, 120)}</small>

                            <div class="mt-3 d-flex justify-content-between align-items-end">
                                
                                <span class="">$ ${product.price}</span>

                                <button class="btn btn-outline-danger add-to-cart" data-id="${product.id}">

                                    Add
                                    <i class="fas fa-cart-plus"></i>

                                </button>
                            </div>
                        </div>
                    </div>
                
                
                `)
            });
        }


        
        function cartTotal(){

            let count = $(".item-in-cart-cost").length ;

            
            $(".item-in-cart-count").html(count)

            if(count > 0 ){
                
                let totalCost = $(".item-in-cart-cost").toArray().map(el=>el.innerHTML).reduce((x,y)=>Number(x)+Number(y));

                    $(".total").html(`

                        <div class="d-flex justify-content-between font-weight-bold px-3">
                            <h4>Total</h4>
                            <h4>$ <span class="cart-cost-total">${Number(totalCost).toFixed(2)}</span></h4>
                        </div>

                    `)
                }
                else{

                    $(".total").html(` Cart is Empty `)

                }


        }



        $.get('https://fakestoreapi.com/products/', function (data){

            
            products = data;
            toShow(products)
   
        });


        
        $("#search").on("keyup", function(){
            
            let keyword =$(this).val().toLowerCase();

            
            if(keyword.trim().length) {

                
                let filterProducts = products.filter(product =>{

                    if(product.title.toLowerCase().indexOf(keyword) > -1 || product.description.toLowerCase().indexOf(keyword) > -1 || product.price == keyword){

                        return product ;

                    }

                });

                toShow(filterProducts);
            };
        });

        
        $.get("https://fakestoreapi.com/products/categories", function (data) {

            data.map( cate => {

                $("#category").append(`
                    <option value="${cate}">${cate}</option>
                `)

            })
        })

        
        $("#category").on("change", function () {

            let selectedCategory = $(this).val();
            

            if(selectedCategory != 0){

                let filterProducts = products.filter(product =>{

                    if(product.category === selectedCategory){

                        return product ;

                    };

            });

            toShow(filterProducts);

            }
            else{

                toShow(products)

            }

        }); 

         
        $("#product").delegate(".add-to-cart","click", function (){

            let currentItemId = $(this).attr("data-id");
            let productInfo = products.filter( el => el.id == currentItemId )[0];

            if($(".item-in-cart").toArray().map(el=>el.getAttribute("data-id")).includes(currentItemId)){

                alert("Already Added")

            }
            else{
                
                
                $("#cart").append(`
            
                    <div class="card border-0 rounded item-in-cart" data-id="${productInfo.id}">

                        <div class="card-body">

                            <div class="d-flex justify-content-between align-items-end">
                                <img src="${productInfo.image}" class="img-in-cart" alt="">
                                <button class="btn btn-outline-danger remove-form-cart">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>

                            <p class="mt-3">${productInfo.title}</p>

                            <div class="d-flex justify-content-between align-items-end">

                                <div class="form-row">

                                    <button class="btn btn-outline-primary quantity-minus">
                                        <i class="fas fa-minus"></i>
                                    </button>

                                    <input type="number" name="" id="" class="w-25 mx-1 form-control text-right quantity" unit-price="${productInfo.price}" value="1" min="1">

                                    <button class="btn btn-outline-primary quantity-plus">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>

                                <p class="mb-0"> $<span class="item-in-cart-cost"> ${productInfo.price}</span> </p>

                            </div>

                            <hr>
                        </div>
                    </div>
                    
                `)

            }

            cartTotal();

        });


        
        $("#cart").delegate(".remove-form-cart", "click", function (){

            $(this).parentsUntil("#cart").remove();
            cartTotal();

        });


        $("#cart").delegate(".quantity-plus", "click", function (){

            let q = $(this).siblings(".quantity").val();
            let p = $(this).siblings(".quantity").attr("unit-price");

            let newQ = Number(q)+1;
            let newCost = p * newQ;

            
            $(this).siblings(".quantity").val(newQ);

            
            $(this).parent().siblings().find(".item-in-cart-cost").html(newCost.toFixed(2));
            cartTotal();

        });

        $("#cart").delegate(".quantity-minus", "click", function (){

            let q = $(this).siblings(".quantity").val();
            let p = $(this).siblings(".quantity").attr("unit-price");

            if(q > 1){
                let newQ = Number(q)-1;
                let newCost = p * newQ;

                
                $(this).siblings(".quantity").val(newQ);

                
                $(this).parent().siblings().find(".item-in-cart-cost").html(newCost.toFixed(2));
                cartTotal();
            }
            
        });

        $("#cart").delegate(".quantity", "keyup change", function (){

            let q = $(this).val();
            let p = $(this).attr("unit-price");

            if(q >= 1){
                let newQ = Number(q);
                let newCost = p * newQ;
                
                $(this).val(newQ);
                
                $(this).parent().siblings().find(".item-in-cart-cost").html(newCost.toFixed(2));
                cartTotal();
            }
            else{
                alert("More Than One")
            }


        });


        $(".menu-icon").on("click", function () { 

            $(".left-side").toggleClass("show");

         });

         $(".menu-icon-1").on("click", function () { 

            $(".left-side").toggleClass("show");

        });