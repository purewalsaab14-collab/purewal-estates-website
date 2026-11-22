import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";
const configured=SUPABASE_URL.startsWith("https://")&&!SUPABASE_ANON_KEY.startsWith("PASTE_");
const loginPanel=document.getElementById("login-panel"), dashboard=document.getElementById("dashboard");
const loginMessage=document.getElementById("login-message"), formMessage=document.getElementById("form-message");
if(!configured){loginMessage.textContent="Setup needed: add your Supabase project URL and anon public key in config.js, then deploy again.";document.querySelector("#login-form button").disabled=true;}
else{
 const sb=createClient(SUPABASE_URL,SUPABASE_ANON_KEY);let currentUser=null;
 const show=async()=>{const {data}=await sb.auth.getSession();currentUser=data.session?.user||null;loginPanel.classList.toggle("hidden",!!currentUser);dashboard.classList.toggle("hidden",!currentUser);if(currentUser)loadProperties();};
 document.getElementById("login-form").addEventListener("submit",async e=>{e.preventDefault();loginMessage.textContent="Signing in…";const {error}=await sb.auth.signInWithPassword({email:document.getElementById("email").value,password:document.getElementById("password").value});loginMessage.textContent=error?error.message:"";await show();});
 document.getElementById("logout").addEventListener("click",async()=>{await sb.auth.signOut();await show();});
 const byId=id=>document.getElementById(id);
 const reset=()=>{byId("property-form").reset();byId("property-id").value="";byId("form-heading").textContent="Add a property";formMessage.textContent="";};
 byId("reset-form").addEventListener("click",reset);
 byId("property-form").addEventListener("submit",async e=>{
  e.preventDefault();formMessage.textContent="Saving…";
  const id=byId("property-id").value;let image_url=null;const file=byId("photo").files[0];
  if(file){if(file.size>8*1024*1024){formMessage.textContent="Please choose an image under 8 MB.";return;}const safe=file.name.toLowerCase().replace(/[^a-z0-9.-]/g,"-");const path=`${crypto.randomUUID()}-${safe}`;const {error:uploadError}=await sb.storage.from("property-photos").upload(path,file,{upsert:false});if(uploadError){formMessage.textContent="Photo upload failed: "+uploadError.message;return;}const {data}=sb.storage.from("property-photos").getPublicUrl(path);image_url=data.publicUrl;}
  const row={title:byId("title").value.trim(),category:byId("category").value,location:byId("location").value.trim(),area:byId("area").value.trim(),price:byId("price").value.trim(),status:byId("status").value,description:byId("description").value.trim()};
  if(image_url)row.image_url=image_url;
  const result=id?await sb.from("properties").update(row).eq("id",id):await sb.from("properties").insert(row);
  if(result.error){formMessage.textContent=result.error.message;return;}formMessage.textContent="Saved successfully.";reset();loadProperties();
 });
 async function loadProperties(){const box=byId("property-list");const {data,error}=await sb.from("properties").select("*").order("created_at",{ascending:false});if(error){box.textContent=error.message;return;}if(!data.length){box.innerHTML='<p class="notice">No properties added yet. Use the form above to create your first listing.</p>';return;}box.innerHTML=data.map(x=>`<div class="admin-list-item"><div><strong>${esc(x.title)}</strong><small>${esc(x.location)} · ${esc(x.status)} · ${esc(x.price||"Price on request")}</small></div><div class="admin-actions"><button class="admin-button" data-edit="${x.id}">Edit</button><button class="admin-button danger" data-delete="${x.id}">Delete</button></div></div>`).join("");box.querySelectorAll("[data-edit]").forEach(b=>b.addEventListener("click",()=>{const x=data.find(v=>v.id===b.dataset.edit);byId("property-id").value=x.id;for(const k of ["title","category","location","area","price","status","description"])byId(k).value=x[k]||"";byId("form-heading").textContent="Edit property";formMessage.textContent="Choose a new photo only if you want to replace the current photo.";window.scrollTo({top:0,behavior:"smooth"});}));box.querySelectorAll("[data-delete]").forEach(b=>b.addEventListener("click",async()=>{if(!confirm("Delete this property listing?"))return;const {error}=await sb.from("properties").delete().eq("id",b.dataset.delete);if(error)alert(error.message);else loadProperties();}));}
 function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
 await show();
}
