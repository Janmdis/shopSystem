/* eslint-disable */
import oneShopInfo from './ShopInfo.vue'
import twoGiftIntegral from './GiftIntegral.vue'
import threePayInfo from './PayInfo.vue'
import fourVisit from './Visit.vue'
import invoiceInfo from './invoiceInfo.vue'
import { setTimeout } from 'timers';
import { mapState } from 'Vuex'
export default {
    data() {
        return {
            infoText: [
                { title: '商品/活动信息', imgSrc: '/static/images/Member/personnel-house.png', bgColor: 'background:#e16938;', number: 2 },
                { title: '赠送积分信息', imgSrc: '/static/images/Member/dingdan.jpg', bgColor: 'background:#00c0be;', number: 2 },
                { title: '支付信息', imgSrc: '/static/images/Member/personnel-info.png', bgColor: 'background:#7a9df7;', number: 2 },
                { title: '回访', imgSrc: '/static/images/Member/personnel-visit.png', bgColor: 'background:#e39eef;', number: 2 },
                { title: '发票信息', imgSrc: '/static/images/Member/personnel-visit.png', bgColor: 'background:#e39eef;', number: 2 },
            ],
            visitTypes: [],
            ruleForm: {
                orderNumber: '',
                orderMoney: '',
                orderState: '',
                orderPhone: '',
                orderTime: '',
                paidTime: '',
                paidMoney: '',
                unpaidMoney: '',
                returnMoney: '',
                orderpeople: '',
                orderAddress: '',
                level: '',
                origin: '',
                active: true
            },
            isActive: '商品/活动信息',
            isLoading: true,
            which_to_show: '',
            default1: true,
            orderId: '',
            pageNum: 1,
            pageSize: 3,
            typeWord: '',
            dataInfo: [],
            order: {}
        }
    },
    created() {
        this.$root.$on('title', (title) => {
            this.which_to_show = title
        });
        this.isShow('商品/活动信息');
        this.$root.$on('searchOrderInfo', data => { //  获取用户信息方法
            console.log(data)
            this.searchInfo(data[0]);
            this.orderId = data[0];
            this.order = data[1];
            console.log(data[1])
            sessionStorage.setItem("orderId",data[1].number)
            this.upData();
        });
        this.$root.$on('orderCoverShow', (left) => { //  显示侧滑框的方法
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
        });
    },
    methods: {
        upData() {
            this.ruleForm.orderNumber = this.order.number;
            this.ruleForm.orderMoney = this.order.orderMoney;
            this.ruleForm.orderState = this.order.serviceState;
            this.ruleForm.orderTime = this.order.createTime;
            this.ruleForm.orderPhone = this.order.phone;
            this.ruleForm.paidMoney = this.order.paidMoney;
            this.ruleForm.unpaidMoney = this.order.unpaidMoney;
            this.ruleForm.returnMoney = this.order.refundMoney;
            this.ruleForm.orderpeople = this.order.name;
            this.ruleForm.orderAddress = this.order.detailAddress;
            this.ruleForm.level = this.order.remark;
            this.ruleForm.origin = this.order.sourceId
        },
        editInfo(event) {
            let that = this;
            let text = event.currentTarget.innerHTML;
            if (text == '编辑') {
                event.currentTarget.innerHTML = '完成';
                this.ruleForm.active = false;
            } else {
                event.currentTarget.innerHTML = '编辑';
                this.ruleForm.active = true;
                let data = {
                    id: this.orderId,
                    hasContract: 0,
                    contractNumber: this.order.contractNumber,
                    number: this.ruleForm.orderNumber,
                    orderMoney: this.ruleForm.orderMoney,
                    serviceState: this.ruleForm.orderState,
                    createTime: this.ruleForm.orderTime,
                    phone: this.ruleForm.orderPhone,
                    paidMoney: this.ruleForm.paidMoney,
                    unpaidMoney: this.ruleForm.unpaidMoney,
                    refundMoney: this.ruleForm.returnMoney,
                    name: this.ruleForm.orderpeople,
                    detailAddress: this.ruleForm.orderAddress,
                    remark: this.ruleForm.level,
                    sourceId: this.ruleForm.origin,
                    orderDetails: []
                };
                this.$http.post(
                    '/api/product/order/update',
                    data
                ).then(res => {
                    console.log(res.data.msg);
                }).catch(err => { console.log(err) });
            }
        },
        searchInfo(id) { //  通过接口获取订单商品详情
            let that = this;
            this.$http({
                url: '/api/product/order/queryOrderDetails?orderId=' + id,
                method: 'POST',
                // 请求发送的数据
                // 设置请求头
                headers: { 'Content-Type': 'application/json' }
            }).then(res => {
                if (res.data.status == 200) {
                    // console.log(res.data.msg)
                    that.dataInfo = res.data.info;
                }
                that.which_to_show = 'oneShopInfo';
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
            }else if (text == '发票信息') {
                text = invoiceInfo;
            }
            this.$root.$emit("orderId",this.ruleForm.orderNumber)
            this.$root.$emit('title', text);
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
        fourVisit,
        invoiceInfo
    },
    beforeDestroy() {
        this.$root.$off('searchOrderInfo');
        this.$root.$off('orderCoverShow');
        this.$root.$off('searchInfo');
        this.$root.$off('housePage');
        this.$root.$off('loadFn');
        this.$root.$off('load');
    }
}