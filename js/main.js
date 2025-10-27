// main.js - shared helpers
function q(s){return document.querySelector(s)}
function qAll(s){return document.querySelectorAll(s)}
function attachSearch(tableId, inputId){
  const input = q('#'+inputId)
  if(!input) return
  input.addEventListener('input', ()=>{
    const v = input.value.trim().toLowerCase()
    qAll('#'+tableId+' tbody tr').forEach(tr=>{
      tr.style.display = tr.innerText.toLowerCase().includes(v) ? '' : 'none'
    })
  })
}
document.addEventListener('DOMContentLoaded', ()=>{ 
  if(typeof pageInit === 'function') pageInit()
})
