/* TaskFlow — storage.js : localStorage data layer (swap for a real API later) */
(function(){
  const DB_KEY = 'taskflow-db-v1';

  const DEFAULT_CATEGORIES = [
    { id:'personal', name:'Personal', color:'#5B5FEF', icon:'user' },
    { id:'study',    name:'Study',    color:'#29C46F', icon:'book' },
    { id:'work',     name:'Work',     color:'#FF4757', icon:'briefcase' },
    { id:'shopping', name:'Shopping', color:'#FFB020', icon:'cart' },
    { id:'fitness',  name:'Fitness',  color:'#FF6B9D', icon:'heart' },
    { id:'finance',  name:'Finance',  color:'#00B8D9', icon:'coin' },
    { id:'travel',   name:'Travel',   color:'#9B59F5', icon:'plane' },
    { id:'others',   name:'Others',   color:'#6E6E7A', icon:'dots' }
  ];

  const DEFAULT_LABELS = ['Urgent','Meeting','Assignment','Project','Exam','Office','Home'];

  function todayPlus(days, hh, mm){
    const d = new Date();
    d.setDate(d.getDate()+days);
    d.setHours(hh||9, mm||0, 0, 0);
    return d.toISOString();
  }

  function seed(){
    return {
      user:{
        name:'Aarav Sharma', username:'aarav.s', email:'aarav.sharma@example.com',
        phone:'+91 98765 43210', bio:'Building good habits, one task at a time.',
        country:'India', timezone:'Asia/Kolkata', avatarColor:'#5B5FEF'
      },
      categories: DEFAULT_CATEGORIES,
      labels: DEFAULT_LABELS,
      tasks:[
        { id:cryptoId(), title:'Finish landing page hero animation', description:'Polish the scroll-triggered reveal and check reduced-motion fallback.', dueDate: todayPlus(0,17,0), priority:'High', category:'work', status:'pending', progress:60, labels:['Project','Office'], notes:'', reminder:true, createdAt:Date.now() },
        { id:cryptoId(), title:'Submit DBMS assignment', description:'Normalize schema to 3NF and export ER diagram.', dueDate: todayPlus(0,23,59), priority:'High', category:'study', status:'pending', progress:20, labels:['Assignment','Exam'], notes:'', reminder:true, createdAt:Date.now() },
        { id:cryptoId(), title:'Buy groceries for the week', description:'Milk, eggs, spinach, rice, coffee.', dueDate: todayPlus(1,10,0), priority:'Low', category:'shopping', status:'pending', progress:0, labels:['Home'], notes:'', reminder:false, createdAt:Date.now() },
        { id:cryptoId(), title:'Morning run — 5K', description:'Warm up 10 min, tempo pace last 2K.', dueDate: todayPlus(0,6,30), priority:'Medium', category:'fitness', status:'completed', progress:100, labels:[], notes:'', reminder:false, createdAt:Date.now()-90000 },
        { id:cryptoId(), title:'Pay electricity bill', description:'Auto-pay failed last month, do it manually.', dueDate: todayPlus(-1,18,0), priority:'High', category:'finance', status:'pending', progress:0, labels:['Urgent'], notes:'', reminder:true, createdAt:Date.now() },
        { id:cryptoId(), title:'Team stand-up meeting', description:'Share sprint progress + blockers.', dueDate: todayPlus(0,9,30), priority:'Medium', category:'work', status:'completed', progress:100, labels:['Meeting'], notes:'', reminder:false, createdAt:Date.now()-50000 },
        { id:cryptoId(), title:'Book flight to Goa', description:'Compare IndiGo vs Air India fares for the 14th.', dueDate: todayPlus(3,12,0), priority:'Low', category:'travel', status:'pending', progress:0, labels:[], notes:'', reminder:false, createdAt:Date.now() },
        { id:cryptoId(), title:'Review pull request #482', description:'Focus on the auth middleware changes.', dueDate: todayPlus(2,15,0), priority:'Medium', category:'work', status:'pending', progress:40, labels:['Project'], notes:'', reminder:true, createdAt:Date.now() },
        { id:cryptoId(), title:'Read 30 pages — Atomic Habits', description:'', dueDate: todayPlus(0,21,0), priority:'Low', category:'personal', status:'pending', progress:10, labels:[], notes:'', reminder:false, createdAt:Date.now() },
        { id:cryptoId(), title:'Renew gym membership', description:'', dueDate: todayPlus(-2,10,0), priority:'Medium', category:'fitness', status:'pending', progress:0, labels:[], notes:'', reminder:false, createdAt:Date.now() }
      ]
    };
  }

  function cryptoId(){
    return 'tsk_' + Math.random().toString(36).slice(2,10) + Date.now().toString(36).slice(-4);
  }

  function read(){
    try{
      const raw = localStorage.getItem(DB_KEY);
      if(!raw){ const s = seed(); localStorage.setItem(DB_KEY, JSON.stringify(s)); return s; }
      return JSON.parse(raw);
    }catch(e){ const s = seed(); localStorage.setItem(DB_KEY, JSON.stringify(s)); return s; }
  }
  function write(db){ localStorage.setItem(DB_KEY, JSON.stringify(db)); }

  const Store = {
    getUser(){ return read().user; },
    updateUser(patch){ const db = read(); db.user = Object.assign(db.user, patch); write(db); return db.user; },

    getCategories(){ return read().categories; },
    addCategory(cat){ const db = read(); db.categories.push(cat); write(db); return db.categories; },

    getLabels(){ return read().labels; },
    addLabel(label){ const db = read(); if(!db.labels.includes(label)) db.labels.push(label); write(db); return db.labels; },

    getTasks(){ return read().tasks.slice().sort((a,b)=> new Date(a.dueDate) - new Date(b.dueDate)); },
    getTask(id){ return read().tasks.find(t=>t.id===id); },
    addTask(task){
      const db = read();
      task.id = cryptoId(); task.createdAt = Date.now();
      task.status = task.status || 'pending'; task.progress = task.progress || 0;
      db.tasks.unshift(task); write(db); return task;
    },
    updateTask(id, patch){
      const db = read(); const t = db.tasks.find(x=>x.id===id); if(!t) return null;
      Object.assign(t, patch); write(db); return t;
    },
    deleteTask(id){ const db = read(); db.tasks = db.tasks.filter(t=>t.id!==id); write(db); },
    toggleComplete(id){
      const db = read(); const t = db.tasks.find(x=>x.id===id); if(!t) return null;
      t.status = t.status === 'completed' ? 'pending' : 'completed';
      t.progress = t.status === 'completed' ? 100 : t.progress;
      write(db); return t;
    },

    stats(){
      const tasks = read().tasks;
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(),now.getMonth(),now.getDate());
      const endOfDay = new Date(startOfDay.getTime()+86400000);
      const total = tasks.length;
      const completed = tasks.filter(t=>t.status==='completed').length;
      const pending = total - completed;
      const overdue = tasks.filter(t=> t.status!=='completed' && new Date(t.dueDate) < now).length;
      const today = tasks.filter(t=>{ const d=new Date(t.dueDate); return d>=startOfDay && d<endOfDay; }).length;
      const upcoming = tasks.filter(t=> t.status!=='completed' && new Date(t.dueDate) > endOfDay).length;
      const completionPct = total ? Math.round((completed/total)*100) : 0;
      return { total, completed, pending, overdue, today, upcoming, completionPct };
    },

    resetDemo(){ localStorage.removeItem(DB_KEY); write(seed()); }
  };

  window.TaskFlowStore = Store;
})();
