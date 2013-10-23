title=title-full

<style type="text/css">
  .expandable
  {
    display: none;
  }
</style>

<script type="text/javascript">
  function toggleExpand(button, targetId)
  {
    var element = document.getElementById(targetId);
    var isVisible = element.style.display == "inherit";
    element.style.display = isVisible ? "none" : "inherit";

    var textContainer = document.getElementById("expand-button-" + (isVisible ? "more" : "less"));
    if ("textContent" in button)
      button.textContent = textContainer.textContent;
    else
      button.innerText = textContainer.innerText;
  }
</script>

<noscript>
  <style type="text/css">
    .expand-button
    {
      display: none;
    }

    .expandable
    {
      display: block;
    }
  </style>
</noscript>

$show-more$
{:#expand-button-more style="display: none;"}

$show-less$
{:#expand-button-less style="display: none;"}

## $project-heading$ {:#project}

$project-s1$ $project-s2(features, https://en.wikipedia.org/wiki/Adblock_Plus)$
$project-s3$ $project-s4(https://eyeo.com/)$


## $workings-heading$ {:#workings}

$workings-s1$ $workings-s2$ $workings-s3(features#tracking, features#malware)$

$workings-s4$

* $workings-s5$
* $workings-s6$

$workings-s7(filters)$

![](images/how-adblock-plus-works.png)

## $acceptableads-heading$ {:#acceptableads}

$acceptableads-s1$ $acceptableads-s2$ $acceptableads-s3(acceptable-ads#criteria)$
$acceptableads-s4(https://eyeo.com/acceptable-ads-application.html)$
$acceptableads-s5(acceptable-ads#optout)$

$acceptableads-s6(acceptable-ads)$

## $monetization-heading$ {:#monetization}

$monetization-s1$

<button class="expand-button" onclick="toggleExpand(this, 'expand-monetization')">$show-more$</button>

<div id="expand-monetization" class="expandable">
  <p>$monetization-s2$ $monetization-s3$</p>

  <p>$monetization-s4(acceptable-ads#criteria)$ $monetization-s5$ $monetization-s6$</p>

  <p>$monetization-s7$</p>
</div>

## $whymoney-heading$ {:#whymoney}

$whymoney-s1(https://eyeo.com/)$

<button class="expand-button" onclick="toggleExpand(this, 'expand-whymoney')">$show-more$</button>

<div id="expand-whymoney" class="expandable">
  <p>
    $whymoney-s2$ $whymoney-s3(firefox, chrome, android, opera, internet-explorer)$
    $whymoney-s4(https://easylist.adblockplus.org/)$
  </p>

  <p>$whymoney-s5$ $whymoney-s6$</p>

  <p>$whymoney-s7$ $whymoney-s8$</p>
</div>

## $privacy-heading$ {:#privacy}

$privacy-s1$ $privacy-s2(privacy)$
