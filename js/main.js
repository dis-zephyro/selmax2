var h_hght = 108; // ������ �����
var h_mrg = 0;    // ������ ����� ����� ��� �� �����
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

        $('body').find('form:not(this)').children('label').removeClass('red'); //�������� ���� ��������� �� ������(����������)
        var answer = checkForm($(this).closest('form').get(0)); //����� �� ����������
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
                console.log('������');
                $.fancybox(
                    '<div class="done">'+ '<span class="done-title">�������, ���� ������ �������!</span><br/>� ������ ������� � ���� �������� ���� ���������' +'</div>',
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



// ���������� ������-�����

ymaps.ready(init);

function init () {
    var myMap = new ymaps.Map('map', {
        center: [44.1904,42.0512], // ������
        zoom: 16,
        controls: []
    });

    myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
        hintContent: ''
    }, {
        // �����.
        // ���������� ������� ������ ��� ������.
        iconLayout: 'default#image',
        // ��� ����������� ������ �����.
        iconImageHref: 'img/placemark.png',
        // ������� �����.
        iconImageSize: [356, 82],
        // �������� ������ �������� ���� ������ ������������
        // � "�����" (����� ��������).
        iconImageOffset: [20, -41]
    });

    myMap.behaviors.disable('scrollZoom');
    myMap.geoObjects.add(myPlacemark);
}