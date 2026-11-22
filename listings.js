import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";

const grid = document.getElementById("listing-grid");
const configured = SUPABASE_URL.startsWith("https://") && !SUPABASE_ANON_KEY.startsWith("PASTE_");
if (!configured) {
  grid.innerHTML = '<p class="listing-status">Property listings will appear here once the free database is connected. Contact us on WhatsApp for current availability.</p>';
} else {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  const { data, error } = await supabase.from("properties").select("*").eq("status","Available").order("created_at",{ascending:false});
  if (error) {
    grid.innerHTML = '<p class="listing-status">For current property availability, please contact Purewal Estates directly.</p>';
  } else if (!data || data.length === 0) {
    grid.innerHTML = '<p class="listing-status">No online listings at the moment. Contact us to discuss current availability.</p>';
  } else {
    grid.innerHTML = data.map(item => {
      const image = item.image_url || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80";
      const price = item.price ? escapeHtml(item.price) : "Price on request";
      const details = [item.location,item.category,item.area].filter(Boolean).map(escapeHtml).join(" · ");
      const msg = encodeURIComponent(`Hello Purewal Estates, I am interested in ${item.title}${item.location ? " in "+item.location : ""}. Please share details.`);
      return `<article class="listing-card"><img src="${escapeAttr(image)}" alt="${escapeAttr(item.title)}" loading="lazy"><div class="listing-card-body"><h3>${escapeHtml(item.title)}</h3><div class="listing-meta">${details}</div><div class="listing-price">${price}</div><a class="listing-enquire" href="https://wa.me/919056862022?text=${msg}" target="_blank" rel="noopener">ENQUIRE ON WHATSAPP ↗</a></div></article>`;
    }).join("");
  }
}
function escapeHtml(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function escapeAttr(v){return escapeHtml(v);}
