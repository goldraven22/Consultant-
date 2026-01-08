// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({behavior:'smooth'});
  });
});

// Supabase integration
const SUPABASE_URL = 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById('consultation-form');
form.addEventListener('submit', async e=>{
  e.preventDefault();
  const name=form.name.value.trim();
  const email=form.email.value.trim();
  const phone=form.phone.value.trim();
  const note=form.note.value.trim();
  if(!name||!email){alert('Please enter name and email'); return;}
  try{
    const { error } = await supabaseClient.from('consultation_requests').insert([{name,email,phone,note}]);
    if(error) throw error;
    alert('Thank you! Your request has been submitted.');
    form.reset();
  } catch(err){console.error(err); alert('Submission failed');}
});