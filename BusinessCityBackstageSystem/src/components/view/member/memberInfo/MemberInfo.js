/* eslint-disable */
import onePersonnel from './Personnel.vue'
import twoHouse from './House.vue'
import threeOrder from './Order.vue'
import fourVisit from './Visit.vue'
import fiveRelatedPeople from './RelatedPeople.vue'
import { setTimeout } from 'timers';
import { mapState } from 'Vuex'
export default {
    data() {
        return {
            infoText: [
                { title: '房屋', imgSrc: '/static/images/Member/personnel-house.png', bgColor: 'background:#e16938;', number: 0, brackets: false },
                { title: '订单', imgSrc: '/static/images/Member/dingdan.jpg', bgColor: 'background:#00c0be;', number: 0, brackets: false },
                { title: '报告', imgSrc: '/static/images/Member/personnel-info.png', bgColor: 'background:#7a9df7;', number: 0, brackets: false },
                { title: '相关联会员', imgSrc: '/static/images/Member/personnel-related.png', bgColor: 'background:#ffaf48;', number: 5, brackets: false },
                { title: '回访', imgSrc: '/static/images/Member/personnel-visit.png', bgColor: 'background:#e39eef;', number: 4, brackets: false }
            ],
            visitTypes: [],
            ruleForm: {
                userName: '',
                userExperience: 0,
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
            active: true,
            isActive: '',
            isLoading: true,
            which_to_show: '',
            default1: true,
            personnelInfo: {},
            customerCategory: [],
            customerIdentity: {},
            recommendedSource: [],
            memberHouse: [],
            house: [],
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
        let that = this;
        this.isShow('房屋');
        this.$root.$on('searchPersonnelInfo', (ids) => { //  获取用户信息方法
            this.showNum();
            for (let item in this.info1.data) {
                this.customerCategory.push({ id: item - 0, name: this.info1.data[item] });
            }
            for (let item in this.info2.data) {
                this.recommendedSource.push({ id: item - 0, name: this.info2.data[item] });
            }
            this.userInfo().then(res => {
                if (res) {
                    return this.getData(ids);
                } else {
                    return Promise.resolve(false)
                }
            }).then(res => {
                if (res) {
                    this.searchInfo(ids);
                } else {
                    return Promise.resolve(false)
                }
            });
            this.memberId = ids;
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
            // console.log(this.typeWord);
        });
        this.$root.$on('showNumber', data => {
            this.$set(this.infoText[4], 'number', data.length);
            if (data.length > 0) {
                this.$set(this.infoText[4], 'brackets', true);
            } else {
                this.$set(this.infoText[4], 'brackets', false);
            }
        })
        this.$root.$on('loadEstate', data => {
            this.getData(data)
        })
        this.$root.$on('load', data => {
            this.isLoading = data;
        })
    },
    computed: mapState({
        info1: state => state.memberInfo.customerCategory,
        info2: state => state.memberInfo.recommendedSource
    }),
    methods: {
        showNum() {
            this.infoText.forEach((e, i) => {
                if (e.number > 0) {
                    this.$set(e, 'brackets', true);
                } else {
                    this.$set(e, 'brackets', false);
                }
            })
        },
        userInfo() {
            return new Promise((resolve, reject) => {
                this.$http.get(
                    '/api/public/region/findParent?grade=2'
                ).then(res => {
                    this.cities = res.data.info;
                    // console.log(this.cities);
                    resolve(true);
                }).catch(err => {
                    console.log(err)
                    reject(false)
                });
            })
        },
        editInfo(event) {//详情编辑
            let that = this;
            let text = event.currentTarget.innerHTML;
            if (text == '编辑') {
                event.currentTarget.innerHTML = '完成';
                this.ruleForm.active = false
                this.active = true
                this.userInfo();
            } else {
                event.currentTarget.innerHTML = '编辑';
                this.ruleForm.active = true;
                let data = {
                    id: this.memberId,
                    name: this.ruleForm.userName,
                    // consumptionPoints: this.ruleForm.userPoint,
                    // level: this.ruleForm.userLevel,
                    mobile: this.ruleForm.userPhone,
                    // order: this.ruleForm.userOrder,
                    birthDate: this.ruleForm.userBirth,
                    createUser: this.ruleForm.writer,
                    createTime: this.ruleForm.inputTime,
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
            let that = this;
            this.house = []
            return new Promise((resolve, reject) => {
                this.$http.get( //  获取会员房屋信息
                    '/api/customer/customerHousing/findHousingInfoPage?id=' + id + '&pageNum=' + this.pageNum + '&pageSize=' + this.pageSize
                ).then(res => {
                    if (res.data.info == null) {
                        console.log(res.data.msg);
                        resolve(true);
                    } else {
                        // console.log(res.data.info.list)
                        res.data.info.list.forEach((e) => {
                            if (e.housingEstate == null) {
                                console.log("小区不存在")
                            } else {
                                that.memberHouse = res.data.info.list;
                            }
                        })
                        that.$set(that.infoText[0], 'number', that.memberHouse.length);
                        if (that.memberHouse.length > 0) {
                            that.$set(that.infoText[0], 'brackets', true);
                        } else {
                            that.$set(that.infoText[0], 'brackets', false);
                        }
                        that.houseCount = res.data.info;
                        resolve(true);
                    }
                }).catch(err => {
                    console.log(err)
                    resolve(false)
                });
            });
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
                // console.log(dataInfo)
                this.personnelInfo = dataInfo;
                that.ruleForm.userName = that.personnelInfo.name;
                this.ruleForm.userPoint = this.personnelInfo.consumptionPoints == null ? 0 : this.personnelInfo.createUser;
                this.ruleForm.userExperience = this.personnelInfo.experience == null ? '0经验值' : this.personnelInfo.experience + '经验值';
                this.ruleForm.userLevel = this.personnelInfo.levelName + ':';
                this.ruleForm.userPhone = this.personnelInfo.mobile;
                this.ruleForm.userBirth = this.personnelInfo.birthDate;
                this.ruleForm.inputTime = this.personnelInfo.createTime;
                this.ruleForm.userCity = this.personnelInfo.cityId;
                this.ruleForm.userType = this.personnelInfo.categoryId;
                this.ruleForm.userOrigin = this.personnelInfo.recommendedSourceId;
                this.ruleForm.userVillage = this.personnelInfo.estateId;
                this.$root.$emit('loading', false);

                this.$http({ //  获取录入人接口
                    method: 'POST',
                    url: '/api/admin/account/queryListByIds?key=id&value=adminName',
                    data: [this.personnelInfo.createUser],
                    headers: { 'content-type': 'application/json' }
                }).then(res => {
                    if (res.status == 200) {
                        // console.log(res)
                        this.ruleForm.writer = res.data.info[this.personnelInfo.createUser] == null ? 'admin' : res.data.info[this.personnelInfo.createUser];
                    } else {
                        console.log(res.data.msg)
                    }
                }).catch(err => { console.log(err); });
                this.$http.post( //  获取订单状态接口
                    '/api/product/order/queryOrderStateByMemberIds', [this.personnelInfo.id]
                ).then(res => {
                    if (res.status == 200) {
                        // console.log(res.data.info)
                        this.ruleForm.userOrder = res.data.info[this.personnelInfo.id] == null ? '' : res.data.info[this.personnelInfo.id];
                    } else {
                        console.log(res.data.msg)
                    }
                }).catch(err => { console.log(err); });
                this.$http.post( //  获取会员身份接口
                    '/api/customer/identity/findIdentity?key=id&value=name'
                ).then(res => {
                    if (res.data.info == null) {
                        console.log(res.data.msg)
                    } else {
                        that.customerIdentity = res.data.info;
                        that.defaultIdentity = (res.data.info[this.personnelInfo.identity] == null ? res.data.info[1] : res.data.info[this.personnelInfo.identity]);
                    }
                    //console.log(this.customerIdentity)
                }).catch(err => { console.log(err); });

                this.$http.post( //  查询房屋类型信息
                    '/api/customer/housingCategory/queryCategory?key=id&value=name'
                ).then(res => {
                    if (res.data.info == null) {
                        console.log(res.data.msg)
                    } else {
                        that.houseCategory = res.data.info;
                        //console.log(this.houseCategory)
                    }
                }).catch(err => { console.log(err) });

                this.$http.post( //  获取租住状态接口信息
                    '/api/customer/housingRentalStatus/queryStatus?key=id&value=name'
                ).then(res => {
                    if (res.data.info == null) {
                        console.log(res.data.msg)
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
            if (text == '房屋') {
                text = twoHouse;
            } else if (text == '订单') {
                text = threeOrder;
            } else if (text == '报告') {
                text = onePersonnel;
            } else if (text == '相关联会员') {
                text = fiveRelatedPeople;
                this.$root.$emit('loadFn3', this.memberId);
            } else if (text == '回访') {
                text = fourVisit;
            }
            this.which_to_show = text
            this.$root.$on('pageType', (res) => {
                this.typeWord = res;
            });
            this.$root.$emit('loadFn');
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
        this.$root.$off('infoCoverShow');
        this.$root.$off('housePage');
        this.$root.$off('pageType');
        this.$root.$off('load');
        this.$root.$off('showNumber');
        this.$root.$off('loadEstate')
    }
}