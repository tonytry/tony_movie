<template>
  <div id="loader-container">

    <div class="loader-content">
        <span class="loader"></span>
        <span class="loader-text">Loading</span>
    </div>

</div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>
<style lang="scss" scoped>
html {
    font-size: 16px;
}

body {
    margin: 0;
    font-size: 1em;
}

#loader-container {
    position: fixed;/* absolute */
    left: 0;
    right: 0;
    height: 100%;
    // background: #013940;
    z-index: 10000;
    text-align: center;
}

.loader-content {
    position: relative;
    top: 25%;
}

.loader {
    border: 0.250em solid #03A9F4;
    border-radius: 50%;
    border-top: 0.250em solid #caf9ff;
    border-bottom: 0.250em solid #caf9ff;
    width: 1.875em; /* 30px [16px base font]*/
    height: 1.875em; /* 30px [16px base font]*/
    -webkit-animation: spin 1s ease-out infinite;
            animation: spin 1s ease-out infinite;
    display: inline-block;
    background: #4ea2c7;
    -webkit-box-shadow: 0em 0em 0.813em 0.25em #8adbff;
            box-shadow: 0em 0em 0.813em 0.25em #8adbff; /* 0 0 13px 4px #8adbff */
    zoom: 1;
}

.loader-text {
    display: block;
    position: relative;
    text-align: center;
    margin-top: 0.5em;
    font-size: 1.5em;
    font-family: sans-serif;
    color: #00BCD4;
    text-shadow: 0.063em 0.063em #004a54;
    -webkit-animation: bounce 3s linear infinite;
            animation: bounce 3s linear infinite;
    letter-spacing: 0.3em;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); }
}

@keyframes spin {
  0% { -webkit-transform: rotate(0deg); transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); transform: rotate(360deg); }
}

@-webkit-keyframes bounce {
    0% {
        top: 0;
    }
    25% {
        top: 0.625em; /* 10px/16px */
    }
    50% {
        top: 0;
    }
    75% {
        top: 0.625em; /* 10px/16px */
    }
    100% {
        top: 0;
    }
}

@keyframes bounce {
    0% {
        top: 0;
    }
    25% {
        top: 0.625em; /* 10px/16px */
    }
    50% {
        top: 0;
    }
    75% {
        top: 0.625em; /* 10px/16px */
    }
    100% {
        top: 0;
    }
}
</style>
