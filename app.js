// ننتظر حتى يتم تحميل واجهة الـ HTML بالكامل قبل تشغيل الأكواد منعا للتعليق والفراغ
document.addEventListener('DOMContentLoaded', () => {
    const totalMacros = 30;
    const SECRET_PASSWORD = "1221"; // كلمة المرور الخاصة بك كمسؤول
    const grid = document.getElementById('cardsGrid');
    const types = ['مرور', 'اعتداءات', 'بلاغات'];

    let savedData = {};
    try {
        savedData = JSON.parse(localStorage.getItem('police_macros')) || {};
    } catch(e) { 
        savedData = {}; 
    }

    // 1. بناء الأسطر الـ 30 عمودياً بشكل برمجي آمن داخل المنصة
    for (let i = 1; i <= totalMacros; i++) {
        const randomType = types[(i - 1) % types.length];
        const currentText = savedData[`input-${i}`] || `مايكرو ${i}`;
        
        const row = document.createElement('div');
        row.className = 'macro-row';
        row.setAttribute('data-type', randomType);
        
        row.innerHTML = `
            <div class="macro-info">
                <span class="macro-num"><i class="fa-solid fa-hashtag"></i> خانة ${i}</span>
            </div>
            <input type="text" class="macro-input" id="input-${i}" value="${currentText}" readonly autocomplete="off">
            <button class="copy-btn" id="btn-${i}">نسخ</button>
        `;
        
        grid.appendChild(row);

        // تشغيل ميزة نسخ النص والتحكم بالأيقونات وحالة الزر
        row.querySelector(`#btn-${i}`).addEventListener('click', function() {
            const input = document.getElementById(`input-${i}`);
            navigator.clipboard.writeText(input.value).then(() => {
                this.classList.add('copied');
                this.innerText = 'تم!';
                setTimeout(() => {
                    this.classList.remove('copied');
                    this.innerText = 'نسخ';
                }, 1500);
            });
        });
    }

    // 2. تفعيل لوحة الإدارة والدخول بكلمة السر 1221
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const passInput = document.getElementById('passInput').value;
            if (passInput === SECRET_PASSWORD) {
                document.getElementById('loginSection').style.display = 'none';
                document.getElementById('controlSection').style.display = 'block';
                
                // فتح صلاحية التعديل والكتابة لجميع الخانات
                document.querySelectorAll('.macro-input').forEach(input => {
                    input.removeAttribute('readonly');
                    input.classList.add('editable-mode');
                });
            } else {
                alert('كلمة المرور خاطئة! يرجى المحاولة مرة أخرى.');
            }
        });
    }

    // 3. دالة حفظ البيانات المعدلة بدون أكواد
    const saveBtn = document.getElementById('saveBtn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            let dataToSave = {};
            for (let i = 1; i <= totalMacros; i++) {
                dataToSave[`input-${i}`] = document.getElementById(`input-${i}`).value;
            }
            localStorage.setItem('police_macros', JSON.stringify(dataToSave));
            alert('✓ تم حفظ جميع التعديلات داخل المنصة بنجاح!');
            location.reload(); // إعادة تشغيل خفيفة للموقع لتثبيت التعديلات وقفل الخانات مجدداً
        });
    }

    // 4. تشغيل نظام البحث الذكي السريع
    const searchBox = document.getElementById('searchBox');
    if (searchBox) {
        searchBox.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            document.querySelectorAll('.macro-row').forEach(row => {
                const val = row.querySelector('.macro-input').value.toLowerCase();
                row.style.display = val.includes(query) ? 'flex' : 'none';
            });
        });
    }

    // 5. ربط أزرار الفلترة والتصنيفات (الكل، مرور، اعتداءات، بلاغات)
    const filterButtons = {
        'btn-all': 'الكل',
        'btn-traffic': 'مرور',
        'btn-assault': 'اعتداءات',
        'btn-reports': 'بلاغات'
    };

    Object.keys(filterButtons).forEach(btnId => {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const type = filterButtons[btnId];
                document.querySelectorAll('.macro-row').forEach(row => {
                    row.style.display = (type === 'الكل' || row.getAttribute('data-type') === type) ? 'flex' : 'none';
                });
            });
        }
    });
});
