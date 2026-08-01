<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<title>إدارة كروت الإنترنت</title>
<script src="https://unpkg.com/lucide@latest">
</script>
<script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/build/pdf.min.js">
</script>
<script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
</script>
<style>
:root{--bg:#0a0f1a;--bg1:#0f172a;--bg2:#1e293b;--bg3:#1a2332;--bgi:#0d1320;--t1:#f1f5f9;--t2:#94a3b8;--t3:#64748b;--blue:#3b82f6;--green:#22c55e;--red:#ef4444;--orange:#f97316;--gold:#eab308;--purple:#a855f7;--cyan:#06b6d4;--r:14px;--rs:10px}
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{height:100%;overflow:hidden}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Tahoma,sans-serif;background:var(--bg);color:var(--t1);font-size:14px;line-height:1.5}
.app{display:flex;flex-direction:column;height:100%;max-width:520px;margin:0 auto;background:var(--bg1);box-shadow:0 0 60px rgba(0,0,0,.5)}
@media(min-width:521px){.app{border-left:1px solid rgba(255,255,255,.05);border-right:1px solid rgba(255,255,255,.05)}}
.hdr{height:54px;background:linear-gradient(180deg,var(--bg2) 0%,var(--bg1) 100%);display:flex;align-items:center;padding:0 14px;gap:12px;border-bottom:1px solid rgba(255,255,255,.08);flex-shrink:0;z-index:50}
.hdr-title{flex:1;text-align:center;font-size:15px;font-weight:800;letter-spacing:.3px;background:linear-gradient(135deg,var(--gold),var(--orange));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hdr-btn{width:38px;height:38px;border-radius:10px;border:none;background:rgba(255,255,255,.06);color:var(--t2);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s}
.hdr-btn:hover{background:rgba(255,255,255,.1)}
.hdr-btn:active{transform:scale(.9);background:rgba(255,255,255,.15)}
.hdr-btn svg{width:18px;height:18px}
.main{flex:1;overflow:hidden;position:relative}
.pg{position:absolute;inset:0;overflow-y:auto;overflow-x:hidden;padding:14px;opacity:0;visibility:hidden;transition:opacity .25s ease;-webkit-overflow-scrolling:touch}
.pg.active{opacity:1;visibility:visible}
.pg::-webkit-scrollbar{width:4px}
.pg::-webkit-scrollbar-track{background:transparent}
.pg::-webkit-scrollbar-thumb{background:rgba(234,179,8,.3);border-radius:4px}
.nav{display:flex;background:linear-gradient(180deg,var(--bg1) 0%,var(--bg) 100%);border-top:1px solid rgba(255,255,255,.08);padding:6px 6px calc(6px + env(safe-area-inset-bottom,0px));gap:3px;flex-shrink:0;z-index:50}
.ni{flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 2px;cursor:pointer;border-radius:var(--rs);color:var(--t3);font-size:9px;font-weight:600;transition:all .2s;letter-spacing:.2px}
.ni svg{width:20px;height:20px;transition:transform .2s}
.ni.active{color:var(--gold);background:rgba(234,179,8,.1)}
.ni.active svg{transform:scale(1.1)}
.ni:active{transform:scale(.93)}
.ni.nh{position:relative;margin-top:-20px}
.nhc{width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--orange));display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(234,179,8,.45);margin-bottom:2px;transition:box-shadow .2s}
.ni.nh.active .nhc{box-shadow:0 4px 28px rgba(234,179,8,.6)}
.nhc svg{width:22px;height:22px;color:var(--bg)!important}
.card{background:var(--bg3);border-radius:var(--r);padding:14px;border:1px solid rgba(255,255,255,.05);margin-bottom:12px;transition:transform .2s,box-shadow .2s}
.st{font-size:13px;font-weight:700;color:var(--t2);margin-bottom:10px;display:flex;align-items:center;gap:7px}
.st svg{width:16px;height:16px}
.gl{flex:1;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:.3}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:10px 16px;border-radius:var(--rs);border:none;font-size:12px;font-weight:600;cursor:pointer;transition:all .2s;font-family:inherit}
.btn:active{transform:scale(.96)}
.btn:hover{filter:brightness(1.1)}
.btn svg{width:15px;height:15px}
.bp{background:var(--blue);color:#fff}.bs{background:var(--green);color:#fff}.bd{background:var(--red);color:#fff}.bw{background:var(--orange);color:#fff}
.bg{background:linear-gradient(135deg,var(--gold),var(--orange));color:var(--bg);font-weight:700}.bh{background:rgba(255,255,255,.06);color:var(--t1)}
.bsm{padding:7px 10px;font-size:11px}.bsm svg{width:13px;height:13px}
.bb{width:100%}
.inp{width:100%;padding:11px 14px;border-radius:var(--rs);border:1px solid rgba(255,255,255,.1);background:var(--bgi);color:var(--t1);font-size:13px;font-family:inherit;transition:border-color .2s,box-shadow .2s}
.inp:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(234,179,8,.12)}
.inp::placeholder{color:var(--t3)}
.lbl{display:block;font-size:11px;color:var(--t2);margin-bottom:5px;font-weight:600}
.tabs{display:flex;gap:6px;margin-bottom:12px;overflow-x:auto;padding-bottom:2px}.tabs::-webkit-scrollbar{display:none}
.tab{padding:8px 16px;border-radius:20px;background:rgba(255,255,255,.05);color:var(--t3);font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap;border:1px solid transparent;transition:all .2s}
.tab:hover{background:rgba(255,255,255,.08)}
.tab.active{background:linear-gradient(135deg,var(--gold),var(--orange));color:var(--bg);font-weight:700}
.fp{display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap}
.fp .f{padding:7px 14px;border-radius:18px;background:rgba(255,255,255,.05);color:var(--t2);font-size:11px;font-weight:600;cursor:pointer;border:1px solid transparent;display:flex;align-items:center;gap:4px;transition:all .2s}
.fp .f:hover{background:rgba(255,255,255,.08)}
.fp .f .c{background:rgba(255,255,255,.12);padding:2px 7px;border-radius:10px;font-size:10px}
.fp .f.active{border-color:var(--gold);color:var(--gold);background:rgba(234,179,8,.1)}
.fp .f.active .c{background:var(--gold);color:var(--bg)}
.cg{display:grid;grid-template-columns:repeat(4,1fr);gap:4px}
.ci{aspect-ratio:1;border-radius:8px;padding:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;cursor:pointer;border:2px solid transparent;overflow:hidden;transition:all .15s}
.ci::before{content:'';position:absolute;inset:0;opacity:.15;border-radius:6px}
.ci:active{transform:scale(.94)}
.ci.s{border-color:var(--gold);box-shadow:0 0 12px rgba(234,179,8,.4)}
.ci .sn{font-size:7px;color:var(--gold);opacity:.85;position:relative;z-index:1;font-weight:600}
.ci .cn{font-size:8px;font-family:'SF Mono',monospace;position:relative;z-index:1;text-align:center;line-height:1.2;letter-spacing:.3px}
.ci .db{position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:var(--red);color:#fff;border:none;font-size:11px;cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s;z-index:2}
.ci:hover .db{opacity:1}
@media(hover:none){.ci .db{opacity:.7}}
.pager{display:flex;align-items:center;justify-content:center;gap:12px;padding:12px 0}
.pgb{width:36px;height:36px;border-radius:10px;border:1px solid rgba(255,255,255,.1);background:var(--bg2);color:var(--t1);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}
.pgb:not(:disabled):hover{border-color:var(--gold);color:var(--gold)}
.pgb:not(:disabled):active{transform:scale(.9)}
.pgb:disabled{opacity:.25;cursor:not-allowed}
.pgb svg{width:16px;height:16px}
.pgi{font-size:12px;font-weight:600;color:var(--t2);min-width:90px;text-align:center}
.pgi strong{color:var(--gold)}
.fdrop{border:2px dashed rgba(255,255,255,.15);border-radius:var(--r);padding:36px 16px;text-align:center;cursor:pointer;background:rgba(255,255,255,.02);transition:all .3s}
.fdrop:hover,.fdrop.drag{border-color:var(--gold);background:rgba(234,179,8,.06);transform:translateY(-2px)}
.fdrop svg{width:42px;height:42px;color:var(--gold);margin-bottom:10px}
.isg{display:grid;grid-template-columns:repeat(2,1fr);gap:6px;margin:10px 0}
.is{background:var(--bg3);border-radius:var(--rs);padding:10px;text-align:center;border:1px solid rgba(255,255,255,.04)}
.is .v{font-size:18px;font-weight:800}
.is .l{font-size:9px;color:var(--t3);margin-top:2px}
.bi{display:flex;align-items:center;gap:12px;background:var(--bg3);border-radius:var(--r);padding:12px;margin-bottom:8px;border:1px solid rgba(255,255,255,.05);cursor:pointer;transition:all .2s}
.bi:hover{border-color:rgba(234,179,8,.15);background:rgba(26,35,50,.8)}
.bi:active{transform:scale(.98)}
.ba{width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,var(--blue),var(--purple));display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#fff;flex-shrink:0}
.binfo{flex:1;min-width:0}
.bname{font-size:14px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bmeta{font-size:10px;color:var(--t3);margin-top:2px}
.bss{display:flex;gap:4px}
.bs2{padding:4px 8px;border-radius:6px;font-size:11px;font-weight:700;min-width:30px;text-align:center}
.tw{overflow-x:auto;border-radius:var(--rs);border:1px solid rgba(255,255,255,.06);-webkit-overflow-scrolling:touch}
.tb{width:100%;font-size:10px;border-collapse:collapse;min-width:400px}
.tb th{background:var(--bgi);padding:9px 6px;text-align:right;font-weight:600;color:var(--t3);position:sticky;top:0;z-index:1;white-space:nowrap}
.tb td{padding:7px 6px;border-bottom:1px solid rgba(255,255,255,.04)}
.tb tr:hover{background:rgba(255,255,255,.02)}
.tb .mc{cursor:pointer;color:var(--purple);font-family:monospace}
.tb .mc:hover{text-decoration:underline}
.modal{position:fixed;inset:0;background:rgba(0,0,0,.85);backdrop-filter:blur(8px);z-index:200;display:flex;align-items:flex-end;justify-content:center;padding:12px;opacity:0;visibility:hidden;transition:all .3s}
.modal.show{opacity:1;visibility:visible}
.mc2{background:var(--bg2);border-radius:18px 18px 0 0;padding:20px;width:100%;max-width:460px;max-height:85vh;overflow-y:auto;transform:translateY(100%);transition:transform .35s cubic-bezier(.32,.72,.37,1.1);border-top:1px solid rgba(255,255,255,.08)}
.modal.show .mc2{transform:translateY(0)}
.mh{display:flex;align-items:center;gap:10px;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,.06)}
.mt2{flex:1;font-size:16px;font-weight:700}
.mx{width:32px;height:32px;border-radius:50%;border:none;background:rgba(255,255,255,.08);color:var(--t2);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}
.mx:hover{background:rgba(255,255,255,.15)}
.mx svg{width:16px;height:16px}
.toast-c{position:fixed;top:60px;left:50%;transform:translateX(-50%);z-index:300;display:flex;flex-direction:column;gap:8px;pointer-events:none;max-width:90%}
.tst{padding:12px 22px;border-radius:var(--rs);font-size:13px;font-weight:600;box-shadow:0 8px 30px rgba(0,0,0,.4);animation:ti .3s ease;text-align:center}
.tst.ts{background:var(--green);color:#fff}.tst.te{background:var(--red);color:#fff}.tst.ti2{background:var(--blue);color:#fff}
@keyframes ti{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:translateY(0)}}
.kpi{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:12px}
.kc{background:var(--bg3);border-radius:var(--rs);padding:12px 8px;text-align:center;border:1px solid rgba(255,255,255,.05);position:relative;overflow:hidden}
.kc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--kc,var(--blue))}
.kv{font-size:20px;font-weight:800}
.kl{font-size:9px;color:var(--t3);margin-top:2px}
.sgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:12px}
@media(min-width:400px){.sgrid{grid-template-columns:repeat(4,1fr)}}
.sc{background:var(--bg3);border-radius:var(--rs);padding:10px 6px;text-align:center;border:1px solid rgba(255,255,255,.05)}
.sc .sv{font-size:18px;font-weight:800}
.sc .sl{font-size:9px;color:var(--t3);margin-top:2px}
.sc .sb{height:4px;border-radius:2px;margin-top:5px;overflow:hidden}
.sc .sf{height:100%;border-radius:2px;transition:width .5s ease}
.qa{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:12px}
.qi{display:flex;align-items:center;gap:10px;padding:14px 12px;background:var(--bg3);border-radius:var(--r);cursor:pointer;border:1px solid rgba(255,255,255,.05);transition:all .2s}
.qi:hover{border-color:rgba(234,179,8,.15);transform:translateY(-1px)}
.qi:active{transform:scale(.97)}
.qi .qic{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.qi .qic svg{width:18px;height:18px}
.qi .qt{font-size:12px;font-weight:600}
.qi .qh{font-size:9px;color:var(--t3);margin-top:1px}
.qdt{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:8px}
.qdi{background:rgba(30,41,59,.5);border-radius:7px;padding:7px 4px;border:1px solid rgba(255,255,255,.05);text-align:center}
.qdi .ql{font-size:9px;font-weight:700;margin-bottom:2px}
.qdi .qa2{font-size:7px;color:var(--t3);margin-bottom:2px}
.qdi input{width:100%;text-align:center}
.lc{background:var(--bg3);border:1px solid rgba(255,255,255,.05);border-radius:var(--rs);padding:10px;margin-bottom:6px}
.lh{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
.ln{font-size:12px;font-weight:700;color:#60a5fa;display:flex;align-items:center;gap:4px}
.ls{display:grid;grid-template-columns:repeat(3,1fr);gap:5px}
.lsi{background:var(--bgi);border-radius:5px;padding:5px;text-align:center}
.lsi .sl2{font-size:7px;color:var(--t3)}
.lsi .sv2{font-size:11px;font-weight:800}
.lp{height:3px;background:rgba(255,255,255,.05);border-radius:2px;overflow:hidden;margin-top:5px}
.lp div{height:100%;border-radius:2px}
.hi{background:var(--bgi);border-radius:var(--rs);padding:10px;margin-bottom:6px;border:1px solid rgba(255,255,255,.04)}
.hh{display:flex;justify-content:space-between;margin-bottom:4px}
.hb{font-size:12px;font-weight:700}
.hd{font-size:9px;color:var(--t3)}
.hm{font-size:10px;color:var(--t2)}
.dg{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;max-height:280px;overflow-y:auto}
.di{padding:10px 6px;background:var(--bgi);border-radius:var(--rs);text-align:center;cursor:pointer;font-size:10px;font-weight:600;border:1px solid transparent}
.di:hover,.di.active{border-color:var(--gold);color:var(--gold)}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.mb2{margin-bottom:10px}.mb3{margin-bottom:14px}.mt2b{margin-top:10px}.mt3{margin-top:14px}
.tc{text-align:center}.tg{color:var(--gold)}.tgr{color:#4ade80}.tr{color:#f87171}.tbl{color:#60a5fa}.tmut{color:var(--t3)}
.empty{text-align:center;padding:36px 20px;color:var(--t3)}
.empty svg{width:48px;height:48px;margin-bottom:10px;opacity:.25}
.empty div{font-size:14px;margin-bottom:4px}
.empty .eh{font-size:11px;opacity:.7}
.flex{display:flex}.gap2{gap:8px}.aic{align-items:center}
.big-stat{text-align:center;padding:24px;background:var(--bg3);border-radius:var(--r);margin-bottom:12px;border:1px solid rgba(255,255,255,.05)}
.big-stat .bv{font-size:32px;font-weight:900;letter-spacing:-1px}
.big-stat .bl2{font-size:12px;color:var(--t3);margin-top:4px}
.ei{display:flex;align-items:center;gap:8px;padding:7px 9px;background:var(--bg3);border-radius:var(--rs);margin-bottom:4px;border:1px solid rgba(255,255,255,.04)}
.ei .ed{flex:1;font-size:11px}
.ei .ea{font-size:12px;font-weight:700;color:var(--red)}
.pi{background:var(--bg3);border-radius:var(--rs);padding:10px;border:1px solid rgba(255,255,255,.04);margin-bottom:6px}
.pg2{display:grid;grid-template-columns:repeat(4,1fr);gap:4px}
.ps{text-align:center}
.ps .pv{font-size:11px;font-weight:700}
.ps .pl{font-size:7px;color:var(--t3)}
.srch{position:relative}
.srch .inp{padding-right:38px}
.srch svg{position:absolute;right:12px;top:50%;transform:translateY(-50%);color:var(--t3);pointer-events:none;width:16px;height:16px}
.sri{display:flex;justify-content:space-between;align-items:center;padding:9px 12px;background:rgba(15,23,42,.6);border-radius:8px;margin-bottom:4px;border-right:3px solid var(--t3);cursor:pointer;transition:all .2s}
.sri:hover{background:rgba(30,41,59,.8);transform:translateX(-2px)}
.sri:active{transform:scale(.98)}
.rn{font-size:12px;font-weight:700;font-family:'SF Mono',monospace}
.rs2{font-size:10px;color:var(--gold);font-family:monospace;margin-right:5px}
.rdet{font-size:9px;color:var(--t3);margin-right:4px}
.rst{font-size:9px;padding:3px 8px;border-radius:10px;font-weight:600}
.dp{background:linear-gradient(180deg,var(--bg2),var(--bg3));border-radius:var(--r) var(--r) 0 0;padding:10px;margin:0 -12px -12px;border-top:1px solid rgba(255,255,255,.06)}
.dm{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px}
.dmo{padding:7px;border-radius:var(--rs);background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);color:var(--t2);font-size:10px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px}
.dmo svg{width:13px;height:13px}
.dmo.active{border-color:var(--gold);color:var(--gold);background:rgba(234,179,8,.08)}
.dtot{display:flex;align-items:center;gap:6px;padding:7px 10px;background:var(--bgi);border-radius:var(--rs);border:1px solid var(--gold);margin-bottom:8px}
.dtl{font-size:10px;color:var(--t2)}
.dtv{font-size:16px;font-weight:800;color:var(--gold);margin-right:auto}
.dtc{font-size:10px;color:var(--gold)}
.ai{display:flex;justify-content:space-between;align-items:center;padding:7px 9px;background:rgba(15,23,42,.6);border-radius:6px;margin-bottom:3px;border-right:3px solid var(--t3);animation:si .3s ease}
@keyframes si{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
.ab{font-size:8px;padding:2px 7px;border-radius:8px;font-weight:600}
.ro{background:var(--bgi);border:1px solid rgba(255,255,255,.06);border-radius:7px;padding:8px;text-align:center;cursor:pointer}
.ro:hover,.ro.active{border-color:var(--gold);background:rgba(234,179,8,.05)}
.ro .od{font-size:14px;font-weight:800}
.ro .ol{font-size:8px;color:var(--t3)}
.ro .op{font-size:10px;color:#4ade80}
.cb{display:flex;gap:3px;margin:5px 0}
.cbt{flex:1;padding:5px;border-radius:5px;border:1px solid rgba(255,255,255,.08);background:var(--bgi);color:var(--t2);font-size:9px;font-weight:600;cursor:pointer;font-family:inherit}
.si2{display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.04)}
.si2:last-child{border:none}
.sb2{padding:3px 7px;border-radius:5px;font-size:10px;font-weight:700}
.sc2{font-size:13px;font-weight:700}
.sa2{margin-right:auto;font-size:11px;color:var(--gold);font-weight:600}
</style>
</head>
<body>
<div class="toast-c" id="toasts"></div>
<div class="modal" id="modal" onclick="if(event.target===this)closeModal()"><div class="mc2" id="mbody"></div></div>
<div class="app">
<header class="hdr">
<button class="hdr-btn" onclick="toggleFS()"><i data-lucide="maximize-2"></i></button>
<div class="hdr-title">إدارة كروت الإنترنت</div>
<button class="hdr-btn" onclick="openSearch()"><i data-lucide="search"></i></button>
</header>
<main class="main">
<div id="pg-home" class="pg active"></div>
<div id="pg-inv" class="pg"></div>
<div id="pg-br" class="pg"></div>
<div id="pg-dist" class="pg"></div>
<div id="pg-sales" class="pg"></div>
<div id="pg-rep" class="pg"></div>
<div id="pg-set" class="pg"></div>
</main>
<nav class="nav">
<div class="ni" data-p="inv"><i data-lucide="package"></i><span>المخزون</span></div>
<div class="ni" data-p="br"><i data-lucide="store"></i><span>الفروع</span></div>
<div class="ni" data-p="dist"><i data-lucide="send"></i><span>التوزيع</span></div>
<div class="ni nh active" data-p="home"><div class="nhc"><i data-lucide="home"></i></div><span>الرئيسية</span></div>
<div class="ni" data-p="sales"><i data-lucide="receipt"></i><span>المبيعات</span></div>
<div class="ni" data-p="rep"><i data-lucide="bar-chart-3"></i><span>التقارير</span></div>
<div class="ni" data-p="set"><i data-lucide="settings"></i><span>الإعدادات</span></div>
</nav>
</div>
<script>
const V='4.2',DBN='WiFiCards_v4',STR='data';
let DB=null,ST={p:'home',it:'view',ip:0,if:'all',is:'',st:'import',dd:null,df:'inventory',dm:'qty',ms:new Set(),mf:'100',mp:0,qb:null},SVT=null;

// ===== نظام حماية كلمة المرور (SHA-256) =====
async function hashPW(pw){
  const enc=new TextEncoder();
  const buf=await crypto.subtle.digest('SHA-256',enc.encode(pw));
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
}
async function verifyPW(pw){
  if(!DB?.settings?.passwordHash)return false;
  return (await hashPW(pw))===DB.settings.passwordHash;
}
function hasPW(){return !!DB?.settings?.passwordHash;}
if(typeof pdfjsLib!=='undefined'){pdfjsLib.GlobalWorkerOptions.workerSrc=''}

function defaultTypes(){return[
  {id:'100',name:'أبو 100',prefix:'61',price:80,cost:25,color:'#3b82f6',rgb:'59,130,246',digits:10,serialDigits:6,dataMB:300},
  {id:'200',name:'أبو 200',prefix:'62',price:180,cost:58.33,color:'#22c55e',rgb:'34,197,94',digits:10,serialDigits:6,dataMB:700},
  {id:'250',name:'أبو 250',prefix:'63',price:220,cost:75,color:'#ef4444',rgb:'239,68,68',digits:10,serialDigits:6,dataMB:900},
  {id:'500',name:'أبو 500',prefix:'65',price:450,cost:150,color:'#eab308',rgb:'234,179,8',digits:10,serialDigits:6,dataMB:2000}
]}
function CT(){return DB?.settings?.cardTypes||defaultTypes()}
function typeById(id){return CT().find(t=>t.id===id)||CT()[0]}
function typeIds(){return CT().map(t=>t.id)}
function price(id){const t=typeById(id);return t?t.price:0}
function cost(id){const t=typeById(id);return t?t.cost:0}
function tColor(id){const t=typeById(id);return t?t.color:'#94a3b8'}
function tRgb(id){const t=typeById(id);return t?t.rgb:'148,163,184'}
function tName(id){const t=typeById(id);return t?t.name:id}
function classifyCard(num){for(const t of CT()){if(t.prefix&&num.startsWith(t.prefix))return t.id}return CT()[0]?.id||'100'}

// ===== IndexedDB =====
function openIDB(){return new Promise((res,rej)=>{const r=indexedDB.open(DBN,1);r.onupgradeneeded=e=>{if(!e.target.result.objectStoreNames.contains(STR))e.target.result.createObjectStore(STR)};r.onsuccess=e=>res(e.target.result);r.onerror=e=>rej(e.target.error)})}
async function loadDB(){const idb=await openIDB();return new Promise(res=>{const tx=idb.transaction(STR,'readonly'),r=tx.objectStore(STR).get('main');r.onsuccess=()=>{DB=r.result||defDB();ensureDB();res(DB)};r.onerror=()=>{DB=defDB();res(DB)}})}
async function saveDB(){if(SVT)clearTimeout(SVT);SVT=setTimeout(async()=>{const idb=await openIDB();const tx=idb.transaction(STR,'readwrite');tx.objectStore(STR).put(DB,'main')},150)}
function defDB(){return{cards:[],branches:[],distributions:[],sales:[],expenses:[],archive:[],internetLines:[],activityLog:[],refunds:[],settings:{cardTypes:defaultTypes(),costPerGB:85.71,rent:0}}}
function ensureDB(){
  if(!DB.internetLines)DB.internetLines=[];
  if(!DB.activityLog)DB.activityLog=[];
  if(!DB.refunds)DB.refunds=[];
  if(!DB.settings)DB.settings={};
  if(!DB.settings.cardTypes)DB.settings.cardTypes=defaultTypes();
  if(!DB.settings.costPerGB)DB.settings.costPerGB=85.71;
  if(!DB.settings.rent)DB.settings.rent=0;
  if(!DB.distributions)DB.distributions=[];
}

// ===== أدوات =====
const uid=()=>crypto.randomUUID?crypto.randomUUID():'xx-xx-xx'.replace(/x/g,()=>(Math.random()*16|0).toString(16));
const esc=s=>{const d=document.createElement('div');d.textContent=s;return d.innerHTML};
const fmt=n=>Number(n||0).toLocaleString('ar-SA');
const $=id=>document.getElementById(id);
function toast(m,t='ti2'){const c=$('toasts'),e=document.createElement('div');e.className='tst '+t;e.textContent=m;c.appendChild(e);setTimeout(()=>e.remove(),3000)}
function copy(t){navigator.clipboard.writeText(t).then(()=>toast('تم النسخ','ts')).catch(()=>{})}
function ri(){try{lucide.createIcons()}catch(e){}}
function openModal(h){$('mbody').innerHTML=h;$('modal').classList.add('show');ri()}
function closeModal(){$('modal').classList.remove('show')}
function reqPW(cb){
  openModal(`<div class="mh"><span class="mt2">🔒 تأكيد</span><button class="mx" onclick="closeModal()"><i data-lucide="x"></i></button></div><p class="tmut mb3" style="font-size:12px">أدخل كلمة المرور</p><input type="password" id="pw" class="inp mb3" placeholder="كلمة المرور" onkeydown="if(event.key==='Enter')chkPW()"><button class="btn bg bb" onclick="chkPW()">تأكيد</button>`);
  window._pc=cb;
  setTimeout(()=>$('pw')?.focus(),200);
}
async function chkPW(){
  const input=$('pw')?.value||'';
  if(!input)return toast('أدخل كلمة المرور','te');
  if(await verifyPW(input)){closeModal();window._pc?.()}
  else toast('كلمة المرور غير صحيحة','te');
}
function countC(s,t,b){let c=0;for(const x of DB.cards){if(x.status!==s)continue;if(t&&x.type!==t)continue;if(b&&x.branchId!==b)continue;c++}return c}
function availCards(t,from){let cards=DB.cards.filter(c=>{if(!from||from==='inventory')return c.status==='available';return c.status==='distributed'&&c.branchId===from});if(t)cards=cards.filter(c=>c.type===t);return cards.sort((a,b)=>(a.fileIndex||0)-(b.fileIndex||0))}
function brDebt(bid){return DB.distributions.filter(d=>d.branchId===bid).reduce((s,d)=>s+(d.remaining||0),0)}
function logA(action,details){ensureDB();DB.activityLog.push({id:uid(),action,details,ts:new Date().toISOString()});if(DB.activityLog.length>500)DB.activityLog=DB.activityLog.slice(-500);saveDB()}
function toggleFS(){if(!document.fullscreenElement)document.documentElement.requestFullscreen().catch(()=>{});else document.exitFullscreen()}

// ===== التنقل =====
function nav(p){ST.p=p;document.querySelectorAll('.pg').forEach(e=>e.classList.remove('active'));document.querySelectorAll('.ni').forEach(n=>n.classList.remove('active'));const pe=$(`pg-${p}`);if(pe)pe.classList.add('active');const ni=document.querySelector(`.ni[data-p="${p}"]`);if(ni)ni.classList.add('active');render(p)}
function render(p){switch(p){case'home':rHome();break;case'inv':rInv();break;case'br':rBr();break;case'dist':rDist();break;case'sales':rSales();break;case'rep':rRep();break;case'set':rSet();break}ri()}

// ===== الصفحة الرئيسية =====
function rHome(){
const avail=countC('available'),dist=countC('distributed'),debt=DB.distributions.reduce((s,d)=>s+(d.remaining||0),0);
const rev=DB.sales.reduce((s,x)=>s+(x.amount||0),0);
const costS=DB.archive.reduce((s,c)=>s+cost(c.type),0);
const exp=DB.expenses.reduce((s,e)=>s+(e.amount||0),0);
// ✅ إصلاح 1: خصم الإيجار الشهري من الأرباح
const rent=(DB.settings?.rent||0);
const profit=rev-costS-exp-rent;
const types=CT();
const ts=types.map(t=>{const c=countC('available',t.id);return{...t,count:c,value:c*t.price}});
const mx=Math.max(1,...ts.map(s=>s.count));
const alerts=[];
DB.branches.forEach(b=>{const n=DB.cards.filter(c=>c.branchId===b.id&&c.status==='distributed').length;if(n>0&&n<=10)alerts.push({name:b.name,count:n})});

let h=`<div class="kpi">
<div class="kc" style="--kc:var(--blue)"><div class="kv tbl">${fmt(rev)}</div><div class="kl">الإيرادات</div></div>
<div class="kc" style="--kc:var(--green)"><div class="kv tgr">${fmt(Math.round(profit))}</div><div class="kl">الأرباح الصافية</div></div>
<div class="kc" style="--kc:var(--red)"><div class="kv tr">${fmt(Math.round(debt))}</div><div class="kl">الديون</div></div>
<div class="kc" style="--kc:var(--gold)"><div class="kv tg">${fmt(avail)}</div><div class="kl">المخزون</div></div>
</div>
${rent>0?`<div class="card" style="border-color:rgba(59,130,246,.2);padding:10px;margin-bottom:12px"><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:11px;color:var(--t2)"><i data-lucide="home" style="width:14px;height:14px;margin-left:4px"></i>الإيجار الشهري</span><span class="tr" style="font-weight:700">- ${fmt(rent)} ﷼</span></div></div>`:''}
<div class="card" style="border-color:rgba(234,179,8,.2);padding:10px">
<div class="st" style="color:var(--gold);margin-bottom:6px"><i data-lucide="radar"></i> تتبع الكروت <span class="gl"></span></div>
<div class="srch"><i data-lucide="search"></i><input type="text" id="track-inp" class="inp" placeholder="🔍 أدخل رقم الكرت أو التسلسلي..." oninput="doTrack(this.value)"></div>
<div id="track-res" style="display:none;margin-top:8px;max-height:220px;overflow-y:auto"></div>
</div>
<div class="card" style="border:2px solid rgba(234,179,8,.3);padding:12px">
<div class="st" style="color:var(--gold)"><i data-lucide="zap"></i> ⚡ توزيع سريع <span class="gl"></span></div>
<div class="inp" onclick="openQDB()" style="cursor:pointer;display:flex;justify-content:space-between;align-items:center;padding:9px 12px;margin-bottom:10px">
<span id="qd-bt" style="color:var(--t3)">-- اختر الفرع --</span><i data-lucide="chevron-down" style="width:14px;height:14px;color:var(--gold)"></i>
</div>
<div id="qd-types" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(100px,1fr));gap:8px;margin-bottom:10px"></div>
<div style="display:flex;align-items:center;gap:8px">
<div style="flex:1;background:var(--bgi);border:2px solid var(--gold);border-radius:10px;padding:8px 10px;text-align:center"><div style="font-size:8px;color:var(--t3)">الإجمالي</div><div style="font-size:16px;font-weight:800;color:var(--green)" id="qd-total">0 ﷼</div></div>
<button class="btn bg" style="flex:2;padding:12px;font-size:13px" onclick="exeQD()"><i data-lucide="send"></i> تنفيذ التوزيع</button>
</div>
<div id="qd-result" style="margin-top:6px;min-height:16px;font-size:11px"></div>
</div>
${alerts.length?`<div class="card" style="border-color:rgba(239,68,68,.2);padding:10px"><div class="st" style="color:var(--red)"><i data-lucide="bell-ring"></i> تنبيهات <span class="gl"></span></div>${alerts.map(a=>`<div style="display:flex;align-items:center;gap:5px;padding:5px 8px;background:rgba(239,68,68,.08);border-radius:5px;margin-bottom:2px;border-right:2px solid var(--red);font-size:10px"><strong class="tbl">${a.name}</strong>: ${a.count} كرت</div>`).join('')}</div>`:''}
<div class="st"><i data-lucide="pie-chart"></i> المخزون حسب النوع <span class="gl"></span></div>
<div class="sgrid">${ts.map(s=>`<div class="sc"><div class="sv" style="color:${s.color}">${fmt(s.count)}</div><div class="sl">${s.name} (${s.price}﷼)</div><div class="sb" style="background:rgba(${s.rgb},.12)"><div class="sf" style="width:${Math.round(s.count/mx*100)}%;background:${s.color}"></div></div></div>`).join('')}</div>`;
$('pg-home').innerHTML=h;
rQDT();ri();
}

// ===== تتبع الكروت =====
function doTrack(q){
const r=$('track-res');
if(!q||q.length<2){r.style.display='none';return}
const ql=q.toLowerCase();const found=[];
for(const c of DB.cards){if(found.length>=30)break;if(c.number.includes(ql)||(c.serial&&c.serial.includes(ql)))found.push({...c,src:'card'})}
for(const a of DB.archive){if(found.length>=30)break;if(a.number.includes(ql)||(a.serial&&a.serial.includes(ql))||(a.macAddress&&a.macAddress.toLowerCase().includes(ql)))found.push({...a,src:'arch'})}
if(!found.length){r.innerHTML='<div class="tc tmut" style="padding:14px;font-size:11px">لا توجد نتائج</div>';r.style.display='block';return}
r.innerHTML=found.map(c=>{
const br=DB.branches.find(b=>b.id===c.branchId);
const st=c.src==='arch'?'مباع':c.status==='available'?'متاح':'موزع';
const stc=c.src==='arch'?'background:rgba(96,165,250,.15);color:#60a5fa':c.status==='available'?'background:rgba(74,222,128,.15);color:#4ade80':'background:rgba(234,179,8,.15);color:var(--gold)';
return`<div class="sri" style="border-right-color:${tColor(c.type)}" onclick="showCard('${c.id}','${c.src}')">
<div><span class="rn">${c.number}</span>${c.serial?`<span class="rs2">(${c.serial})</span>`:''}<span class="rdet">${tName(c.type)} ${br?'| '+br.name:''}</span></div>
<span class="rst" style="${stc}">${st}</span></div>`}).join('');
r.style.display='block';
}
function showCard(id,src){
const c=src==='arch'?DB.archive.find(a=>a.id===id):DB.cards.find(x=>x.id===id);if(!c)return;
const br=DB.branches.find(b=>b.id===c.branchId);
openModal(`<div class="mh"><span class="mt2">📋 تفاصيل الكرت</span><button class="mx" onclick="closeModal()"><i data-lucide="x"></i></button></div>
<div class="card"><div class="g2" style="font-size:11px">
<div><div class="tmut" style="font-size:8px">رقم الكرت</div><div style="font-family:monospace;font-weight:700;color:var(--gold)">${c.number}</div></div>
<div><div class="tmut" style="font-size:8px">التسلسلي</div><div style="font-family:monospace">${c.serial||'-'}</div></div>
<div><div class="tmut" style="font-size:8px">النوع</div><div style="color:${tColor(c.type)}">${tName(c.type)}</div></div>
<div><div class="tmut" style="font-size:8px">الحالة</div><div>${src==='arch'?'🔴 مباع':c.status==='available'?'🟢 متاح':'🟡 موزع'}</div></div>
${br?`<div style="grid-column:1/-1"><div class="tmut" style="font-size:8px">الفرع</div><div class="tbl">${br.name}</div></div>`:''}
${c.device?`<div style="grid-column:1/-1"><div class="tmut" style="font-size:8px">الجهاز</div><div>${c.device}</div></div>`:''}
${c.macAddress?`<div style="grid-column:1/-1"><div class="tmut" style="font-size:8px">MAC</div><div style="font-family:monospace;color:var(--purple);cursor:pointer" onclick="copy('${c.macAddress}')">${c.macAddress} 📋</div></div>`:''}
</div></div><button class="btn bp bb" onclick="closeModal()">إغلاق</button>`);
}
function openSearch(){
openModal(`<div class="mh"><span class="mt2">🔍 بحث شامل</span><button class="mx" onclick="closeModal()"><i data-lucide="x"></i></button></div>
<input type="text" id="gs" class="inp mb3" placeholder="ابحث برقم الكرت أو التسلسلي أو MAC..." oninput="doTrackModal(this.value)" autofocus><div id="gs-res" style="max-height:300px;overflow-y:auto"></div>`);
setTimeout(()=>$('gs')?.focus(),200);
}
function doTrackModal(q){const r=$('gs-res');if(!q||q.length<2){r.innerHTML='<div class="tc tmut" style="padding:18px">أدخل حرفين على الأقل</div>';return}doTrackInto(q,r)}
function doTrackInto(q,r){
const ql=q.toLowerCase();const found=[];
for(const c of DB.cards){if(found.length>=30)break;if(c.number.includes(ql)||(c.serial&&c.serial.includes(ql)))found.push({...c,src:'card'})}
for(const a of DB.archive){if(found.length>=30)break;if(a.number.includes(ql)||(a.serial&&a.serial.includes(ql))||(a.macAddress&&a.macAddress.toLowerCase().includes(ql))||(a.device&&a.device.toLowerCase().includes(ql)))found.push({...a,src:'arch'})}
DB.branches.forEach(b=>{if(b.name.toLowerCase().includes(ql))found.push({id:b.id,name:b.name,src:'branch'})});
if(!found.length){r.innerHTML='<div class="tc tmut" style="padding:18px">لا توجد نتائج</div>';return}
r.innerHTML=found.map(item=>{
if(item.src==='branch')return`<div class="sri" onclick="closeModal();nav('br')"><div><strong>${item.name}</strong></div><span class="rst" style="background:rgba(74,222,128,.15);color:#4ade80">فرع</span></div>`;
const br=DB.branches.find(b=>b.id===item.branchId);
const st=item.src==='arch'?'مباع':item.status==='available'?'متاح':'موزع';
return`<div class="sri" style="border-right-color:${tColor(item.type)}" onclick="closeModal();showCard('${item.id}','${item.src}')">
<div><span class="rn">${item.number}</span>${item.serial?`<span class="rs2">(${item.serial})</span>`:''}<span class="rdet">${tName(item.type)} ${br?'| '+br.name:''}</span></div>
<span class="rst">${st}</span></div>`}).join('');ri();
}

// ===== التوزيع السريع =====
function openQDB(){
  if(!DB.branches.length){toast('لا توجد فروع، أضف فرعاً أولاً','te');return}
  var h='<div class="mh"><span class="mt2"><i data-lucide="store"></i> اختر الفرع</span><button class="mx" onclick="closeModal()"><i data-lucide="x"></i></button></div>';
  h+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">';
  DB.branches.forEach(function(b){
    h+='<div class="di" onclick="selQDB(\''+b.id+'\',\''+esc(b.name)+'\')">'+esc(b.name)+'</div>';
  });
  h+='</div>';
  openModal(h);
}
function selQDB(id,name){
  ST.qb={id:id,name:name};
  $('qd-bt').textContent=name;
  $('qd-bt').style.color='var(--t1)';
  closeModal();
  rQDT();
  toast('✅ تم اختيار "'+name+'"','ts');
  setTimeout(function(){
    var types=CT();
    if(types.length>0){var f=$('qd-q-'+types[0].id);if(f){f.focus();f.select()}}
  },400);
}
function rQDT(){
  var c=$('qd-types');if(!c)return;
  var types=CT();
  var h='';
  types.forEach(function(t){
    var av=countC('available',t.id);
    var firstCard=null;
    for(var i=0;i<DB.cards.length;i++){
      if(DB.cards[i].status==='available'&&DB.cards[i].type===t.id){firstCard=DB.cards[i];break}
    }
    var defSerial=firstCard?(firstCard.serial||''):'';
    h+='<div style="background:rgba(30,41,59,.5);border-radius:10px;padding:10px 8px;border:1px solid '+t.color+'33;text-align:center">';
    h+='<div style="font-size:11px;font-weight:700;color:'+t.color+';margin-bottom:4px">'+t.name+'</div>';
    h+='<div style="font-size:9px;color:var(--t3);margin-bottom:6px">المتاح: <strong style="color:'+t.color+'">'+av+'</strong></div>';
    h+='<input type="number" id="qd-q-'+t.id+'" class="inp" placeholder="الكمية" min="0" max="'+av+'" inputmode="numeric" oninput="updQDT()" style="padding:7px;font-size:13px;text-align:center;margin-bottom:4px">';
    h+='<input type="text" id="qd-s-'+t.id+'" class="inp" placeholder="تسلسلي (اختياري)" value="'+defSerial+'" maxlength="6" oninput="this.value=this.value.replace(/[^0-9]/g,\'\')" style="padding:5px;font-size:10px;text-align:center;font-family:monospace;direction:ltr">';
    h+='<div id="qd-h-'+t.id+'" style="font-size:9px;color:var(--gold);text-align:center;margin-top:4px;min-height:16px"></div>';
    h+='</div>';
  });
  c.innerHTML=h;
  updQDT();
}
function updQDT(){
  var total=0,totalCards=0;
  CT().forEach(function(t){
    var inp=$('qd-q-'+t.id);
    var av=countC('available',t.id);
    var qty=parseInt(inp?.value)||0;
    if(qty>av){qty=av;if(inp)inp.value=av;toast('⚠️ المتاح '+av+' فقط من '+t.name,'te')}
    total+=qty*t.price;
    totalCards+=qty;
    var hint=$('qd-h-'+t.id);
    if(hint){
      if(qty===25)hint.textContent='📋 عمود كامل (25 كرت)';
      else if(qty===50)hint.textContent='📄 نصف ورقة (عمودان)';
      else if(qty===100)hint.textContent='📑 ورقة كاملة (100 كرت)';
      else if(qty>0)hint.textContent='📍 '+qty+' كرت';
      else hint.textContent='';
    }
  });
  var el=$('qd-total');
  if(el)el.textContent=fmt(total)+' ﷼';
}
function selectQDCards(type,serial,qty){
  var cards=availCards(type);
  if(cards.length===0||qty<=0)return[];
  if(serial){
    var si=-1;
    for(var i=0;i<cards.length;i++){if(cards[i].serial===serial){si=i;break}}
    if(si>=0)cards=cards.slice(si);
  }
  if(cards.length===0)return[];
  var first=cards[0];
  var startIdx=first.fileIndex||0;
  var startPage=Math.floor(startIdx/100);
  var startCol=startIdx%4;
  if(qty===25){
    var sel=[];
    for(var i=0;i<cards.length;i++){
      var c=cards[i];
      var cPage=Math.floor((c.fileIndex||0)/100);
      var cCol=(c.fileIndex||0)%4;
      if(cPage!==startPage)break;
      if(cCol===startCol)sel.push(c);
      if(sel.length>=25)break;
    }
    return sel;
  }
  if(qty===50){
    var cols=[startCol,(startCol+1)%4];
    var sel=[];
    for(var i=0;i<cards.length;i++){
      var c=cards[i];
      var cPage=Math.floor((c.fileIndex||0)/100);
      var cCol=(c.fileIndex||0)%4;
      if(cPage!==startPage)break;
      if(cols.indexOf(cCol)>=0)sel.push(c);
      if(sel.length>=50)break;
    }
    return sel;
  }
  if(qty===100){
    return cards.filter(function(c){return Math.floor((c.fileIndex||0)/100)===startPage}).slice(0,100);
  }
  return cards.slice(0,qty);
}
function exeQD(){
  if(!ST.qb){toast('اختر الفرع أولاً','te');return}
  var allCards=[],total=0,typeSummary=[];
  CT().forEach(function(t){
    var qty=parseInt($('qd-q-'+t.id)?.value)||0;
    var serial=($('qd-s-'+t.id)?.value||'').trim();
    if(qty>0){
      var cards=selectQDCards(t.id,serial,qty);
      if(cards.length>0){
        allCards=allCards.concat(cards);
        var amt=cards.length*t.price;
        total+=amt;
        typeSummary.push({type:t.id,count:cards.length,amount:amt});
      }
    }
  });
  if(allCards.length===0){toast('لم يتم اختيار أي كرت','te');return}
  openQDConfirm(allCards,total,typeSummary);
}
function openQDConfirm(cards,total,summary){
  var brName=esc(ST.qb.name);
  var sh='';
  summary.forEach(function(s){
    sh+='<div style="display:flex;justify-content:space-between;padding:7px 10px;background:rgba(15,23,42,.6);border-radius:7px;margin-bottom:4px;border-right:3px solid '+tColor(s.type)+'">';
    sh+='<span style="color:'+tColor(s.type)+';font-weight:700;font-size:12px">'+tName(s.type)+'</span>';
    sh+='<span style="font-size:12px">'+s.count+' كرت</span>';
    sh+='<span style="color:var(--green);font-size:12px">'+fmt(s.amount)+' ﷼</span></div>';
  });
  var preview='';
  var previewCards=cards.slice(0,20);
  previewCards.forEach(function(c){
    var col=(c.fileIndex||0)%4;
    preview+='<div style="background:rgba('+tRgb(c.type)+',.15);border:1px solid '+tColor(c.type)+'44;border-radius:4px;padding:3px 2px;text-align:center;grid-column:'+(col+1)+';font-size:8px;font-family:monospace;color:var(--t1)">'+c.number+'</div>';
  });
  openModal(
    '<div class="mh"><span class="mt2">⚡ تأكيد التوزيع السريع</span><button class="mx" onclick="closeModal()"><i data-lucide="x"></i></button></div>'+
    '<div style="background:var(--bgi);border-radius:12px;padding:14px;margin-bottom:14px;border:1px solid rgba(234,179,8,.2)">'+
      '<div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:11px;color:var(--t3)">الفرع</span><strong style="color:var(--blue);font-size:13px">'+brName+'</strong></div>'+
      '<div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:11px;color:var(--t3)">عدد الكروت</span><strong style="color:var(--gold);font-size:13px">'+cards.length+'</strong></div>'+
      '<div style="display:flex;justify-content:space-between;margin-bottom:10px"><span style="font-size:11px;color:var(--t3)">الإجمالي</span><strong style="color:var(--green);font-size:16px">'+fmt(total)+' ﷼</strong></div>'+
      '<div style="background:rgba(15,23,42,.8);border-radius:8px;padding:8px;margin-bottom:10px">'+sh+'</div>'+
      (cards.length>0?'<div style="font-size:9px;color:var(--t3);margin-bottom:4px">معاينة الكروت ('+Math.min(cards.length,20)+' من '+cards.length+')</div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:3px;max-height:100px;overflow-y:auto;padding:4px;background:rgba(15,23,42,.5);border-radius:6px">'+preview+'</div>':'')+
    '</div>'+
    '<div class="lbl">المبلغ المسلم من العميل</div>'+
    '<input type="number" id="qd-paid" class="inp mb2" value="'+total+'" style="text-align:center;font-size:15px;padding:10px" oninput="updQDR('+total+')">'+
    '<div id="qd-rem" style="display:none;margin-bottom:10px;padding:10px;background:rgba(239,68,68,.1);border-radius:8px;border:1px solid rgba(239,68,68,.3);text-align:center">⚠️ المتبقي (دين): <strong class="tr" id="qd-rem-val">0</strong> ﷼</div>'+
    '<div class="g2"><button class="btn bd" onclick="closeModal()"><i data-lucide="x"></i> إلغاء</button><button class="btn bs" onclick="finQD('+total+')"><i data-lucide="check-circle"></i> تأكيد</button></div>'
  );
  setTimeout(function(){var p=$('qd-paid');if(p){p.focus();p.select()}},200);
}
function updQDR(t){
  var p=parseFloat($('qd-paid')?.value)||0;
  var r=t-p;
  var el=$('qd-rem');
  var val=$('qd-rem-val');
  if(r>0){el.style.display='block';if(val)val.textContent=fmt(Math.round(r))}
  else{el.style.display='none'}
}
function finQD(total){
  var paid=parseFloat($('qd-paid')?.value)||0;
  var rem=Math.max(0,total-paid);
  var allCards=[];
  CT().forEach(function(t){
    var qty=parseInt($('qd-q-'+t.id)?.value)||0;
    var serial=($('qd-s-'+t.id)?.value||'').trim();
    if(qty>0)allCards=allCards.concat(selectQDCards(t.id,serial,qty));
  });
  if(allCards.length===0){toast('لم يتم العثور على كروت','te');return}
  allCards.forEach(function(c){c.status='distributed';c.branchId=ST.qb.id});
  DB.distributions.push({
    id:uid(),branchId:ST.qb.id,fromId:'inventory',
    count:allCards.length,totalPrice:total,paid:paid,remaining:rem,
    date:new Date().toISOString(),cardIds:allCards.map(function(c){return c.id}),
    isQuickDist:true
  });
  saveDB();closeModal();
  CT().forEach(function(t){
    var q=$('qd-q-'+t.id);var s=$('qd-s-'+t.id);
    if(q)q.value='';if(s)s.value='';
  });
  var resEl=$('qd-result');
  if(resEl)resEl.innerHTML='<span class="tgr">✅ تم توزيع '+allCards.length+' كرت إلى '+esc(ST.qb.name)+'</span>';
  rHome();
  logA('توزيع سريع',allCards.length+' كرت إلى '+ST.qb.name);
  toast('✅ تم توزيع '+allCards.length+' كرت بنجاح','ts');
}

// ===== المخزون =====
function rInv(){$('pg-inv').innerHTML=`<div class="tabs"><div class="tab ${ST.it==='view'?'active':''}" onclick="ST.it='view';rInv()">عرض</div><div class="tab ${ST.it==='import'?'active':''}" onclick="ST.it='import';rInv()">استيراد</div></div><div id="inv-c"></div>`;if(ST.it==='view')rInvV();else rInvI();ri()}
function rInvV(){const avail=availCards(ST.if==='all'?null:ST.if);let filtered=avail;
const pp=100,tp=Math.max(1,Math.ceil(filtered.length/pp));if(ST.ip>=tp)ST.ip=tp-1;if(ST.ip<0)ST.ip=0;const pc=filtered.slice(ST.ip*pp,(ST.ip+1)*pp);
const counts={};CT().forEach(t=>{counts[t.id]=countC('available',t.id)});
let h=`<div class="fp">${CT().map(t=>`<div class="f ${ST.if===t.id?'active':''}" style="${ST.if===t.id?'border-color:'+t.color+';color:'+t.color+';background:rgba('+t.rgb+',.1)':''}" onclick="ST.if=(ST.if==='${t.id}'?'all':'${t.id}');ST.ip=0;rInvV();ri()">${t.name} <span class="c">${fmt(counts[t.id]||0)}</span></div>`).join('')}</div>`;
if(!pc.length)h+='<div class="empty"><i data-lucide="inbox"></i><div>لا توجد كروت</div></div>';
else{h+=`<div class="st"><i data-lucide="grid-3x3"></i> الورقة ${ST.ip+1} (${pc.length} كرت)</div><div class="cg">`;
pc.forEach(c=>{const col=((c.fileIndex||0)%4)+1;h+=`<div class="ci" style="grid-column:${col};border-color:rgba(${tRgb(c.type)},.2)"><div style="position:absolute;inset:0;opacity:.15;border-radius:4px;background:${tColor(c.type)}"></div><button class="db" onclick="event.stopPropagation();reqPW(()=>delCard('${c.id}'))">×</button>${c.serial?`<div class="sn">${esc(c.serial)}</div>`:''}<div class="cn">${esc(c.number)}</div></div>`});
h+=`</div><div class="pager"><button class="pgb" onclick="ST.ip--;rInvV();ri()" ${ST.ip<=0?'disabled':''}><i data-lucide="chevron-right"></i></button><div class="pgi">ورقة <strong>${ST.ip+1}</strong>/<strong>${tp}</strong></div><button class="pgb" onclick="ST.ip++;rInvV();ri()" ${ST.ip>=tp-1?'disabled':''}><i data-lucide="chevron-left"></i></button></div>`}
$('inv-c').innerHTML=h;ri()}
function rInvI(){$('inv-c').innerHTML=`<div class="fdrop" id="inv-drop" onclick="$('inv-file').click()"><i data-lucide="cloud-upload"></i><div style="font-size:13px;color:var(--t2)">اضغط أو اسحب PDF</div><div style="font-size:10px;color:var(--t3)">كل صفحة: 4 أعمدة × 25 صف = 100 كرت</div></div>
<input type="file" id="inv-file" accept=".pdf" multiple onchange="impCards(this.files)" hidden>
<div class="card mt2b"><div class="st mb2"><i data-lucide="check-circle"></i> شروط الاستيراد</div><div style="font-size:11px;color:var(--t2)"><div>✓ رقم الكرت: 10 أرقام</div><div>✓ الرقم التسلسلي: 6 أرقام بجانب الكرت</div><div>✓ التصنيف حسب بادئة الرقم (${CT().map(t=>t.prefix+'→'+t.name).join('، ')})</div></div></div><div id="inv-res"></div>`;ri();
setTimeout(()=>{const d=$('inv-drop');if(!d)return;d.ondragover=e=>{e.preventDefault();d.classList.add('drag')};d.ondragleave=()=>d.classList.remove('drag');d.ondrop=e=>{e.preventDefault();d.classList.remove('drag');impCards(e.dataTransfer.files)}},50)}
async function impCards(files){
  if(!files||files.length===0)return;
  const res=$('inv-res');
  res.innerHTML='<div class="tc tmut" style="padding:20px">⏳ جاري المعالجة...</div>';
  let tScanned=0,tSerial=0,tRej=0,tAdd=0;
  for(let f=0;f<files.length;f++){
    try{
      const buf=await files[f].arrayBuffer();
      const pdf=await pdfjsLib.getDocument({data:new Uint8Array(buf)}).promise;
      let text='';
      for(let i=1;i<=pdf.numPages;i++){
        const pg=await pdf.getPage(i);
        const tc=await pg.getTextContent();
        const pageText=tc.items.map(function(it){return it.str}).join(' ');
        text=text+pageText+' ';
      }
      const r=parseCards(text);
      tScanned+=r.scanned;tSerial+=r.withSerial;tRej+=r.rejected;tAdd+=r.added;
    }catch(e){
      console.error('PDF processing error:',e);
      toast('خطأ في معالجة الملف: '+e.message,'te');
    }
  }
  res.innerHTML='<div class="isg"><div class="is"><div class="v tbl">'+fmt(tScanned)+'</div><div class="l">ممسوحة</div></div><div class="is"><div class="v tgr">'+fmt(tSerial)+'</div><div class="l">برقم تسلسلي</div></div><div class="is"><div class="v tr">'+fmt(tRej)+'</div><div class="l">مرفوضة</div></div><div class="is"><div class="v tg">'+fmt(tAdd)+'</div><div class="l">✅ مضافة</div></div></div>';
  if(tAdd>0)logA('استيراد كروت',tAdd+' كرت');
}
function parseCards(text){
const existing=new Set([...DB.cards.map(c=>c.number),...DB.archive.map(a=>a.number)]);
let clean=text.replace(/\r?\n/g,' ').replace(/\s+/g,' ');
const allMatches=[];
const numRx=/(?<!\d)(\d{6,10})(?!\d)/g;
let m;
while((m=numRx.exec(clean))!==null){allMatches.push({val:m[1],idx:m.index})}
const cardNums=allMatches.filter(n=>n.val.length===10);
const serials=allMatches.filter(n=>n.val.length===6);
let scanned=cardNums.length,withSerial=0,rejected=0,added=0;
const maxIdx=DB.cards.reduce((mx,c)=>Math.max(mx,c.fileIndex||0),-1);
const newCards=[];
const usedSerials=new Set();
cardNums.forEach(td=>{
  if(existing.has(td.val)){rejected++;return}
  let serial=null,minD=Infinity;
  serials.forEach(s=>{
    if(usedSerials.has(s.idx))return;
    const d=Math.abs(s.idx-td.idx);
    if(d<minD&&d<500){minD=d;serial=s}
  });
  if(!serial){rejected++;return}
  usedSerials.add(serial.idx);
  withSerial++;
  const type=classifyCard(td.val);
  newCards.push({id:uid(),serial:serial.val,number:td.val,type,cost:cost(type),status:'available',branchId:null,fileIndex:maxIdx+1+added,addedDate:new Date().toISOString()});
  added++;
});
DB.cards.push(...newCards);saveDB();
return{scanned,withSerial,rejected,added}}
function delCard(id){const i=DB.cards.findIndex(c=>c.id===id);if(i>=0){const num=DB.cards[i]?.number||'';DB.cards.splice(i,1);saveDB();rInvV();logA('حذف كرت',num);toast('تم الحذف','ts')}}

// ===== الفروع =====
function rBr(){let h=`<div class="flex gap2 mb3"><button class="btn bp" onclick="openAddBr()"><i data-lucide="plus"></i> إضافة</button><button class="btn bh" onclick="addDefBr()"><i data-lucide="database"></i> افتراضية</button></div>`;
if(!DB.branches.length)h+='<div class="empty"><i data-lucide="store"></i><div>لا توجد فروع</div></div>';
else{DB.branches.forEach(b=>{const types=CT();const debt=brDebt(b.id);
h+=`<div class="bi" onclick="openBrOpt('${b.id}')" ondblclick="event.stopPropagation();openBrMov('${b.id}')"><div class="ba">${b.name.slice(0,2)}</div><div class="binfo"><div class="bname">${esc(b.name)}</div><div class="bmeta">نقر: خيارات | مزدوج: الحركات</div></div><div class="bss">${types.map(t=>`<div class="bs2" style="background:rgba(${t.rgb},.15);color:${t.color}">${countC('distributed',t.id,b.id)}</div>`).join('')}<div class="bs2" style="background:rgba(234,179,8,.15);color:var(--gold)" onclick="event.stopPropagation();openPayDebt('${b.id}')">${fmt(Math.round(debt))}</div></div></div>`})}
$('pg-br').innerHTML=h;ri()}
function openAddBr(){openModal(`<div class="mh"><span class="mt2">➕ إضافة فرع</span><button class="mx" onclick="closeModal()"><i data-lucide="x"></i></button></div><div class="lbl">اسم الفرع</div><input type="text" id="br-name" class="inp mb3" placeholder="اسم الفرع"><button class="btn bg bb" onclick="addBr()">إضافة</button>`)}
function addBr(){const n=$('br-name')?.value?.trim();if(!n)return toast('أدخل الاسم','te');DB.branches.push({id:uid(),name:n});saveDB();closeModal();rBr();logA('إضافة فرع',n);toast('تم الإضافة','ts')}
function addDefBr(){const defs=['مكتبة النور','بقالة الأمل','مكتبة السلام','بقالة الوفاء','سوبرماركت الرياض','مكتبة الفجر','بقالة البركة','مكتبة الإخلاص','بقالة العزيزية','مكتبة الشفاء','بقالة الحرمين','مكتبة الزهراء','بقالة الندى','مكتبة العلم','بقالة الخير','مكتبة الياسمين','بقالة الهدى','مكتبة الرحمة'];let a=0;defs.forEach(n=>{if(!DB.branches.find(b=>b.name===n)){DB.branches.push({id:uid(),name:n});a++}});saveDB();rBr();toast(`تم إضافة ${a} فرع`,'ts')}
function openBrOpt(id){const b=DB.branches.find(x=>x.id===id);if(!b)return;openModal(`<div class="mh"><span class="mt2">⚙️ ${esc(b.name)}</span><button class="mx" onclick="closeModal()"><i data-lucide="x"></i></button></div><div class="lbl">تعديل الاسم</div><input type="text" id="ed-name" class="inp mb3" value="${esc(b.name)}"><div class="g2"><button class="btn bg" onclick="updBr('${id}')"><i data-lucide="save"></i> حفظ</button><button class="btn bd" onclick="reqPW(()=>delBr('${id}'))"><i data-lucide="trash-2"></i> حذف</button></div></div>`)}
function updBr(id){const n=$('ed-name')?.value?.trim();if(!n)return toast('أدخل الاسم','te');const b=DB.branches.find(x=>x.id===id);if(b){b.name=n;saveDB();closeModal();rBr();logA('تعديل فرع',n);toast('تم التحديث','ts')}}

// ✅ إصلاح 2: حذف الفرع مع تسوية ديونه (تسجيلها كخسارة أو إلغاؤها)
function delBr(id){
  const b=DB.branches.find(x=>x.id===id);
  if(!b)return;
  // إعادة الكروت الموزعة للفرع إلى المخزون
  DB.cards.filter(c=>c.branchId===id).forEach(c=>{c.status='available';c.branchId=null});
  // ✅ تسوية التوزيعات والديون المتبقية: تسجيلها كمصروف خسارة
  let lostDebt=0;
  DB.distributions.forEach(d=>{
    if(d.branchId===id && d.remaining>0){
      lostDebt+=d.remaining;
      d.remaining=0;
      d.paid=(d.paid||0); // يبقى المدفوع كما هو
      d.settledOnDelete=true; // علامة أن الدين سُوّي
    }
  });
  if(lostDebt>0){
    DB.expenses.push({
      id:uid(),description:`دين معدوم - ${b.name} (${fmt(Math.round(lostDebt))}﷼)`,
      amount:lostDebt,date:new Date().toISOString(),type:'badDebt'
    });
    logA('دين معدوم',`${b.name}: ${fmt(Math.round(lostDebt))}﷼`);
  }
  // حذف الفرع
  DB.branches=DB.branches.filter(x=>x.id!==id);
  saveDB();closeModal();rBr();
  logA('حذف فرع',b.name);
  toast(lostDebt>0?`تم الحذف مع تسجيل ${fmt(Math.round(lostDebt))}﷼ كخسارة`:'تم الحذف','ts');
}
function openPayDebt(bid){const b=DB.branches.find(x=>x.id===bid);if(!b)return;const debt=brDebt(bid);openModal(`<div class="mh"><span class="mt2">💰 تسديد: ${esc(b.name)}</span><button class="mx" onclick="closeModal()"><i data-lucide="x"></i></button></div><p class="mb3" style="font-size:13px">الدين: <strong class="tr">${fmt(Math.round(debt))}﷼</strong></p><div class="lbl">المبلغ</div><input type="number" id="pay-amt" class="inp mb3" placeholder="المبلغ"><button class="btn bg bb" onclick="payDebt('${bid}')">تسديد</button></div>`)}
function payDebt(bid){let amt=parseFloat($('pay-amt')?.value)||0;if(amt<=0)return toast('أدخل مبلغاً','te');const b=DB.branches.find(x=>x.id===bid);const dists=DB.distributions.filter(d=>d.branchId===bid&&d.remaining>0).sort((a,b)=>new Date(a.date)-new Date(b.date));let rem=amt;dists.forEach(d=>{if(rem<=0)return;const p=Math.min(rem,d.remaining);d.paid+=p;d.remaining-=p;rem-=p});saveDB();closeModal();rBr();logA('سداد دين',`${b?.name}: ${fmt(amt)}﷼`);toast(`تم تسديد ${fmt(amt)}﷼`,'ts')}

// ===== حركات الفرع =====
function openBrMov(bid){
const b=DB.branches.find(x=>x.id===bid);if(!b)return;
const dists=DB.distributions.filter(d=>d.branchId===bid).sort((a,c)=>new Date(c.date)-new Date(a.date));
let rows=dists.map(d=>{const date=new Date(d.date).toLocaleDateString('ar-SA');const info=(d.cardIds&&d.cardIds.length)?`عدد: ${d.cardIds.length}`:(d.debtType?`دين ${tName(d.debtType)}`:'');return`<div class="hi"><div class="hh"><span class="hb">${date}</span><span class="hd tg">${fmt(d.totalPrice)}﷼</span></div><div class="hm">${info} | استُلم: <span class="tgr">${fmt(d.paid||0)}</span> | دين: <span class="${d.remaining>0?'tr':'tgr'}">${fmt(d.remaining||0)}</span> ${d.settledOnDelete?'<span style="color:var(--purple);font-size:9px">(مُسوّى)</span>':''}</div>${d.remaining>0?`<button class="btn bs bsm mt2b" onclick="issueReceipt('${d.id}')"><i data-lucide="receipt"></i> إيصال استلام</button>`:''}</div>`}).join('')||'<div class="tc tmut" style="padding:14px">لا توجد حركات</div>';
let typeOpts=CT().map(t=>`<option value="${t.id}">${t.name} (${t.price}﷼)</option>`).join('');
openModal(`<div class="mh"><span class="mt2">📊 حركات: ${esc(b.name)}</span><button class="mx" onclick="closeModal()"><i data-lucide="x"></i></button></div>
<div class="st" style="color:var(--gold)"><i data-lucide="list"></i> سجل التوزيعات والديون</div>
<div style="max-height:260px;overflow-y:auto;margin-bottom:10px">${rows}</div>
<div class="card" style="background:var(--bgi)"><div class="st" style="color:var(--red)"><i data-lucide="plus-circle"></i> إضافة دين للفرع</div>
<div class="g3 mb2"><select class="inp" id="bd-type" style="font-size:10px">${typeOpts}</select><input type="number" id="bd-amt" class="inp" placeholder="المبلغ" style="font-size:10px"><input type="number" id="bd-cnt" class="inp" placeholder="الكمية" value="1" style="font-size:10px"></div>
<button class="btn bd bb" onclick="addBrDebt('${bid}')"><i data-lucide="plus"></i> إضافة دين</button></div>`)}
function issueReceipt(did){const d=DB.distributions.find(x=>x.id===did);if(!d)return;openModal(`<div class="mh"><span class="mt2">🧾 إيصال استلام</span><button class="mx" onclick="closeModal()"><i data-lucide="x"></i></button></div><p class="mb3" style="font-size:12px">الدين الحالي: <strong class="tr">${fmt(d.remaining||0)}﷼</strong></p><div class="lbl">المبلغ المستلم</div><input type="number" id="rec-amt" class="inp mb3" value="${d.remaining||0}"><button class="btn bs bb" onclick="confReceipt('${did}')">تأكيد الإيصال</button>`)}
function confReceipt(did){const d=DB.distributions.find(x=>x.id===did);if(!d)return;const amt=parseFloat($('rec-amt')?.value)||0;if(amt<=0)return toast('أدخل مبلغاً','te');d.paid=(d.paid||0)+amt;d.remaining=Math.max(0,(d.remaining||0)-amt);saveDB();closeModal();rBr();if(d.branchId)openBrMov(d.branchId);logA('إيصال استلام',`${fmt(amt)}﷼`);toast('تم تسجيل الإيصال','ts')}
function addBrDebt(bid){const type=$('bd-type')?.value;const amt=parseFloat($('bd-amt')?.value)||0;if(amt<=0)return toast('أدخل المبلغ','te');DB.distributions.push({id:uid(),branchId:bid,fromId:'debt',count:0,totalPrice:amt,paid:0,remaining:amt,debtType:type,date:new Date().toISOString(),cardIds:[]});saveDB();closeModal();rBr();openBrMov(bid);logA('إضافة دين',`${DB.branches.find(x=>x.id===bid)?.name}: ${fmt(amt)}﷼`);toast('تمت إضافة الدين','ts')}

// ===== التوزيع =====
function rDist(){if(!ST.dd){$('pg-dist').innerHTML=`<div class="empty"><i data-lucide="map-pin"></i><div>اختر وجهة التوزيع</div><button class="btn bg mt3" onclick="openDestM()"><i data-lucide="map-pin"></i> اختيار الوجهة</button></div>`;ri();return}
const dest=DB.branches.find(b=>b.id===ST.dd);if(!dest){ST.dd=null;rDist();return}
const avail={};CT().forEach(t=>{avail[t.id]=availCards(t.id,ST.df).length});
let h=`<div class="g2 mb3"><div><div class="lbl">المصدر</div><select class="inp" onchange="ST.df=this.value;rDist()"><option value="inventory" ${ST.df==='inventory'?'selected':''}>المخزون</option>${DB.branches.map(b=>`<option value="${b.id}" ${ST.df===b.id?'selected':''}>${esc(b.name)}</option>`).join('')}</select></div><div><div class="lbl">الوجهة</div><div class="inp" style="cursor:pointer;display:flex;align-items:center;gap:4px" onclick="openDestM()"><i data-lucide="map-pin" style="width:13px;height:13px;color:var(--gold)"></i><span style="flex:1">${esc(dest.name)}</span></div></div></div>
<div class="dp"><div class="dm"><div class="dmo ${ST.dm==='qty'?'active':''}" onclick="ST.dm='qty';ST.ms.clear();rDist()"><i data-lucide="hash"></i> بالكمية</div><div class="dmo ${ST.dm==='manual'?'active':''}" onclick="ST.dm='manual';rDist()"><i data-lucide="hand"></i> يدوي</div></div>
${ST.dm==='qty'?rQtyD(avail):rManD()}
<div class="dtot"><span class="dtl">الإجمالي:</span><span class="dtv" id="d-total">0</span><span class="dtc">﷼</span></div>
<div class="flex gap2 mb2"><button class="btn bh bsm" onclick="openHistM()"><i data-lucide="history"></i></button><button class="btn bd bsm" onclick="undoLast()"><i data-lucide="undo-2"></i></button><button class="btn bg" style="flex:1" onclick="openConfD()"><i data-lucide="check-circle"></i> ترحيل</button></div></div>`;
$('pg-dist').innerHTML=h;if(ST.dm==='qty')calcDT();else calcMT();ri()}
function rQtyD(av){return`<div class="g4 mb2">${CT().map(t=>`<div class="qdi"><div class="ql" style="color:${t.color}">${t.name}</div><div class="qa2">المتاح: ${fmt(av[t.id])}</div><input type="number" id="d-q-${t.id}" class="inp" placeholder="0" min="0" max="${av[t.id]}" oninput="calcDT()" style="padding:4px;font-size:10px"></div>`).join('')}</div>`}
function rManD(){const cards=availCards(ST.mf,ST.df);const pp=100,tp=Math.max(1,Math.ceil(cards.length/pp));if(ST.mp>=tp)ST.mp=tp-1;if(ST.mp<0)ST.mp=0;const pc=cards.slice(ST.mp*pp,(ST.mp+1)*pp);
return`<div class="fp mb2">${CT().map(t=>{const cnt=availCards(t.id,ST.df).length;return`<div class="f ${ST.mf===t.id?'active':''}" style="${ST.mf===t.id?'border-color:'+t.color+';color:'+t.color:''}" onclick="ST.mf='${t.id}';ST.mp=0;rDist()">${t.id} <span class="c">${fmt(cnt)}</span></div>`}).join('')}</div>
<div class="pager" style="padding:3px 0"><button class="pgb" onclick="ST.mp--;rDist()" ${ST.mp<=0?'disabled':''}><i data-lucide="chevron-right"></i></button><div class="pgi" style="font-size:9px">ورقة ${ST.mp+1}/${tp}</div><button class="pgb" onclick="ST.mp++;rDist()" ${ST.mp>=tp-1?'disabled':''}><i data-lucide="chevron-left"></i></button></div>
<div class="cb">${[1,2,3,4].map(c=>`<button class="cbt" onclick="selCol(${c})">عمود ${c}</button>`).join('')}</div>
<div class="cg mb2">${pc.map(c=>{const col=((c.fileIndex||0)%4)+1;const sel=ST.ms.has(c.id)?'s':'';return`<div class="ci ${sel}" style="grid-column:${col};border-color:rgba(${tRgb(c.type)},.2)" onclick="togMan('${c.id}')"><div style="position:absolute;inset:0;opacity:.15;border-radius:4px;background:${tColor(c.type)}"></div>${c.serial?`<div class="sn">${esc(c.serial)}</div>`:''}<div class="cn">${esc(c.number)}</div></div>`}).join('')}</div>
<div class="tc tg" style="font-size:11px;margin-bottom:5px">المختار: <strong>${ST.ms.size}</strong> كرت</div>`}
function togMan(id){if(ST.ms.has(id))ST.ms.delete(id);else ST.ms.add(id);rDist()}
function selCol(col){const cards=availCards(ST.mf,ST.df);const pp=100;const pc=cards.slice(ST.mp*pp,(ST.mp+1)*pp);const cc=pc.filter(c=>((c.fileIndex||0)%4)+1===col);const allS=cc.every(c=>ST.ms.has(c.id));cc.forEach(c=>{if(allS)ST.ms.delete(c.id);else ST.ms.add(c.id)});rDist()}
function calcDT(){let t=0;CT().forEach(x=>{t+=(parseInt($(`d-q-${x.id}`)?.value)||0)*x.price});const e=$('d-total');if(e)e.textContent=fmt(t)}
function calcMT(){let t=0;ST.ms.forEach(id=>{const c=DB.cards.find(x=>x.id===id);if(c)t+=price(c.type)});const e=$('d-total');if(e)e.textContent=fmt(t)}
function openDestM(){let h=`<div class="mh"><span class="mt2">📍 اختيار الوجهة</span><button class="mx" onclick="closeModal()"><i data-lucide="x"></i></button></div>`;if(!DB.branches.length)h+='<div class="empty"><i data-lucide="store"></i><div>لا توجد فروع</div></div>';else{h+='<div class="dg">';DB.branches.forEach(b=>{h+=`<div class="di ${ST.dd===b.id?'active':''}" onclick="ST.dd='${b.id}';closeModal();rDist()">${esc(b.name)}</div>`});h+='</div>'}openModal(h)}
function openConfD(){if(!ST.dd)return toast('اختر وجهة','te');const dest=DB.branches.find(b=>b.id===ST.dd);if(!dest)return;let sel=[];if(ST.dm==='qty'){CT().forEach(t=>{const q=parseInt($(`d-q-${t.id}`)?.value)||0;if(q>0)sel.push(...availCards(t.id,ST.df).slice(0,q))})}else{ST.ms.forEach(id=>{const c=DB.cards.find(x=>x.id===id);if(c)sel.push(c)})}
if(!sel.length)return toast('لم يتم اختيار كروت','te');const total=sel.reduce((s,c)=>s+price(c.type),0);const ids=sel.map(c=>c.id).join(',');
let sh='';const sm={};sel.forEach(c=>{if(!sm[c.type])sm[c.type]={count:0,amount:0};sm[c.type].count++;sm[c.type].amount+=price(c.type)});
Object.keys(sm).forEach(t=>{sh+=`<div class="si2"><div class="sb2" style="background:rgba(${tRgb(t)},.15);color:${tColor(t)}">${tName(t)}</div><div class="sc2">${sm[t].count}</div><div class="sa2">${fmt(sm[t].amount)}﷼</div></div>`});
openModal(`<div class="mh"><span class="mt2">📤 تأكيد التوزيع</span><button class="mx" onclick="closeModal()"><i data-lucide="x"></i></button></div><div class="card mb3"><div style="font-size:12px;margin-bottom:5px">الوجهة: <strong class="tg">${esc(dest.name)}</strong></div><div style="font-size:12px;margin-bottom:5px">عدد: <strong>${sel.length}</strong></div>${sh}<div style="font-size:13px;margin-top:6px;padding-top:6px;border-top:1px solid rgba(255,255,255,.06)">الإجمالي: <strong class="tgr">${fmt(total)}﷼</strong></div></div><div class="lbl">المبلغ المستلم</div><input type="number" id="d-paid" class="inp mb2" value="${total}" oninput="updDR(${total})"><div id="d-rem" class="tg mb3" style="font-size:11px;display:none"></div><button class="btn bg bb" onclick="finD(${total},'${ids}')">✅ تأكيد</button>`)}
function updDR(t){const p=parseFloat($('d-paid')?.value)||0;const r=t-p;const e=$('d-rem');if(r>0){e.style.display='';e.textContent=`⚠️ دين: ${fmt(Math.round(r))}﷼`}else e.style.display='none'}
function finD(total,idsStr){const paid=parseFloat($('d-paid')?.value)||0;const rem=Math.max(0,total-paid);const ids=idsStr.split(',');ids.forEach(id=>{const c=DB.cards.find(x=>x.id===id);if(c){c.status='distributed';c.branchId=ST.dd}});const dest=DB.branches.find(b=>b.id===ST.dd);DB.distributions.push({id:uid(),branchId:ST.dd,fromId:ST.df,count:ids.length,totalPrice:total,paid,remaining:rem,date:new Date().toISOString(),cardIds:ids});saveDB();closeModal();ST.ms.clear();rDist();logA('توزيع',`${ids.length} كرت إلى ${dest?.name||'فرع'}`);toast(`تم توزيع ${ids.length} كرت`,'ts')}
function undoLast(){if(!DB.distributions.length)return toast('لا توجد عمليات','te');reqPW(()=>{const last=DB.distributions[DB.distributions.length-1];revD(last.id)})}

// ✅ إصلاح 3: استرجاع توزيع مع تسجيل استرداد نقدي
function revD(id){
  const i=DB.distributions.findIndex(d=>d.id===id);if(i<0)return;
  const d=DB.distributions[i];
  // إعادة الكروت إلى حالتها السابقة
  for(const cid of d.cardIds){
    const c=DB.cards.find(x=>x.id===cid);
    if(!c)continue;
    if(d.fromId==='inventory'||d.fromId==='debt'){
      c.status='available';c.branchId=null;
    }else{
      c.status='distributed';c.branchId=d.fromId;
    }
  }
  // ✅ تسجيل المبلغ المسترد (إن وجد)
  if(d.paid>0){
    DB.refunds.push({
      id:uid(),distributionId:d.id,branchId:d.branchId,
      amount:d.paid,date:new Date().toISOString(),
      note:'استرجاع توزيع #'+d.id.slice(0,8)
    });
    DB.expenses.push({
      id:uid(),description:`استرداد نقدي - ${DB.branches.find(b=>b.id===d.branchId)?.name||'فرع محذوف'} (توزيع ${id.slice(0,8)})`,
      amount:d.paid,date:new Date().toISOString(),type:'refund'
    });
  }
  DB.distributions.splice(i,1);
  saveDB();rDist();
  const brName=DB.branches.find(b=>b.id===d.branchId)?.name||'فرع محذوف';
  if(d.paid>0){
    logA('استرجاع توزيع مع استرداد',`${fmt(d.paid)}﷼ من ${brName}`);
  }else{
    logA('استرجاع توزيع',`${d.count} كرت من ${brName}`);
  }
  toast(d.paid>0?`تم الاسترجاع مع استرداد ${fmt(d.paid)}﷼`:'تم الاسترجاع','ts');
}
function openHistM(){let h=`<div class="mh"><span class="mt2">📋 السجل</span><button class="mx" onclick="closeModal()"><i data-lucide="x"></i></button></div>`;if(!DB.distributions.length)h+='<div class="empty"><i data-lucide="inbox"></i><div>لا توجد عمليات</div></div>';else{[...DB.distributions].sort((a,b)=>new Date(b.date)-new Date(a.date)).forEach(d=>{const br=DB.branches.find(b=>b.id===d.branchId);const date=new Date(d.date).toLocaleDateString('ar-SA');h+=`<div class="hi"><div class="hh"><span class="hb">${br?esc(br.name):'محذوف'}</span><span class="hd">${date}</span></div><div class="hm">عدد: ${d.count} | ${fmt(d.totalPrice)}﷼ | دين: ${fmt(d.remaining)}﷼ | مدفوع: ${fmt(d.paid||0)}﷼</div><button class="btn bd bsm mt2b" onclick="closeModal();reqPW(()=>revD('${d.id}'))"><i data-lucide="undo-2"></i> استرجاع</button></div>`})}openModal(h)}

// ===== المبيعات =====
function rSales(){$('pg-sales').innerHTML=`<div class="tabs"><div class="tab ${ST.st==='import'?'active':''}" onclick="ST.st='import';rSales()">استيراد</div><div class="tab ${ST.st==='log'?'active':''}" onclick="ST.st='log';rSales()">سجل</div><div class="tab ${ST.st==='arch'?'active':''}" onclick="ST.st='arch';rSales()">أرشيف</div><div class="tab ${ST.st==='10d'?'active':''}" onclick="ST.st='10d';rSales()">10 أيام</div></div><div id="sc2"></div>`;switch(ST.st){case'import':rSI();break;case'log':rSL();break;case'arch':rArch();break;case'10d':r10D();break}ri()}
function rSI(){$('sc2').innerHTML=`<div class="fdrop" id="s-drop" onclick="$('s-file').click()"><i data-lucide="file-text"></i><div style="font-size:13px;color:var(--t2)">استيراد تقرير MikroTik</div><div style="font-size:10px;color:var(--t3)">مطابقة الكروت المباعة تلقائياً</div></div><input type="file" id="s-file" accept=".pdf" multiple onchange="impSales(this.files)" hidden><div id="s-res"></div>`;ri();setTimeout(()=>{const d=$('s-drop');if(!d)return;d.ondragover=e=>{e.preventDefault();d.classList.add('drag')};d.ondragleave=()=>d.classList.remove('drag');d.ondrop=e=>{e.preventDefault();d.classList.remove('drag');impSales(e.dataTransfer.files)}},50)}
async function impSales(files){
  if(!files||files.length===0)return;
  $('s-res').innerHTML='<div class="tc tmut" style="padding:18px">⏳ جاري المعالجة...</div>';
  let tRec=0,tMatch=0,tUpd=0,tDup=0;
  for(let f=0;f<files.length;f++){
    try{
      const buf=await files[f].arrayBuffer();
      const pdf=await pdfjsLib.getDocument({data:new Uint8Array(buf)}).promise;
      let fullText='';
      for(let i=1;i<=pdf.numPages;i++){
        const pg=await pdf.getPage(i);
        const tc=await pg.getTextContent();
        fullText+=tc.items.map(function(it){return it.str}).join(' ')+' ';
      }
      var clean=fullText.replace(/\r?\n/g,' ').replace(/\s+/g,' ');
      clean=clean.replace(/(\d{2}\/\d{2}\/\d{3})\s+(\d)\s+(\d{2}:\d{2}:\d{2})/g,'$1$2 $3');
      const recs=extSales(clean);
      tRec+=recs.length;
      const res=procSales(recs);
      tMatch+=res.matched;tUpd+=res.updated;tDup+=res.duplicates;
    }catch(e){console.error('Sales PDF Error:',e);toast('خطأ: '+e.message,'te')}
  }
  $('s-res').innerHTML='<div class="isg">'+
    '<div class="is"><div class="v tbl">'+fmt(tRec)+'</div><div class="l">سجلات ممسوحة</div></div>'+
    '<div class="is"><div class="v tgr">'+fmt(tMatch)+'</div><div class="l">✅ تمت مطابقتها</div></div>'+
    '<div class="is"><div class="v" style="color:var(--purple)">'+fmt(tUpd)+'</div><div class="l">تحديث بيانات</div></div>'+
    '<div class="is"><div class="v tr">'+fmt(tDup)+'</div><div class="l">🚫 مكررة (تجاهل)</div></div></div>';
}
function extSales(text){
  var recs=[];
  var rx1=/(\d{10})\s+([\d.]+)\s*(MiB|GiB)\s+(\S+)\s+([0-9A-Fa-f]{2}(?::[0-9A-Fa-f]{2}){5})\s+(\d{2}\/\d{2}\/\d{4}\s+\d{2}:\d{2}:\d{2})/gi;
  var m;
  while((m=rx1.exec(text))!==null){
    var d=parseFloat(m[2]);
    if(m[3].toLowerCase()==='gib')d=d*1024;
    recs.push({number:m[1],dataUsed:Math.round(d*10)/10,device:m[4],mac:m[5].toUpperCase(),loginDate:m[6]});
  }
  if(recs.length===0){
    var rx2=/(\d{10})[\s\S]{0,200}?([0-9A-Fa-f]{2}(?::[0-9A-Fa-f]{2}){5})/gi;
    while((m=rx2.exec(text))!==null){
      recs.push({number:m[1],dataUsed:0,device:'',mac:m[2].toUpperCase(),loginDate:''});
    }
  }
  if(recs.length===0){
    var allCards=[...text.matchAll(/(?<!\d)(\d{10})(?!\d)/g)].map(function(m){return m[1]});
    var allMACs=[...text.matchAll(/([0-9A-Fa-f]{2}(?::[0-9A-Fa-f]{2}){5})/gi)].map(function(m){return m[1].toUpperCase()});
    var unique=new Set();
    for(var i=0;i<allCards.length;i++){
      if(unique.has(allCards[i]))continue;
      unique.add(allCards[i]);
      recs.push({number:allCards[i],dataUsed:0,device:'',mac:allMACs[i]||'',loginDate:''});
    }
  }
  return recs;
}

// ✅ إصلاح 4: منع تكرار استيراد المبيعات + ✅ إصلاح 5: تثبيت السعر وقت البيع
function procSales(recs){
  var matched=0,updated=0,duplicates=0;
  // بناء مجموعة أرقام الكروت المباعة مسبقاً (من الأرشيف)
  var soldNumbers=new Set(DB.archive.map(function(a){return a.number}));
  
  recs.forEach(function(r){
    if(!r.number)return;
    
    // ✅ فحص 1: هل الكرت موجود بالفعل في الأرشيف (مباع سابقاً)؟
    if(soldNumbers.has(r.number)){
      // تحديث بياناته فقط دون إنشاء sale جديد
      var arch=DB.archive.find(function(a){return a.number===r.number});
      if(arch){
        if(r.device)arch.device=r.device;
        if(r.mac)arch.macAddress=r.mac;
        if(r.dataUsed)arch.dataUsed=r.dataUsed;
        if(r.loginDate)arch.firstLoginDate=r.loginDate;
        updated++;
      }
      return; // تجاهل ولا تسجل بيعاً جديداً
    }
    
    // ✅ فحص 2: ابحث عن الكرت في المخزون (موزع أو متاح)
    var c=DB.cards.find(function(x){return x.number===r.number});
    if(!c)return;
    
    // ✅ إصلاح 5: تثبيت السعر الفعلي وقت البيع (وليس السعر الحالي المتغير)
    var actualPrice=price(c.type); // السعر الحالي من الإعدادات
    
    // نقله للأرشيف مع حفظ السعر الفعلي
    DB.archive.push({
      id:c.id, serial:c.serial, number:c.number, type:c.type,
      price:actualPrice, // ✅ حفظ السعر وقت البيع
      status:'sold', branchId:c.branchId, fileIndex:c.fileIndex,
      device:r.device||'', macAddress:r.mac||'', dataUsed:r.dataUsed||0,
      firstLoginDate:r.loginDate||'', source:'sale', soldDate:new Date().toISOString()
    });
    
    // ✅ تسجيل البيع بالسعر الفعلي
    DB.sales.push({
      id:uid(), cardId:c.id, cardNumber:c.number, type:c.type,
      branchId:c.branchId, amount:actualPrice, // ✅ السعر الفعلي
      device:r.device||'',
      date:new Date().toISOString()
    });
    
    // حذف من المخزون
    var idx=DB.cards.findIndex(function(x){return x.id===c.id});
    if(idx>=0)DB.cards.splice(idx,1);
    
    // أضف الرقم لمجموعة المباع لتجنب التكرار في نفس الدفعة
    soldNumbers.add(r.number);
    matched++;
  });
  
  saveDB();
  if(matched>0)logA('استيراد مبيعات',matched+' كرت');
  return{matched:matched,updated:updated,duplicates:duplicates};
}

function rSL(){
  var types=CT();
  var totalSold=DB.sales.length;
  var totalAmount=DB.sales.reduce(function(s,x){return s+(x.amount||0)},0);
  var thCols='';
  types.forEach(function(t){
    thCols+='<th colspan="3" style="background:'+t.color+';color:#fff;text-align:center;padding:6px 2px;font-size:9px">'+t.name+'</th>';
  });
  var subTh='';
  types.forEach(function(){
    subTh+='<th style="font-size:8px;padding:4px 2px;text-align:center;color:var(--gold)">وُزّع</th>';
    subTh+='<th style="font-size:8px;padding:4px 2px;text-align:center;color:var(--green)">بِيع</th>';
    subTh+='<th style="font-size:8px;padding:4px 2px;text-align:center;color:var(--orange)">الباقي</th>';
  });
  var rows='';
  var grandDist={},grandSold={},grandRem={};
  types.forEach(function(t){grandDist[t.id]=0;grandSold[t.id]=0;grandRem[t.id]=0});
  DB.branches.forEach(function(b){
    var cells='';
    types.forEach(function(t){
      var inBranch=DB.cards.filter(function(c){return c.branchId===b.id&&c.status==='distributed'&&c.type===t.id}).length;
      var sold=DB.archive.filter(function(a){return a.branchId===b.id&&a.type===t.id}).length;
      var totalDist=inBranch+sold;
      var remaining=inBranch;
      grandDist[t.id]+=totalDist;
      grandSold[t.id]+=sold;
      grandRem[t.id]+=remaining;
      cells+='<td style="text-align:center;font-weight:700;color:var(--gold);font-size:11px">'+totalDist+'</td>';
      cells+='<td style="text-align:center;font-weight:700;color:var(--green);font-size:11px">'+sold+'</td>';
      cells+='<td style="text-align:center;font-weight:700;color:'+(remaining>0?'var(--orange)':'var(--t3)')+';font-size:11px">'+remaining+'</td>';
    });
    rows+='<tr><td style="font-weight:700;font-size:11px;padding:8px 6px;white-space:nowrap">'+esc(b.name)+'</td>'+cells+'</tr>';
  });
  var totalCells='';
  types.forEach(function(t){
    totalCells+='<td style="text-align:center;font-weight:900;color:var(--gold);font-size:12px;background:rgba(234,179,8,.08)">'+grandDist[t.id]+'</td>';
    totalCells+='<td style="text-align:center;font-weight:900;color:var(--green);font-size:12px;background:rgba(34,197,94,.08)">'+grandSold[t.id]+'</td>';
    totalCells+='<td style="text-align:center;font-weight:900;color:var(--orange);font-size:12px;background:rgba(249,115,22,.08)">'+grandRem[t.id]+'</td>';
  });
  $('sc2').innerHTML=
    '<div class="g2 mb3">'+
      '<div class="kc" style="--kc:var(--green)"><div class="kv tgr">'+fmt(totalSold)+'</div><div class="kl">كروت مباعة</div></div>'+
      '<div class="kc" style="--kc:var(--gold)"><div class="kv tg">'+fmt(totalAmount)+'</div><div class="kl">إجمالي المبيعات (﷼)</div></div>'+
    '</div>'+
    '<div class="st"><i data-lucide="table"></i> سجل المبيعات حسب الفروع <span class="gl"></span></div>'+
    '<div class="tw" style="max-height:450px">'+
      '<table class="tb" style="min-width:'+(200+types.length*180)+'px">'+
        '<thead>'+
          '<tr><th rowspan="2" style="padding:6px;text-align:right;font-size:10px;position:sticky;left:0;background:var(--bgi);z-index:2">الفرع</th>'+thCols+'</tr>'+
          '<tr>'+subTh+'</tr>'+
        '</thead>'+
        '<tbody>'+
          (rows||'<tr><td colspan="'+(1+types.length*3)+'" class="tc tmut" style="padding:20px">لا توجد فروع</td></tr>')+
          '<tr style="border-top:2px solid var(--gold)"><td style="font-weight:900;font-size:11px;padding:8px 6px;color:var(--gold);position:sticky;left:0;background:var(--bgi)">الإجمالي</td>'+totalCells+'</tr>'+
        '</tbody>'+
      '</table>'+
    '</div>';
  ri();
}
function rArch(){const f=DB.archive.slice(-100).reverse();$('sc2').innerHTML=`<div class="tmut mb2" style="font-size:10px">آخر 100 من ${fmt(DB.archive.length)}</div><div class="tw" style="max-height:350px"><table class="tb"><thead><tr><th>الكرت</th><th>النوع</th><th>السعر</th><th>الفرع</th><th>الجهاز</th><th>MAC</th><th>البيانات</th></tr></thead><tbody>${f.map(a=>{const br=DB.branches.find(b=>b.id===a.branchId);const d=a.dataUsed?(a.dataUsed>=1024?`${(a.dataUsed/1024).toFixed(1)} GB`:`${a.dataUsed} MB`):'-';return`<tr style="border-right:3px solid ${tColor(a.type)}"><td style="font-family:monospace">${esc(a.number)}</td><td style="color:${tColor(a.type)};font-weight:600">${tName(a.type)}</td><td class="tg">${a.price||price(a.type)}﷼</td><td>${br?esc(br.name):'-'}</td><td>${a.device||'-'}</td><td class="mc" onclick="copy('${a.macAddress||''}')">${a.macAddress||'-'}</td><td class="tbl">${d}</td></tr>`}).join('')}</tbody></table></div>`}
function r10D(){const devs={};const dates=[];const today=new Date();for(let i=9;i>=0;i--){const d=new Date(today);d.setDate(d.getDate()-i);dates.push(d.toISOString().split('T')[0])}
DB.sales.forEach(s=>{if(!s.device)return;if(!devs[s.device])devs[s.device]={};const sd=new Date(s.date).toISOString().split('T')[0];devs[s.device][sd]=(devs[s.device][sd]||0)+1});
const dl=Object.keys(devs).sort((a,b)=>{const tA=dates.reduce((s,d)=>s+(devs[a][d]||0),0);const tB=dates.reduce((s,d)=>s+(devs[b][d]||0),0);return tB-tA});
const grandTotal=dl.reduce((s,dev)=>dates.reduce((x,d)=>x+(devs[dev][d]||0),s),0);
const cumulative={};DB.sales.forEach(s=>{if(!s.device)return;cumulative[s.device]=(cumulative[s.device]||0)+1});
$('sc2').innerHTML=`<div class="st"><i data-lucide="calendar"></i> آخر 10 أيام <span class="gl"></span> <span class="tg" style="font-size:9px">إجمالي: ${grandTotal}</span></div><div class="tw"><table class="tb"><thead><tr><th>الجهاز</th>${dates.map(d=>`<th>${d.slice(5)}</th>`).join('')}<th class="tg">10 أيام</th><th class="tbl">تراكمي</th></tr></thead><tbody>${!dl.length?'<tr><td colspan="13" class="tc tmut" style="padding:14px">لا توجد بيانات</td></tr>':dl.map(dev=>{const total=dates.reduce((s,d)=>s+(devs[dev][d]||0),0);const cum=cumulative[dev]||total;return`<tr><td style="font-weight:600">${esc(dev)}</td>${dates.map(d=>{const v=devs[dev][d]||0;return`<td style="${v?'color:var(--green);font-weight:700':''}">${v||'-'}</td>`}).join('')}<td class="tg" style="font-weight:700">${total}</td><td class="tbl" style="font-weight:700">${cum}</td></tr>`}).join('')}</tbody></table></div>`;ri()}

// ===== التقارير (مع ميزان المراجعة والتدفق النقدي) =====
function rRep(){
  const rev=DB.sales.reduce((s,x)=>s+(x.amount||0),0);
  const costS=DB.archive.reduce((s,c)=>s+cost(c.type),0);
  const exp=DB.expenses.reduce((s,e)=>s+(e.amount||0),0);
  const rent=(DB.settings?.rent||0);
  const profit=rev-costS-exp-rent;

  // ✅ إصلاح 6: ميزان المراجعة
  const totalInventoryValue=DB.cards.filter(c=>c.status==='available').reduce((s,c)=>s+price(c.type),0);
  const totalDistValue=DB.cards.filter(c=>c.status==='distributed').reduce((s,c)=>s+price(c.type),0);
  const totalDebt=DB.distributions.reduce((s,d)=>s+(d.remaining||0),0);
  const totalCollected=DB.distributions.reduce((s,d)=>s+(d.paid||0),0)+DB.sales.reduce((s,x)=>s+(x.amount||0),0);
  const totalRefunds=(DB.refunds||[]).reduce((s,r)=>s+(r.amount||0),0);
  const netCash=totalCollected-totalRefunds-exp-rent;

  // ✅ إصلاح 7: تقرير التدفق النقدي (آخر 30 يوم)
  const now=new Date();const cashFlowDays=[];
  for(let i=29;i>=0;i--){const d=new Date(now);d.setDate(d.getDate()-i);cashFlowDays.push(d.toISOString().split('T')[0])}
  const dailyIn={},dailyOut={};
  cashFlowDays.forEach(d=>{dailyIn[d]=0;dailyOut[d]=0});
  DB.sales.forEach(s=>{const d=new Date(s.date).toISOString().split('T')[0];if(dailyIn[d]!==undefined)dailyIn[d]+=(s.amount||0)});
  DB.distributions.forEach(d=>{const dt=new Date(d.date).toISOString().split('T')[0];if(dailyIn[dt]!==undefined)dailyIn[dt]+=(d.paid||0)});
  DB.expenses.forEach(e=>{const dt=new Date(e.date).toISOString().split('T')[0];if(dailyOut[dt]!==undefined)dailyOut[dt]+=(e.amount||0)});
  DB.refunds.forEach(r=>{const dt=new Date(r.date).toISOString().split('T')[0];if(dailyOut[dt]!==undefined)dailyOut[dt]+=(r.amount||0)});

  let cfRows='';let cfInTotal=0,cfOutTotal=0;
  cashFlowDays.forEach(d=>{
    const inn=dailyIn[d]||0;const out=dailyOut[d]||0;const net=inn-out;
    cfInTotal+=inn;cfOutTotal+=out;
    cfRows+=`<tr><td style="font-size:10px">${d.slice(5)}</td><td class="tgr">${inn>0?fmt(Math.round(inn)):'-'}</td><td class="tr">${out>0?fmt(Math.round(out)):'-'}</td><td style="font-weight:700;color:${net>=0?'var(--green)':'var(--red)'}">${net!==0?fmt(Math.round(net)):'0'}</td></tr>`;
  });

  let ta=CT().map(t=>{
    const sold=DB.archive.filter(a=>a.type===t.id).length;
    const rv=DB.sales.filter(s=>s.type===t.id).reduce((x,y)=>x+(y.amount||0),0);
    const cs=sold*t.cost;
    const pf=rv-cs;
    return`<div class="pi"><div style="display:flex;align-items:center;gap:6px;margin-bottom:5px"><span style="padding:2px 7px;border-radius:4px;font-size:10px;font-weight:700;background:${t.color};color:#fff">${t.name}</span></div><div class="pg2"><div class="ps"><div class="pv tgr">${fmt(rv)}</div><div class="pl">المبيعات</div></div><div class="ps"><div class="pv tr">${fmt(Math.round(cs))}</div><div class="pl">التكلفة</div></div><div class="ps"><div class="pv tg">${fmt(Math.round(pf))}</div><div class="pl">الربح</div></div><div class="ps"><div class="pv tbl">${sold>0?(pf/sold).toFixed(1):0}</div><div class="pl">ربحية</div></div></div></div>`
  }).join('');
  
  let el=DB.expenses.map((e,i)=>`<div class="ei"><span class="ed">${esc(e.description)}${e.type==='badDebt'?' <span style="color:var(--purple);font-size:9px">(دين معدوم)</span>':''}${e.type==='refund'?' <span style="color:var(--blue);font-size:9px">(استرداد)</span>':''}</span><span class="ea">${fmt(e.amount)}﷼</span><button class="btn bd bsm" style="padding:2px 4px" onclick="reqPW(()=>{const edesc=DB.expenses[${i}]?.description||'';DB.expenses.splice(${i},1);saveDB();rRep();logA('حذف مصروف',edesc);toast('تم الحذف','ts')})">×</button></div>`).join('');

  $('pg-rep').innerHTML=`
<!-- بطاقات الملخص -->
<div class="g2 mb3">
  <div class="kc" style="--kc:var(--green)"><div class="kv tgr">${fmt(rev)}</div><div class="kl">الإيرادات</div></div>
  <div class="kc" style="--kc:var(--red)"><div class="kv tr">${fmt(Math.round(costS+exp+rent))}</div><div class="kl">التكاليف الكلية</div></div>
</div>
<div class="big-stat"><div class="bv ${profit>=0?'tgr':'tr'}">${fmt(Math.round(profit))} ﷼</div><div class="bl2">صافي الأرباح${rent>0?' (بعد خصم الإيجار '+fmt(rent)+'﷼)':''}</div></div>

<!-- ✅ ميزان المراجعة -->
<div class="card" style="border-color:rgba(59,130,246,.2);padding:12px">
  <div class="st" style="color:var(--blue);margin-bottom:8px"><i data-lucide="scale"></i> 📊 ميزان المراجعة <span class="gl"></span></div>
  <div class="g2" style="font-size:11px;gap:6px">
    <div style="background:var(--bgi);padding:8px;border-radius:8px"><div class="tmut" style="font-size:8px">قيمة المخزون</div><div style="font-weight:700;color:var(--gold);font-size:15px">${fmt(totalInventoryValue)}﷼</div></div>
    <div style="background:var(--bgi);padding:8px;border-radius:8px"><div class="tmut" style="font-size:8px">الموزع للفروع</div><div style="font-weight:700;color:var(--orange);font-size:15px">${fmt(totalDistValue)}﷼</div></div>
    <div style="background:var(--bgi);padding:8px;border-radius:8px"><div class="tmut" style="font-size:8px">الديون المستحقة</div><div style="font-weight:700;color:var(--red);font-size:15px">${fmt(Math.round(totalDebt))}﷼</div></div>
    <div style="background:var(--bgi);padding:8px;border-radius:8px"><div class="tmut" style="font-size:8px">صافي النقدية</div><div style="font-weight:700;color:${netCash>=0?'var(--green)':'var(--red)'};font-size:15px">${fmt(Math.round(netCash))}﷼</div></div>
  </div>
  <div style="margin-top:8px;font-size:9px;color:var(--t3)">المتحصلات: ${fmt(Math.round(totalCollected))}﷼ | المستردات: ${fmt(Math.round(totalRefunds))}﷼ | المصروفات: ${fmt(Math.round(exp+rent))}﷼</div>
</div>

<!-- ✅ تقرير التدفق النقدي -->
<div class="card" style="border-color:rgba(34,197,94,.2);padding:12px">
  <div class="st" style="color:var(--green);margin-bottom:8px"><i data-lucide="trending-up"></i> 💵 التدفق النقدي (30 يوم) <span class="gl"></span></div>
  <div class="g2 mb2" style="font-size:10px">
    <div class="tc" style="background:var(--bgi);padding:6px;border-radius:6px"><span class="tgr">+${fmt(Math.round(cfInTotal))}﷼</span> <span class="tmut">داخل</span></div>
    <div class="tc" style="background:var(--bgi);padding:6px;border-radius:6px"><span class="tr">-${fmt(Math.round(cfOutTotal))}﷼</span> <span class="tmut">خارج</span></div>
  </div>
  <div class="tw" style="max-height:300px">
    <table class="tb" style="min-width:250px">
      <thead><tr><th>اليوم</th><th class="tgr">داخل</th><th class="tr">خارج</th><th>الصافي</th></tr></thead>
      <tbody>${cfRows}</tbody>
      <tfoot><tr style="border-top:2px solid var(--gold);font-weight:900"><td>الإجمالي</td><td class="tgr">${fmt(Math.round(cfInTotal))}</td><td class="tr">${fmt(Math.round(cfOutTotal))}</td><td style="color:${cfInTotal-cfOutTotal>=0?'var(--green)':'var(--red)'}">${fmt(Math.round(cfInTotal-cfOutTotal))}</td></tr></tfoot>
    </table>
  </div>
</div>

<!-- تحليل الأرباح حسب النوع -->
<div class="st"><i data-lucide="trending-up"></i> تحليل الأرباح حسب النوع</div>${ta}

<!-- المصروفات -->
<div class="st"><i data-lucide="wallet"></i> المصروفات</div>${el||'<div class="tc tmut" style="padding:12px;font-size:11px">لا توجد مصروفات</div>'}
<div class="g2 mt3"><input type="text" id="exp-d" class="inp" placeholder="وصف المصروف"><div class="flex gap2"><input type="number" id="exp-a" class="inp" placeholder="المبلغ" style="flex:1"><button class="btn bw" onclick="addExp()"><i data-lucide="plus"></i></button></div></div>`;
  ri();
}
function addExp(){const d=$('exp-d')?.value?.trim();const a=parseFloat($('exp-a')?.value)||0;if(!d||a<=0)return toast('أدخل البيانات','te');DB.expenses.push({id:uid(),description:d,amount:a,date:new Date().toISOString()});saveDB();rRep();logA('إضافة مصروف',d+' - '+a+'﷼');toast('تمت الإضافة','ts')}

// ===== الإعدادات =====
function rSet(){
const lines=DB.internetLines||[];const cpg=DB.settings?.costPerGB||(60000/700);const tGB=lines.reduce((s,l)=>s+l.remainingGB,0);
let linesH=`<div class="g3 mb2"><div class="kc" style="padding:5px;--kc:var(--blue)"><div class="kv tbl" style="font-size:13px">${lines.length}</div><div class="kl">خطوط</div></div><div class="kc" style="padding:5px;--kc:var(--green)"><div class="kv tgr" style="font-size:13px">${tGB.toFixed(1)}GB</div><div class="kl">رصيد</div></div><div class="kc" style="padding:5px;--kc:var(--gold)"><div class="kv tg" style="font-size:13px">${fmt(Math.round(tGB*cpg))}﷼</div><div class="kl">قيمة</div></div></div>`;
if(!lines.length)linesH+='<div class="tc tmut" style="padding:14px;font-size:11px">لا توجد خطوط</div>';
else lines.forEach(ln=>{const val=ln.remainingGB*cpg;const dl=ln.expiryDate?Math.ceil((new Date(ln.expiryDate)-new Date())/(864e5)):null;let dt=dl!==null?`${dl} يوم`:'-';let dc=dl!==null?(dl<=3?'var(--red)':dl<=10?'var(--gold)':'var(--green)'):'var(--t3)';const pct=Math.min((ln.remainingGB/700)*100,100);const pc=pct>50?'var(--green)':pct>20?'var(--gold)':'var(--red)';
linesH+=`<div class="lc"><div class="lh"><div class="ln"><i data-lucide="wifi" style="width:13px;height:13px;color:var(--gold)"></i> ${esc(ln.name)}</div><div class="flex gap2"><button class="btn bp bsm" onclick="openRech('${ln.id}')"><i data-lucide="refresh-ccw"></i></button><button class="btn bd bsm" onclick="reqPW(()=>delLine('${ln.id}'))"><i data-lucide="trash-2"></i></button></div></div><div class="ls"><div class="lsi"><div class="sl2">الرصيد</div><div class="sv2 tgr">${ln.remainingGB.toFixed(2)}GB</div></div><div class="lsi"><div class="sl2">القيمة</div><div class="sv2 tg">${fmt(Math.round(val))}﷼</div></div><div class="lsi"><div class="sl2">الصلاحية</div><div class="sv2" style="color:${dc}">${dt}</div></div></div><div class="lp"><div style="width:${pct}%;background:${pc}"></div></div></div>`});
linesH+=`<button class="btn bp bb mt2b" onclick="openAddLine()"><i data-lucide="plus"></i> إضافة خط</button>`;
const types=CT();
let typesH=types.map((t,i)=>`<div class="lc" style="border-right:3px solid ${t.color}"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><strong style="color:${t.color};font-size:13px">${t.name}</strong><div class="flex gap2"><button class="btn bp bsm" onclick="openEditCardType(${i})"><i data-lucide="pencil"></i></button><button class="btn bd bsm" onclick="reqPW(()=>delCardType(${i}))"><i data-lucide="trash-2"></i></button></div></div><div class="g4" style="font-size:10px;gap:6px"><div><div class="tmut" style="font-size:8px">البادئة</div><div style="font-weight:700">${t.prefix}</div></div><div><div class="tmut" style="font-size:8px">السعر</div><div style="font-weight:700;color:var(--green)">${t.price}﷼</div></div><div><div class="tmut" style="font-size:8px">التكلفة</div><div style="font-weight:700;color:var(--orange)">${t.cost}﷼</div></div><div><div class="tmut" style="font-size:8px">اللون</div><div style="width:18px;height:18px;border-radius:50%;background:${t.color};display:inline-block;border:2px solid rgba(255,255,255,.15)"></div></div></div></div>`).join('');
$('pg-set').innerHTML=`
<div class="card"><div class="st mb3"><i data-lucide="database"></i> النسخ الاحتياطي</div><div class="g2"><button class="btn bp" onclick="expBackup()"><i data-lucide="download"></i> تصدير</button><button class="btn bh" onclick="$('bk-file').click()"><i data-lucide="upload"></i> استيراد</button><input type="file" id="bk-file" accept=".json" onchange="impBackup(this.files)" hidden></div></div>
<div class="card"><div class="st" style="color:var(--gold)"><i data-lucide="wifi"></i> 📡 خطوط الإنترنت</div>${linesH}</div>
<div class="card"><div class="st" style="color:var(--gold)"><i data-lucide="credit-card"></i> أنواع الكروت <span class="gl"></span></div>${typesH}<button class="btn bp bb mt2b" onclick="openAddCardType()"><i data-lucide="plus"></i> إضافة نوع كرت جديد</button></div>
<div class="card"><div class="st" style="color:var(--gold)"><i data-lucide="settings"></i> الإعدادات العامة</div>
<div class="g2 mb2"><div><div class="lbl">سعر الجيجا (﷼)</div><input type="number" id="s-cpg" class="inp" value="${(DB.settings?.costPerGB||85.71).toFixed(2)}" step="0.01" style="font-size:11px"></div><div><div class="lbl">الإيجار الشهري (﷼)</div><input type="number" id="s-rent" class="inp" value="${DB.settings?.rent||0}" style="font-size:11px"></div></div>
<button class="btn bs bb" onclick="saveSett()"><i data-lucide="save"></i> حفظ</button></div>
<div class="card" style="border-color:rgba(234,179,8,.2)"><div class="st" style="color:var(--gold)"><i data-lucide="lock"></i> 🔐 الأمان</div><p class="tmut mb2" style="font-size:10px">كلمة المرور محفوظة بتشفير SHA-256 في المتصفح.</p><button class="btn bw bb" onclick="openChangePW()"><i data-lucide="key"></i> تغيير كلمة المرور</button></div>
<div class="card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px"><div class="st mb-0" style="color:var(--gold);margin-bottom:0"><i data-lucide="clipboard-list"></i> سجل العمليات</div><button class="btn bd bsm" onclick="reqPW(()=>{DB.activityLog=[];saveDB();rSet();toast('تم المسح','ts')})"><i data-lucide="trash-2"></i></button></div><div id="act-log" style="max-height:250px;overflow-y:auto"></div></div>
<div class="card" style="border-color:rgba(239,68,68,.15)"><div class="st mb3" style="color:var(--red)"><i data-lucide="alert-triangle"></i> منطقة خطرة</div><div style="display:flex;flex-direction:column;gap:5px"><button class="btn bd bb" onclick="reqPW(()=>clearD('cards'))"><i data-lucide="trash-2"></i> مسح المخزون</button><button class="btn bd bb" onclick="reqPW(()=>clearD('sales'))"><i data-lucide="trash-2"></i> مسح المبيعات</button><button class="btn bd bb" onclick="reqPW(()=>clearD('all'))"><i data-lucide="trash-2"></i> مسح الكل</button></div></div>
<div class="tc tmut mt3" style="font-size:9px">نظام إدارة كروت الإنترنت v${V}</div>`;
const logs=(DB.activityLog||[]).slice().sort((a,b)=>new Date(b.ts)-new Date(a.ts)).slice(0,50);
$('act-log').innerHTML=logs.length?logs.map(l=>{
  const d=new Date(l.ts);
  const dateStr=d.toLocaleDateString('ar-SA');
  const timeStr=d.toLocaleTimeString('ar-SA',{hour:'2-digit',minute:'2-digit'});
  return `<div class="ai" style="border-right-color:var(--gold)"><div style="flex:1;min-width:0"><span style="font-size:10px;font-weight:700;color:var(--gold)">${l.action}</span> <span class="tmut" style="font-size:9px">${l.details||''}</span></div><span class="tmut" style="font-size:8px;white-space:nowrap">${timeStr} · ${dateStr}</span></div>`
}).join(''):'<div class="tc tmut" style="padding:14px;font-size:10px">لا توجد عمليات مسجلة</div>';
ri()}

// دوال خطوط الإنترنت
function openAddLine(){openModal(`<div class="mh"><span class="mt2">📡 إضافة خط</span><button class="mx" onclick="closeModal()"><i data-lucide="x"></i></button></div><div class="lbl">اسم الخط</div><input type="text" id="ln-name" class="inp mb2" placeholder="STC-1"><div class="g2 mb3"><div><div class="lbl">الرصيد (GB)</div><input type="number" id="ln-bal" class="inp" value="700"></div><div><div class="lbl">الصلاحية (أيام)</div><input type="number" id="ln-days" class="inp" value="30"></div></div><button class="btn bg bb" onclick="addLine()">إضافة</button>`)}
function addLine(){const n=$('ln-name')?.value?.trim();const b=parseFloat($('ln-bal')?.value)||0;const d=parseInt($('ln-days')?.value)||30;if(!n||b<=0)return toast('أدخل البيانات','te');const exp=new Date();exp.setDate(exp.getDate()+d);DB.internetLines.push({id:uid(),name:n,remainingGB:b,expiryDate:exp.toISOString(),lastRecharge:new Date().toISOString()});const c=b*(DB.settings?.costPerGB||(60000/700));DB.expenses.push({id:uid(),description:`شراء خط ${n} (${b} GB)`,amount:c,date:new Date().toISOString()});saveDB();closeModal();rSet();logA('إضافة خط',n);toast('تم الإضافة','ts')}
function openRech(id){const ln=DB.internetLines.find(l=>l.id===id);if(!ln)return;const dl=ln.expiryDate?Math.ceil((new Date(ln.expiryDate)-new Date())/(864e5)):null;openModal(`<div class="mh"><span class="mt2">📡 تسديد: ${esc(ln.name)}</span><button class="mx" onclick="closeModal()"><i data-lucide="x"></i></button></div><div class="g2 mb3" style="background:var(--bgi);padding:8px;border-radius:7px"><div class="tc"><div style="font-size:7px;color:var(--t3)">الرصيد</div><div style="font-weight:700;color:var(--green)">${ln.remainingGB.toFixed(2)} GB</div></div><div class="tc"><div style="font-size:7px;color:var(--t3)">الصلاحية</div><div style="font-weight:700;color:var(--gold)">${dl!==null?dl+' يوم':'-'}</div></div></div><div class="lbl">القيمة (﷼)</div><input type="number" id="rc-cost" class="inp mb2" value="60000"><div class="lbl">البيانات (GB)</div><input type="number" id="rc-data" class="inp mb2" value="700"><div class="lbl">تمديد (أيام)</div><input type="number" id="rc-days" class="inp mb3" value="30"><div class="g3 mb3">${[[30000,350],[60000,700],[120000,1400]].map(([c,d])=>`<div class="ro ${c===60000?'active':''}" onclick="$('rc-cost').value=${c};$('rc-data').value=${d}"><div class="od">${d}</div><div class="ol">GB</div><div class="op">${fmt(c)}﷼</div></div>`).join('')}</div><button class="btn bg bb" onclick="rechLine('${id}')">تأكيد التسديد</button>`)}
function rechLine(id){const c=parseFloat($('rc-cost')?.value)||0;const d=parseFloat($('rc-data')?.value)||0;const dy=parseInt($('rc-days')?.value)||30;if(c<=0||d<=0)return toast('أدخل قيماً صحيحة','te');const ln=DB.internetLines.find(l=>l.id===id);if(!ln)return;ln.remainingGB+=d;const exp=new Date(ln.expiryDate||new Date());exp.setDate(exp.getDate()+dy);ln.expiryDate=exp.toISOString();ln.lastRecharge=new Date().toISOString();DB.expenses.push({id:uid(),description:`تسديد ${ln.name} (${d} GB + ${dy} يوم)`,amount:c,date:new Date().toISOString()});saveDB();closeModal();rSet();logA('تسديد خط',`${ln.name}: ${d} GB`);toast(`تم تسديد ${d} GB`,'ts')}
function delLine(id){const ln=DB.internetLines.find(l=>l.id===id);DB.internetLines=DB.internetLines.filter(l=>l.id!==id);saveDB();rSet();logA('حذف خط',ln?.name||'');toast(`تم الحذف`,'ts')}

// دوال إعدادات أنواع الكروت
function openAddCardType(){openModal(`<div class="mh"><span class="mt2">➕ إضافة نوع كرت</span><button class="mx" onclick="closeModal()"><i data-lucide="x"></i></button></div>
<div class="g2 mb2"><div><div class="lbl">المعرف (رقم)</div><input type="text" id="ct-id" class="inp" placeholder="500"></div><div><div class="lbl">الاسم</div><input type="text" id="ct-name" class="inp" placeholder="أبو 500"></div></div>
<div class="g2 mb2"><div><div class="lbl">بادئة الرقم</div><input type="text" id="ct-prefix" class="inp" placeholder="65" maxlength="3"></div><div><div class="lbl">اللون</div><input type="color" id="ct-color" class="inp" value="#eab308" style="padding:3px;height:36px"></div></div>
<div class="g3 mb3"><div><div class="lbl">سعر البيع</div><input type="number" id="ct-price" class="inp" placeholder="450"></div><div><div class="lbl">التكلفة</div><input type="number" id="ct-cost" class="inp" placeholder="150"></div><div><div class="lbl">البيانات (MB)</div><input type="number" id="ct-data" class="inp" placeholder="2000"></div></div>
<button class="btn bg bb" onclick="addCardType()">إضافة</button>`)}
function addCardType(){const id=$('ct-id')?.value?.trim();const name=$('ct-name')?.value?.trim();const prefix=$('ct-prefix')?.value?.trim();const color=$('ct-color')?.value||'#94a3b8';const pr=parseFloat($('ct-price')?.value)||0;const co=parseFloat($('ct-cost')?.value)||0;const dm=parseInt($('ct-data')?.value)||0;
if(!id||!name||!prefix||pr<=0)return toast('أكمل البيانات','te');
const rgb=hexToRgb(color);
ensureDB();DB.settings.cardTypes.push({id,name,prefix,price:pr,cost:co,color,rgb,digits:10,serialDigits:6,dataMB:dm});saveDB();closeModal();rSet();logA('إضافة نوع كرت',name);toast('تم الإضافة','ts')}
function delCardType(i){ensureDB();const t=DB.settings.cardTypes[i];DB.settings.cardTypes.splice(i,1);saveDB();rSet();logA('حذف نوع كرت',t?.name||'');toast('تم الحذف','ts')}
function openEditCardType(i){
  ensureDB();
  var t=DB.settings.cardTypes[i];
  if(!t)return toast('النوع غير موجود','te');
  openModal(
    '<div class="mh"><span class="mt2">✏️ تعديل: '+esc(t.name)+'</span><button class="mx" onclick="closeModal()"><i data-lucide="x"></i></button></div>'+
    '<div class="g2 mb2"><div><div class="lbl">المعرف</div><input type="text" id="et-id" class="inp" value="'+esc(t.id)+'"></div><div><div class="lbl">الاسم</div><input type="text" id="et-name" class="inp" value="'+esc(t.name)+'"></div></div>'+
    '<div class="g2 mb2"><div><div class="lbl">بادئة الرقم</div><input type="text" id="et-prefix" class="inp" value="'+esc(t.prefix)+'" maxlength="3"></div><div><div class="lbl">اللون</div><input type="color" id="et-color" class="inp" value="'+(t.color||'#94a3b8')+'" style="padding:3px;height:40px"></div></div>'+
    '<div class="g3 mb3"><div><div class="lbl">سعر البيع (﷼)</div><input type="number" id="et-price" class="inp" value="'+(t.price||0)+'"></div><div><div class="lbl">التكلفة (﷼)</div><input type="number" id="et-cost" class="inp" value="'+(t.cost||0)+'"></div><div><div class="lbl">البيانات (MB)</div><input type="number" id="et-data" class="inp" value="'+(t.dataMB||0)+'"></div></div>'+
    '<button class="btn bg bb" onclick="saveEditCardType('+i+')"><i data-lucide="save"></i> حفظ التعديلات</button>'
  );
}
function saveEditCardType(i){
  ensureDB();
  var t=DB.settings.cardTypes[i];
  if(!t)return;
  var id=$('et-id')?.value?.trim();
  var name=$('et-name')?.value?.trim();
  var prefix=$('et-prefix')?.value?.trim();
  var color=$('et-color')?.value||'#94a3b8';
  var pr=parseFloat($('et-price')?.value)||0;
  var co=parseFloat($('et-cost')?.value)||0;
  var dm=parseInt($('et-data')?.value)||0;
  if(!id||!name||!prefix||pr<=0)return toast('أكمل البيانات','te');
  t.id=id; t.name=name; t.prefix=prefix; t.color=color; t.rgb=hexToRgb(color);
  t.price=pr; t.cost=co; t.dataMB=dm;
  saveDB(); closeModal(); rSet();
  logA('تعديل نوع كرت',name);
  toast('تم حفظ التعديلات','ts');
}
function hexToRgb(hex){const r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);return r?`${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}`:'148,163,184'}
function saveSett(){const cpg=parseFloat($('s-cpg')?.value)||85.71;const rent=parseFloat($('s-rent')?.value)||0;DB.settings.costPerGB=cpg;DB.settings.rent=rent;saveDB();toast('تم الحفظ','ts');logA('حفظ إعدادات','سعر الجيجا: '+cpg.toFixed(2)+'﷼ | إيجار: '+rent+'﷼')}

function expBackup(){const b=new Blob([JSON.stringify(DB,null,2)],{type:'application/json'});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download=`backup_${new Date().toISOString().split('T')[0]}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(u),2000);logA('تصدير نسخة','backup_'+new Date().toISOString().split('T')[0]+'.json');toast('تم التصدير','ts')}
function impBackup(files){if(!files?.length)return;reqPW(()=>{const r=new FileReader();r.onload=async e=>{try{const d=JSON.parse(e.target.result);if(!d.cards)return toast('ملف غير صالح','te');const oldHash=DB?.settings?.passwordHash;DB={...defDB(),...d};ensureDB();if(oldHash)DB.settings.passwordHash=oldHash;await saveDB();logA('استيراد نسخة','تم استيراد نسخة احتياطية');toast('تم الاستيراد','ts');nav('home')}catch{toast('خطأ','te')}};r.readAsText(files[0])})}
function clearD(scope){const map={'cards':'المخزون','sales':'المبيعات','all':'الكل'};const label=map[scope]||scope;if(scope==='cards')DB.cards=[];else if(scope==='sales'){DB.sales=[];DB.archive=[]}else DB=defDB();ensureDB();saveDB();nav('home');logA('مسح بيانات',label);toast('تم المسح','ts')}

// ===== التهيئة =====
async function init(){
  await loadDB();
  if(!hasPW()){
    openSetupPW();
    return;
  }
  finishInit();
}
function finishInit(){
  document.querySelectorAll('.ni').forEach(item=>{item.addEventListener('click',()=>{const p=item.dataset.p;if(p)nav(p)})});
  document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='f'){e.preventDefault();openSearch()}});
  nav('home');
  console.log(`✅ WiFi Cards v${V} | Cards: ${DB.cards.length} | Branches: ${DB.branches.length}`);
}

// ===== إعداد وتغيير كلمة المرور =====
function openSetupPW(){
  openModal(`<div class="mh"><span class="mt2">🔐 إعداد كلمة المرور</span></div><p class="tmut mb3" style="font-size:12px">هذا أول استخدام. اضبط كلمة مرور لحماية بياناتك.</p><div class="lbl">كلمة المرور الجديدة</div><input type="password" id="spw1" class="inp mb2" placeholder="••••••"><div class="lbl">تأكيد كلمة المرور</div><input type="password" id="spw2" class="inp mb3" placeholder="••••••" onkeydown="if(event.key==='Enter')saveSetupPW()"><button class="btn bg bb" onclick="saveSetupPW()">حفظ</button>`);
  setTimeout(()=>$('spw1')?.focus(),200);
}
async function saveSetupPW(){
  const p1=$('spw1')?.value||'';
  const p2=$('spw2')?.value||'';
  if(p1.length<4)return toast('كلمة المرور يجب أن تكون 4 أحرف على الأقل','te');
  if(p1!==p2)return toast('كلمتا المرور غير متطابقتين','te');
  ensureDB();
  DB.settings.passwordHash=await hashPW(p1);
  await saveDB();
  closeModal();
  logA('إعداد كلمة المرور','تم إعداد كلمة المرور لأول مرة');
  toast('✅ تم حفظ كلمة المرور','ts');
  finishInit();
}
function openChangePW(){
  openModal(`<div class="mh"><span class="mt2">🔐 تغيير كلمة المرور</span><button class="mx" onclick="closeModal()"><i data-lucide="x"></i></button></div><div class="lbl">كلمة المرور الحالية</div><input type="password" id="cpw-old" class="inp mb2" placeholder="••••••"><div class="lbl">كلمة المرور الجديدة</div><input type="password" id="cpw-new" class="inp mb2" placeholder="••••••"><div class="lbl">تأكيد الجديدة</div><input type="password" id="cpw-conf" class="inp mb3" placeholder="••••••" onkeydown="if(event.key==='Enter')saveChangePW()"><button class="btn bg bb" onclick="saveChangePW()">حفظ</button>`);
  setTimeout(()=>$('cpw-old')?.focus(),200);
}
async function saveChangePW(){
  const old=$('cpw-old')?.value||'';
  const nw=$('cpw-new')?.value||'';
  const conf=$('cpw-conf')?.value||'';
  if(!await verifyPW(old))return toast('كلمة المرور الحالية غير صحيحة','te');
  if(nw.length<4)return toast('الجديدة يجب أن تكون 4 أحرف على الأقل','te');
  if(nw!==conf)return toast('كلمتا المرور غير متطابقتين','te');
  ensureDB();
  DB.settings.passwordHash=await hashPW(nw);
  await saveDB();
  closeModal();
  logA('تغيير كلمة المرور','تم التغيير بنجاح');
  toast('✅ تم تغيير كلمة المرور','ts');
}

init();
</script>
</body>
</html>.ni.active svg{transform:scale(1.1)}
.ni:active{transform:scale(.93)}
.ni.nh{position:relative;margin-top:-20px}
.nhc{width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,var(--gold),var(--orange));display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(234,179,8,.45);margin-bottom:2px;transition:box-shadow .2s}
.ni.nh.active .nhc{box-shadow:0 4px 28px rgba(234,179,8,.6)}
.nhc svg{width:22px;height:22px;color:var(--bg)!important}
.card{background:var(--bg3);border-radius:var(--r);padding:14px;border:1px solid rgba(255,255,255,.05);margin-bottom:12px;transition:transform .2s,box-shadow .2s}
.st{font-size:13px;font-weight:700;color:var(--t2);margin-bottom:10px;display:flex;align-items:center;gap:7px}
.st svg{width:16px;height:16px}
.gl{flex:1;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:.3}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;padding:10px 16px;border-radius:var(--rs);border:none;font-size:12px;font-weight:600;cursor:pointer;transition:all .2s;font-family:inherit}
.btn:active{transform:scale(.96)}
.btn:hover{filter:brightness(1.1)}
.btn svg{width:15px;height:15px}
.bp{background:var(--blue);color:#fff}.bs{background:var(--green);color:#fff}.bd{background:var(--red);color:#fff}.bw{background:var(--orange);color:#fff}
.bg{background:linear-gradient(135deg,var(--gold),var(--orange));color:var(--bg);font-weight:700}.bh{background:rgba(255,255,255,.06);color:var(--t1)}
.bsm{padding:7px 10px;font-size:11px}.bsm svg{width:13px;height:13px}
.bb{width:100%}
.inp{width:100%;padding:11px 14px;border-radius:var(--rs);border:1px solid rgba(255,255,255,.1);background:var(--bgi);color:var(--t1);font-size:13px;font-family:inherit;transition:border-color .2s,box-shadow .2s}
.inp:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 3px rgba(234,179,8,.12)}
.inp::placeholder{color:var(--t3)}
.lbl{display:block;font-size:11px;color:var(--t2);margin-bottom:5px;font-weight:600}
.tabs{display:flex;gap:6px;margin-bottom:12px;overflow-x:auto;padding-bottom:2px}.tabs::-webkit-scrollbar{display:none}
.tab{padding:8px 16px;border-radius:20px;background:rgba(255,255,255,.05);color:var(--t3);font-size:12px;font-weight:600;cursor:pointer;white-space:nowrap;border:1px solid transparent;transition:all .2s}
.tab:hover{background:rgba(255,255,255,.08)}
.tab.active{background:linear-gradient(135deg,var(--gold),var(--orange));color:var(--bg);font-weight:700}
.fp{display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap}
.fp .f{padding:7px 14px;border-radius:18px;background:rgba(255,255,255,.05);color:var(--t2);font-size:11px;font-weight:600;cursor:pointer;border:1px solid transparent;display:flex;align-items:center;gap:4px;transition:all .2s}
.fp .f:hover{background:rgba(255,255,255,.08)}
.fp .f .c{background:rgba(255,255,255,.12);padding:2px 7px;border-radius:10px;font-size:10px}
.fp .f.active{border-color:var(--gold);color:var(--gold);background:rgba(234,179,8,.1)}
.fp .f.active .c{background:var(--gold);color:var(--bg)}
.cg{display:grid;grid-template-columns:repeat(4,1fr);gap:4px}
.ci{aspect-ratio:1;border-radius:8px;padding:4px;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;cursor:pointer;border:2px solid transparent;overflow:hidden;transition:all .15s}
.ci::before{content:'';position:absolute;inset:0;opacity:.15;border-radius:6px}
.ci:active{transform:scale(.94)}
.ci.s{border-color:var(--gold);box-shadow:0 0 12px rgba(234,179,8,.4)}
.ci .sn{font-size:7px;color:var(--gold);opacity:.85;position:relative;z-index:1;font-weight:600}
.ci .cn{font-size:8px;font-family:'SF Mono',monospace;position:relative;z-index:1;text-align:center;line-height:1.2;letter-spacing:.3px}
.ci .db{position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:var(--red);color:#fff;border:none;font-size:11px;cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s;z-index:2}
.ci:hover .db{opacity:1}
@media(hover:none){.ci .db{opacity:.7}}
.pager{display:flex;align-items:center;justify-content:center;gap:12px;padding:12px 0}
.pgb{width:36px;height:36px;border-radius:10px;border:1px solid rgba(255,255,255,.1);background:var(--bg2);color:var(--t1);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}
.pgb:not(:disabled):hover{border-color:var(--gold);color:var(--gold)}
.pgb:not(:disabled):active{transform:scale(.9)}
.pgb:disabled{opacity:.25;cursor:not-allowed}
.pgb svg{width:16px;height:16px}
.pgi{font-size:12px;font-weight:600;color:var(--t2);min-width:90px;text-align:center}
.pgi strong{color:var(--gold)}
.fdrop{border:2px dashed rgba(255,255,255,.15);border-radius:var(--r);padding:36px 16px;text-align:center;cursor:pointer;background:rgba(255,255,255,.02);transition:all .3s}
.fdrop:hover,.fdrop.drag{border-color:var(--gold);background:rgba(234,179,8,.06);transform:translateY(-2px)}
.fdrop svg{width:42px;height:42px;color:var(--gold);margin-bottom:10px}
.isg{display:grid;grid-template-columns:repeat(2,1fr);gap:6px;margin:10px 0}
.is{background:var(--bg3);border-radius:var(--rs);padding:10px;text-align:center;border:1px solid rgba(255,255,255,.04)}
.is .v{font-size:18px;font-weight:800}
.is .l{font-size:9px;color:var(--t3);margin-top:2px}
.bi{display:flex;align-items:center;gap:12px;background:var(--bg3);border-radius:var(--r);padding:12px;margin-bottom:8px;border:1px solid rgba(255,255,255,.05);cursor:pointer;transition:all .2s}
.bi:hover{border-color:rgba(234,179,8,.15);background:rgba(26,35,50,.8)}
.bi:active{transform:scale(.98)}
.ba{width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,var(--blue),var(--purple));display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#fff;flex-shrink:0}
.binfo{flex:1;min-width:0}
.bname{font-size:14px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.bmeta{font-size:10px;color:var(--t3);margin-top:2px}
.bss{display:flex;gap:4px}
.bs2{padding:4px 8px;border-radius:6px;font-size:11px;font-weight:700;min-width:30px;text-align:center}
.tw{overflow-x:auto;border-radius:var(--rs);border:1px solid rgba(255,255,255,.06);-webkit-overflow-scrolling:touch}
.tb{width:100%;font-size:10px;border-collapse:collapse;min-width:400px}
.tb th{background:var(--bgi);padding:9px 6px;text-align:right;font-weight:600;color:var(--t3);position:sticky;top:0;z-index:1;white-space:nowrap}
.tb td{padding:7px 6px;border-bottom:1px solid rgba(255,255,255,.04)}
.tb tr:hover{background:rgba(255,255,255,.02)}
.tb .mc{cursor:pointer;color:var(--purple);font-family:monospace}
.tb .mc:hover{text-decoration:underline}
.modal{position:fixed;inset:0;background:rgba(0,0,0,.85);backdrop-filter:blur(8px);z-index:200;display:flex;align-items:flex-end;justify-content:center;padding:12px;opacity:0;visibility:hidden;transition:all .3s}
.modal.show{opacity:1;visibility:visible}
.mc2{background:var(--bg2);border-radius:18px 18px 0 0;padding:20px;width:100%;max-width:460px;max-height:85vh;overflow-y:auto;transform:translateY(100%);transition:transform .35s cubic-bezier(.32,.72,.37,1.1);border-top:1px solid rgba(255,255,255,.08)}
.modal.show .mc2{transform:translateY(0)}
.mh{display:flex;align-items:center;gap:10px;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid rgba(255,255,255,.06)}
.mt2{flex:1;font-size:16px;font-weight:700}
.mx{width:32px;height:32px;border-radius:50%;border:none;background:rgba(255,255,255,.08);color:var(--t2);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}
.mx:hover{background:rgba(255,255,255,.15)}
.mx svg{width:16px;height:16px}
.toast-c{position:fixed;top:60px;left:50%;transform:translateX(-50%);z-index:300;display:flex;flex-direction:column;gap:8px;pointer-events:none;max-width:90%}
.tst{padding:12px 22px;border-radius:var(--rs);font-size:13px;font-weight:600;box-shadow:0 8px 30px rgba(0,0,0,.4);animation:ti .3s ease;text-align:center}
.tst.ts{background:var(--green);color:#fff}.tst.te{background:var(--red);color:#fff}.tst.ti2{background:var(--blue);color:#fff}
@keyframes ti{from{opacity:0;transform:translateY(-16px)}to{opacity:1;transform:translateY(0)}}
.kpi{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:12px}
.kc{background:var(--bg3);border-radius:var(--rs);padding:12px 8px;text-align:center;border:1px solid rgba(255,255,255,.05);position:relative;overflow:hidden}
.kc::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--kc,var(--blue))}
.kv{font-size:20px;font-weight:800}
.kl{font-size:9px;color:var(--t3);margin-top:2px}
.sgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:12px}
@media(min-width:400px){.sgrid{grid-template-columns:repeat(4,1fr)}}
.sc{background:var(--bg3);border-radius:var(--rs);padding:10px 6px;text-align:center;border:1px solid rgba(255,255,255,.05)}
.sc .sv{font-size:18px;font-weight:800}
.sc .sl{font-size:9px;color:var(--t3);margin-top:2px}
.sc .sb{height:4px;border-radius:2px;margin-top:5px;overflow:hidden}
.sc .sf{height:100%;border-radius:2px;transition:width .5s ease}
.qa{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:12px}
.qi{display:flex;align-items:center;gap:10px;padding:14px 12px;background:var(--bg3);border-radius:var(--r);cursor:pointer;border:1px solid rgba(255,255,255,.05);transition:all .2s}
.qi:hover{border-color:rgba(234,179,8,.15);transform:translateY(-1px)}
.qi:active{transform:scale(.97)}
.qi .qic{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.qi .qic svg{width:18px;height:18px}
.qi .qt{font-size:12px;font-weight:600}
.qi .qh{font-size:9px;color:var(--t3);margin-top:1px}
.qdt{display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:8px}
.qdi{background:rgba(30,41,59,.5);border-radius:7px;padding:7px 4px;border:1px solid rgba(255,255,255,.05);text-align:center}
.qdi .ql{font-size:9px;font-weight:700;margin-bottom:2px}
.qdi .qa2{font-size:7px;color:var(--t3);margin-bottom:2px}
.qdi input{width:100%;text-align:center}
.lc{background:var(--bg3);border:1px solid rgba(255,255,255,.05);border-radius:var(--rs);padding:10px;margin-bottom:6px}
.lh{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
.ln{font-size:12px;font-weight:700;color:#60a5fa;display:flex;align-items:center;gap:4px}
.ls{display:grid;grid-template-columns:repeat(3,1fr);gap:5px}
.lsi{background:var(--bgi);border-radius:5px;padding:5px;text-align:center}
.lsi .sl2{font-size:7px;color:var(--t3)}
.lsi .sv2{font-size:11px;font-weight:800}
.lp{height:3px;background:rgba(255,255,255,.05);border-radius:2px;overflow:hidden;margin-top:5px}
.lp div{height:100%;border-radius:2px}
.hi{background:var(--bgi);border-radius:var(--rs);padding:10px;margin-bottom:6px;border:1px solid rgba(255,255,255,.04)}
.hh{display:flex;justify-content:space-between;margin-bottom:4px}
.hb{font-size:12px;font-weight:700}
.hd{font-size:9px;color:var(--t3)}
.hm{font-size:10px;color:var(--t2)}
.dg{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;max-height:280px;overflow-y:auto}
.di{padding:10px 6px;background:var(--bgi);border-radius:var(--rs);text-align:center;cursor:pointer;font-size:10px;font-weight:600;border:1px solid transparent}
.di:hover,.di.active{border-color:var(--gold);color:var(--gold)}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.g3{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.mb2{margin-bottom:10px}.mb3{margin-bottom:14px}.mt2b{margin-top:10px}.mt3{margin-top:14px}
.tc{text-align:center}.tg{color:var(--gold)}.tgr{color:#4ade80}.tr{color:#f87171}.tbl{color:#60a5fa}.tmut{color:var(--t3)}
.empty{text-align:center;padding:36px 20px;color:var(--t3)}
.empty svg{width:48px;height:48px;margin-bottom:10px;opacity:.25}
.empty div{font-size:14px;margin-bottom:4px}
.empty .eh{font-size:11px;opacity:.7}
.flex{display:flex}.gap2{gap:8px}.aic{align-items:center}
.big-stat{text-align:center;padding:24px;background:var(--bg3);border-radius:var(--r);margin-bottom:12px;border:1px solid rgba(255,255,255,.05)}
.big-stat .bv{font-size:32px;font-weight:900;letter-spacing:-1px}
.big-stat .bl2{font-size:12px;color:var(--t3);margin-top:4px}
.ei{display:flex;align-items:center;gap:8px;padding:7px 9px;background:var(--bg3);border-radius:var(--rs);margin-bottom:4px;border:1px solid rgba(255,255,255,.04)}
.ei .ed{flex:1;font-size:11px}
.ei .ea{font-size:12px;font-weight:700;color:var(--red)}
.pi{background:var(--bg3);border-radius:var(--rs);padding:10px;border:1px solid rgba(255,255,255,.04);margin-bottom:6px}
.pg2{display:grid;grid-template-columns:repeat(4,1fr);gap:4px}
.ps{text-align:center}
.ps .pv{font-size:11px;font-weight:700}
.ps .pl{font-size:7px;color:var(--t3)}
.srch{position:relative}
.srch .inp{padding-right:38px}
.srch svg{position:absolute;right:12px;top:50%;transform:translateY(-50%);color:var(--t3);pointer-events:none;width:16px;height:16px}
.sri{display:flex;justify-content:space-between;align-items:center;padding:9px 12px;background:rgba(15,23,42,.6);border-radius:8px;margin-bottom:4px;border-right:3px solid var(--t3);cursor:pointer;transition:all .2s}
.sri:hover{background:rgba(30,41,59,.8);transform:translateX(-2px)}
.sri:active{transform:scale(.98)}
.rn{font-size:12px;font-weight:700;font-family:'SF Mono',monospace}
.rs2{font-size:10px;color:var(--gold);font-family:monospace;margin-right:5px}
.rdet{font-size:9px;color:var(--t3);margin-right:4px}
.rst{font-size:9px;padding:3px 8px;border-radius:10px;font-weight:600}
.dp{background:linear-gradient(180deg,var(--bg2),var(--bg3));border-radius:var(--r) var(--r) 0 0;padding:10px;margin:0 -12px -12px;border-top:1px solid rgba(255,255,255,.06)}
.dm{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px}
.dmo{padding:7px;border-radius:var(--rs);background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);color:var(--t2);font-size:10px;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px}
.dmo svg{width:13px;height:13px}
.dmo.active{border-color:var(--gold);color:var(--gold);background:rgba(234,179,8,.08)}
.dtot{display:flex;align-items:center;gap:6px;padding:7px 10px;background:var(--bgi);border-radius:var(--rs);border:1px solid var(--gold);margin-bottom:8px}
.dtl{font-size:10px;color:var(--t2)}
.dtv{font-size:16px;font-weight:800;color:var(--gold);margin-right:auto}
.dtc{font-size:10px;color:var(--gold)}
.ai{display:flex;justify-content:space-between;align-items:center;padding:7px 9px;background:rgba(15,23,42,.6);border-radius:6px;margin-bottom:3px;border-right:3px solid var(--t3);animation:si .3s ease}
@keyframes si{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:translateX(0)}}
.ab{font-size:8px;padding:2px 7px;border-radius:8px;font-weight:600}
.ro{background:var(--bgi);border:1px solid rgba(255,255,255,.06);border-radius:7px;padding:8px;text-align:center;cursor:pointer}
.ro:hover,.ro.active{border-color:var(--gold);background:rgba(234,179,8,.05)}
.ro .od{font-size:14px;font-weight:800}
.ro .ol{font-size:8px;color:var(--t3)}
.ro .op{font-size:10px;color:#4ade80}
.cb{display:flex;gap:3px;margin:5px 0}
.cbt{flex:1;padding:5px;border-radius:5px;border:1px solid rgba(255,255,255,.08);background:var(--bgi);color:var(--t2);font-size:9px;font-weight:600;cursor:pointer;font-family:inherit}
.si2{display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.04)}
.si2:last-child{border:none}
.sb2{padding:3px 7px;border-radius:5px;font-size:10px;font-weight:700}
.sc2{font-size:13px;font-weight:700}
.sa2{margin-right:auto;font-size:11px;color:var(--gold);font-weight:600}
</style>
</head>
<body>
<div class="toast-c" id="toasts"></div>
<div class="modal" id="modal" onclick="if(event.target===this)closeModal()"><div class="mc2" id="mbody"></div></div>
<div class="app">
<header class="hdr">
<button class="hdr-btn" onclick="toggleFS()"><i data-lucide="maximize-2"></i></button>
<div class="hdr-title">إدارة كروت الإنترنت</div>
<button class="hdr-btn" onclick="openSearch()"><i data-lucide="search"></i></button>
</header>
<main class="main">
<div id="pg-home" class="pg active"></div>
<div id="pg-inv" class="pg"></div>
<div id="pg-br" class="pg"></div>
<div id="pg-dist" class="pg"></div>
<div id="pg-sales" class="pg"></div>
<div id="pg-rep" class="pg"></div>
<div id="pg-set" class="pg"></div>
</main>
<nav class="nav">
<div class="ni" data-p="inv"><i data-lucide="package"></i><span>المخزون</span></div>
<div class="ni" data-p="br"><i data-lucide="store"></i><span>الفروع</span></div>
<div class="ni" data-p="dist"><i data-lucide="send"></i><span>التوزيع</span></div>
<div class="ni nh active" data-p="home"><div class="nhc"><i data-lucide="home"></i></div><span>الرئيسية</span></```

### Disable for Next Line

To disable all rules for just the next line:

<!-- prettier-ignore -->
```html
<!-- htmlhint-disable-next-line -->
<div class="foo">Lorem</div>
<div class="bar">Ipsum</div>
```

### Disable Specific Rules

To disable specific rules for the following lines:

<!-- prettier-ignore -->
```html
<!-- htmlhint-disable attr-lowercase -->
<div CLASS="foo">Lorem</div>
<div CLASS="bar">Ipsum</div>
<!-- htmlhint-enable -->
<div class="baz">Dolor</div>
```

### Disable Specific Rules for Next Line

To disable specific rules for just the next line:

<!-- prettier-ignore -->
```html
<!-- htmlhint-disable-next-line attr-lowercase -->
<div CLASS="foo">Lorem</div>
<div class="bar">Ipsum</div>
```

### Disable Multiple Rules

You can disable multiple rules by listing them separated by spaces:

<!-- prettier-ignore -->
```html
<!-- htmlhint-disable attr-lowercase tagname-lowercase -->
<DIV CLASS="foo">Lorem</DIV>
<div class="bar">Ipsum</div>
```

## Example configuration file

An example configuration file (with all rules disabled):

```json
{
  "alt-require": false,
  "attr-lowercase": false,
  "attr-no-duplication": false,
  "attr-no-unnecessary-whitespace": false,
  "attr-sorted": false,
  "attr-unsafe-chars": false,
  "attr-value-double-quotes": false,
  "attr-value-no-duplication": false,
  "attr-value-not-empty": false,
  "attr-value-single-quotes": false,
  "attr-whitespace": false,
  "button-type-require": false,
  "doctype-first": false,
  "doctype-html5": false,
  "empty-tag-not-self-closed": false,
  "form-method-require": false,
  "frame-title-require": false,
  "h1-require": false,
  "head-script-disabled": false,
  "href-abs-or-rel": false,
  "html-lang-require": false,
  "id-class-ad-disabled": false,
  "id-class-value": false,
  "id-unique": false,
  "inline-script-disabled": false,
  "inline-style-disabled": false,
  "input-requires-label": false,
  "link-rel-canonical-require": false,
  "main-require": false,
  "meta-charset-require": false,
  "meta-description-require": false,
  "meta-viewport-require": false,
  "script-disabled": false,
  "space-tab-mixed-disabled": false,
  "spec-char-escape": false,
  "src-not-empty": false,
  "style-disabled": false,
  "tag-no-obsolete": false,
  "tag-pair": false,
  "tag-self-close": false,
  "tagname-lowercase": false,
  "tagname-specialchars": false,
  "tags-check": false,
  "title-require": false
}
```

## VS Code Configuration

To have your configuration file recognized by editors with JSON schema support, you can add the following to VS Code settings (`.vscode/settings.json`). This will enable autocompletion and validation for the `.htmlhintrc` file.

```json
{
  "json.schemas": [
    {
      "fileMatch": ["/.htmlhintrc"],
      "url": "https://json.schemastore.org/htmlhint.json"
    }
  ]
}
```

Note: if you have the [VS Code extension](/vs-code-extension/) installed, it will automatically recognize the `.htmlhintrc` file without needing to add this configuration.
