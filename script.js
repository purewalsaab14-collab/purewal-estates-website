const menuButton=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav");
if(menuButton&&nav){menuButton.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuButton.setAttribute("aria-expanded",String(open));menuButton.textContent=open?"×":"☰";});document.querySelectorAll(".nav a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuButton.setAttribute("aria-expanded","false");menuButton.textContent="☰";}));}
const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();
const form=document.getElementById("enquiry-form");
if(form){form.addEventListener("submit",e=>{e.preventDefault();const d=new FormData(form);const msg=["Hello Purewal Estates, I would like to make an enquiry.",`Name: ${d.get("name")}`,`Phone: ${d.get("phone")}`,`Interested in: ${d.get("interest")}`,`Requirements: ${d.get("message")||"Not specified"}`].join("\\n");window.open("https://wa.me/919056862022?text="+encodeURIComponent(msg),"_blank","noopener");});}
