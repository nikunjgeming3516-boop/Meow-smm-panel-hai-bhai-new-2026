/* ============================================================
   NEXBOOST — SHARED DATA LAYER
   Yeh file sab pages me common hai. Users, orders, sab kuch
   localStorage me save hota hai, aur admin + user panel dono
   yahi data read/write karte hain.
   ============================================================ */
(function(global){
  const KEY = 'nexboost_db_v1';
  const SESSION_USER = 'nexboost_user';
  const SESSION_ADMIN = 'nexboost_admin';
  const ADMIN_EMAIL = 'nikunjgeming77@gmail.com';
  const ADMIN_PASS = 'Nikunj143';

  /* ---------- HASH (demo) ---------- */
  function hash(s){
    let h = 5381;
    for (let i=0;i<s.length;i++) h = ((h<<5)+h)+s.charCodeAt(i);
    return 'nx'+(h>>>0).toString(36);
  }
  function uid(prefix){ return prefix + Math.random().toString(36).slice(2,7).toUpperCase() + Date.now().toString().slice(-4); }
  function now(){ return new Date().toISOString(); }
  function money(n){ return '₹'+Number(n||0).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2}); }
  function moneyS(n){ return '₹'+Number(n||0).toLocaleString('en-IN',{maximumFractionDigits:0}); }

  /* ---------- SEED DATA ---------- */
  function seed(){
    const services = [
      {id:1,name:'Instagram Followers — Indian Real',cat:'Instagram',rate:55,cost:36,min:100,max:100000,status:'Active',refill:true,speed:'0-1h'},
      {id:2,name:'Instagram Followers — Global HQ',cat:'Instagram',rate:35,cost:22,min:100,max:500000,status:'Active',refill:true,speed:'0-30m'},
      {id:3,name:'Instagram Likes — Instant',cat:'Instagram',rate:18,cost:11,min:50,max:100000,status:'Active',refill:false,speed:'Instant'},
      {id:4,name:'Instagram Views — Reels/Video',cat:'Instagram',rate:8,cost:4,min:100,max:1000000,status:'Active',refill:false,speed:'Instant'},
      {id:5,name:'Instagram Story Views',cat:'Instagram',rate:12,cost:7,min:100,max:50000,status:'Active',refill:false,speed:'Instant'},
      {id:6,name:'YouTube Subscribers — Non-Drop',cat:'YouTube',rate:480,cost:340,min:50,max:50000,status:'Active',refill:true,speed:'1-2h'},
      {id:7,name:'YouTube Views — High Retention',cat:'YouTube',rate:130,cost:90,min:500,max:1000000,status:'Active',refill:false,speed:'1-3h'},
      {id:8,name:'YouTube Likes',cat:'YouTube',rate:45,cost:30,min:50,max:100000,status:'Active',refill:false,speed:'30m'},
      {id:9,name:'Facebook Page Likes',cat:'Facebook',rate:95,cost:64,min:100,max:100000,status:'Active',refill:true,speed:'1-2h'},
      {id:10,name:'Facebook Post Likes',cat:'Facebook',rate:40,cost:26,min:50,max:50000,status:'Active',refill:false,speed:'30m'},
      {id:11,name:'Telegram Channel Members',cat:'Telegram',rate:85,cost:60,min:100,max:100000,status:'Active',refill:true,speed:'1-2h'},
      {id:12,name:'Telegram Post Views',cat:'Telegram',rate:6,cost:3,min:500,max:1000000,status:'Active',refill:false,speed:'Instant'},
      {id:13,name:'Twitter/X Followers',cat:'Twitter',rate:210,cost:140,min:100,max:50000,status:'Active',refill:true,speed:'2-4h'},
      {id:14,name:'WhatsApp Channel Followers',cat:'WhatsApp',rate:120,cost:80,min:100,max:50000,status:'Active',refill:false,speed:'2-4h'},
    ];
    const categories = ['Instagram','YouTube','Facebook','Telegram','Twitter','WhatsApp'].map((c,i)=>({id:i+1,name:c,icon:'grid',status:'Active',order:i+1}));
    const users = [
      {id:'U1001',name:'Rahul Sharma',email:'rahul@gmail.com',pass:hash('rahul123'),balance:2450,totalSpent:8750,totalAdded:11200,status:'Active',joined:'2025-01-15T10:00:00',last:'2025-06-20T10:00:00',ip:'49.36.22.11',referralCode:'RAH1001'},
      {id:'U1002',name:'Priya Patel',email:'priya@gmail.com',pass:hash('priya123'),balance:890,totalSpent:3200,totalAdded:4100,status:'Active',joined:'2025-02-08T10:00:00',last:'2025-06-19T10:00:00',ip:'103.21.44.7',referralCode:'PRI1002'},
      {id:'U1003',name:'Amit Kumar',email:'amit@gmail.com',pass:hash('amit123'),balance:150,totalSpent:12400,totalAdded:12600,status:'Suspended',joined:'2025-01-03T10:00:00',last:'2025-06-15T10:00:00',ip:'157.32.9.84',referralCode:'AMI1003'},
      {id:'U1004',name:'Sneha Verma',email:'sneha@gmail.com',pass:hash('sneha123'),balance:5600,totalSpent:4200,totalAdded:9800,status:'Active',joined:'2025-03-12T10:00:00',last:'2025-06-20T10:00:00',ip:'182.68.11.45',referralCode:'SNE1004'},
    ];
    const orders = [
      {id:'ORD78234',userId:'U1001',userName:'Rahul Sharma',serviceId:1,service:'Instagram Followers — Indian Real',category:'Instagram',qty:5000,charge:275,cost:180,profit:95,status:'Completed',link:'instagram.com/rahul',date:'2025-06-20T14:23:00',startCount:1200},
      {id:'ORD78235',userId:'U1002',userName:'Priya Patel',serviceId:7,service:'YouTube Views — High Retention',category:'YouTube',qty:10000,charge:1300,cost:900,profit:400,status:'In Progress',link:'youtube.com/watch?v=abc',date:'2025-06-20T13:11:00',startCount:450},
      {id:'ORD78236',userId:'U1003',userName:'Amit Kumar',serviceId:3,service:'Instagram Likes — Instant',category:'Instagram',qty:2000,charge:36,cost:22,profit:14,status:'Pending',link:'instagram.com/p/xyz',date:'2025-06-20T12:45:00',startCount:0},
    ];
    const deposits = [
      {id:'DEP9921',userId:'U1001',userName:'Rahul Sharma',amount:2000,method:'UPI',txn:'UPI782341',status:'Approved',date:'2025-06-20T09:45:00'},
      {id:'DEP9922',userId:'U1002',userName:'Priya Patel',amount:500,method:'Razorpay',txn:'RZP9912',status:'Pending',date:'2025-06-20T10:30:00'},
      {id:'DEP9923',userId:'U1004',userName:'Sneha Verma',amount:5000,method:'Bank Transfer',txn:'NEFT8823',status:'Approved',date:'2025-06-19T18:12:00'},
    ];
    return {
      users, orders, deposits,
      withdrawals: [],
      services, categories,
      providers: [
        {id:'P1',name:'SMMProvider A',url:'https://api.provider-a.com/v2',apiKey:'sk_live_***',balance:12450,status:'Active',orders:234,priority:1},
        {id:'P2',name:'SMMProvider B',url:'https://api.provider-b.com/v1',apiKey:'sk_live_***',balance:3200,status:'Active',orders:145,priority:2},
      ],
      coupons: [
        {code:'WELCOME10',type:'Percent',value:10,used:45,limit:100,expiry:'2025-12-31',status:'Active',minDeposit:100},
        {code:'FLAT50',type:'Fixed',value:50,used:23,limit:50,expiry:'2025-07-15',status:'Active',minDeposit:200},
      ],
      tickets: [
        {id:'TKT4001',userId:'U1001',userName:'Rahul Sharma',subject:'Order not completed',priority:'High',status:'Open',date:'2025-06-20T11:20:00',messages:[{from:'user',text:'My order is pending for 2 days, please check.',time:'2025-06-20T11:20:00'}]},
      ],
      staff: [
        {id:'S1',name:'Super Admin',email:ADMIN_EMAIL,role:'Super Admin',status:'Active'},
      ],
      notifications: [
        {id:'N1',title:'Welcome Bonus',message:'₹50 welcome bonus for all new users!',type:'promo',date:'2025-06-15T10:00:00',active:true},
      ],
      settings: {
        siteName:'NexBoost', tagline:"India's Premium SMM Panel",
        currency:'₹', currencyCode:'INR', timezone:'Asia/Kolkata',
        minDeposit:50, maxDeposit:500000, minWithdrawal:500, withdrawalFee:2,
        welcomeBonus:50, maintenance:false, maintenanceMsg:'We will be back soon!',
        registration:true, emailVerification:false, referralCommission:5,
        telegram:'', contactEmail:'support@nexboost.com',
        primaryColor:'#f5b74c', secondaryColor:'#8b5cf6',
        upiId:'nexboost@upi', upiName:'NexBoost SMM'
      },
      logs: [
        {action:'System initialized', detail:'NexBoost panel booted', time:now(), type:'blue'},
      ]
    };
  }

  function load(){
    try {
      let raw = localStorage.getItem(KEY);
      if (!raw){ const db = seed(); localStorage.setItem(KEY, JSON.stringify(db)); return db; }
      return JSON.parse(raw);
    } catch(e){ const db = seed(); localStorage.setItem(KEY, JSON.stringify(db)); return db; }
  }
  function save(db){ localStorage.setItem(KEY, JSON.stringify(db)); }
  function addLog(action, detail, type){
    const db = load();
    db.logs.unshift({action, detail, time: now(), type: type||'blue'});
    if (db.logs.length > 300) db.logs.length = 300;
    save(db);
  }

  /* ---------- USER AUTH ---------- */
  function register(name, email, pass){
    const db = load();
    email = email.toLowerCase().trim();
    if (db.users.some(u=>u.email===email)) return {ok:false, msg:'Email already registered'};
    const bonus = Number(db.settings.welcomeBonus) || 0;
    const user = {
      id: uid('U'), name, email, pass: hash(pass),
      balance: bonus, totalSpent: 0, totalAdded: bonus,
      status:'Active', joined: now(), last: now(), ip:'—',
      referralCode: name.slice(0,3).toUpperCase() + Date.now().toString().slice(-4)
    };
    db.users.push(user); save(db);
    addLog('New user registered', `${name} (${email}) joined the panel`, 'purple');
    return {ok:true, user};
  }
  function login(email, pass){
    const db = load();
    const u = db.users.find(x=>x.email===email.toLowerCase().trim());
    if (!u) return {ok:false, msg:'No account with this email'};
    if (u.status === 'Banned') return {ok:false, msg:'Your account has been banned'};
    if (u.status === 'Suspended') return {ok:false, msg:'Your account is suspended'};
    if (u.pass !== hash(pass)) return {ok:false, msg:'Incorrect password'};
    u.last = now(); save(db);
    localStorage.setItem(SESSION_USER, u.id);
    return {ok:true, user:u};
  }
  function currentUser(){
    const id = localStorage.getItem(SESSION_USER);
    if (!id) return null;
    return load().users.find(u=>u.id===id) || null;
  }
  function logout(){ localStorage.removeItem(SESSION_USER); }
  function updateUser(id, patch){
    const db = load();
    const i = db.users.findIndex(u=>u.id===id);
    if (i<0) return false;
    db.users[i] = {...db.users[i], ...patch}; save(db); return true;
  }

  /* ---------- ADMIN AUTH ---------- */
  function adminLogin(email, pass){
    if (email.toLowerCase().trim() === ADMIN_EMAIL && pass === ADMIN_PASS){
      sessionStorage.setItem(SESSION_ADMIN, '1'); return true;
    }
    return false;
  }
  function isAdmin(){ return sessionStorage.getItem(SESSION_ADMIN) === '1'; }
  function adminLogout(){ sessionStorage.removeItem(SESSION_ADMIN); }

  /* ---------- ORDERS ---------- */
  function createOrder(userId, serviceId, link, qty){
    const db = load();
    const user = db.users.find(u=>u.id===userId);
    const svc = db.services.find(s=>s.id===serviceId);
    if (!user || !svc) return {ok:false, msg:'Invalid user or service'};
    if (!link) return {ok:false, msg:'Link is required'};
    if (qty < svc.min || qty > svc.max) return {ok:false, msg:`Quantity must be between ${svc.min.toLocaleString()} and ${svc.max.toLocaleString()}`};
    const charge = +(qty/1000*svc.rate).toFixed(2);
    const cost = +(qty/1000*svc.cost).toFixed(2);
    if (charge > user.balance) return {ok:false, msg:`Insufficient balance. Need ${money(charge)}, have ${money(user.balance)}`};
    user.balance = +(user.balance - charge).toFixed(2);
    user.totalSpent = +((user.totalSpent||0) + charge).toFixed(2);
    const order = {
      id: uid('ORD'), userId, userName: user.name, serviceId,
      service: svc.name, category: svc.cat, qty, charge, cost,
      profit: +(charge-cost).toFixed(2), status:'Pending', link,
      date: now(), startCount: 0
    };
    db.orders.unshift(order); save(db);
    addLog('New order placed', `${user.name} ordered ${svc.name} — ${qty.toLocaleString()} qty`, 'green');
    return {ok:true, order};
  }
  function updateOrder(id, patch){
    const db = load();
    const i = db.orders.findIndex(o=>o.id===id);
    if (i<0) return false;
    db.orders[i] = {...db.orders[i], ...patch}; save(db); return true;
  }
  function refundOrder(id, reason){
    const db = load();
    const o = db.orders.find(x=>x.id===id);
    if (!o) return false;
    if (o.status === 'Cancelled' || o.status === 'Refunded') return false;
    const u = db.users.find(x=>x.id===o.userId);
    if (u){
      u.balance = +((u.balance||0) + o.charge).toFixed(2);
      u.totalSpent = +((u.totalSpent||0) - o.charge).toFixed(2);
    }
    o.status = 'Cancelled'; o.refundReason = reason || 'Refund by admin';
    save(db);
    addLog('Order refunded', `${o.id} — ${money(o.charge)} refunded to ${o.userName}`, 'red');
    return true;
  }
  function deleteOrder(id){
    const db = load();
    db.orders = db.orders.filter(o=>o.id!==id); save(db); return true;
  }

  /* ---------- DEPOSITS ---------- */
  function createDeposit(userId, amount, method){
    const db = load();
    const u = db.users.find(x=>x.id===userId);
    if (!u) return {ok:false, msg:'User not found'};
    const dep = {
      id: uid('DEP'), userId, userName: u.name, amount:+amount,
      method, txn: uid('TXN'), status:'Pending', date: now()
    };
    db.deposits.unshift(dep); save(db);
    addLog('Deposit requested', `${u.name} requested ${money(amount)} via ${method}`, 'purple');
    return {ok:true, dep};
  }
  function approveDeposit(id){
    const db = load();
    const d = db.deposits.find(x=>x.id===id);
    if (!d || d.status !== 'Pending') return false;
    d.status = 'Approved';
    const u = db.users.find(x=>x.id===d.userId);
    if (u){
      u.balance = +((u.balance||0) + d.amount).toFixed(2);
      u.totalAdded = +((u.totalAdded||0) + d.amount).toFixed(2);
    }
    save(db);
    addLog('Deposit approved', `${money(d.amount)} credited to ${d.userName}`, 'green');
    return true;
  }
  function rejectDeposit(id, reason){
    const db = load();
    const d = db.deposits.find(x=>x.id===id);
    if (!d) return false;
    d.status = 'Rejected'; d.reason = reason || 'Rejected';
    save(db);
    addLog('Deposit rejected', `${d.id} — ${reason||'no reason'}`, 'red');
    return true;
  }

  /* ---------- SERVICES ---------- */
  function addService(data){
    const db = load();
    const id = db.services.length ? Math.max(...db.services.map(s=>s.id))+1 : 1;
    db.services.push({id, ...data, status: data.status || 'Active'});
    save(db); addLog('Service added', `${data.name} — ${money(data.rate)}/1000`, 'green');
    return true;
  }
  function updateService(id, patch){
    const db = load();
    const i = db.services.findIndex(s=>s.id===id);
    if (i<0) return false;
    db.services[i] = {...db.services[i], ...patch}; save(db); return true;
  }
  function deleteService(id){
    const db = load();
    db.services = db.services.filter(s=>s.id!==id); save(db);
    addLog('Service deleted', `Service #${id} removed`, 'red');
    return true;
  }

  /* ---------- CATEGORIES ---------- */
  function addCategory(name, icon){
    const db = load();
    const id = db.categories.length ? Math.max(...db.categories.map(c=>c.id))+1 : 1;
    db.categories.push({id, name, icon: icon||'grid', status:'Active', order:id});
    save(db); addLog('Category added', name, 'green'); return true;
  }
  function updateCategory(id, patch){
    const db = load();
    const i = db.categories.findIndex(c=>c.id===id);
    if (i<0) return false;
    db.categories[i] = {...db.categories[i], ...patch}; save(db); return true;
  }
  function deleteCategory(id){
    const db = load();
    db.categories = db.categories.filter(c=>c.id!==id); save(db); return true;
  }

  /* ---------- COUPONS ---------- */
  function addCoupon(data){
    const db = load();
    if (db.coupons.some(c=>c.code===data.code.toUpperCase())) return {ok:false,msg:'Coupon code already exists'};
    db.coupons.push({...data, code: data.code.toUpperCase(), used:0, status:'Active'});
    save(db); addLog('Coupon created', `${data.code} — ${data.value}${data.type==='Percent'?'%':''}`, 'gold');
    return {ok:true};
  }
  function updateCoupon(code, patch){
    const db = load();
    const i = db.coupons.findIndex(c=>c.code===code);
    if (i<0) return false;
    db.coupons[i] = {...db.coupons[i], ...patch}; save(db); return true;
  }
  function deleteCoupon(code){
    const db = load();
    db.coupons = db.coupons.filter(c=>c.code!==code); save(db); return true;
  }

  /* ---------- TICKETS ---------- */
  function createTicket(userId, subject, message, priority){
    const db = load();
    const u = db.users.find(x=>x.id===userId);
    if (!u) return false;
    const t = {
      id: uid('TKT'), userId, userName: u.name, subject,
      priority: priority||'Medium', status:'Open', date: now(),
      messages: [{from:'user', text: message, time: now()}]
    };
    db.tickets.unshift(t); save(db);
    addLog('New ticket', `${u.name}: ${subject}`, 'purple');
    return t;
  }
  function replyTicket(id, text, from){
    const db = load();
    const t = db.tickets.find(x=>x.id===id);
    if (!t) return false;
    t.messages.push({from: from||'admin', text, time: now()});
    if (from === 'admin') t.status = 'Answered';
    save(db); return true;
  }
  function closeTicket(id){
    const db = load();
    const t = db.tickets.find(x=>x.id===id);
    if (!t) return false;
    t.status = 'Closed'; save(db); return true;
  }

  /* ---------- STAFF ---------- */
  function addStaff(name, email, role){
    const db = load();
    db.staff.push({id: uid('S'), name, email, role, status:'Active', created: now()});
    save(db); addLog('Staff added', `${name} — ${role}`, 'gold'); return true;
  }
  function updateStaff(id, patch){
    const db = load();
    const i = db.staff.findIndex(s=>s.id===id);
    if (i<0) return false;
    db.staff[i] = {...db.staff[i], ...patch}; save(db); return true;
  }
  function deleteStaff(id){
    const db = load();
    db.staff = db.staff.filter(s=>s.id!==id); save(db); return true;
  }

  /* ---------- PROVIDERS ---------- */
  function addProvider(data){
    const db = load();
    db.providers.push({id: uid('P'), ...data, balance: Number(data.balance)||0, orders:0, status:'Active'});
    save(db); addLog('Provider added', data.name, 'gold'); return true;
  }
  function updateProvider(id, patch){
    const db = load();
    const i = db.providers.findIndex(p=>p.id===id);
    if (i<0) return false;
    db.providers[i] = {...db.providers[i], ...patch}; save(db); return true;
  }
  function deleteProvider(id){
    const db = load();
    db.providers = db.providers.filter(p=>p.id!==id); save(db); return true;
  }

  /* ---------- NOTIFICATIONS ---------- */
  function addNotification(title, message, type){
    const db = load();
    db.notifications.unshift({id: uid('N'), title, message, type: type||'info', date: now(), active:true});
    save(db); addLog('Notification sent', title, 'gold'); return true;
  }
  function deleteNotification(id){
    const db = load();
    db.notifications = db.notifications.filter(n=>n.id!==id); save(db); return true;
  }

  /* ---------- WITHDRAWALS ---------- */
  function createWithdrawal(userId, amount, method){
    const db = load();
    const u = db.users.find(x=>x.id===userId);
    if (!u) return {ok:false, msg:'User not found'};
    if (amount < db.settings.minWithdrawal) return {ok:false, msg:`Minimum withdrawal is ${money(db.settings.minWithdrawal)}`};
    if (amount > u.balance) return {ok:false, msg:'Insufficient balance'};
    u.balance = +(u.balance - amount).toFixed(2);
    const w = {id: uid('WDR'), userId, userName: u.name, amount:+amount, method, status:'Pending', date: now()};
    db.withdrawals.unshift(w); save(db);
    addLog('Withdrawal requested', `${u.name} requested ${money(amount)}`, 'purple');
    return {ok:true, w};
  }
  function approveWithdrawal(id){
    const db = load();
    const w = db.withdrawals.find(x=>x.id===id);
    if (!w) return false;
    w.status = 'Approved'; save(db);
    addLog('Withdrawal approved', `${w.id} — ${money(w.amount)} to ${w.userName}`, 'green');
    return true;
  }
  function rejectWithdrawal(id, reason){
    const db = load();
    const w = db.withdrawals.find(x=>x.id===id);
    if (!w) return false;
    w.status = 'Rejected'; w.reason = reason;
    const u = db.users.find(x=>x.id===w.userId);
    if (u) u.balance = +(u.balance + w.amount).toFixed(2);
    save(db); addLog('Withdrawal rejected', `${w.id} refunded`, 'red');
    return true;
  }

  /* ---------- ADMIN ACTIONS ---------- */
  function adjustBalance(userId, amount, reason){
    const db = load();
    const u = db.users.find(x=>x.id===userId);
    if (!u) return false;
    u.balance = +((u.balance||0) + Number(amount)).toFixed(2);
    if (amount > 0) u.totalAdded = +((u.totalAdded||0) + Number(amount)).toFixed(2);
    save(db);
    addLog('Balance adjusted', `${u.name}: ${amount>0?'+':''}${money(amount)} — ${reason}`, amount>0?'green':'red');
    return true;
  }
  function setUserStatus(userId, status){
    const db = load();
    const u = db.users.find(x=>x.id===userId);
    if (!u) return false;
    u.status = status; save(db);
    addLog('User status changed', `${u.name} → ${status}`, status==='Active'?'green':'red');
    return true;
  }
  function deleteUser(userId){
    const db = load();
    db.users = db.users.filter(u=>u.id!==userId); save(db);
    addLog('User deleted', `User #${userId} removed`, 'red');
    return true;
  }
  function resetUserPassword(userId, newPass){
    const db = load();
    const u = db.users.find(x=>x.id===userId);
    if (!u) return false;
    u.pass = hash(newPass); save(db);
    addLog('Password reset', `${u.name}'s password was reset`, 'yellow');
    return true;
  }

  /* ---------- SETTINGS ---------- */
  function updateSettings(patch){
    const db = load();
    db.settings = {...db.settings, ...patch}; save(db);
    addLog('Settings updated', 'Website settings changed', 'gold');
    return true;
  }

  /* ---------- BACKUP ---------- */
  function exportBackup(){
    const db = load();
    const blob = new Blob([JSON.stringify(db, null, 2)], {type:'application/json'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'nexboost-backup-' + new Date().toISOString().slice(0,10) + '.json';
    a.click();
  }
  function importBackup(json){
    try {
      const db = JSON.parse(json);
      if (!db.users || !db.services) return false;
      save(db); addLog('Database restored', 'Backup imported', 'gold');
      return true;
    } catch(e){ return false; }
  }
  function resetDatabase(){
    localStorage.removeItem(KEY); load();
    return true;
  }

  global.NX = {
    load, save, seed, hash, uid, money, moneyS, now, addLog,
    register, login, currentUser, logout, updateUser,
    adminLogin, isAdmin, adminLogout,
    createOrder, updateOrder, refundOrder, deleteOrder,
    createDeposit, approveDeposit, rejectDeposit,
    addService, updateService, deleteService,
    addCategory, updateCategory, deleteCategory,
    addCoupon, updateCoupon, deleteCoupon,
    createTicket, replyTicket, closeTicket,
    addStaff, updateStaff, deleteStaff,
    addProvider, updateProvider, deleteProvider,
    addNotification, deleteNotification,
    createWithdrawal, approveWithdrawal, rejectWithdrawal,
    adjustBalance, setUserStatus, deleteUser, resetUserPassword,
    updateSettings, exportBackup, importBackup, resetDatabase,
    ADMIN_EMAIL
  };
})(window);