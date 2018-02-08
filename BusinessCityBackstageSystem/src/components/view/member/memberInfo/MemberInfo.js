/* eslint-disable */
import onePersonnel from './Personnel.vue'
import twoHouse from './House.vue'
import threeOrder from './Order.vue'
import fourVisit from './Visit.vue'
import fiveRelatedPeople from './RelatedPeople.vue'
import { setTimeout } from 'timers';
export default {
    name: 'memberInfo',
    data() {
        return {
            infoText: [
                { title: '个人信息', imgSrc: '/static/images/Member/personnel-info.png', bgColor: 'background:#7a9df7;', number: 2 },
                { title: '房屋', imgSrc: '/static/images/Member/personnel-house.png', bgColor: 'background:#e16938;', number: 2 },
                { title: '订单', imgSrc: '/static/images/Member/dingdan.jpg', bgColor: 'background:#00c0be;', number: 2 },
                { title: '回访', imgSrc: '/static/images/Member/personnel-visit.png', bgColor: 'background:#e39eef;', number: 2 },
                { title: '相关联会员', imgSrc: '/static/images/Member/personnel-related.png', bgColor: 'background:#ffaf48;', number: 2 },
            ],
            isActive: '个人信息',
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
        }
    },
    created() {
        this.$root.$on('title', (title) => {
            this.which_to_show = title
        });
        this.isShow('个人信息');
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
            console.log(this.typeWord);
        });
    },
    methods: {
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
                    console.log(res.data.info);
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
                this.which_to_show = 'onePersonnel';

                this.$http.post( //  获取客户类型接口
                    '/api/customer/customerCategory/findCategory?key=id&value=name'
                ).then(res => {
                    if (res.data.info == null) {
                        alert(res.data.msg)
                    } else {
                        //this.customerCategory = res.data.info.get(id);  // map数据,前端可以当做数组进行处理
                        this.customerCategory = res.data.info;
                        this.defaultCategory = (res.data.info[this.personnelInfo.categoryId] == null ? res.data.info[1] : res.data.info[this.personnelInfo.categoryId]);
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
                    if (res.data.info == null) {
                        alert(res.data.msg)
                    } else {
                        this.recommendedSource = res.data.info;
                        this.defaultSource = (res.data.info[this.personnelInfo.recommendedSourceId] == null ? res.data.info[1] : res.data.info[this.personnelInfo.recommendedSourceId]);
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
            if (text == '个人信息') {
                text = onePersonnel;
            } else if (text == '房屋') {
                text = twoHouse;
            } else if (text == '订单') {
                text = threeOrder;
            } else if (text == '回访') {
                text = fourVisit;
            } else if (text == '相关联会员') {
                text = fiveRelatedPeople;
            }
            this.$root.$emit('title', text);
        },
    },
    components: {
        onePersonnel,
        twoHouse,
        threeOrder,
        fourVisit,
        fiveRelatedPeople,
    },
    beforeDestroy() {
        this.$root.$off('searchPersonnelInfo');
        this.$root.$off('searchInfo');
        this.$root.$off('housePage');
        this.$root.$off('typeWord');
    }
}