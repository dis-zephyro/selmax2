var h_hght = 108; // высота шапки
var h_mrg = 0;    // отступ когда шапка уже не видна
$(function(){
    $(window).scroll(function(){
        var top = $(this).scrollTop();
        var elem = $('.topnav');
        if (top+h_mrg < h_hght) {
            elem.css('top', (h_hght-top));
        } else {
            elem.css('top', h_mrg);
        }
    });
});



$('.topnav li a').click(function(){
    var str=$(this).attr('href');
    $.scrollTo(str, {offset:-50});
    return false;
});


$(".certification a").fancybox({
    "padding" : 0
});

$(".btn-popup").fancybox({
    "padding" : 0
});


$(document).ready(function() {

    $('.btn-submit').click(function() {

        $('body').find('form:not(this)').children('label').removeClass('red'); //удаление всех сообщение об ошибке(валидатора)
        var answer = checkForm($(this).closest('form').get(0)); //ответ от валидатора
        if(answer != false)
        {
            var $form = $(this).closest('form'),
                name    =     $('input[name="name"]', $form).val(),
                phone   =     $('input[name="phone"]', $form).val(),
                city    =     $('input[name="city"]', $form).val(),
                org     =     $('input[name="organisation"]', $form).val(),
                message =     $('input[name="city"]', $form).val();
            console.log(name, phone);
            $.ajax({
                type: "POST",
                url: "form-handler.php",
                data: {name: name, phone: phone, city: city, org: org, message: message}
            }).done(function(msg) {
                console.log(name, phone, city, org, org);
                $('form').find('input[type=text], textarea').val('');
                console.log('удачно');
                $.fancybox(
                    '<div class="done">'+ '<span class="done-title">Спасибо, Ваша заявка принята!</span><br/>В скором времени с вами свяжутся наши менеджеры' +'</div>',
                    {
                        'autoDimensions'  : false,
                        'padding': 0,
                        'transitionIn'    : 'none',
                        'transitionOut'   : 'none',
                        'closeBtn' : false
                    }
                );
                setTimeout("$.fancybox.close()", 3000);
            });
        }
    });
});



// Подключние Яндекс-Карты

ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map('map', {
        center: [44.1904,42.0512], // Казань
        zoom: 16,
        controls: []
    });

    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: ''
    }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'img/placemark.png',
        // Размеры метки.
        iconImageSize: [356, 82],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [20, -41]
    });

    myMap.behaviors.disable('scrollZoom');
    myMap.geoObjects.add(myPlacemark);
}