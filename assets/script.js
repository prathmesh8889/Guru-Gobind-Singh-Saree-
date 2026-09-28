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
function applyCatalogFilter(filter){
  filterBtns.forEach(b=>b.classList.toggle('active', b.dataset.filter===filter));
  catalogCards.forEach(card=>{ card.hidden = !(filter==='all' || card.dataset.category===filter); });
}
filterBtns.forEach(btn=>btn.addEventListener('click',()=>applyCatalogFilter(btn.dataset.filter)));
const requestedCategory = new URLSearchParams(window.location.search).get('cat');
if(requestedCategory && [...filterBtns].some(b=>b.dataset.filter===requestedCategory)) applyCatalogFilter(requestedCategory);

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


const sareeModal = document.querySelector('#sareeModal');
if(sareeModal){
  const modalMain = document.querySelector('#sareeModalMain');
  const modalThumbs = document.querySelector('#sareeModalThumbs');
  const modalTitle = document.querySelector('#sareeModalTitle');
  const modalDesc = document.querySelector('#sareeModalDesc');
  const modalBadge = document.querySelector('#sareeModalBadge');
  const modalWhatsapp = document.querySelector('#sareeModalWhatsapp');

  function openSareeCard(card){
    const images=(card.dataset.images||'').split('|').filter(Boolean);
    modalTitle.textContent=card.dataset.title||'Saree Collection';
    modalDesc.textContent=card.dataset.desc||'';
    modalBadge.textContent=card.dataset.badge||'Collection';
    if(images.length){
      modalMain.src=images[0];
      modalMain.alt=(card.dataset.title||'Saree')+' variety';
    }
    modalThumbs.innerHTML='';
    images.forEach((src,index)=>{
      const button=document.createElement('button');
      button.type='button';
      button.className='modal-thumb'+(index===0?' active':'');
      const image=document.createElement('img');
      image.src=src;
      image.alt=(card.dataset.title||'Saree')+' style '+(index+1);
      button.appendChild(image);
      button.addEventListener('click',()=>{
        modalMain.src=src;
        modalThumbs.querySelectorAll('.modal-thumb').forEach(t=>t.classList.remove('active'));
        button.classList.add('active');
      });
      modalThumbs.appendChild(button);
    });
    const msg='Namaste Guru Gobind Singh Saree, I want details for '+(card.dataset.title||'this saree variety')+'. Please share current designs, colours, wholesale price and minimum quantity.';
    modalWhatsapp.href='https://wa.me/917020231578?text='+encodeURIComponent(msg);
    sareeModal.showModal();
  }

  document.querySelectorAll('.saree-card').forEach(card=>{
    card.addEventListener('click',()=>openSareeCard(card));
    card.addEventListener('keydown',e=>{ if(e.key==='Enter' || e.key===' '){ e.preventDefault(); openSareeCard(card); } });
  });
  sareeModal.querySelector('.saree-modal-close')?.addEventListener('click',()=>sareeModal.close());
  sareeModal.addEventListener('click',e=>{ if(e.target===sareeModal) sareeModal.close(); });
}