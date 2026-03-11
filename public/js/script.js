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