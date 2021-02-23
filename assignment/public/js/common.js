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
    }
}