(function () {

  /**
   * anonymous function - core of the plugin
   *
   * @param  {HTMLElement} a          link to the tab target
   * @param  {boolean} animations active animations on plugin
   * @return {type}            main function on the plugin
   */
  var affichOnglet = function (a, animations) {
    if (animations === undefined) {
      animations = true
    }
    /**
     * vars
     **/
    var li = a.parentNode
    var tabs_box = li.parentNode.parentNode
    var targetContent = a.getAttribute('href')
    var activeTab = tabs_box.parentNode.querySelector('.tabs_content .is-active')
    var newTab = tabs_box.parentNode.querySelector(targetContent)
    //*
    // toggle sections main actions
    // *
    // is the same tab nothing to do
    if (li.classList.contains('is-active')) {
      return false
    } else {
      //remove active state to the old linktab
      tabs_box.querySelector('.is-active').classList.remove('is-active')
      //add active state ton the target link
      li.classList.add('is-active')
      // transition (animation)
      if (animations) {
        // animation to hide
        activeTab.classList.add('fade')
        activeTab.offsetWidth
        activeTab.classList.remove('in')
        // call function with some browser call of the transitionend event
        // add events
        // event for majority
        activeTab.addEventListener('transitionend', transitionend(activeTab, newTab))
        // event for webkit
        activeTab.addEventListener('webkitTransitionEnd', transitionend(activeTab, newTab))
        // events for opera 10 / 12
        activeTab.addEventListener('otransitionend', transitionend(activeTab, newTab))
        activeTab.addEventListener('oTransitionEnd', transitionend(activeTab, newTab))
      } else {
        //* no animation
        activeTab.classList.remove('is-active')
        newTab.classList.add('is-active')
      }
    }
  }

  // transition (animation )

  /**
   * anonymous function - description
   *
   * @param  {HTMLElement} activeTab description
   * @param  {HTMLElement} newTab    description
   * @return {css}           animation
   */
  var transitionend = function (activeTab, newTab) {
    // transition (animation to hide)
    activeTab.classList.remove('fade') // fade classe opacity 0
    activeTab.classList.remove('is-active')
    // transition (animation to show)
    newTab.classList.add('is-active')
    newTab.classList.add('fade')
    //redraw the element to make a good transition on opacity
    newTab.offsetWidth
    newTab.classList.add('in') // in class opacity 1
    // remove events
    // event for majority
    activeTab.removeEventListener('transitionend', transitionend)
    // event for webkit
    activeTab.removeEventListener('webkitTransitionEnd', transitionend)
    // events for opera 10 / 12
    activeTab.removeEventListener('otransitionend', transitionend)
    activeTab.removeEventListener('oTransitionEnd', transitionend)
  }

  /**
   * anonymous function - check the hash to target the right tab
   *
   * @param  {string} e hash relative to the href on the  link
   * @return {string}   description
   */
  var hashChange = function (e) {
    var hash = window.location.hash
    var link = document.querySelector('a[href ="'+hash+'"]')
    if (link !== null && !link.parentNode.classList.contains('is-active')) {
      affichOnglet(link, e !== undefined)
    }
  }


  // select the nav tabs
  var tabs = document.querySelectorAll('.tabs-box .tabs a')
  // main loop
  for (var i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener('click', function (e) {
        e.preventDefault
        // call main function
        affichOnglet(this, true)
      })
  }



  // on refresh or on back
  window.addEventListener('hashchange', hashChange)
  hashChange()

})()
