const quiz = [
  {q:"Which topic is a major ethical concern when new technologies may affect people?", a:["Health and safety","Only appearance","Sports rankings","Weather forecasts"], c:0},
  {q:"Why is environmental impact relevant to nanotechnology?", a:["Technology exists outside nature","Materials can have environmental effects","It changes school schedules","It removes all pollution automatically"], c:1},
  {q:"What does responsible regulation aim to balance?", a:["Innovation and protection","Only profit","Only speed","Only advertising"], c:0},
  {q:"Which is another Period 3 STS topic listed in the project?", a:["Threats to biodiversity","Celebrity fashion","Video game design","Tourism marketing"], c:0}
];
let current=0, score=0;
const qEl=document.getElementById("question"), aEl=document.getElementById("answers"), next=document.getElementById("nextBtn"), scoreEl=document.getElementById("score");

function loadQuestion(){
  const item=quiz[current]; qEl.textContent=(current+1)+". "+item.q; aEl.innerHTML=""; scoreEl.textContent="";
  next.classList.add("hidden");
  item.a.forEach((answer,i)=>{
    const b=document.createElement("button"); b.className="answer"; b.textContent=answer;
    b.onclick=()=>choose(i,b); aEl.appendChild(b);
  });
}
function choose(i,button){
  [...aEl.children].forEach(b=>b.disabled=true);
  if(i===quiz[current].c){button.classList.add("correct");score++;}else{
    button.classList.add("wrong");aEl.children[quiz[current].c].classList.add("correct");
  }
  next.textContent=current<quiz.length-1?"Next question":"See result";
  next.classList.remove("hidden");
}
next.onclick=()=>{
  current++;
  if(current<quiz.length) loadQuestion();
  else {qEl.textContent="Quiz complete!";aEl.innerHTML="";next.classList.add("hidden");scoreEl.textContent=`Your score: ${score}/${quiz.length}`;}
};
loadQuestion();

function searchArticles(){
  const term=document.getElementById("searchInput").value.toLowerCase().trim();
  document.querySelectorAll(".article-card").forEach(card=>{
    card.style.display=(!term || card.dataset.search.includes(term))?"flex":"none";
  });
  if(term) document.getElementById("stories").scrollIntoView({behavior:"smooth"});
}
document.getElementById("searchBtn").addEventListener("click",searchArticles);
document.getElementById("searchInput").addEventListener("keydown",e=>{if(e.key==="Enter")searchArticles();});
