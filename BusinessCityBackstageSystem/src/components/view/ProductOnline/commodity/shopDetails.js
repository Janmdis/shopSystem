export default {
  data() {
    return {
      shopDetails: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  created: function () {
    this.$root.$on('shopDetailss', (data) => {
      this.shopDetails = data
    })
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
