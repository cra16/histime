<template>
<div class = 'header'>
    <div class = 'logo'>
        <h1>His Time</h1>
        <p>이번 학기를 채울 모든 경우의 수, His Time.</p>
    </div>
    <div class = 'line'>
    </div>
    <div class = 'user'>
        <p><div id="name">{{ this.$session.get('name') }}</div>님, 안녕하세요!</p>
    </div>
</div>
 
</template>

<script>

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src = '../assets/Login.less' lang='scss' scoped>

</style>



