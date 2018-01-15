/* eslint-disable */
import onePersonnel from './Personnel.vue'
import twoHouse from './House.vue'
import threeOrder from './Order.vue'
import fourReport from './Report.vue'
import fiveRelatedPeople from './RelatedPeople.vue'
export default {
    name: 'memberInfo',
    data() {
        return {
            infoText: [
                { title: '个人信息', imgSrc: '/static/images/Member/ren.jpg' },
                { title: '房屋', imgSrc: '/static/images/Member/ren.jpg' },
                { title: '订单', imgSrc: '/static/images/Member/dingdan.jpg' },
                { title: '报告', imgSrc: '/static/images/Member/customerVisit.png' },
                { title: '相关联会员', imgSrc: '/static/images/Member/shouqian.jpg' },
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
                if (left1 == 100) {
                    left1 = 100
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
            } else if (text == '报告') {
                text = fourReport;
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
        fourReport,
        fiveRelatedPeople,
    }
}