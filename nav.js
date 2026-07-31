/* TaskFlow — nav.js : injects sidebar & topbar shell into any app page */
(function(){
  const ICONS = {
    dashboard:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="9" rx="2"/><rect x="14" y="3" width="7" height="5" rx="2"/><rect x="14" y="12" width="7" height="9" rx="2"/><rect x="3" y="16" width="7" height="5" rx="2"/></svg>',
    tasks:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    calendar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    analytics:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/></svg>',
    notifications:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
    profile:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>',
    settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9c.2.6.7 1 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
    help:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.7-2.5 2-2.5 3.5"/><path d="M12 17h.01"/></svg>',
    logout:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>',
    search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
    bell:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
    sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M12 5v14M5 12h14"/></svg>',
    menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>'
  };

  const NAV_ITEMS = [
    { key:'dashboard', label:'Dashboard', href:'dashboard.html', icon:ICONS.dashboard },
    { key:'tasks', label:'My Tasks', href:'tasks.html', icon:ICONS.tasks, countKey:'pending' },
    { key:'calendar', label:'Calendar', href:'calendar.html', icon:ICONS.calendar },
    { key:'analytics', label:'Analytics', href:'analytics.html', icon:ICONS.analytics },
  ];
  const NAV_ITEMS_2 = [
    { key:'profile', label:'Profile', href:'profile.html', icon:ICONS.profile },
    { key:'settings', label:'Settings', href:'settings.html', icon:ICONS.settings },
    { key:'help', label:'Help & Support', href:'help.html', icon:ICONS.help },
  ];

  function initials(name){
    return (name||'U').split(' ').map(p=>p[0]).slice(0,2).join('').toUpperCase();
  }

  function buildSidebar(active){
    const stats = window.TaskFlowStore ? window.TaskFlowStore.stats() : {pending:0};
    const user = window.TaskFlowStore ? window.TaskFlowStore.getUser() : {name:'User', email:''};
    const itemHtml = (items)=> items.map((it,i)=>`
      <a class="nav-item ${active===it.key?'active':''}" href="${it.href}" style="animation-delay:${i*0.03}s">
        ${it.icon}<span>${it.label}</span>
        ${it.countKey ? `<span class="count">${stats[it.countKey] ?? ''}</span>` : ''}
      </a>`).join('');

    return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-brand">
        <div class="mark">${ICONS.tasks.replace('currentColor','white')}</div>
        <span>TaskFlow</span>
      </div>
      <nav>
        <div class="nav-section">Workspace</div>
        ${itemHtml(NAV_ITEMS)}
        <div class="nav-section">Account</div>
        ${itemHtml(NAV_ITEMS_2)}
      </nav>
      <div class="sidebar-footer">
        <a class="nav-item" href="#" id="logoutBtn">${ICONS.logout}<span>Log out</span></a>
        <a class="sidebar-user" href="profile.html">
          <div class="avatar">${initials(user.name)}</div>
          <div>
            <div class="u-name">${user.name}</div>
            <div class="u-email">${user.email}</div>
          </div>
        </a>
      </div>
    </aside>`;
  }

  function buildTopbar(title){
    return `
    <div class="topbar">
      <div class="flex items-center gap-16">
        <button class="icon-btn" id="menuToggle" style="display:none"><span></span>${ICONS.menu}</button>
        <h1>${title}</h1>
      </div>
      <div class="topbar-search">
        ${ICONS.search}
        <input type="text" placeholder="Search tasks, labels, categories…" id="globalSearch">
      </div>
      <div class="topbar-actions">
        <button class="icon-btn" data-theme-toggle title="Toggle theme" id="topThemeBtn">${ICONS.sun}</button>
        <a class="icon-btn" href="notifications.html" title="Notifications">${ICONS.bell}<span class="dot"></span></a>
        <a class="btn btn-primary btn-sm" href="tasks.html?new=1">${ICONS.plus}<span>New Task</span></a>
      </div>
    </div>`;
  }

  window.TaskFlowNav = {
    mount(active, title){
      const shellEl = document.getElementById('app-shell');
      if(!shellEl) return;
      shellEl.innerHTML = buildSidebar(active) + `<div class="main">${buildTopbar(title)}<div class="page-content" id="pageContent"></div></div>`;

      // move any pre-existing content (declared in page HTML) into pageContent
      const staged = document.getElementById('stagedContent');
      if(staged){ document.getElementById('pageContent').innerHTML = staged.innerHTML; staged.remove(); }

      document.getElementById('menuToggle').addEventListener('click', ()=> document.getElementById('sidebar').classList.toggle('open'));
      document.getElementById('logoutBtn').addEventListener('click', (e)=>{ e.preventDefault(); window.location.href='../index.html'; });

      // theme icon swap
      function syncThemeIcon(){
        const btn = document.getElementById('topThemeBtn');
        btn.innerHTML = window.TaskFlowTheme.get()==='dark' ? ICONS.sun : ICONS.moon;
      }
      syncThemeIcon();
      document.getElementById('topThemeBtn').addEventListener('click', syncThemeIcon);
    },
    ICONS: ICONS
  };
})();
