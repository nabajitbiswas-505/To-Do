/* TaskFlow — theme.js : day/night toggle with persistence */
(function(){
  const KEY = 'taskflow-theme';
  function apply(theme){
    document.documentElement.setAttribute('data-theme', theme);
  }
  function getInitial(){
    const saved = localStorage.getItem(KEY);
    if(saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  apply(getInitial());

  window.TaskFlowTheme = {
    toggle(){
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      apply(next);
      localStorage.setItem(KEY, next);
      return next;
    },
    get(){ return document.documentElement.getAttribute('data-theme') || 'light'; }
  };

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('[data-theme-toggle]').forEach(function(btn){
      btn.addEventListener('click', function(){ window.TaskFlowTheme.toggle(); });
    });
  });
})();
