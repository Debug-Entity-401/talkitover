$(document).ready(function(){
   var scrolllink=$('.scroll');
   scrolllink.click(function(e){
       e.preventDefault();
       $('body,html').animate({
           scrollTop:$(this.hash).offset().top
       },1000)
   })
$('#send').on('click',()=>{
    console.log('hello');
    $('#containers2').fadeOut(3000);
})
});