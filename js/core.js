$(document).ready(function() {
	// ====== inputmask ======
	$('[type="tel"]').inputmask('+7 (999) 999-99-99');

	$('.main_slider').each(function(i, e){
    let slideTab = $(e).closest('.slider_wrap').find('.tab_slider')
    $(e).slick({
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    	//autoplay: 300,
      asNavFor: slideTab
    })
	})
	$('.tab_slider').each(function(i, e){
    let slideTab = $(e).closest('.slider_wrap').find('.main_slider')
    let numTabSlider = 4
    if($(e).closest('.works_card').length){
      numTabSlider = 3
    }
    $(e).slick({
      dots: false,
      arrows: false,
      infinite: false,
      slidesToShow: numTabSlider,
      slidesToScroll: 1,
    //   autoplay: 300,
      asNavFor: slideTab,
      focusOnSelect: true
    })
	})

  $('.sale_slider').slick({
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
  //   autoplay: 300,
  })

	if(document.querySelector('.to-show_btn')){
		let historyBtn = document.querySelectorAll('.to-show_btn')
    historyBtn.forEach(el => {
      el.addEventListener('click', function(){
        let blockHide = $(this).closest('section').find('.block__hide')
        if(this.textContent === 'Показать ещё'){
          blockHide.slideDown(300)
          blockHide.find('.slider_wrap > div').slick('refresh')
          this.textContent = 'Скрыть'
        } else{
          blockHide.slideUp(300)
          this.textContent = 'Показать ещё'
        }
      })
    })
	}

  if(document.querySelector('.widget_close')){
    const widgetClose = document.querySelector('.widget_close')
    widgetClose.addEventListener('click', function(){
      const widget = document.querySelector('.widget')
      widget.style.opacity = 0
      setTimeout(() => {
        widget.style.display = "none"
      },300)
    })
  }

  $('.scroll').on('click', function(){
    let href = $(this).attr('href');
    $('html, body').animate({
        scrollTop: $(href).offset().top
    });
    return false;
  })

  if(document.querySelector('.sale_card-btn')){
    const saleBtn = document.querySelectorAll('.sale_card-btn')
    saleBtn.forEach(btn => {
      btn.addEventListener('click', function(){
        if(this.closest('.sale_slide-in').className != 'active'){
          if(document.querySelector('.sale_slide-in.active')){
            document.querySelector('.sale_slide-in.active').classList.remove('active')
          }
          this.closest('.sale_slide-in').classList.add('active')
        }
      })
    })
    const saleClose = document.querySelectorAll('.sale_form-close')
    saleClose.forEach(close => {
      close.addEventListener('click', function(){
        this.closest('.sale_slide-in').classList.remove('active')
      })
    })
  }

  // ====== start  дата в акции ======
  var options = {
    month: 'long',
    day: 'numeric',
  };
  let date = new Date();
  date.setDate(date.getDate());
  let m = date.getMonth()+1;
  let date2 = new Date(2023, m, 0)

  date = date.toLocaleString("ru", options)
  date = date.split(' ')[1]

  $('.js-day').html(date2.getDate() + " " + date );

  switch(m){
    case 1:
      $('.js-month').html("январе")
      break;
    case 2:
      $('.js-month').html("феврале")
      break;
    case 3:
      $('.js-month').html("марте")
      break
    case 4:
      $('.js-month').html("апреле")
      break;
    case 5:
      $('.js-month').html("мае")
      break;
    case 6:
      $('.js-month').html("июне")
      break;
    case 7:
      $('.js-month').html("июле")
      break
    case 8:
      $('.js-month').html("августе")
      break;
    case 9:
      $('.js-month').html("сентябре")
      break;
    case 10:
      $('.js-month').html("октябре")
      break;
    case 11:
      $('.js-month').html("ноябре")
      break
    case 12:
      $('.js-month').html("декабре")
      break;
  }

  // send form
  $('form').on('submit', function(){
    event.preventDefault();
    var th = $(this);
    window.open('result.html')
    // $.ajax({
    //   type: "POST",
    //   url: "mail.php",
    //   data: th.serialize(),
    // }).done(function() {
    //   th.trigger("reset");
    //   console.log('send is success')
    // });
    return false;
  });

  // video
  $(document).on("click", ".video-close", function(){
        $(".video-open").removeClass("video-open")
        $("#video")[0].muted = true
    })
    $(document).on("click", ".video-close-always", function(){
        $(".video").remove()
    })
    $(document).on("click", ".video", function(e){
        if($(e.target).is(".video-close") || $(e.target).is(".video-close-always")) return false
        let vd = $(this)
        if(!vd.hasClass("video-open")){
            vd.addClass("video-open")
            $("#video")[0].muted = false
        }
    })

})
