function filterItems(category) {
    const items = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.filter-btn');

    // Atualiza estilo dos botões
    buttons.forEach(btn => {
        if(btn.innerText.toLowerCase() === category.toLowerCase()) {
            btn.classList.add('bg-brandBlack', 'text-white');
            btn.classList.remove('text-brandBlack');
        } else {
            btn.classList.remove('bg-brandBlack', 'text-white');
        }
    });

    // Filtra itens
    items.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            if (category === 'todos' || item.getAttribute('data-category') === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.display = 'none';
            }
        }, 300);
    });
}

tailwind.config = {
    theme: {
        extend: {
            colors: {
                brandGold: '#C5A044', // Tom aproximado do dourado da logo
                brandBlack: '#000000',
            }
        }
    }
}

$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 30,
        center: true, // Item central em destaque
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 4000,
        smartSpeed: 800,
        responsive:{
            0:{ items: 1.2 }, // Mostra um pedaço do próximo item
            600:{ items: 2 },
            1000:{ items: 3 }
        }
    });
});

// 1. Dados dos Produtos
const productData = {
    products: [
        { 
            name: "Seda Italiana", 
            category: "gravatas", 
            price: "89,90", 
            image: "https://images.unsplash.com/photo-1598033129183-c4f50c717658?auto=format&fit=crop&q=80&w=500" 
        },
        { 
            name: "Broche de Notas", 
            category: "broches", 
            price: "12,90", 
            image: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&q=80&w=500" 
        },
        { 
            name: "Leque Imperial", 
            category: "leques", 
            price: "45,00", 
            image: "https://images.unsplash.com/photo-1621335829175-95f437384d7c?auto=format&fit=crop&q=80&w=500" 

        },
        { 
            name: "Poliéster", 
            category: "gravatas", 
            price: "99,90", 
            image: "https://images.unsplash.com/photo-1598033129183-c4f50c717658?auto=format&fit=crop&q=80&w=500" 
        },
        { 
            name: "Algodão", 
            category: "gravatas", 
            price: "99,90", 
            image: "https://images.unsplash.com/photo-1598033129183-c4f50c717658?auto=format&fit=crop&q=80&w=500" 
        },
        { 
            name: "Linho", 
            category: "gravatas", 
            price: "99,90", 
            image: "https://images.unsplash.com/photo-1598033129183-c4f50c717658?auto=format&fit=crop&q=80&w=500" 
        },
        { 
            name: "Camisa Slim", 
            category: "camisa social", 
            price: "120,00", 
            image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=500" 
        }
    ]
};

// 2. Renderização com Handlebars
function renderProducts(filter = 'todos') {
    const source = document.getElementById("product-template").innerHTML;
    const template = Handlebars.compile(source);
    
    // Filtra os dados se necessário
    const filteredData = filter === 'todos' 
        ? productData 
        : { products: productData.products.filter(p => p.category === filter) };

    const html = template(filteredData);
    
    // Destrói o carrossel antes de reinjetar (se existir)
    const $owl = $("#product-grid");
    if ($owl.hasClass('owl-loaded')) {
        $owl.trigger('destroy.owl.carousel');
    }

    $owl.html(html);

    // Reinicializa o Carrossel
    $owl.owlCarousel({
        loop: true,
        margin: 20,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
            0: { items: 1.2 },
            640: { items: 2 },
            1024: { items: 4 }
        }
    });
}

// 3. Função de Filtro Atualizada
function filterItems(category) {
    // Atualiza botões
    document.querySelectorAll('.filter-btn').forEach(btn => {
        if(btn.innerText.toLowerCase() === category.toLowerCase()) {
            btn.classList.add('bg-brandBlack', 'text-white');
            btn.classList.remove('border-gray-300');
        } else {
            btn.classList.remove('bg-brandBlack', 'text-white');
            btn.classList.add('border-gray-300');
        }
    });

    // Renderiza novos itens
    renderProducts(category);
}

// Inicializa ao carregar
$(document).ready(function() {
    renderProducts();
});