$(function(){
    // 调用getUserInfo获取用户基本信息
    getUserInfo()
    const layer = layui.layer
     $('#btnLogout').on('click',()=>{
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            // 清空本地存储的token
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
          });
     })

  


    function getUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            //请求头字段
            // headers:{
            //   Authorization:localStorage.getItem('token') || ''
            // } , 
            
            success:function(res){
              if(res.status !==0) return layui.layer.msg('获取用户信息失败!')
            // 调用renderAvatar渲染用户头像
            renderAvatar(res.data)
            },
            // complete:function(res){
            //     if(res.responseJSON.status ===1 && res.responseJSON.message === "身份认证失败！"){
            //         localStorage.removeItem('token')
            //         location.href = '/login.html'
            //     }
            // }
        })

    }

    // 渲染用户头像
    function renderAvatar(user){
        const name = user.nickname || user.username
        $('#welcome').html('欢迎&nbsp;&nbsp;'+ name)
        if(user.user_pic !== null){
            $('.layui-nav-img').attr('src',user.user_pic).show()
            $('.text-avatar').hide()
        }else{
            $('.layui-nav-img').hide()
            const first = name[0].toUpperCase()
            $('.text-avatar').html(first).show()
        }
    }
})