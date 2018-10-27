<template>
  <div class="container">
    <safe-score/>
    <score-panel/>
  </div>
</template>

<script>
import SafeScore from './SafeScore'
import ScorePanel from './ScorePanel'
export default {
  components: {
    SafeScore,
    ScorePanel
  }
}
</script>
