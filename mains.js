//<--------------------Button-------------->
function scrollToElement(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

//<---------------stat-num------------------->
const counters = document.querySelectorAll(".stat-num");
counters.forEach(counter => {
    const updatecount = () => {
        const target = +counter.getAttribute("data-count");
        const current = +counter.innerText;
        const increment = target / 100;
        if (current < target) {
            counter.innerText = Math.ceil(current + increment);
            setTimeout(updatecount, 20);
        }
        else {
            counter.innerText = target;
        }
    }
    updatecount();

});

//<-------------tab-contents--------------->
function switchTab(e,id){
    document.querySelectorAll('.tab-links').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
    document.querySelectorAll('.tab-contents').forEach(g=>g.style.display='none');
    document.getElementById(id).style.display='flex';

}

//<---------------stat----------------------->
const count=document.querySelectorAll(".num");
count.forEach(counts =>{
    const updatec=() =>{
        const tar= +counts.getAttribute("data-count");
        const value= +counts.innerText;
        const increase=tar/100;
        if (tar>value){
            counts.innerText=Math.ceil(value+increase);
            setTimeout (updatec,20);
        }
        else{
            counts.innerText=value;

        }
    };
    updatec();

});

//<--------------------filter-button------------------------>
function filterdoctor(btn,spec){
    document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll(".doc-card").forEach(card=>{
        if(spec==="All"|| card.dataset.spec===spec)card.classList.remove('hidden');
        else card.classList.add('hidden');
    });
}

//<----------------------showToast-------------------------->
let toastTimer;
function showToast(msg){
  clearTimeout(toastTimer);
  document.getElementById('toastMsg').textContent=msg;
  const t= document.getElementById('toast');
  t.classList.add('show');
  toastTimer= setTimeout(()=>t.classList.remove('show'),2800);
}



//<--------------------Book Doctor------------------------------->
function bookDoctor(name, spec){
  scrollToElement('appt');
  setTimeout(()=>{
    document.getElementById('spec').value = spec;
    updateDoctors();
    setTimeout(()=>{
      const opts = document.getElementById('doc').options;
      for(let i=0;i<opts.length;i++){
        if(opts[i].text===name){document.getElementById('doc').selectedIndex=i;break;}
      }
      showToast('✓ Form pre-filled for '+name);
    },100);
  },600);
}


//<-----------------------UPDATE-DOCTOR-------------------------------->
const docMap = {
  'Cardiology':['Dr. Priya Gupta','Dr. Arun Sen'],
  'Neurology':['Dr. Arnab Sharma','Dr. Nita Roy'],
  'Orthopaedics':['Dr. Sudipta Dey','Dr. Meena Das'],
  'Nephrology':['Dr. Rajeev Bose'],
  'General Medicine':['Dr. Tarun Mehta'],
  'Paediatrics':['Dr. Soma Chatterjee'],
  'Ophthalmology':['Dr. Anjali Sinha'],
  'Emergency Medicine':['Dr. Tarun Mehta']
};
function updateDoctors(){
  const spec = document.getElementById('spec').value;
  const docs = docMap[spec] || [];
  const docSel = document.getElementById('doc');
  docSel.innerHTML = '<option value="">Select a doctor</option>' + docs.map(d=>`<option>${d}</option>`).join('');
}


//<----------------------SUBMIT APPOINTMENT--------------------------------->
function submitAppointment(){
    const fname= document.getElementById("fname").value;
    const date= document.getElementById("apptDate").value;
    const spec= document.getElementById("spec").value;
    const doc=document.getElementById("doc").value;
    const phone=document.getElementById("phone").value.trim();

    if( !fname|| !spec|| !doc || !date || !phone){
        showToast("Please fill all required fields");
        return;
    }

    const btn=document.getElementById("submitBtn");
    btn.textContent='Confirming...';
    btn.classList.add('loading');

    setTimeout(() =>{
        document.getElementById("formBody").style.display="none";
        document.getElementById("successBody").style.display="block";
        const dateStr= new Date(date).toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"});
        document.getElementById("successText").innerHTML= `<strong>${fname}</strong> with <strong>${doc}</strong> (${spec})<br>on <strong>${dateStr}</strong>`;
        showToast('🎉 Appointment confirmed!');
    },1200);
    
}

//<--------------------Reset button------------------------->
function resetForm(){
    document.getElementById("formBody").style.display="block";
    document.getElementById("successBody").style.display="none";
    document.getElementById("submitBtn").textContent="Confirm Appointment →";
    document.getElementById("submitBtn").classList.remove("loading");
    ["fname","lname","phone","apptDate","apptTime"].forEach(id=> document.getElementById(id).value='');
    document.getElementById('spec').value='';
    document.getElementById('doc').innerHTML='<option value="" >Select a doctor</option>';
} 


//<------------------------------Sidemenu------------------------------------->
var sidemeu=document.getElementById("sidemenu");
function openmenu(){
    sidemeu.style.right="0";
}
function closemenu(){
    sidemeu.style.right="-200px";

}












