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
                                    <a href="javascript:;" class="btn btn-warning">Chi tiết</a>
                                    <a href="javascript:;" class="btn btn-success"> <i class="fas fa-shopping-cart"></i> Thêm</a>
                                    </div>
                                </div>
                            </div>`;
            });
            document.querySelector(appendTarget).innerHTML = content;
        })
    }
}