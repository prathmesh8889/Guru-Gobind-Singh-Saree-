const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if(menuBtn && navLinks){
  menuBtn.addEventListener('click',()=>{
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true':'false');
  });
  navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded','false');
  }));
}

const page = document.body.dataset.page;
document.querySelectorAll('[data-nav]').forEach(a=>{ if(a.dataset.nav===page) a.classList.add('active'); });

document.querySelectorAll('img').forEach(img=>{
  img.addEventListener('error',()=>{
    if(!img.dataset.fallbackApplied){
      img.dataset.fallbackApplied='true';
      img.src='assets/fallback.svg';
    }
  });
});

const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries=>{
  entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); } });
},{threshold:.12}) : null;
document.querySelectorAll('.reveal').forEach(el=> observer ? observer.observe(el) : el.classList.add('visible'));

const filterBtns = document.querySelectorAll('.filter-btn');
const catalogCards = document.querySelectorAll('.catalog-card');
filterBtns.forEach(btn=>btn.addEventListener('click',()=>{
  filterBtns.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const filter=btn.dataset.filter;
  catalogCards.forEach(card=>{ card.hidden = !(filter==='all' || card.dataset.category===filter); });
}));

const form = document.querySelector('#enquiryForm');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    const lines = [
      'Namaste Guru Gobind Singh Saree,',
      '',
      'Name: ' + (data.get('name')||''),
      'Phone: ' + (data.get('phone')||''),
      'Looking for: ' + (data.get('interest')||''),
      'Purchase type: ' + (data.get('purchase')||''),
      'Message: ' + (data.get('message')||''),
      '',
      'Please share suitable collection / details.'
    ];
    window.open('https://wa.me/917020231578?text=' + encodeURIComponent(lines.join('\n')),'_blank','noopener');
  });
}

const lightbox = document.querySelector('#lightbox');
const lightboxImg = lightbox?.querySelector('img');
document.querySelectorAll('.gallery-card img').forEach(img=>{
  img.addEventListener('click',()=>{
    if(!lightbox || !lightboxImg) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.showModal();
  });
});
lightbox?.querySelector('.lightbox-close')?.addEventListener('click',()=>lightbox.close());
lightbox?.addEventListener('click',e=>{ if(e.target===lightbox) lightbox.close(); });
