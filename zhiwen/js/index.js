$(function(){
	$('#search_button').button({
		icons:{
			primary:'ui-icon-search'
		},
		//text:false
	});


    /*      提问     */
    $('#question_button').button({
        icons:{
            primary:'ui-icon-lightbulb'
        },
        //text:false
    }).click(function(){
        if($.cookie('user')){
            $('#question').dialog('open');
        }else{
            $('#error').dialog('open');
            setTimeout(function(){
               $('#error').dialog('close'); 
               $('#login').dialog('open');
            },1000);
        }
    });

    $.ajax({
        url:'show_content.php',
        type:'POST',
        success:function(response,status,xhr){
            var json=$.parseJSON(response);
           // alert(json);
            var html='';
            var arr=[];
            var summary=[];
            $.each(json,function(index,value){
                html+='<h4>'+value.user+'发表于'+value.date+'</h4>'+'<h3>'+value.title+'</h3>'+'<div class="editor">'+value.content+'</div><div class="bottom"><span class="comment" data-id="'+value.id+'">'+value.count+'条评论</span><span class="up" >收起</span>'+'</div><hr noshade="noshade" size="1" /><div class="comment_list"></div>';
            });

            $('.content').append(html);
            $.each($('.editor'),function(index,value){
                arr[index]=$(value).html();
                summary[index]=$(value).html().substr(0,100);
                if(summary[index].substring(99,100)=='<'){
                     summary[index]=replacePos(summary[index],100,'');
                }
                if(summary[index].substring(98,100)=='</'){
                     summary[index]=replacePos(summary[index],100,'');
                     summary[index]=replacePos(summary[index],99,'');
                }
                if($(value).html().length>50){
                    summary[index]+='...<span class="down">显示全部</span>'
                    $(value).html(summary[index]);
                }
            });
            $('.bottom .up').hide();
            $.each($('.editor'),function(index,value){
                $(this).on('click','.down',function(){
                    $('.editor').eq(index).html(arr[index]);
                    $(this).hide();
                    $('.bottom .up').eq(index).show();
                });
            });
            $.each($('.bottom'),function(index,value){
                $(this).on('click','.up',function(){
                    $('.editor').eq(index).html(summary[index]);
                    $(this).hide();
                    $('.editor .down').eq(index).show();
                });
            });

            $.each($('.bottom'),function(index,value){
                $(this).on('click','.comment',function(){
                    var comment_this=this;
                    if($.cookie('user')){
                        if(!($('.comment_list').eq(index).has('form').length)){
                            
                             $.ajax({
                                url:'show_comment.php',
                                type:'POST',
                                data : {
                                    titleid : $(comment_this).attr('data-id'),
                                },
                                beforeSend:function(jqXHR,settings){
                                    $('.comment_list').eq(index).append('<dl class="comment_load" ><dd>正在加载评论</dd></dl>')
                                },
                                success:function(response,status){
                                    $('.comment_list').eq(index).find('.comment_load').hide();
                                    var json_comment=$.parseJSON(response);
                                    $.each(json_comment,function(index2,value){
                                        //if(value.titleid == $('.comment').eq(index).attr('data-id') ){
                                             $('.comment_list').eq(index).append('<dl class="comment_content"><dt>'+value.user+'</dt><dd>'+value.comment+'</dd><dd class="date">'+value.date+'</dd></dl>');
                                        //}
                                          
                                     });
                                    $('.comment_list').eq(index).append('<form><dl class="comment_add"><dt><textarea name="comment"></textarea></dt><dd><input type="hidden" name="titleid" value="'+$('.comment').eq(index).attr('data-id')+'"/><input type="hidden" name="user" value="'+$.cookie('user')+'" /></dd><dd><input type="button" value="发表" /></dd></dl></form>');
                                    $('.comment_list').eq(index).find('input[type=button]').button().click(function(){
                                       var _this=this;
                                       $('.comment_list').eq(index).find('form').ajaxSubmit({
                                        url:'add_comment.php',
                                        type:'POST',
                                        beforeSubmit:function (formData, jqForm, options){
                                            $(_this).button('disable');
                                        },
                                        success:function(responseText,statusText){
                                            
                                            if (responseText) {
                                                $(_this).button('enable');
                                                var date=new Date();
                                                $('.comment_list').eq(index).prepend('<dl class="comment_content"><dt>'+$.cookie("user")+'</dt><dd>'+$('.comment_list').eq(index).find('textarea').val()+'</dd><dd>'+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds()+'</dd></dl>');
                                                setTimeout(function () {

                                                    $('.comment_list').eq(index).find('form').resetForm();
                                                }, 1000);
                                             }
                                        },
                                       });
                                   });
                                },
                             });
                        }
                       if($('.comment_list').eq(index).is(':hidden')){
                          $('.comment_list').eq(index).show();
                      }else{
                        $('.comment_list').eq(index).hide(); 
                      }
                      
                     }else{
                       $('#error').dialog('open');
                       setTimeout(function(){
                         $('#error').dialog('close'); 
                        $('#login').dialog('open');
                      },1000);
                    }
                });           
            });
            



        }, 
    });

    

    $('#question').dialog({
        autoOpen:false,
        modal:true,
        resizable:false,
        width:500,
        height:360,
        buttons:{
            '发布':function(){
                $(this).ajaxSubmit({
                    url:'add_content.php',
                    type:'POST',
                    data:{
                        user:$.cookie('user'),
                        content : $('.uEditorIframe').contents().find('#iframeBody').html(),
                    },
                    beforeSubmit : function (formData, jqForm, options) {
                        $('#loading').dialog('open');
                        $('#question').dialog('widget').find('button').eq(1).button('disable');
                    },
                    success : function (responseText, statusText) {
                        if (responseText) {
                            $('#question').dialog('widget').find('button').eq(1).button('enable');
                            $('#loading').css('background', 'url(img/success.gif) no-repeat 20px center').html('问题新增成功...');
                            $('.uEditorIframe').contents().find('#iframeBody').html('请输入问题描述...');
                            setTimeout(function () {
                                $('#loading').dialog('close');
                                $('#question').dialog('close');
                                $('#question').resetForm();
                                $('#loading').css('background', 'url(img/loading.gif) no-repeat 20px center').html('数据交互中...');
                            }, 1000);
                        }
                    },
                });
            },
        },
    });

    $('.uEditorCustom').uEditor();

    /*        数据交互中 提示框       */
    $('#loading').dialog({
        autoOpen:false,
        modal:true,
        closeOnEscape:false,
        resizable:false,
        draggable:false,
        width:180,
        height:50
    }).parent().find('.ui-widget-header').hide();


    /*        出错提示框       */
    $('#error').dialog({
        autoOpen:false,
        modal:true,
        closeOnEscape:false,
        resizable:false,
        draggable:false,
        width:180,
        height:50
    }).parent().find('.ui-widget-header').hide();



    /*        注册界面       */
    $('#reg_a').click(function(){
        $('#reg').dialog('open');
    });
    $("#reg").dialog({
    	autoOpen:false,
    	modal:true,
    	resizable:false,
    	width:320,
    	height:340,
    	buttons:{
    		'提交':function(){
                $(this).submit();
    		}
    	}
    }).buttonset().validate({
        submitHandler:function(form){
            $(form).ajaxSubmit({
                url:'add.php',
                type:'POST',
                beforeSubmit:function(){
                    
                    $('#loading').dialog('open');
                    $('#reg').dialog('widget').find('button').eq(2).button('disable');
                },
                success:function(responseText,statusText){
                    if(responseText){
                        
                        $('#reg').dialog('widget').find('button').eq(2).button('enable');
                        $('#loading').html('注册成功');
                        $.cookie('user',$('#user').val());
                        setTimeout(function(){
                            $('#loading').dialog('close');
                            $('#reg').dialog('close');
                            $('#reg').resetForm();
                            $('#reg .star').html('*').removeClass('succ');
                            $('#loading').html('数据交互中。。。');
                            $('#member,#logout').show();
                            $('#reg_a,#login_a').hide();
                            $('#member').html($.cookie('user'));
                        },1000);
                    }
                },
             
            });
        },
        showErrors:function(errorMap,errorList){

            var error=this.numberOfInvalids();
            if(error>0){
                $('#reg').dialog('option','height',error*20+340);
            }
            else{
                $('#reg').dialog('option','height',340);
            }
           this.defaultShowErrors();
        },
        highlight:function(element,errorClass){
            $(element).css('border','1px solid red');
            $(element).parent().find('.star').html('*').removeClass('succ');
        },
        unhighlight:function(element,errorClass){
            $(element).css('border','1px solid #ccc');
            $(element).parent().find('.star').html('').addClass('succ');
        },
        errorLabelContainer:'ol.errorlabel',
        wrapper:'li',
        rules:{
            user:{
                required:true,
                minlength:2,
                remote:{
                    url:'is_user.php',
                    type:'POST'
                }
            },
            password:{
                required:true,
                minlength:6,
            },
            email:{
                required:true,
                email:true,
            },
            date:{
                date:true
            }
        },
        messages:{
            user:{
                required:'账号不能为空',
                minlength:jQuery.format('请输入不少于{0}位'),
                remote:'账号被占用'
            },
            password:{
                required:'密码不能为空',
                minlength:jQuery.format('请输入不少于{0}位')
            },
            email:{
                required:'邮箱不能为空',
                email:'请输入正确的邮箱'
            },
        },
    });
    // $('#reg input[title]').tooltip({
    // 	position:{
    // 		my:'left center',
    // 		at:'right+5 center'
    // 	},
    // 	show:false,
    // 	hide:false
    // });



    /*设置邮箱的自动补全*/
    $('#email').autocomplete({
        delay:0,
         autoFocus:true,
        source:function(request,response){
            //获取用户输入的内容
           // alert(request.term);
            //response是绑定数据源的,不会根据你搜索的关键字过滤无关结果，而是把整个过程呈现出来
            var hosts=['qq.com','163.com','gmail.com','hotmail.com','123.com'];
            var term=request.term,//获取用户输入的内容,
                name=term,//邮箱的用户名
                host='',//邮箱的域名
                ix=term.indexOf('@'),
                result=[];
            result.push(term);
            if(ix>-1){
                name=term.slice(0,ix);
                host=term.slice(ix+1);
            }
            if(name){
                var freindhost=[];
                 if(host){
                    freindhost=$.grep(hosts,function(value,index){
                        return value.indexOf(host);
                    })
                }else{
                    freindhost=hosts;
                }
            }
            var freind=$.map(freindhost,function(value,index){
                return name+'@'+value;
            })
            result=result.concat(freind)
            response(result);
        }
       
    });
 /*设置邮箱的自动补全     结束*/
 

 /*日历ui  */
  $('#birthday').datepicker({
    showOtherMonths:true,
    changeMonth:true,
    changeYear:true,
    showOn:'both',
    buttonText:'日历',
    showButtonPanel:'true',
    closeText:'关闭',
    currentText:'今天',
    dayNamesMin:['日','一','二','三','四','五','六'],
    monthNames:['一月','二月',,'三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
    dateFormat:'yy-mm-dd',
    maxDate:0,   //当前日期之后的x天
    yearRange:'1950:2020',
    yearSuffix:'年'
  });


  /*设置cookie   */
  $('#member,#logout').hide();
  if($.cookie('user')){
    $('#member,#logout').show();
    $('#reg_a,#login_a').hide();
    $('#member').html($.cookie('user'));
  }else{
    $('#member,#logout').hide();
    $('#reg_a,#log_a').show();
  }


  /*   退出  */
   $('#logout').click(function(){
    $.removeCookie('user');
    window.location.href='/zhiwen/';
   });


   /*   登录   */
   $('#logging').dialog({
    autoOpen:false,
    modal:true,
    closeOnEscape:false,
    resizable:false,
    draggable:false,
    width:180,
    height:50
   }).parent().find('.ui-widget-header').hide();
   $('#login_a').click(function(){
    $('#login').dialog('open');
   })
   $('#login').dialog({
    autoOpen:false,
    modal:true,
    resizable:false,
    width:300,
    height:240,
    buttons:{
        '登录':function(){
            $(this).submit();
        }
    }
   }).validate({
        submitHandler:function(form){
            $(form).ajaxSubmit({
                url:'login.php',
                type:'POST',
                beforeSubmit:function(){
                    $('#logging').dialog('open');
                    $('#login').dialog('widget').find('button').eq(1).button('disable');
                },
                success:function(responseText,statusText){
                    if(responseText){
                        
                        $('#login').dialog('widget').find('button').eq(1).button('enable');
                        $('#logging').html('登录成功');
                        if($('#expires').is(':checked')){
                              
                                $.cookie('user',$('#login_user').val(),{
                                    expires:7,
                                })
                            }else{
                                $.cookie('user',$('#login_user').val());
                            }
                        setTimeout(function(){
                            $('#logging').dialog('close');
                            $('#login').dialog('close');
                            $('#login').resetForm();
                            $('#login .star').html('*').removeClass('succ');
                            $('#logging').html('登录中。。。');
                            $('#member,#logout').show();
                            $('#reg_a,#login_a').hide();       
                             $('#member').html($.cookie('user'));
                        },1000);
                    }

                }
            })
        },
        showErrors:function(errorMap,errorList){
            var error=this.numberOfInvalids();
            if(error>0){
                $('#login').dialog('option','height',error*20+240);
            }
            else{
                $('#login').dialog('option','height',240);
            }
           this.defaultShowErrors();
        },
        errorLabelContainer:'ol.login_errorlabel',
        wrapper:'li',
        highlight:function(element,errorClass){
            $(element).css('border','1px solid red');
            $(element).parent().find('.star').html('*').removeClass('succ');
        },
        unhighlight:function(element,errorClass){
            $(element).css('border','1px solid #ccc');
            $(element).parent().find('.star').html('').addClass('succ');
        },
        rules:{
            login_user:{
                minlength:2,
                required:true
            },
            login_password:{
                minlength:6,
                required:true,
                remote:{
                    url:'login.php',
                    type:'POST',
                    data:{
                        login_user:function(){
                            return $('#login_user').val();
                        }
                    },
                }
            }
        },
        messages:{
            login_user:{
                required:'请输入用户名',
                minlength:jQuery.format('请输入不少于{0}位用户名')
            },
            login_password:{
                required:'请输入密码',
                minlength:jQuery.format('请输入不少于{0}位密码'),
                remote:'用户名或密码不正确'
            }
        }
   });
  

  /*   选项卡   */
  $('#tabs').tabs();

  /*        折叠菜单       */
  $('#accordion').accordion();
});


function replacePos(strObj,pos,replaceText){
    return strObj.substring(0,pos-1)+replaceText+strObj.substring(pos);
}