// Live proof: click any block on the page image to see its source columns and the rule that produced it.
function renderProof(root, letter, base, rules) {
  const pages = root.querySelector('.pages'), panel = root.querySelector('.panel-body');
  pages.innerHTML = '';
  panel.innerHTML = '<p class="empty">\u05dc\u05d7\u05e6\u05d5 \u05e2\u05dc \u05db\u05dc \u05d0\u05d6\u05d5\u05e8 \u05d1\u05de\u05db\u05ea\u05d1 \u05db\u05d3\u05d9 \u05dc\u05e8\u05d0\u05d5\u05ea \u05de\u05d0\u05d9\u05d6\u05d5 \u05e2\u05de\u05d5\u05d3\u05d4 \u05d4\u05d2\u05d9\u05e2 \u05d5\u05d0\u05d9\u05d6\u05d4 \u05db\u05dc\u05dc \u05d4\u05e4\u05e2\u05d9\u05dc \u05d0\u05d5\u05ea\u05d5.</p>' +
    '<h3>\u05d4\u05d7\u05dc\u05d8\u05d5\u05ea \u05dc\u05de\u05db\u05ea\u05d1 \u05d6\u05d4</h3>' + Object.entries(letter.decisions).map(([k, v]) => `<div><span class="mono">${k}</span> = <b>${v}</b></div>`).join('') +
    '<h3>\u05e2\u05e8\u05d5\u05e6\u05d9\u05dd</h3>' + letter.channels.map(c => `<span class="tag">${c}</span>`).join(' ');
  letter.pages.forEach(pg => {
    const d = document.createElement('div'); d.className = 'page';
    d.innerHTML = `<img data-enc="${base}/${pg.png}" alt="\u05e2\u05de\u05d5\u05d3 \u05d4\u05d2\u05d4\u05d4">`;
    pg.hotspots.forEach(h => {
      const a = document.createElement('a'); a.className = 'hot';
      a.style.cssText = `left:${h.x / 2.1}%;top:${h.y / 2.97}%;width:${h.w / 2.1}%;height:${h.h / 2.97}%`;
      a.onclick = () => {
        root.querySelectorAll('.hot.sel').forEach(x => x.classList.remove('sel')); a.classList.add('sel');
        const b = letter.blocks[h.block] || {}; const rl = (b.rules || []).filter(Boolean);
        panel.innerHTML = `<h3>\u05d1\u05dc\u05d5\u05e7 <span class="mono">${h.block}</span> <span class="tag">${b.type || ''}</span></h3>` +
          '<h3>\u05e2\u05de\u05d5\u05d3\u05d5\u05ea \u05de\u05e7\u05d5\u05e8</h3>' + ((b.src || []).map(s => `<div class="mono">${s}</span></div>`).join('') || '<div class="note">\u05d8\u05e7\u05e1\u05d8 \u05e7\u05d1\u05d5\u05e2</div>') +
          '<h3>\u05e9\u05d3\u05d5\u05ea \u05d1\u05e8\u05e9\u05d5\u05de\u05ea \u05d4\u05e0\u05de\u05e2\u05df</h3>' + ((b.fields || []).map(s => `<span class="tag mono">${s}</span>`).join(' ') || '<div class="note">\u2014</div>') +
          '<h3>\u05d4\u05db\u05dc\u05dc \u05e9\u05d4\u05e4\u05e2\u05d9\u05dc \u05d0\u05ea \u05d4\u05d1\u05dc\u05d5\u05e7</h3>' + (rl.length ? rl.map(id => { const r = rules[id] || {}; return `<div class="q"><b class="mono">${id}</b> \xb7 ${r.table || ''}<br>` +
            `<span class="mono">${JSON.stringify(r.when || {})} \u2192 ${r.output}=${r.then}</span><div class="why">${r.note || ''}</div><div class="why">\u05d1\u05e2\u05dc\u05d9\u05dd: ${r.owner || ''}</div></div>`; }).join('')
            : '<div class="note">\u05d1\u05dc\u05d5\u05e7 \u05e7\u05d1\u05d5\u05e2 \u2013 \u05de\u05d5\u05e4\u05d9\u05e2 \u05d1\u05db\u05dc \u05de\u05db\u05ea\u05d1, \u05dc\u05dc\u05d0 \u05ea\u05e0\u05d0\u05d9.</div>');
      };
      d.appendChild(a);
    });
    pages.appendChild(d);
  });
}
function initProof(id, letters, labels, base, rules) {
  const root = document.getElementById(id), tabs = root.querySelector('.tabs');
  letters.forEach((l, i) => {
    const b = document.createElement('button'); b.textContent = labels[i];
    b.onclick = () => { tabs.querySelectorAll('button').forEach(x => x.classList.remove('on')); b.classList.add('on'); renderProof(root, l, base, rules); };
    tabs.appendChild(b); if (i === 0) b.click();
  });
}
