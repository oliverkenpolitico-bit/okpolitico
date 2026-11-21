// [claude .leon 2026-11-05] Botones de compartir de las notas de OKpolítico, adaptados del módulo de EstudioBot (enelensayo-web/js/compartir.js, solo lectura):
// agrega «Historia IG» (imagen 1080×1920 generada en el navegador con la marca de OKpolítico), Threads, Bluesky y «Copiar enlace» a los botones de siempre.
(function () {
  var box = document.querySelector('.compartir'); if (!box) return;
  var url = location.href.split('#')[0], u = encodeURIComponent(url);
  var titulo = ((document.querySelector('article h1') || document.querySelector('h1') || {}).textContent || document.title).trim(), t = encodeURIComponent(titulo);
  var st = document.createElement('style');
  st.textContent = '.compartir a.ig{background:linear-gradient(45deg,#F9CE34,#EE2A7B 50%,#6228D7);color:#fff}.compartir a.thc{background:#000;color:#fff}.compartir a.bsc{background:#0085FF;color:#fff}.compartir a.cpc{background:#4b3fd1;color:#fff}';
  document.head.appendChild(st);
  function boton(clase, texto, href, alClic) {
    var a = document.createElement('a'); a.className = clase; a.textContent = texto; a.href = href || '#';
    if (alClic) a.addEventListener('click', function (e) { e.preventDefault(); alClic(a); }); else { a.target = '_blank'; a.rel = 'noopener'; }
    box.appendChild(a); return a;
  }
  boton('ig', 'Historia de Instagram', '#', historia);
  boton('thc', 'Threads', 'https://www.threads.net/intent/post?text=' + t + '%20' + u);
  boton('bsc', 'Bluesky', 'https://bsky.app/intent/compose?text=' + t + '%20' + u);
  boton('cpc', 'Copiar enlace', '#', function (a) { try { navigator.clipboard.writeText(url); } catch (x) { } var ant = a.textContent; a.textContent = '¡Copiado!'; setTimeout(function () { a.textContent = ant; }, 1800); });

  function lineas(c, texto, ancho, max) {
    var pal = texto.split(' '), l = '', ls = [];
    pal.forEach(function (w) { var p = l ? l + ' ' + w : w; if (c.measureText(p).width > ancho && l) { ls.push(l); l = w; } else l = p; });
    ls.push(l);
    if (ls.length > max) { ls = ls.slice(0, max); ls[max - 1] = ls[max - 1].replace(/[\s,.;:]*\S*$/, '') + '…'; }
    return ls;
  }
  function pintar(img, a) {
    var W = 1080, H = 1920, cv = document.createElement('canvas'); cv.width = W; cv.height = H; var c = cv.getContext('2d');
    var TINTA = '#0B0B10', AMAR = '#FFD400', TIT = '"Bricolage Grotesque","Inter",Arial,sans-serif', TXT = '"Inter",Arial,sans-serif';
    var g = c.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#0B0B10'); g.addColorStop(1, '#171720'); c.fillStyle = g; c.fillRect(0, 0, W, H);
    // cabecera: icono + OKpolítico (OK blanco, político amarillo, apretado como en el periódico) y etiqueta de sección
    var emb = document.querySelector('.logo img'); var y0 = 150;
    if (emb && emb.complete && emb.naturalWidth) { try { c.save(); c.beginPath(); c.roundRect(60, y0 - 62, 84, 84, 20); c.clip(); c.drawImage(emb, 60, y0 - 62, 84, 84); c.restore(); } catch (x) { } }
    c.textBaseline = 'alphabetic'; c.font = '800 54px ' + TIT; c.fillStyle = '#fff'; c.fillText('OK', 162, y0 + 4);
    var wOK = c.measureText('OK').width; c.fillStyle = AMAR; c.fillText('político', 162 + wOK - 2, y0 + 4);
    var chip = ((document.querySelector('article .chip') || {}).textContent || 'NOTICIAS').toUpperCase();
    c.font = '800 28px ' + TIT; var cw = c.measureText(chip).width + 70;
    c.fillStyle = AMAR; c.beginPath(); c.roundRect(W - 60 - cw, y0 - 40, cw, 58, 29); c.fill();
    c.fillStyle = TINTA; c.beginPath(); c.arc(W - 60 - cw + 26, y0 - 11, 8, 0, 7); c.fill(); c.fillText(chip, W - 60 - cw + 44, y0 + 10);
    // foto grande con esquinas redondas (recorte «cover» 960×900)
    var fx = 60, fy = 240, fw = 960, fh = 900;
    if (img) { c.save(); c.beginPath(); c.roundRect(fx, fy, fw, fh, 36); c.clip(); var r = Math.max(fw / img.width, fh / img.height), w = img.width * r, h = img.height * r; c.drawImage(img, fx + (fw - w) / 2, fy + (fh - h) * 0.3, w, h);
      var gr = c.createLinearGradient(0, fy + fh - 260, 0, fy + fh); gr.addColorStop(0, 'rgba(11,11,16,0)'); gr.addColorStop(1, 'rgba(11,11,16,.85)'); c.fillStyle = gr; c.fillRect(fx, fy, fw, fh); c.restore(); }
    // titular (el primer renglón en amarillo) y entrada
    var y = fy + fh + 90; c.font = '800 70px ' + TIT; var tl = lineas(c, titulo, 960, 5);
    tl.forEach(function (s, i) { c.fillStyle = (i === 0 && tl.length > 2) ? AMAR : '#fff'; c.fillText(s, 60, y); y += 82; });
    c.fillStyle = '#DC3C32'; c.fillRect(60, y - 36, 150, 8);
    var ent = ((document.querySelector('article .entrada') || {}).textContent || '').trim();
    if (ent && y < 1500) { c.font = '400 34px ' + TXT; c.fillStyle = '#D6D6E0'; lineas(c, ent, 960, 3).forEach(function (s) { y += 50; c.fillText(s, 60, y); }); }
    // botón
    var by = 1610; c.fillStyle = AMAR; c.beginPath(); c.roundRect(60, by, 960, 110, 55); c.fill();
    c.fillStyle = TINTA; c.font = '800 42px ' + TIT; c.textAlign = 'center'; c.fillText('LEE LA NOTA · okpolitico.com', 540, by + 70); c.textAlign = 'left';
    return cv;
  }
  function historia(btn) {
    var ant = btn.textContent; btn.textContent = 'Preparando…';
    var fig = document.querySelector('figure.foto-nota img') || document.querySelector('article img'); var im = new Image(); im.crossOrigin = 'anonymous';
    var listo = function (img) {
      var fuentes = (document.fonts && document.fonts.load) ? Promise.all([document.fonts.load('800 54px "Bricolage Grotesque"'), document.fonts.load('400 34px "Inter"')]) : Promise.resolve();
      fuentes.catch(function () { }).then(function () {
        var cv = pintar(img, btn);
        cv.toBlob(function (blob) {
          btn.textContent = ant; if (!blob) { alert('No pude preparar la imagen. Intenta de nuevo.'); return; }
          var f = new File([blob], 'historia-okpolitico.png', { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [f] })) { navigator.share({ files: [f], title: titulo, url: url }).catch(function () { }); }
          else { var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'historia-okpolitico.png'; a.click(); try { navigator.clipboard.writeText(url); } catch (x) { } alert('Descargué la imagen. Súbela como historia de Instagram y pega el enlace (ya lo copié) con el sticker de enlace.'); }
        }, 'image/png');
      });
    };
    im.onload = function () { listo(im); }; im.onerror = function () { listo(null); };
    if (fig && (fig.currentSrc || fig.src)) im.src = fig.currentSrc || fig.src; else listo(null);
  }
})();
