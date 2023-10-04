<div class="cv-adb-8-0-toggle-wrap">
  <div class="cv-adb-8-0-toggle-main-txt">Monthly</div>
  <label class="cv-adb-8-0-switch"
    ><input
      class="cv-adb-8-0-toggle-input"
      type="checkbox"
      value="frequency"
      on:click
    /><span class="cv-adb-8-0-slider cv-adb-8-0-round" /></label
  >
  <div class="cv-adb-8-0-toggle-main-txt">Yearly</div>
</div>

<style>
  .cv-adb-8-0-toggle-wrap {
    display: flex;
    align-items: center;
    font-family: "Source Sans Pro";
    font-style: normal;
    font-weight: 300;
    font-size: 11px;
    line-height: 34px;
    height: 34px;
    color: #000000;
    margin-left: -127px;
  }

  .cv-adb-8-0-switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 22px;
    margin: 0 10px;
  }

  .cv-adb-8-0-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .cv-adb-8-0-slider.cv-adb-8-0-round {
    border-radius: 34px;
  }

  .cv-adb-8-0-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #2196f3;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .cv-adb-8-0-slider.cv-adb-8-0-round:before {
    border-radius: 50%;
  }

  .cv-adb-8-0-slider:before {
    position: absolute;
    content: "";
    width: 18px;
    height: 18px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .cv-adb-8-0-slider:before {
    -webkit-transform: translateX(22px);
    -ms-transform: translateX(22px);
    transform: translateX(22px);
  }
</style>
