// ------------- DADOS DOS PROJETOS (edite aqui) -------------
// type: 'image' ou 'video'. Se for 'video', use embedUrl (ex: YouTube embed link)
// ALTERE: nomes, descrições, caminhos das imagens/videos e links
const PROJECTS = [
    {id:'p-1', title:'Vídeo Youtube 1', subtitle:'Vídeo com longo tempo de produção', category:'projects', 
      type:'video', embedUrl:'https://www.youtube.com/embed/SON_xq-sC-o?si=UwaH4cJG-fFPYx0f', // Substitua XXXXXXX
      images:['assets/thumb-minescrraft2.jpg','assets/timeline-1.jpeg'], external:'https://www.youtube.com/embed/SON_xq-sC-o?si=UwaH4cJG-fFPYx0f'},
    
    {id:'p-2', title:'Edit legendado', subtitle:'Vídeo no ritmo da musica', category:'motion', 
      type:'video', embedUrl:'https://www.youtube.com/embed/l5z6prq3aEY', // Substitua YYYYYYY
      images:["assets/thumb3.png"], external:'https://www.youtube.com/embed/l5z6prq3aEY'},
    
    {id:'p-3', title:'Motion menu inicial', subtitle:'Motion feito do zero para um vídeo de Cyberpunk 2077', category:'video', 
      type:'video', embedUrl:'https://www.youtube.com/embed/pYl6mIatIZE?si=HyywuT8-3eqi0W5_', // Substitua ZZZZZZZ
      images:["assets/thumb4.png"], external:'https://www.youtube.com/embed/pYl6mIatIZE?si=HyywuT8-3eqi0W5_'},
  
    {id:'p-4', title:'Flyer 1', subtitle:'Propaganda de viagem', category:'design', 
      type:'image', images:["assets/thumb9.jpg"]},
    
    {id:'p-5', title:'Vídeo Youtube 2', subtitle:'Vídeo curto para redes', category:'projects', 
      type:'video', embedUrl:'https://www.youtube.com/embed/2_n7-NRo4I0?si=9jgH-UjDx0FrFGAw', // Substitua WWWWWWW
      images:["assets/thumb10.jpg","assets/timeline2.png"] , external:'https://www.youtube.com/embed/2_n7-NRo4I0?si=9jgH-UjDx0FrFGAw'},
    
    {id:'p-6', title:'Edit montagem pc', subtitle:'Vídeo no ritmo da musica', category:'motion', 
        type:'video', embedUrl:'https://www.youtube.com/embed/ren8FdI3i7M', // Substitua YYYYYYY
        images:["assets/thumb5.png"], external:'https://www.youtube.com/embed/ren8FdI3i7M'},
    
    {id:'p-7', title:'Vídeo Publicitário (Estudo)', subtitle:'Vídeo de conclusão de curso de Davinci Resolve da Alura', category:'projects', 
        type:'video', embedUrl:'https://www.youtube.com/embed/0iX3wDLPtYs?si=MdQ6nyLNfLfQvGTw', // Substitua WWWWWWW
        images:["assets/thumb2.png"], external:'https://www.youtube.com/embed/0iX3wDLPtYs?si=MdQ6nyLNfLfQvGTw'},
        
    {id:'p-8', title:'Motion logo', subtitle:'Motion da logo de um canal do youtube', category:'video', 
        type:'video', embedUrl:'https://www.youtube.com/embed/6FgchBX3AxA?si=Lek3EQ7b2Uc-i9Yb', // Substitua ZZZZZZZ
        images:["assets/thumb6.png"], external:'https://www.youtube.com/embed/6FgchBX3AxA?si=Lek3EQ7b2Uc-i9Yb'},

    {id:'p-9', title:'Flyer 2', subtitle:'Propaganda de viagem', category:'design', 
        type:'image', images:["assets/thumb7.jpeg"]},   
        
    {id:'p-10', title:'Flyer 3', subtitle:'Propaganda de evento', category:'design', 
        type:'image', images:["assets/thumb8.jpeg"]}, 
  ];
  
  // ----------------- utilidades DOM -----------------
  const qs = s => document.querySelector(s);
  const qsa = s => Array.from(document.querySelectorAll(s));
  
  // Popula carrosséis
  function mountCarousels(){
    const maps = {
      projects: qs('#carousel-projects'),
      motion: qs('#carousel-motion'),
      video: qs('#carousel-video'),
      design: qs('#carousel-design')
    };
  
    // Clear
    Object.values(maps).forEach(c=>c.innerHTML='');
  
    PROJECTS.forEach(p=>{
      const card = document.createElement('article');
      card.className='project-card';
      card.dataset.id=p.id;
      card.innerHTML = `
        <img src="${p.images[0] || '/assets/placeholder.png'}" alt="${p.title}">
        <h4>${p.title}</h4>
        <p>${p.subtitle}</p>
      `;
      card.addEventListener('click', ()=>openProject(p.id));
  
      // Decide o carrossel pelo category
      if(p.category==='projects') maps.projects.appendChild(card);
      if(p.category==='motion') maps.motion.appendChild(card);
      if(p.category==='video') maps.video.appendChild(card);
      if(p.category==='design') maps.design.appendChild(card);
    });
  
    // Se algum carrossel ficou vazio, colocamos um placeholder
    Object.keys(maps).forEach(k=>{if(maps[k].children.length===0){const ph=document.createElement('div');ph.style.padding='20px';ph.style.color='var(--muted)';ph.textContent='Nenhum projeto nesta categoria ainda.';maps[k].appendChild(ph)}})
  }
  
  // Scroll nos botões prev/next
  function handleCarouselControls(){
    qsa('.carousel-controls .btn-circle').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const target = document.querySelector(btn.dataset.target);
        if(!target) return;
        const dir = btn.dataset.action;
        const amount = target.clientWidth * 0.6;
        target.scrollBy({left: dir==='next'?amount:-amount, behavior:'smooth'});
      })
    })
  }
  
  // Drag support dos carrosséis
  function enableDrag(){
    qsa('.carousel').forEach(car=>{
      let isDown=false,startX,scrollLeft;
      car.addEventListener('mousedown', e=>{isDown=true;car.classList.add('dragging');startX=e.pageX - car.offsetLeft;scrollLeft=car.scrollLeft});
      car.addEventListener('mouseleave', ()=>{isDown=false;car.classList.remove('dragging')});
      car.addEventListener('mouseup', ()=>{isDown=false;car.classList.remove('dragging')});
      car.addEventListener('mousemove', e=>{if(!isDown) return; e.preventDefault(); const x=e.pageX - car.offsetLeft; const walk=(x - startX)*1.2; car.scrollLeft = scrollLeft - walk; });
      // touch
      car.addEventListener('touchstart', e=>{startX=e.touches[0].pageX - car.offsetLeft;scrollLeft=car.scrollLeft});
      car.addEventListener('touchmove', e=>{const x=e.touches[0].pageX - car.offsetLeft;const walk=(x - startX)*1.2;car.scrollLeft = scrollLeft - walk});
    })
  }
  
  // Abrir detalhe do projeto
  function openProject(id){
    const proj = PROJECTS.find(p=>p.id===id);
    if(!proj) return;
    const detail = qs('#project-detail');
    const thumbs = qs('#thumbs');
    const main = qs('#gallery-main');
    const title = qs('#detail-title');
    const desc = qs('#detail-desc');
    const ext = qs('#external-link');
  
    title.textContent = proj.title;
    desc.textContent = proj.subtitle; 
    ext.href = proj.external || '#';
    
    // Lógica para exibir Vídeo (iframe) ou Imagem
    if (proj.type === 'video' && proj.embedUrl) {
        main.innerHTML = `<iframe src="${proj.embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%; height:100%; border:0; border-radius:8px;"></iframe>`;
        thumbs.style.display = proj.images.length > 0 ? 'flex' : 'none'; 
    } else {
        main.innerHTML = `<img src="${proj.images[0] || '/assets/placeholder.png'}" alt="${proj.title}">`;
        thumbs.style.display = 'flex';
    }
  
    // thumbs
    thumbs.innerHTML = '';
    proj.images.forEach((src,i)=>{
      const img = document.createElement('img');img.src=src; if(i===0) img.classList.add('active');
      img.addEventListener('click', ()=>{
        qsa('#thumbs img').forEach(t=>t.classList.remove('active'));img.classList.add('active');
        if(proj.type === 'video' && proj.embedUrl){
          if(i === 0) main.innerHTML = `<iframe src="${proj.embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%; height:100%; border:0; border-radius:8px;"></iframe>`;
          else main.innerHTML = `<img src="${src}" alt="${proj.title} image ${i+1}">`; 
        } else {
          main.innerHTML = `<img src="${src}" alt="${proj.title} image ${i+1}">`;
        }
      })
      thumbs.appendChild(img);
    })
    
    // mostra overlay
    detail.classList.add('open'); detail.setAttribute('aria-hidden','false');
    history.pushState({project:id}, '', `#project=${id}`);
  }
  
  // fechar detalhe
  qs('#close-detail').addEventListener('click', closeDetail);
  function closeDetail(){
    const detail = qs('#project-detail');
    detail.classList.remove('open'); detail.setAttribute('aria-hidden','true');
    qs('#gallery-main').innerHTML = ''; 
    if(location.hash.startsWith('#project=')) history.back();
  }
  
  // Toggle do Menu Mobile
  function initMobileMenu(){
    const header = qs('header');
    const toggleBtn = qs('.menu-toggle');
    const navLinks = qsa('nav a');
  
    toggleBtn.addEventListener('click', ()=>{
      header.classList.toggle('menu-open');
      toggleBtn.setAttribute('aria-expanded', header.classList.contains('menu-open'));
    });
  
    // Fecha o menu quando um link é clicado (para mobile)
    navLinks.forEach(a => {
      a.addEventListener('click', () => {
        if(header.classList.contains('menu-open')) {
          header.classList.remove('menu-open');
          toggleBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
  
  // ScrollSpy para link ativo na navegação
  function initScrollSpy(){
    const sections = qsa('section[id]');
    const navLinks = qsa('nav a[href^="#"]');
  
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentLink = qs(`nav a[href="#${entry.target.id}"]`);
          
          navLinks.forEach(link => link.classList.remove('active'));
          if(currentLink) currentLink.classList.add('active');
        }
      });
    }, {
      rootMargin: "-25% 0px -70% 0px", 
      threshold: 0.2
    });
  
    sections.forEach(sec => observer.observe(sec));
  }
  
  // Gerenciamento de rota simples: se abrir com #project=id
  window.addEventListener('popstate', (e)=>{
    if(location.hash.startsWith('#project=')){
      const id = location.hash.replace('#project=','');
      if(!qs('#project-detail').classList.contains('open')) openProject(id);
    } else {
      if(qs('#project-detail').classList.contains('open')) closeDetail();
    }
  })
  
  // Animations: intersection observer para elementos com .animate-in
  function initScrollAnimations(){
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){e.target.classList.add('in-view');obs.unobserve(e.target)}
      })
    },{threshold:0.12});
    qsa('.animate-in').forEach(el=>obs.observe(el));
  }
  
  // Smooth scroll for anchor links
  function initAnchors(){
    qsa('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', e=>{
        const href = a.getAttribute('href');
        if(href.startsWith('#')){
          e.preventDefault();
          const target = document.querySelector(href);
          if(target) target.scrollIntoView({behavior:'smooth',block:'start'});
        }
      })
    })
  }
  
  // inicialização
  document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('year').textContent = new Date().getFullYear();
    mountCarousels();
    handleCarouselControls();
    enableDrag();
    initScrollAnimations();
    initAnchors();
    initMobileMenu(); 
    initScrollSpy();  
  
    // Entry animation do nome (leve)
    setTimeout(()=>{qs('.tagline').classList.add('in-view');qs('h1').classList.add('in-view')}, 220);
  
    // Se abriu com hash de projeto
    if(location.hash.startsWith('#project=')){
      const id = location.hash.replace('#project=','');
      setTimeout(()=>openProject(id), 200);
    }
  
    // click externo para imagens: ampliar em nova aba (melhoria simples)
    qs('#gallery-main').addEventListener('click', ()=>{
      const img = qs('#gallery-main img'); if(img) window.open(img.src, '_blank');
    })
  })
  
  // Acessibilidade: fechar com ESC
  window.addEventListener('keydown', (e)=>{if(e.key==='Escape' && qs('#project-detail').classList.contains('open')) closeDetail()});