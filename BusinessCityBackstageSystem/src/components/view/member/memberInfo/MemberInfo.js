/* eslint-disable */
import onePersonnel from './Personnel.vue'
import twoHouse from './House.vue'
import threeOrder from './Order.vue'
import fourVisit from './Visit.vue'
import fiveRelatedPeople from './RelatedPeople.vue'
//import twoHouse from './HouseDetail.vue'
//import threeOrder from './OrderDetail.vue'
//import fiveRelatedPeople from './RelatedDetail.vue'
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
            which_to_show: '个人信息',
            default1: true,
        }
    },
    created() {
        this.$root.$on('title', (title) => {
            this.which_to_show = title
        })
        this.isShow('个人信息');

    },
    mounted() {
        this.$root.$on('searchPersonnelInfo', (ids) => {
            this.searchInfo(ids);
        });
        this.$root.$on('infoCoverShow', (left) => {
            var left1 = 100;
            let timer1 = setInterval(function() {
                left1--
                document.getElementsByClassName("infoCover")[0].style.left = left1 + '%';
                if (left1 == left) {
                    left1 = left
                    clearInterval(timer1)
                }
            }, 5);
        })
    },
    methods: {
        closeInfo() {
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
        searchInfo(id) {
            console.log(id)
            this.$http({
                    url: 'customer/account/queryByIds',
                    method: 'POST',
                    // 请求发送的数据
                    data: [{ 'id': id }],
                    // 设置请求头
                    headers: { 'Content-Type': 'application/json' }
                })
                .then(res => { console.log(res) })
                .catch(error => { console.log(error) })
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
            this.$root.$emit('title', text)
        },
    },
    components: {
        onePersonnel,
        twoHouse,
        threeOrder,
        fourVisit,
        fiveRelatedPeople,
    }
}