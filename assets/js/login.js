$(function(){
    // 点击注册账号
    $('#link_reg').on('click',()=>{
        $('.login-box').hide()
        $('.reg-box').show()
       
    })
   

    // 点击登录
    $('#link_login').on('click',()=>{
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 从layui获取form对象
    let form = layui.form
    let layer = layui.layer
    form.verify({
       pwd: [/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],
       
        // 验证两次密码是否一致
        repwd:function(value){
          let pwd  =  $('#form_reg [name=password]').val()
          if(pwd !==value)  return '两次密码输入不正确！'
        }

       
    })

    // 注册事件
   $('#form_reg').on('submit',e=>{
       e.preventDefault()
       let data = {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
       $.post('http://www.liulongbin.top:3007/api/reguser',
       data,
       function(res){
        if(res.status !== 0) return layer.msg(res.message)
        layer.msg('注册成功，请登录！')
        $('#link_login').click()
       })
   })

//    登录事件
   $('#form_login').submit( function(e){
    e.preventDefault()
       $.ajax({
        method: "POST",
        url: "http://www.liulongbin.top:3007/api/login",
        data: $(this).serialize(),
        success: res=> {
            if(res.status !==0 ) return layer.msg('登录失败！')
            layer.msg('登录成功!')
            localStorage.setItem('token',res.token)
            location.href= '/index.html'
        }
      });
   })

})
