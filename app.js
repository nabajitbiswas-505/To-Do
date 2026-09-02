/* TaskFlow — app.js : shared utilities used across pages */
(function(){
  function toast(message, icon){
    let wrap = document.querySelector('.toast-wrap');
    if(!wrap){ wrap = document.createElement('div'); wrap.className='toast-wrap'; document.body.appendChild(wrap); }
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg><span>${message}</span>`;
    wrap.appendChild(el);
    setTimeout(()=>{ el.classList.add('leaving'); setTimeout(()=>el.remove(), 320); }, 2600);
  }

  function fmtDate(iso){
    const d = new Date(iso);
    const today = new Date(); const tomorrow = new Date(); tomorrow.setDate(today.getDate()+1);
    const sameDay = (a,b)=> a.toDateString()===b.toDateString();
    if(sameDay(d,today)) return 'Today · ' + d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
    if(sameDay(d,tomorrow)) return 'Tomorrow · ' + d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
    return d.toLocaleDateString([], {month:'short', day:'numeric'}) + ' · ' + d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  }

  function isOverdue(task){ return task.status!=='completed' && new Date(task.dueDate) < new Date(); }

  const PRIORITY_META = {
    High:  { cls:'badge-urgent', dot:'#FF4757' },
    Medium:{ cls:'badge-medium', dot:'#FFB020' },
    Low:   { cls:'badge-low', dot:'#29C46F' }
  };


  
  function categoryMeta(catId){
    const cats = window.TaskFlowStore ? window.TaskFlowStore.getCategories() : [];
    return cats.find(c=>c.id===catId) || { name:catId, color:'#6E6E7A' };
  }

  function escapeHtml(str){
    return (str||'').replace(/[&<>"']/g, m=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

  window.TaskFlowApp = { toast, fmtDate, isOverdue, PRIORITY_META, categoryMeta, escapeHtml };
})();
