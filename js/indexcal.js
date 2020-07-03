// 选择图片后判断是否上传ajax后端
var filesAjaxIsTrut = false,
    flieIsGet = false;


$('.ritu2').click(function () {
    if ($('.fullname').val() == '' || $('.hospital').val() == '') {
        alert('请输入正确的名字和医院名字')
        return
    } else {

        $.ajax({
            url: "https://ethicon-baoao-video.h5.yscase.com/api/index.php/front/login",
            type: "post",
            data: {
                name: $('.fullname').val(),
                hospital: $('.hospital').val()
            },
            success: function (data) {
                var res = data.data

                user_id = data.data.id;
                console.log(user_id)
                if (data.code == 200) {
                    $(".page1").hide()
                    $(".page2").show()
                } else {
                    alert('111')
                }

            }
        })
    }
})


var i = 5;
$(function () {


    $('.figure4').on('touchmove', function (e) {
        var left = $('.figure4').offset().left
        // var left2 = $('.figure4').offset().left
        var offsetX = e.targetTouches[0].pageX - left

        if (flieIsGet) {
            if (i <= 80) {
                $('.figure4').css('left', i + '%')
                console.log(11)
            } else {

                if (filesAjaxIsTrut) return;
                filesAjaxIsTrut = true;
                $.ajax({
                    url: "https://ethicon-baoao-video.h5.yscase.com/api/index.php/front/save_info",
                    method: "post",
                    dataType: 'json',
                    data: {
                        id: user_id,
                        url: data_url
                    },
                    success: function (result) {
                        console.log(result)

                        if (result.code == 200) {
                            flieIsGet = false
                            alert('视频上传成功')
                            i = 5
                            $('.figure4').css('left', i + '%')
                            $('.butto').show()
                            $('.figure3').hide()
                        }

                    }
                })
            }
            i += offsetX / 10
        }

    })



})





$("#files").change(function () {
    var file = this.files[0];
    var fileName = file.name;

    var suffix = fileName.substring(fileName.lastIndexOf("."), fileName.length).toLowerCase();

    key = key + suffix;


    var observable;
    if (file) {
        // var key = file.name;
        // putExtra.params["x:name"] = key.split(".")[0];
        // 设置next,error,complete对应的操作，分别处理相应的进度信息，错误信息，以及完成后的操作


        var error = function (err) {
            //          $('#上传状态').html("上传出错:" + err.message);

        };

        var complete = function (res) {
            filesAjaxIsTrut = false;
            console.log('上传完成图片地址');
            data_url = domain + res.key
            console.log(data_url)

            // $('.figure4').on("touchend", function () {
            //     
            // })
            $('.butto').hide()
            $('.figure3').show()

            alert('视频选择成功，滑动滑块完成上传')
            flieIsGet = true;
            initUpload();
        };

        var next = function (response) {

            var total = response.total;

        };
        // 调用sdk上传接口获得相应的observable，控制上传和暂停

        observable = qiniu.upload(file, key, token, putExtra, config);
        subscription = observable.subscribe({
            next: next,
            error: error,
            complete: complete
        });

    }
})




var user_id;
var data_url = '';
var token = '';
var key = '';
var domain = '';
var config = {};
var putExtra = {};
initUpload();
// 初始化上传
function initUpload() {
    $.ajax({
        url: "https://ethicon-baoao-video.h5.yscase.com/api/index.php/front/get_token",
        success: function (res) {
            console.log(res);
            token = res.data.uptoken;
            key = res.data.key;
            domain = res.data.domain;
            config = {
                useCdnDomain: true,
                retryCount: 6
            };
            putExtra = {
                fname: "",
                params: {},
                mimeType: null
            };

        }

    })
}

  //或
  $('input, textarea').on('blur',function(){
    // 滚动到顶部
    window.scroll(0,0);
    // 滚动到底部
    window.scrollTo(0, document.documentElement.clientHeight);
  });

document.body.addEventListener('touchmove', function (e) {
    e.preventDefault();
}, {
    passive: false
});

window.alert = function(name){
            var iframe = document.createElement("IFRAME");
            iframe.style.display="none";
            iframe.setAttribute("src", 'data:text/plain,');
            document.documentElement.appendChild(iframe);
            window.frames[0].window.alert(name);
            iframe.parentNode.removeChild(iframe);
        };