import ones from './siderchildren/one'
import twos from './siderchildren/two'
import threes from './siderchildren/three'
import fours from './siderchildren/four'
import fives from './siderchildren/five'
import sixs from './siderchildren/six'
import events from './siderchildren/event'
import eights from './siderchildren/eight'
import nights from './siderchildren/night'
export default {
  data () {
    return {
      which_to_show: "" 
    }
  },
  created () {
    this.$root.$on('infoText', (infoText) => {
      this.which_to_show = infoText
    })
  },

  components: {
    one: ones,
    two: twos,
    three: threes,
    four: fours,
    five: fives,
    six : sixs,
    sevent: events,
    eight: eights,
    night: nights,
  }
}
