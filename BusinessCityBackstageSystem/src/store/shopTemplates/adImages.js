import axios from 'axios'

const state={
    templateID:'',//模板ID 新增默认为 0
    templateName:'',//模板名称
    templateType:'',//模板类别 
    templateInfo:[  
        {
            index:1, // 模块所在位置
            indexInfo:0, // 0 图片广告
            imgArr:[ //图片数组  (最多5张图片)
                {
                    index:1, //图片位置标识1
                    url:'', //图片的商品链接地址
                    image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304769&di=9dc8aef46668f5f48a87293a77a41282&imgtype=0&src=http%3A%2F%2Fpic110.nipic.com%2Ffile%2F20160927%2F20860925_093853370000_2.jpg'
                    //图片地址
                },{
                    index:2,//图片位置标识1
                    url:'',//图片的商品链接地址
                    image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304769&di=9dc8aef46668f5f48a87293a77a41282&imgtype=0&src=http%3A%2F%2Fpic110.nipic.com%2Ffile%2F20160927%2F20860925_093853370000_2.jpg'
                     //图片地址
                }
            ]
        },
         {
            index:3, //模块所在位置
            indexInfo:1, // 1 商品模块
            listStyle:0, // 列表风格 0 无框 1 线框 2 条框
            productImgURL1:'',//商品1链接地址
            productImgSrc1:'',//商品1图片地址
            productImgURL2:'',//商品2链接地址
            productImgSrc2:'',//商品2图片地址
            productImgURL3:'',//商品3链接地址
            productImgSrc3:'' //商品3图片地址
         },
         {
            index:2,   //模块所在位置
            indexInfo:2, // 2 标题模块
            mainTitle:'BACK TO SCHOOL SEASONAL DISCOUNT', //主标题
            mainTitleColor:'#000', // 主标题颜色
            subTitle:'开学季优惠', //副标题
            subTitleColor:'#000' // 副标题颜色
         },
         {
            index:4, //模板所在位置
            indexInfo:3, // 3 分类模块
            classArr:[ //分类图片数组 (无限张图片)
                {
                    index:1,//分类图片位置标识
                    className:'',//分类名称
                    classUrl:'', //分类链接地址
                    classImage:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304769&di=9dc8aef46668f5f48a87293a77a41282&imgtype=0&src=http%3A%2F%2Fpic110.nipic.com%2Ffile%2F20160927%2F20860925_093853370000_2.jpg'
                     //分类图片地址
                },{
                    index:2,//分类图片位置标识
                    className:'',//分类名称
                    classUrl:'',//分类链接地址
                    classImage:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304769&di=9dc8aef46668f5f48a87293a77a41282&imgtype=0&src=http%3A%2F%2Fpic110.nipic.com%2Ffile%2F20160927%2F20860925_093853370000_2.jpg'
                    //分类图片地址
                }
            ]
        },
        {
            index:5, //模板所在位置
            indexInfo:4, // 4 橱窗1模块
            window1Arr:[ //橱窗1图片数组 (最多4张图片)
                {
                    index:1,//橱窗1图片位置标识
                    borderStyle:0,//橱窗1边框风格
                    mainName:'',//橱窗1主标题
                    subName:'',//橱窗1副标题
                    window1Url:'',//橱窗1链接地址
                    window1Image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304769&di=9dc8aef46668f5f48a87293a77a41282&imgtype=0&src=http%3A%2F%2Fpic110.nipic.com%2Ffile%2F20160927%2F20860925_093853370000_2.jpg'
                    //橱窗1图片地址
                },{
                    index:2,//橱窗1图片位置标识
                    borderStyle:0,//橱窗1边框风格
                    mainName:'',//橱窗1主标题
                    subName:'',//橱窗1副标题
                    window1Url:'',//橱窗1链接地址
                    window1Image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304769&di=9dc8aef46668f5f48a87293a77a41282&imgtype=0&src=http%3A%2F%2Fpic110.nipic.com%2Ffile%2F20160927%2F20860925_093853370000_2.jpg'
                     //橱窗1图片地址
                }
            ]
        },
        {
            index:6, //模板所在位置
            indexInfo:5, // 5 橱窗2模块
            window2Arr:[ //橱窗2图片数组(最多6张图片)
                {
                    index:1,//橱窗2图片位置标识
                    borderStyle:0,//橱窗2边框风格
                    mainName:'',//橱窗2主标题
                    subName:'',//橱窗2副标题
                    window1Url:'',//橱窗2链接地址
                    window1Image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304769&di=9dc8aef46668f5f48a87293a77a41282&imgtype=0&src=http%3A%2F%2Fpic110.nipic.com%2Ffile%2F20160927%2F20860925_093853370000_2.jpg'
                    //橱窗2图片地址
                },{
                    index:2,//橱窗2图片位置标识
                    borderStyle:0,//橱窗2边框风格
                    mainName:'',//橱窗2主标题
                    subName:'',//橱窗2副标题
                    window1Url:'',//橱窗2链接地址
                    window1Image:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1517225304769&di=9dc8aef46668f5f48a87293a77a41282&imgtype=0&src=http%3A%2F%2Fpic110.nipic.com%2Ffile%2F20160927%2F20860925_093853370000_2.jpg'
                     //橱窗2图片地址
                }
            ]
        }
    ]
}
const mutations={};
const actions={
    
};
export default{
    state,
    mutations,
    actions
}