import axios from 'axios'

const state={
    templateID:null,//模板ID 新增默认 无
    templateName:'模板名称',//模板名称
    templateType:1,//模板类别 
    description:'',//模板描述
    comlist:[
        {
            componentsName:"imageAds",
            componentsData:{
                importFileUrl:'api/zuul/sms/file/fileUpload',
                admin:{
                    type:'product'
                },
                defaultImgObj:{
                            img: require('./../templateImage/yidong.jpg'),
                            url:'',
                            imgSrc:''
                        },
                ImgArr:[
                        {
                            img: require('./../templateImage/yidong.jpg'),
                            url:'',
                            imgSrc:''
                        },{
                            img: require('./../templateImage/yidong2.jpg'),
                            url:'',
                            imgSrc:''
                        },{
                            img: require('./../templateImage/yidong3.jpg'),
                            url:'',
                            imgSrc:''
                        }
                    ]
            }
        }
    ]
}
const mutations={
    //新增模板
    newAddTemplate(state,type){
        let comlists;
        if(type == '3'){
            comlists = [
                {
                    componentsName:"detailsImage",
                    componentsData:{
                        importFileUrl:'api/zuul/sms/file/fileUpload',
                        admin:{
                            type:'product'
                        },
                        defaultImgObj:{
                                    img: require('./../templateImage/1.jpg'),
                                    url:'',
                                    imgSrc:''
                                },
                        ImgArr:[
                                {
                                    img: require('./../templateImage/1.jpg'),
                                    url:'',
                                    imgSrc:''
                                },{
                                    img: require('./../templateImage/2.jpg'),
                                    url:'',
                                    imgSrc:''
                                }
                            ]
                    }
                }
            ]
        }else{
            comlists = [
                    {
                    componentsName:"imageAds",
                    componentsData:{
                        importFileUrl:'api/zuul/sms/file/fileUpload',
                        admin:{
                            type:'product'
                        },
                        defaultImgObj:{
                                    img: require('./../templateImage/yidong.jpg'),
                                    url:'',
                                    imgSrc:''
                                },
                        ImgArr:[
                                {
                                    img: require('./../templateImage/yidong.jpg'),
                                    url:'',
                                    imgSrc:''
                                },{
                                    img: require('./../templateImage/yidong2.jpg'),
                                    url:'',
                                    imgSrc:''
                                },{
                                    img: require('./../templateImage/yidong3.jpg'),
                                    url:'',
                                    imgSrc:''
                                }
                            ]
                    }
                }
            ]
        }
        state.comlist = comlists
        state.templateID = null
        let templateType = sessionStorage.getItem ("Template_Type");
        let templateNames = sessionStorage.getItem ("Template_Names");
        let templateDes = sessionStorage.getItem ("Template_Des");
        state.templateType = templateType
        state.templateName = templateNames
        state.description = templateDes
    },
    //新增/修改时 在action 里调用这个方法 （ajax 查询）
    INIT_STORE(state,data){
        //console.log(data)
        state.templateID = data.templateID,
        state.templateName = data.templateName,
        state.templateType = data.templateType,
        state.description = data.description,
        state.comlist = JSON.parse(data.comlist)
    },
    //删除模块
    deleteTemplate(state,id){
        let list=[];
        for(let i=0;i<state.comlist.length;i++){
            if(id!=i){
                list.push(state.comlist[i]);
            }
        }
        state.comlist=list;
    },
    //新增轮播广告模块
    imageAdsADD(state){
        let imageAdsDefault = {
            componentsName:"imageAds",
            componentsData:{
                importFileUrl:'api/zuul/sms/file/fileUpload',
                admin:{
                    type:'product'
                },
                defaultImgObj:{
                            img: require('./../templateImage/yidong.jpg'),
                            url:'',
                            imgSrc:''
                        },
                ImgArr:[
                        {
                            img: require('./../templateImage/yidong.jpg'),
                            url:'',
                            imgSrc:''
                        },{
                            img: require('./../templateImage/yidong2.jpg'),
                            url:'',
                            imgSrc:''
                        },{
                            img: require('./../templateImage/yidong3.jpg'),
                            url:'',
                            imgSrc:''
                        }
                    ]
            }
        };
        state.comlist.push(imageAdsDefault)
    },
    //删除轮播广告 图片的方法
    deleteImgAD(state,data){
            let list=[];
            let id = data.dataid;
            let index = data.indexs
            console.log(state.comlist[id])
            console.log(state.comlist[id].componentsData.ImgArr)

            for(let i=0;i<state.comlist[id].componentsData.ImgArr.length;i++){
                if(state.comlist[id].componentsData.ImgArr.length <= 1){
                    return false
                }
                if(index!=i){
                    list.push(state.comlist[id].componentsData.ImgArr[i]);
                }
            }
            state.comlist[id].componentsData.ImgArr=list;
    },
    //新增轮播广告 图片的方法
    addNewImgAD(state,id){
        let adImagedefault = {
            img: require('./../templateImage/yidong.jpg'),
            url:'',
            imgSrc:''
        }
        if(state.comlist[id].componentsData.ImgArr.length >= 5){
             return false
        }
        state.comlist[id].componentsData.ImgArr.push(adImagedefault)
    },
    //轮播广告 图片上传更换方法
    adUploadImage(state,data){
        let id = data.dataid;
        let index = data.indexs;
        let imageUrl = data.imageUrls;
        let images = data.imageSrc
        state.comlist[id].componentsData.ImgArr[index].img = imageUrl
        state.comlist[id].componentsData.ImgArr[index].imgSrc = images
    },
    //自定义链接地址新增修改方法
    saveUrlZDY(state,data){
        let id = data.dataids;
        let indexs = data.index;
        let urls = data.inputs;
        let type = data.type;
        if(type == "imageAds"){
            state.comlist[id].componentsData.ImgArr[indexs].url = urls
        }else if(type == "commodity"){
            if(indexs == 1){
                state.comlist[id].componentsData.productImgURL1 = urls
            }else if(indexs == 2){
                state.comlist[id].componentsData.productImgURL2 = urls
            }else if(indexs == 3){
                state.comlist[id].componentsData.productImgURL3 = urls
            }
        }
    },
    //商品和套餐链接地址新增修改方法
    saveUrlSPXQ(state,data){
        let id = data.dataids;
        let indexs = data.index;
        let urls = data.inputs;
        let type = data.type;
        if(type == "imageAds"){
            state.comlist[id].componentsData.ImgArr[indexs].url = urls
        }else if(type == "commodity"){
            if(indexs == 1){
                state.comlist[id].componentsData.productImgURL1 = urls
            }else if(indexs == 2){
                state.comlist[id].componentsData.productImgURL2 = urls
            }else if(indexs == 3){
                state.comlist[id].componentsData.productImgURL3 = urls
            }
        }
    },
    //新增详情图片模块
    detailsPictureADD(state){
        let imageAdsDefault = {
            componentsName:"detailsImage",
            componentsData:{
                importFileUrl:'api/zuul/sms/file/fileUpload',
                admin:{
                    type:'product'
                },
                defaultImgObj:{
                            img: require('./../templateImage/1.jpg'),
                            url:'',
                            imgSrc:''
                        },
                ImgArr:[
                        {
                            img: require('./../templateImage/1.jpg'),
                            url:'',
                            imgSrc:''
                        },{
                            img: require('./../templateImage/2.jpg'),
                            url:'',
                            imgSrc:''
                        }
                    ]
            }
        };
        state.comlist.push(imageAdsDefault)
    },
    //新增 详情图片的方法
    addNewImgDetail(state,id){
        let adImagedefault = {
            img: require('./../templateImage/1.jpg'),
            url:'',
            imgSrc:''
        }
        // if(state.comlist[id].componentsData.ImgArr.length >= 5){
        //      return false
        // }
        state.comlist[id].componentsData.ImgArr.push(adImagedefault)
    },
    //新增分类模块
    classificationADD(state){
        let classificationDefault = {
            componentsName:"classification",
            componentsData:{
                importFileUrl:'api/zuul/sms/file/fileUpload',
                admin:{
                    type:'product'
                },
                defaultImgObj:{
                            classTitle:'分类1',
                            img: require('./../templateImage/1.jpg'),
                            url:'',
                            imgSrc:''
                        },
                ImgArr:[
                        {
                            classTitle:'分类1',
                            img: require('./../templateImage/1.jpg'),
                            url:'',
                            imgSrc:''
                        },{
                            classTitle:'分类2',
                            img: require('./../templateImage/2.jpg'),
                            url:'',
                            imgSrc:''
                        },{
                            classTitle:'分类3',
                            img: require('./../templateImage/window1-1.jpg'),
                            url:'',
                            imgSrc:''
                        },{
                            classTitle:'分类4',
                            img: require('./../templateImage/window1-2.jpg'),
                            url:'',
                            imgSrc:''
                        },{
                            classTitle:'分类5',
                            img: require('./../templateImage/window1-3.jpg'),
                            url:'',
                            imgSrc:''
                        }
                    ]
            }
        };
        state.comlist.push(classificationDefault)
    }, 
    //改变分类名称的方法
    classNameInput(state,data){
        console.log(data)
        let id = data.dataids;
        let index = data.indexs;
        let className = data.classNames
        state.comlist[id].componentsData.ImgArr[index].classTitle = className
    },
    //删除分类 图片的方法
    deleteImgClass(state,data){
            let list=[];
            let id = data.dataid;
            let index = data.indexs
            console.log(state.comlist[id])
            console.log(state.comlist[id].componentsData.ImgArr)

            for(let i=0;i<state.comlist[id].componentsData.ImgArr.length;i++){
                if(state.comlist[id].componentsData.ImgArr.length <= 1){
                    return false
                }
                if(index!=i){
                    list.push(state.comlist[id].componentsData.ImgArr[i]);
                }
            }
            state.comlist[id].componentsData.ImgArr=list;
    },
    //新增分类 图片的方法
    addNewImgClass(state,id){
        let classificationDefault = {
            classTitle:'分类1',
            img: require('./../templateImage/1.jpg'),
            url:'',
            imgSrc:''
         };
        if(state.comlist[id].componentsData.ImgArr.length >= 10){
           // let classNames = document.querySelectorAll('.className');
           // let length = state.comlist[id].componentsData.ImgArr.length;
            //let classNameWidth =  classNames[0].offsetWidth;
           // let allWidth = classNameWidth * length;
            //this.classNameContent.width = allWidth + 'px';
             return false
        }
        console.log(id)
        state.comlist[id].componentsData.ImgArr.push(classificationDefault)
    },
    //新增橱窗1 模块方法
    windowADD(state){
        let windowDefault = {
            componentsName:"window",
            componentsData:{
                importFileUrl:'api/zuul/sms/file/fileUpload',
                admin:{
                    type:'product'
                },
                ImgArr:[
                    {
                        boxesDivStyle:{
                            boxesBorShow:false,
                            boxesBorHide:true,
                        },
                        lineDivStyle:{
                            lineBorShow:false,
                            lineBorHide:true
                            },
                        notDivBtn:{
                            notBtnShow:true,
                            notBtnHide:false
                        },
                        lineDivBtn:{
                            lineBtnShow:false,
                            lineBtnHide:true
                        },
                        boxesDivBtn:{
                            boxesBtnShow:false,
                            boxesBtnHide:true
                        },
                        img: require('./../templateImage/window1-1.jpg'),
                        imgSrc:'',
                        url:''
                        },{
                            boxesDivStyle:{
                                boxesBorShow:false,
                                boxesBorHide:true,
                            },
                            lineDivStyle:{
                                lineBorShow:false,
                                lineBorHide:true
                                },
                                notDivBtn:{
                                notBtnShow:true,
                                notBtnHide:false
                            },
                            lineDivBtn:{
                                lineBtnShow:false,
                                lineBtnHide:true
                            },
                            boxesDivBtn:{
                                boxesBtnShow:false,
                                boxesBtnHide:true
                            },
                            img: require('./../templateImage/window1-2.jpg'),
                            imgSrc:'',
                            url:''
                        },{
                            boxesDivStyle:{
                                boxesBorShow:false,
                                boxesBorHide:true,
                            },
                            lineDivStyle:{
                                lineBorShow:false,
                                lineBorHide:true
                                },
                                notDivBtn:{
                                notBtnShow:true,
                                notBtnHide:false
                            },
                            lineDivBtn:{
                                lineBtnShow:false,
                                lineBtnHide:true
                            },
                            boxesDivBtn:{
                                boxesBtnShow:false,
                                boxesBtnHide:true
                            },
                            img: require('./../templateImage/window1-3.jpg'),
                            imgSrc:'',
                            url:''
                        },{
                            boxesDivStyle:{
                                boxesBorShow:false,
                                boxesBorHide:true,
                            },
                            lineDivStyle:{
                                lineBorShow:false,
                                lineBorHide:true
                                },
                            notDivBtn:{
                                notBtnShow:true,
                                notBtnHide:false
                            },
                            lineDivBtn:{
                                lineBtnShow:false,
                                lineBtnHide:true
                            },
                            boxesDivBtn:{
                                boxesBtnShow:false,
                                boxesBtnHide:true
                            },
                            img: require('./../templateImage/window1-4.jpg'),
                            imgSrc:'',
                            url:''
                        }
                ]
            }
        };
        state.comlist.push(windowDefault)
    },
    //新增橱窗2 模块方法
    windowsADD(state){
        let windowDefault = {
            componentsName:"window2",
            componentsData:{
                importFileUrl:'api/zuul/sms/file/fileUpload',
                admin:{
                    type:'product'
                },
                ImgArr:[
                    {
                        boxesDivStyle:{
                            boxesBorShow:false,
                            boxesBorHide:true,
                        },
                        lineDivStyle:{
                            lineBorShow:false,
                            lineBorHide:true
                            },
                        notDivBtn:{
                            notBtnShow:true,
                            notBtnHide:false
                        },
                        lineDivBtn:{
                            lineBtnShow:false,
                            lineBtnHide:true
                        },
                        boxesDivBtn:{
                            boxesBtnShow:false,
                            boxesBtnHide:true
                        },
                        img: require('./../templateImage/window1-1.jpg'),
                        imgSrc:'',
                        url:''
                        },{
                            boxesDivStyle:{
                                boxesBorShow:false,
                                boxesBorHide:true,
                            },
                            lineDivStyle:{
                                lineBorShow:false,
                                lineBorHide:true
                                },
                                notDivBtn:{
                                notBtnShow:true,
                                notBtnHide:false
                            },
                            lineDivBtn:{
                                lineBtnShow:false,
                                lineBtnHide:true
                            },
                            boxesDivBtn:{
                                boxesBtnShow:false,
                                boxesBtnHide:true
                            },
                            img: require('./../templateImage/window1-2.jpg'),
                            imgSrc:'',
                            url:''
                        },{
                            boxesDivStyle:{
                                boxesBorShow:false,
                                boxesBorHide:true,
                            },
                            lineDivStyle:{
                                lineBorShow:false,
                                lineBorHide:true
                                },
                                notDivBtn:{
                                notBtnShow:true,
                                notBtnHide:false
                            },
                            lineDivBtn:{
                                lineBtnShow:false,
                                lineBtnHide:true
                            },
                            boxesDivBtn:{
                                boxesBtnShow:false,
                                boxesBtnHide:true
                            },
                            img: require('./../templateImage/window1-3.jpg'),
                            imgSrc:'',
                            url:''
                        },{
                            boxesDivStyle:{
                                boxesBorShow:false,
                                boxesBorHide:true,
                            },
                            lineDivStyle:{
                                lineBorShow:false,
                                lineBorHide:true
                                },
                            notDivBtn:{
                                notBtnShow:true,
                                notBtnHide:false
                            },
                            lineDivBtn:{
                                lineBtnShow:false,
                                lineBtnHide:true
                            },
                            boxesDivBtn:{
                                boxesBtnShow:false,
                                boxesBtnHide:true
                            },
                            img: require('./../templateImage/window1-4.jpg'),
                            imgSrc:'',
                            url:''
                        },{
                            boxesDivStyle:{
                                boxesBorShow:false,
                                boxesBorHide:true,
                            },
                            lineDivStyle:{
                                lineBorShow:false,
                                lineBorHide:true
                                },
                            notDivBtn:{
                                notBtnShow:true,
                                notBtnHide:false
                            },
                            lineDivBtn:{
                                lineBtnShow:false,
                                lineBtnHide:true
                            },
                            boxesDivBtn:{
                                boxesBtnShow:false,
                                boxesBtnHide:true
                            },
                            img: require('./../templateImage/1.jpg'),
                            imgSrc:'',
                            url:''
                        },{
                            boxesDivStyle:{
                                boxesBorShow:false,
                                boxesBorHide:true,
                            },
                            lineDivStyle:{
                                lineBorShow:false,
                                lineBorHide:true
                                },
                            notDivBtn:{
                                notBtnShow:true,
                                notBtnHide:false
                            },
                            lineDivBtn:{
                                lineBtnShow:false,
                                lineBtnHide:true
                            },
                            boxesDivBtn:{
                                boxesBtnShow:false,
                                boxesBtnHide:true
                            },
                            img: require('./../templateImage/2.jpg'),
                            imgSrc:'',
                            url:''
                        }
                ]
            }
        };
        state.comlist.push(windowDefault)
    },
    //橱窗无框 条框 边框方法
    notBorders(state,data){
        let index = data.indexs;
        let id = data.dataids;
        state.comlist[id].componentsData.ImgArr[index].boxesDivStyle.boxesBorShow = false;
        state.comlist[id].componentsData.ImgArr[index].boxesDivStyle.boxesBorShow = false;
        state.comlist[id].componentsData.ImgArr[index].boxesDivStyle.boxesBorHide = true;
        state.comlist[id].componentsData.ImgArr[index].lineDivStyle.lineBorShow = false;
        state.comlist[id].componentsData.ImgArr[index].lineDivStyle.lineBorHide = true;
        state.comlist[id].componentsData.ImgArr[index].notDivBtn.notBtnShow = true;
        state.comlist[id].componentsData.ImgArr[index].notDivBtn.notBtnHide = false;
        state.comlist[id].componentsData.ImgArr[index].lineDivBtn.lineBtnShow = false;
        state.comlist[id].componentsData.ImgArr[index].lineDivBtn.lineBtnHide = true;
        state.comlist[id].componentsData.ImgArr[index].boxesDivBtn.boxesBtnShow = false;
        state.comlist[id].componentsData.ImgArr[index].boxesDivBtn.boxesBtnHide = true;
    },
    lineBorders(state,data){
        let index = data.indexs;
        let id = data.dataids;
        state.comlist[id].componentsData.ImgArr[index].boxesDivStyle.boxesBorShow = false;
        state.comlist[id].componentsData.ImgArr[index].boxesDivStyle.boxesBorHide = true;
        state.comlist[id].componentsData.ImgArr[index].lineDivStyle.lineBorShow = true;
        state.comlist[id].componentsData.ImgArr[index].lineDivStyle.lineBorHide = false;
        state.comlist[id].componentsData.ImgArr[index].notDivBtn.notBtnShow = false;
        state.comlist[id].componentsData.ImgArr[index].notDivBtn.notBtnHide = true;
        state.comlist[id].componentsData.ImgArr[index].lineDivBtn.lineBtnShow = true;
        state.comlist[id].componentsData.ImgArr[index].lineDivBtn.lineBtnHide = false;
        state.comlist[id].componentsData.ImgArr[index].boxesDivBtn.boxesBtnShow = false;
        state.comlist[id].componentsData.ImgArr[index].boxesDivBtn.boxesBtnHide = true;
    },
    boxesBorders(state,data){
        let index = data.indexs;
        let id = data.dataids;
        state.comlist[id].componentsData.ImgArr[index].boxesDivStyle.boxesBorShow = true;
        state.comlist[id].componentsData.ImgArr[index].boxesDivStyle.boxesBorHide = false;
        state.comlist[id].componentsData.ImgArr[index].lineDivStyle.lineBorShow = false;
        state.comlist[id].componentsData.ImgArr[index].lineDivStyle.lineBorHide = true;
        state.comlist[id].componentsData.ImgArr[index].notDivBtn.notBtnShow = false;
        state.comlist[id].componentsData.ImgArr[index].notDivBtn.notBtnHide = true;
        state.comlist[id].componentsData.ImgArr[index].lineDivBtn.lineBtnShow = false;
        state.comlist[id].componentsData.ImgArr[index].lineDivBtn.lineBtnHide = true;
        state.comlist[id].componentsData.ImgArr[index].boxesDivBtn.boxesBtnShow = true;
        state.comlist[id].componentsData.ImgArr[index].boxesDivBtn.boxesBtnHide = false;
    },

    //新增商品模块
    commodityADD(state){
        let commodityDefault = {
            componentsName:"commodity",
            componentsData:{
                importFileUrl:'api/zuul/sms/file/fileUpload',
                admin:{
                    type:'product'
                },
                bigImg:24,
                smallImg:24,
                bigsImg:24, // 列表风格 0 大图 1 小图 2 一大两小
                bigImgBtn:{
                    onBtn:true
                },
                smImgBtn:{
                    onBtn:false
                },
                bsImgBtn:{
                    onBtn:false
                },
                src1:'',
                productImgURL1:'',//商品1链接地址
                productImgSrc1: require('./../templateImage/window1-1.jpg'),//商品1图片地址
                src2:'',
                productImgURL2:'',//商品2链接地址
                productImgSrc2: require('./../templateImage/window1-2.jpg'),//商品2图片地址
                src3:'',
                productImgURL3:'',//商品3链接地址
                productImgSrc3: require('./../templateImage/window1-3.jpg'), //商品3图片地址
            }
        };
        state.comlist.push(commodityDefault)
    },
    //修改商品 布局 大图 一大两小 小图
    commoditySwitch(state,data){
        let id = data.dataid
        let switchIndexs = data.switchIndex
        if(switchIndexs == 1){
            state.comlist[id].componentsData.bigImg = 24;
            state.comlist[id].componentsData.smallImg = 24;
            state.comlist[id].componentsData.bigsImg = 24;
            state.comlist[id].componentsData.bigImgBtn.onBtn = true;
            state.comlist[id].componentsData.smImgBtn.onBtn = false;
            state.comlist[id].componentsData.bsImgBtn.onBtn = false;
        }else if(switchIndexs == 2){
            state.comlist[id].componentsData.bigImg = 12;
            state.comlist[id].componentsData.smallImg = 12;
            state.comlist[id].componentsData.bigsImg = 12;
            state.comlist[id].componentsData.bigImgBtn.onBtn = false;
            state.comlist[id].componentsData.smImgBtn.onBtn = true;
            state.comlist[id].componentsData.bsImgBtn.onBtn = false;
        }else if(switchIndexs == 3){
            state.comlist[id].componentsData.bigImg = 24;
            state.comlist[id].componentsData.smallImg = 12;
            state.comlist[id].componentsData.bigsImg = 12;
            state.comlist[id].componentsData.bigImgBtn.onBtn = false;
            state.comlist[id].componentsData.smImgBtn.onBtn = false;
            state.comlist[id].componentsData.bsImgBtn.onBtn = true;
        }
        
    },
    //商品模块 图片上传更新 方法
    commodityUploadImage(state,data){
        let id = data.dataid;
        let index = data.indexs;
        let imageUrl = data.imageUrls;
        let images = data.imageSrc
        if(index == 1){
            state.comlist[id].componentsData.productImgSrc1 = imageUrl
            state.comlist[id].componentsData.src1 = images
        }else if(index == 2){
            state.comlist[id].componentsData.productImgSrc2 = imageUrl
            state.comlist[id].componentsData.src2 = images
        }else if(index == 3){
            state.comlist[id].componentsData.productImgSrc3 = imageUrl
            state.comlist[id].componentsData.src3 = images
        }
    },
    //新增标题模块
    titlesADD(state){
        let titlesDefault = {
            componentsName:"titles",
            componentsData:{
                mainTitle:'BACK TO SCHOOL SEASONAL DISCOUNT',
                subtitle:'开学季优惠',
                mainTitleStyle:{
                  color:'#000'
                },
                subTitleStyle:{
                  color:'#000'
                },
                color1:'#000',
                color2:'#000'
            }
        };
        state.comlist.push(titlesDefault)
    },
    //标题内容改变事件
    titlesInput(state,data){
        console.log(data)
        let id = data.dataids;
        let mainTitless = data.maintitles
        state.comlist[id].componentsData.mainTitle = mainTitless
    },
    subTitlesInput(state,data){
        let id = data.dataids;
        let subTitles = data.subTitle
        console.log(subTitles)
        state.comlist[id].componentsData.subtitle = subTitles
    },
    titlesColor(state,data){
        let id = data.dataids;
        let colora1 = data.colors1
        state.comlist[id].componentsData.mainTitleStyle.color = colora1
    },
    subTitlesColor(state,data){
        let id = data.dataids;
        let colora2 = data.colors2
        state.comlist[id].componentsData.subTitleStyle.color = colora2
    }
   };
const actions={
    // 获取后台数据发送给 mutations api 方法 从而改变 state （状态库）
    editTemplate(state,data){
        //console.log(data)
        let datas = JSON.parse(data)
        state.commit('INIT_STORE',datas);
    }
};
export default{
    state,
    mutations,
    actions
}