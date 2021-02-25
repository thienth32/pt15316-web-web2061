window.util = {
    apiUrl: "http://localhost:3000/",
    getMenu: function(){
        // tạo hàm để lấy danh sách danh mục sử dụng để làm menu
        fetch(`${this.apiUrl}categories`)
        .then(response => response.json())
        .then(cates => {
            // lấy ra html hiện có trong navbar
            let menuContent = document.querySelector('.navbar-nav').innerHTML;
            // dùng vòng lặp để add thẻ html vào trong thẻ ul.menu
            cates.forEach(function(item){
                menuContent += `<li class="nav-item">
                                    <a class="nav-link" aria-current="page" href="/danh-muc.html?id=${item.id}">${item.name}</a>
                                </li>`;
            });
            document.querySelector('.navbar-nav').innerHTML = menuContent;
        });
    },
    getProducts: function(appendTarget){
        fetch(`${this.apiUrl}products?_expand=category`)
        .then(response => response.json())
        .then(products => {
            console.log(products)
            let content = ``;
            products.forEach(pro => {
                content += `<div class="col-3">
                                <div class="card" style="width: 100%;">
                                    <img src="${pro.image}" class="card-img-top" alt="...">
                                    <div class="card-body">
                                    <h5 class="card-title">${pro.name}</h5>
                                    <p>Giá: ${pro.price}đ</p>
                                    <p>Hãng sản xuất: ${pro.category.name}</p>
                                    <a href="javascript:;" onclick="util.getDetailProduct(${pro.id})" class="btn-detail btn btn-warning">Chi tiết</a>
                                    <a href="javascript:;" onclick="util.addToCart(${pro.id})" class="btn btn-success"> <i class="fas fa-shopping-cart"></i> Thêm</a>
                                    </div>
                                </div>
                            </div>`;
            });
            document.querySelector(appendTarget).innerHTML = content;
        })
    },
    getDetailProduct: function(productId){
        console.log(productId);
    },
    addToCart: async function(productId){
        // lấy dữ liệu cart từ localstorage ra ngoài
        let cart = localStorage.getItem('cart');
        // ép kiểu string sang json
        cart = cart == null ? [] : JSON.parse(cart);
        // kiểm tra xem đã có sản phẩm với id nhận được trong giỏ hàng hay chưa?
        // let existed = cart.find(item => item.id == productId);
        let existed = cart.map(o => o.id).indexOf(productId);
        
        // nếu chưa có 
        if(existed == -1){
            // thì thêm sản phẩm đó vào giỏ hàng & bổ sung thuộc tính quantity = 1
            let product = await fetch(`${util.apiUrl}products/${productId}?_expand=category`)
                                .then(response => response.json());
                                
            product.quantity = 1;
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
        }else{
            // nếu có rồi thì tìm ra index của phần tử trùng id và tăng giá trị của thuộc tính quantity lên 1 đơn vị
            cart[existed].quantity += 1;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        util.updateCartDisplay();
        
    },
    updateCartDisplay: function(){
        // lấy dữ liệu cart từ localstorage ra ngoài
        let cart = localStorage.getItem('cart');
        // ép kiểu string sang json
        cart = cart == null ? [] : JSON.parse(cart);
        // chạy vòng lặp qua tất cả các phần tử trong mảng cart
        let totalProduct = 0;
        // đếm số lượng sản phẩm đang có trong giỏ hàng
        cart.forEach(element => {
            totalProduct+= element.quantity
        });
        // cập nhật lại số hiển thị trên menu
        document.querySelector('.total-cart-product').innerText = totalProduct;
    },
    getCartDetail: function(){
        // lấy dữ liệu cart từ localstorage ra ngoài
        let cart = localStorage.getItem('cart');
        // ép kiểu string sang json
        cart = cart == null ? [] : JSON.parse(cart);
        let tableContent = ``;
        let totalMoney = 0;
        cart.forEach(item => {
            totalMoney += item.quantity*item.price;
            tableContent += `<tr>
                                <td>${item.id}</td>
                                <td>${item.name}</td>
                                <td>
                                    <img src="${item.image}" width="70">    
                                </td>
                                <td>${item.price}</td>
                                <td>${item.quantity}</td>
                                <td>${item.quantity*item.price}</td>
                            </tr>`;
        });
        tableContent += `<tr>
                            <td colspan="5">Tổng số tiền</td>
                            <td>${totalMoney}</td>
                        </tr>`;
        document.querySelector('#cart-detail-tbody').innerHTML = tableContent;
    }

}