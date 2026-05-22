// Direkter Neustart ohne Texteingabe
window.addEventListener('load',function(){
  var button=document.getElementById('reset');
  if(!button)return;
  button.onclick=function(){
    localStorage.setItem('little-bio8-progress-v4','[]');
    window.location.reload();
  };
});
