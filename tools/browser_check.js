// Headless Chrome sweep: every route at 390 and 1440 px, light and dark, collecting console errors and screenshots.
// Needs puppeteer-core already installed (ask before installing) and the site served locally, e.g. python3 -m http.server 8931
// Usage: node browser_check.js http://localhost:8931/index.html today,glossary,quiz [themeKey] [darkVal] [lightVal]
const p=require('puppeteer-core');const fs=require('fs');
const [url,routes,key='theme',dark='dark',light='light']=process.argv.slice(2);
(async()=>{const b=await p.launch({executablePath:process.env.CHROME||'/usr/bin/google-chrome',args:['--no-sandbox']});
fs.mkdirSync('shots',{recursive:true});const errs=[];
for(const theme of [dark,light])for(const w of [390,1440]){const pg=await b.newPage();await pg.setViewport({width:w,height:900});
 pg.on('console',m=>{if(['error','warning'].includes(m.type()))errs.push(`${theme} ${w}: ${m.text()}`)});
 pg.on('pageerror',e=>errs.push(`${theme} ${w} pageerror: ${e.message}`));
 await pg.goto(url,{waitUntil:'networkidle0'});await pg.evaluate((k,t)=>localStorage.setItem(k,JSON.stringify(t)),key,theme);
 for(const r of routes.split(',')){await pg.goto(url+'#/'+r,{waitUntil:'networkidle0'});await pg.reload({waitUntil:'networkidle0'});
  await pg.screenshot({path:`shots/${theme}-${w}-${r.replace(/\//g,'_')}.png`});}
 await pg.close();}
console.log('ERRORS',errs.length);errs.forEach(e=>console.log(e));await b.close();process.exit(errs.length?1:0);})();
