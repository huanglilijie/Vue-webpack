<template>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;">
        <title>我的筹款</title>
    </head>
    <body>   
        <div class="wrap">
            <div class="content">
                <div class="clock">
                    <div class="loveresult">梦想进程：</div>
                    <div class="clock">
                        <img src="/static/clock.png" alt="">
                        <div class="money">
                            <span>600</span><span>元</span>
                        </div>
                    </div>
                </div>
                <div class="list">
                    <ul>
                        <li>1.筹款达到1000-2999时，会补贴1000元</li>
                        <li>2.筹款达到3000-4999时，会补贴1500元</li>
                        <li>3.筹款达到5000-8800时，会补贴2000元</li>
                    </ul>
                </div>
                <div class="rest">
                    <h2>距离活动结束还有<span style="font-size:2.0rem">8</span>天</h2>
                    <p> -------- 还没有好友为你筹款 --------</p>
                    <p>加油哦，快去分享吧！大礼包在等着你</p>
                </div>

                <div class="submit">
                    <input class="heart" type="button" value="完成筹款">
                    <div class="more_input">
                        <input type="button" value="查看详情">
                        <input class="share" type="button" value="分享梦想">
                    </div>
                </div>

            </div>

            <!--蒙版层-->
            <div class="mask_1">
            </div>
            <div class="mask_2">
                <img src="/static/mask.png" alt="">
            </div>
        </div>
    </body>
</template>
 <style>
    html,body,ul{
        margin:0;
        padding: 0;
        font-family: 微软雅黑;
        font-size: 12px;
    }
    @media (max-width: 350px) {
  html,body {
    font-size: 10px !important;
    }
    }
    ul{list-style: none}
    .wrap{

    }
    .content{
        width: 100%;
        background:url('/static/bg.png') no-repeat;
        background-size: 100%;
        padding-top: 10px;
        position:absolute;
        top:0;
        left:0;
        z-index: 2;
    }
    /*蒙板*/
    .mask_1{
        background-color:rgba(0,0,0,.5);
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 10;
        text-align: center;
        display: none;
    }
    .mask_2{
        width: 100%;
        position: absolute;
        top: 5vh;
        z-index: 20;
        text-align: center;
        display: none;
    }
    .mask_2 img{
        width:80%;
    }
    .clock{
        width:95%;
        margin:0px auto;
        text-align: center;
        position: relative;
    }
    .clock img{
        width:75%;
    }
    .clock div:nth-child(1){
        width:30% ;
        height:30px;
        line-height: 30px;
        background:url("/static/loveresult.png") no-repeat;
        background-size: 100% 100%;
        font-size: 1.3rem;
        color: white;
    }
    .money{
        width:30%;
        height:30px;
        line-height: 30px;
        background-color: red;
        color:#ffd201;
        background: url("/static/numbg.png")  no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left:50%;
        margin-left: -15%;
        bottom:20%;
    }
    .money span:nth-child(1){
        font-size: 1.5rem;
    }
    .list{
        margin-top: 30px;
    }
    .list ul{
        width:90%;
        margin: 0 auto;
        overflow: hidden;
    }
    .list ul li{
        width:97%;
        height:30px;
        line-height: 30px;
        text-indent:60px;
        margin-top: 8px;
    }
    .list ul li:nth-child(1){
        background: url("/static/car1.png") no-repeat;
        background-size: contain;
        float: left;
    }
    .list ul li:nth-child(2){
        background: url("/static/car2.png") no-repeat;
        background-size: contain;
        float: right;

    }
    .list ul li:nth-child(3){
        background: url("/static/car3.png") no-repeat;
        background-size: contain;
        float: left;
    }
    .rest{
        text-align:center;
        width:90%;
        margin: 0 auto;
    }
    .submit{
        width:90%;
        margin: 0 auto;
    }
    .submit input{
        border: none;
        font-size: 1.5rem;
        height:50px;
        color:white;
    }
    .heart{
        width:100%;
        background-color: #f6ba35;
        border-radius: 10px;
        margin-top: 30px;
        -webkit-appearance : none ;
    }
    .more_input{overflow: hidden;margin:30px 0;}

    .more_input input{
        width:48%;
        background-color: #599c2f;
        border-radius: 5px;
        -webkit-appearance : none ;
    }
    .more_input input:nth-child(1){float: left}
    .more_input input:nth-child(2){float: right}
</style>
<script>
</script>
</html>