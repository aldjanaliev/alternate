$(document).ready(function() {
  const lastQuiz = $('.quiz').length
  $(`.quiz-${lastQuiz-2}`).addClass('quiz-load')

	$('.main_slider').each(function(i, e){
    let slideTab = $(e).closest('.slider_wrap').find('.tab_slider')
    $(e).slick({
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
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
      asNavFor: slideTab,
      focusOnSelect: true
    })
	})

  $('.sale_slider').slick({
    dots: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 1,
          dots: true,
        }
      }
    ]
  })

  // ====== inputmask ======
  $('[type="tel"]').inputmask('+7 (999) 999-99-99');

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

  $('[type="tel"]').on('input', function(){
    const formBtn = $(this).closest('form').find('button[type="submit"]')
    if(!$(this).val().includes('_')){
      formBtn.addClass('active')
    } else if(formBtn.hasClass('active')){
      console.log(123)
      formBtn.removeClass('active')
    }
  });

  // send form
  $('form').on('submit', function(){
    event.preventDefault();
    var th = $(this);
    // $.ajax({
    //   type: "POST",
    //   url: "mail.php",
    //   data: th.serialize(),
    // }).done(function() {
    //   th.trigger("reset");
    //   console.log('send is success')
        if($(this).hasClass('form_quiz')){
          quizChange(lastQuiz - 1, lastQuiz)
          ym(92907142, 'reachGoal', 'contacts')
        } else if($(this).hasClass('form_catalog')){
          ym(92907142, 'reachGoal', 'katalog')
          window.open('files/catalog.pdf')
        } else{
          if($(this).hasClass('form_designer')){
            ym(92907142, 'reachGoal', 'design')
          } else if($(this).hasClass('form_pay')){
            ym(92907142, 'reachGoal', 'rassrochka')
          } else if($(this).hasClass('form_consult')){
            ym(92907142, 'reachGoal', 'konsult')
          } else if($(this).hasClass('form_moika')){
            ym(92907142, 'reachGoal', 'moika')
          } else if($(this).hasClass('form_stoleshniza')){
            ym(92907142, 'reachGoal', 'stoleshniza')
          } else if($(this).hasClass('form_skidka')){
            ym(92907142, 'reachGoal', 'skidka')
          } else if($(this).hasClass('form_montag')){
            ym(92907142, 'reachGoal', 'montag')
          }
          window.location.href = 'result.html';
        }
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

  // счетчик
  function outNum(num, elem) {
    const time = 3000
    const step = 2
    let e = document.querySelector(elem)
    n = 0
    let t = Math.round(time / (num / step))
    let interval = setInterval(() => {
      n = n + step
      if (n == num) {
        clearInterval(interval)
      }
      e.innerHTML = n
    }, t)
  };
  // прогресс
  function loadStart() {
    $('.progress').append(`
      <div class="load">
        <svg class="origami" width="360" height="360" viewBox="-3 -3 41 41">
          <g class="group2">
            <path d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#836A36" stroke-width="1.5" stroke-linecap="round">
            <animate attributename="stroke-dasharray" dur="3s" from="0, 100" to="100, 100" fill="freeze"></animate>
          </g>
          <div class="load_body">
            <span class="load-num load-counter">100</span>
            <span class="load-num">%</span>
          </div>
        </svg>
      </div>
    `)
  }

  //  функционал смены квизов
  let loadQuizCount = 0
  function loadQuiz(){
    loadStart()
    outNum(100, ".load-counter")
    setTimeout(() => {
      gifName = $('.quiz-gif .rad:checked').val()
      gifNum = $('.quiz-gif .rad:checked').closest('.quiz_item').index() + 1
      $('.quiz_side-title__js').text(gifName)
      $('.js-quiz_contact-img').attr("src",`img/quiz/gif-${gifNum}.jpg`)
      loadQuizCount++
      quizChange(lastQuiz - 2, lastQuiz - 1)
    },3500)
  }
  function quizChange(arg1, arg2){
    ym(92907142, 'reachGoal', 'Q' + (arg2 - 1))
    setTimeout(function() {
      $('.quiz-' + arg1).css({'opacity':'0'})
      $('html, body').animate({
        scrollTop: $('#quiz').offset().top
      });
      // move tab-load
      if(arg2 < lastQuiz - 1){
        let count = arg2
        let tabWidth = Math.round(count * 100 / (lastQuiz - 2))
        if(count === lastQuiz - 2){
          tabWidth = 100
        }
        $('.quiz_tab-load').css('width', tabWidth + '%')
        $('.quiz_tab-percent').text(tabWidth)
      }
    },1000)
    setTimeout(function() {
      $('.quiz-' + arg1).hide()
      $('.quiz-' + arg2).css({'display':'flex'})
    },1300)
    setTimeout(function() {
      $('.quiz-' + arg2).css({'opacity':'1'})
      if(arg2 === lastQuiz - 2 && loadQuizCount === 0){
        setTimeout(() => {
          loadQuizCount++
          loadQuiz()
        },200)
      } else if(arg2 === lastQuiz - 1){
        $(`.quiz-wrap`).addClass('quiz_get-contact')
      } else if(arg2 === lastQuiz){
        $(`.quiz-wrap`).addClass('quiz_end')
      }
    },1350)
  }

  
  $('.quiz_btn').on('click', function(){
    const currentQuiz = $(this).closest('.quiz').index() + 1
    let nextQuiz = currentQuiz + 1
    if($(this).hasClass('quiz_btn__prev')){
      nextQuiz = currentQuiz - 1
      //очищаем предыдущий вопрос
      const prevQuiz = $(`.quiz`).eq(currentQuiz - 2)
      prevQuiz.find('input:checked').prop('checked', false)
      prevQuiz.find('.quiz_btn__next').removeClass('active')
      if(prevQuiz.find('textarea').length != 0){
        prevQuiz.find('textarea').val('')
        prevQuiz.find('textarea').closest('.quiz_item').find('input').val('')
      }
    }
    quizChange(currentQuiz,nextQuiz)
  })

  $('.rad, .check').on('change',function(){
    const nextBtn = $(this).closest('.quiz').find('.quiz_btn__next')
    if($(this).hasClass('rad')){
      nextBtn.addClass('active')
      nextBtn.click()
    }
    if($(this).hasClass('check')){
      if($(this).closest('.quiz_items').find('input:checked').length === 0){
        nextBtn.removeClass('active')
      } else{
        nextBtn.addClass('active')
      }
      if($(this).val() === "Пока не решил"){
        $(this).closest('.quiz_items').find('input:checked').not($(this)).prop('checked', false)
        nextBtn.addClass('active')
        nextBtn.click()
      }
    }
  })

  $('.quiz_textarea').on('input',function(){
    const textInput = $(this).closest('.quiz_item').find('input')
    const nextBtn = $(this).closest('.quiz').find('.quiz_btn__next')
    if($(this).val().length > 2){
      textInput.val($(this).val())
      if(!textInput.prop('checked')){
        textInput.prop('checked', true)
      }
      if(!nextBtn.hasClass('active')){
        nextBtn.addClass('active')
      }
    } else{
      textInput.val('')
      textInput.prop('checked', false)
      if($(this).closest('.quiz').find('input:checked').length === 0){
        nextBtn.removeClass('active')
        textInput.prop('checked', false)
      }
    }
  })

  $('.h_button').on('click', function(){
    $('.h_mob-add-wrap').slideToggle(300)
  })

  var target = $("#js-w_btns");
  var targetPos = target.offset().top;
  var winHeight = $(window).height();
  var scrollToElem = targetPos - winHeight;
  $(window).scroll(function(){
    var winScrollTop = $(this).scrollTop();
    if($(window).width() < 580){
      if(winScrollTop > scrollToElem && !$('body').hasClass('w_btns-active')){
        $('body').addClass('w_btns-active')
      } else if(winScrollTop < scrollToElem && $('body').hasClass('w_btns-active')) {
        $('body').removeClass('w_btns-active')
      }
    }
  });
  

  
})
