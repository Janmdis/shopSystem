<template>
    <button class="btnstyle" :disabled="disabled || time > 0">
                    {{ text }}
                </button>
</template>
<style>
.btnstyle{
    background: #00aeaa;
    width: 100%;
    padding: 12px 0;
    border: none;
    border-radius: 5px;
    color: #fff;
}
</style>
<script>
    export default {
        data() {
            return {
                time: 0
            }
        },
        props: {
            second: {
                type: Number,
                default: 60
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            run: function() {
                this.time = this.second
                this.timer()
            },
            timer: function() {
                if (this.time > 0) {
                    this.time--;
                    setTimeout(this.timer, 1000);
                }
            }
        },
        computed: {
            text: function() {
                return this.time > 0 ? this.time + 's 后重新获取' : '获取验证码';
            }
        }
    }
</script>