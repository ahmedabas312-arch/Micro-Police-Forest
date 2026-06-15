window.addEventListener('DOMContentLoaded', () => {
    const totalMacros = 30;
    const grid = document.getElementById('cardsGrid');

    if (grid) {
        for (let i = 1; i <= totalMacros; i++) {
            const card = document.createElement('div');
            card.className = 'macro-card';
            
            card.innerHTML = `
                <div class="card-header">
                    <span class="card-title"><i class="fa-solid fa-hashtag"></i> خانة رقم ${i}</span>
                </div>
                <div class="input-wrapper">
                    <input type="text" class="macro-input" id="input-${i}" value="مايكرو ${i}" autocomplete="off">
                </div>
                <button class="copy-btn" id="btn-${i}">
                    <i class="fa-regular fa-copy"></i>
                    <span>نسخ</span>
                </button>
            `;
            
            grid.appendChild(card);

            // إضافة حدث الضغط للزر بطريقة برمجية آمنة
            const button = card.querySelector(`#btn-${i}`);
            button.addEventListener('click', () => {
                const input = card.querySelector(`#input-${i}`);
                const btnText = button.querySelector('span');
                const btnIcon = button.querySelector('i');

                navigator.clipboard.writeText(input.value).then(() => {
                    button.classList.add('copied');
                    btnText.innerText = 'تم النسخ!';
                    btnIcon.className = 'fa-solid fa-check';

                    setTimeout(() => {
                        button.classList.remove('copied');
                        btnText.innerText = 'نسخ';
                        btnIcon.className = 'fa-regular fa-copy';
                    }, 2000);
                });
            });
        }
    }
});
