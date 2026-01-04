document.addEventListener('DOMContentLoaded', () => {
    // --- عناصر DOM ---
    const htmlCodeEl = document.getElementById('html-code');
    const cssCodeEl = document.getElementById('css-code');
    const jsCodeEl = document.getElementById('js-code');
    const outputFrameEl = document.getElementById('output-frame');
    const runBtn = document.getElementById('run-btn');
    const downloadBtn = document.getElementById('download-btn');

    // --- وظيفة تشغيل الكود ---
    const runCode = () => {
        const htmlCode = htmlCodeEl.value;
        const cssCode = cssCodeEl.value;
        const jsCode = jsCodeEl.value;

        const combinedCode = `
            <html>
                <head>
                    <style>${cssCode}</style>
                </head>
                <body>
                    ${htmlCode}
                    <script>${jsCode}<\/script>
                </body>
            </html>
        `;

        outputFrameEl.srcdoc = combinedCode;
    };

    // --- وظيفة تحميل الملف ---
    const downloadCode = () => {
        const htmlCode = htmlCodeEl.value;
        const cssCode = cssCodeEl.value;
        const jsCode = jsCodeEl.value;

        const combinedCode = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>Code-X Export</title>
                <style>${cssCode}</style>
            </head>
            <body>
                ${htmlCode}
                <script>${jsCode}<\/script>
            </body>
            </html>
        `;

        const blob = new Blob([combinedCode], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'code-x-export.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // --- ربط الأحداث ---
    runBtn.addEventListener('click', runCode);
    downloadBtn.addEventListener('click', downloadCode);

    // --- خلفية الماتريكس ---
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops = [];

    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }

    const draw = () => {
        ctx.fillStyle = 'rgba(1, 4, 9, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0ff'; // Neon Cyan
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };

    setInterval(draw, 30);
    
    // تحديث أبعاد الكانفاس عند تغيير حجم النافذة
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // إعادة حساب الأعمدة عند التغيير الكبير
    });
});