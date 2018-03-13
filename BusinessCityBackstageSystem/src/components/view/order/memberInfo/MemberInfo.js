/* eslint-disable */
import oneShopInfo from './ShopInfo.vue'
import twoGiftIntegral from './GiftIntegral.vue'
import threePayInfo from './PayInfo.vue'
import fourVisit from './Visit.vue'
import { setTimeout } from 'timers';
export default {
    name: 'memberInfo',
    data() {
        return {
            infoText: [
                { title: '商品/活动信息', imgSrc: '/static/images/Member/personnel-house.png', bgColor: 'background:#e16938;', number: 2 },
                { title: '赠送积分信息', imgSrc: '/static/images/Member/dingdan.jpg', bgColor: 'background:#00c0be;', number: 2 },
                { title: '支付信息', imgSrc: '/static/images/Member/personnel-info.png', bgColor: 'background:#7a9df7;', number: 2 },
                { title: '回访', imgSrc: '/static/images/Member/personnel-visit.png', bgColor: 'background:#e39eef;', number: 2 },
            ],
            visitTypes: [],
            ruleForm: {
                userName: '',
                userPoint: '',
                userLevel: '',
                userPhone: '',
                userType: '',
                userCity: '',
                userVillage: '',
                userOrder: '',
                userOrigin: '',
                userBirth: '',
                writer: '',
                inputTime: '',
                active: true
            },
            isActive: '商品/活动信息',
            isLoading: true,
            which_to_show: '',
            default1: true,
            personnelInfo: {},
            customerCategory: {},
            customerIdentity: {},
            recommendedSource: {},
            memberHouse: {},
            houseCount: {},
            memberId: '',
            houseCategory: {},
            rentalStatus: {},
            defaultCategory: '',
            defaultIdentity: '',
            defaultSource: '',
            defaultGroup: [],
            pageNum: 1,
            pageSize: 3,
            typeWord: '',
            cities: []
        }
    },
    created() {
        this.$root.$on('title', (title) => {
            this.which_to_show = title
        });
        this.isShow('商品/活动信息');
        this.$root.$on('searchPersonnelInfo', (ids) => { //  获取用户信息方法
            this.searchInfo(ids);
            this.memberId = ids;
            this.getData(ids);
        });
        this.$root.$on('infoCoverShow', (left) => { //  显示侧滑框的方法
            var left1 = 100;
            let timer1 = setInterval(function() {
                left1--
                document.getElementsByClassName("infoCover")[0].style.left = left1 + '%';
                if (left1 == left) {
                    left1 = left
                    clearInterval(timer1)
                }
            }, 5);
        });
        this.$root.$on('housePage', (res) => {
            this.pageNum = res;
            this.getData(this.memberId);
        });
        this.$root.$on('pageType', (res) => {
            this.typeWord = res;
        });
    },
    methods: {
        editInfo(event) {
            let that = this;
            let text = event.currentTarget.innerHTML;
            if (text == '编辑') {
                event.currentTarget.innerHTML = '完成';
                this.ruleForm.active = false;
                this.$http.get(
                    '/api/public/region/findParent?grade=2'
                ).then(res => {
                    this.cities = res.data.info;
                }).catch(err => { console.log(err) });
            } else {
                event.currentTarget.innerHTML = '编辑';
                this.ruleForm.active = true;
                let data = {
                    id: this.memberId,
                    name: this.ruleForm.userName,
                    consumptionPoints: this.ruleForm.userPoint,
                    level: this.ruleForm.userLevel,
                    mobile: this.ruleForm.userPhone,
                    // order: this.ruleForm.userOrder,
                    birthDate: this.ruleForm.userBirth,
                    // writer: this.ruleForm.writer,
                    // time: this.ruleForm.inputTime,
                    cityId: this.ruleForm.userCity,
                    categoryId: this.ruleForm.userType,
                    estateId: this.ruleForm.userVillage,
                    recommendedSourceId: this.ruleForm.userOrigin
                };
                this.$http.post(
                    '/api/customer/account/update',
                    data
                ).then(res => {
                    console.log(res.data.msg);
                    this.searchInfo(this.memberId);
                }).catch(err => { console.log(err) });
            }
        },
        getData(id) {
            // console.log(this.memberId)
            this.$http.get( //  获取会员房屋信息
                '/api/customer/customerHousing/findHousingInfoPage?id=' + id + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize
            ).then(res => {
                if (res.data.info == null) {
                    alert(res.data.msg);
                } else {
                    this.memberHouse = res.data.info.list;
                    this.houseCount = res.data.info;
                    // console.log(this.memberHouse);
                }
            }).catch(err => { console.log(err) });
        },
        searchInfo(id) { //  点击ID事件,通过接口获取用户信息
            let that = this;
            this.$http({
                url: '/api/customer/account/query',
                method: 'POST',
                // 请求发送的数据
                data: JSON.stringify({ 'id': id }),
                // 设置请求头
                headers: { 'Content-Type': 'application/json' }
            }).then(res => {
                let dataInfo = res.data.info.list[0];
                console.log(dataInfo)
                this.personnelInfo = dataInfo;
                this.ruleForm.userName = this.personnelInfo.name;
                this.ruleForm.userPoint = this.personnelInfo.consumptionPoints;
                this.ruleForm.userLevel = this.personnelInfo.level;
                this.ruleForm.userPhone = this.personnelInfo.mobile;
                this.ruleForm.userOrder = '未知';
                this.ruleForm.userBirth = this.personnelInfo.birthDate;
                this.ruleForm.writer = this.personnelInfo.createUser == null ? '未知' : this.personnelInfo.createUser;
                this.ruleForm.inputTime = this.personnelInfo.createTime;
                this.ruleForm.userCity = this.personnelInfo.cityName;
                this.which_to_show = 'twoHouse';

                this.$http.post( //  获取客户类型接口
                    '/api/customer/customerCategory/findCategory?key=id&value=name'
                ).then(res => {
                    if (res.data.info == null) {
                        alert(res.data.msg)
                    } else {
                        // console.log(this.customerCategory)
                        //this.customerCategory = res.data.info.get(id);  // map数据,前端可以当做数组进行处理
                        this.customerCategory = res.data.info;
                        this.defaultCategory = (res.data.info[this.personnelInfo.categoryId] == null ? res.data.info[1] : res.data.info[this.personnelInfo.categoryId]);
                        this.ruleForm.userType = this.defaultCategory;
                    }
                    //console.log(res.data.info)
                }).catch(err => { console.log(err) });

                this.$http.post( //  获取会员身份接口
                    '/api/customer/identity/findIdentity?key=id&value=name'
                ).then(res => {
                    if (res.data.info == null) {
                        alert(res.data.msg)
                    } else {
                        this.customerIdentity = res.data.info;
                        this.defaultIdentity = (res.data.info[this.personnelInfo.identity] == null ? res.data.info[1] : res.data.info[this.personnelInfo.identity]);
                    }
                    //console.log(this.customerIdentity)
                }).catch(err => { console.log(err); });

                this.$http.post( //  获取推荐来源接口
                    '/api/customer/recommendedSource/findSource?key=id&value=name'
                ).then(res => {
                    //console.log(res.data.info)
                    if (res.data.info == null) {
                        alert(res.data.msg)
                    } else {
                        this.recommendedSource = res.data.info;
                        this.defaultSource = (res.data.info[this.personnelInfo.recommendedSourceId] == null ? res.data.info[1] : res.data.info[this.personnelInfo.recommendedSourceId]);
                        this.ruleForm.userOrigin = this.defaultSource;
                    }
                    //console.log(this.recommendedSource)
                }).catch(err => { console.log(err); });

                this.$http.post( //  查询房屋类型信息
                    '/api/customer/housingCategory/queryCategory?key=id&value=name'
                ).then(res => {
                    if (res.data.info == null) {
                        alert(res.data.msg)
                    } else {
                        this.houseCategory = res.data.info;
                        //console.log(this.houseCategory)
                    }
                }).catch(err => { console.log(err) });

                this.$http.post( //  获取租住状态接口信息
                    '/api/customer/housingRentalStatus/queryStatus?key=id&value=name'
                ).then(res => {
                    if (res.data.info == null) {
                        alert(res.data.msg)
                    } else {
                        this.rentalStatus = res.data.info;
                        //console.log(this.rentalStatus)
                    }
                }).catch(err => { console.log(err) });

            }).catch(err => { console.log(err) })
        },
        closeInfo() { //   关闭侧滑框
            var left1 = 16;
            let timer2 = setInterval(function() {
                left1++
                document.getElementsByClassName("infoCover")[0].style.left = left1 + '%';
                if (left1 == 105) {
                    left1 = 105
                    clearInterval(timer2)
                }
            }, 5);
        },
        isShow(text) {
            this.default1 = false;
            this.isActive = text;
            this.isLoading = true;
            if (text == '商品/活动信息') {
                text = oneShopInfo;
            } else if (text == '赠送积分信息') {
                text = twoGiftIntegral;
            } else if (text == '支付信息') {
                text = threePayInfo;
            } else if (text == '回访') {
                text = fourVisit;
            }
            this.$root.$emit('title', text);
            this.$root.$on('pageType', (res) => {
                this.typeWord = res;
            });
            this.$root.$emit('loadFn');
            this.$root.$on('load', data => {
                this.isLoading = data;
            });
        },
    },
    components: {
        oneShopInfo,
        twoGiftIntegral,
        threePayInfo,
        fourVisit
    },
    beforeDestroy() {
        this.$root.$off('searchPersonnelInfo');
        this.$root.$off('searchInfo');
        this.$root.$off('housePage');
        this.$root.$off('typeWord');
        this.$root.$off('load');
        this.$root.$off('loadFn');
        this.$root.$off('loadFn3');
    }
}