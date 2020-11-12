function filter() {
  var a, i, txtValue;
  
  const filter = document.getElementById('filterInput').value.toUpperCase();
  const ul = document.getElementById("content");
  const li = ul.getElementsByClassName('item');

  for (i = 0; i < li.length; i++) {
    txtValue = li[i].textContent || li[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].classList.add("show");
    } else {
      li[i].classList.remove("show");
    }
  }
}

function getSelectedLge() {
    return findActiveIn("lge");
}

function getSelectedTopic() {
    return findActiveIn("topic");
}

function findActiveIn(id) {
    return [...document.getElementById(id).children].find(button => button.classList.contains("active")).id;
}

function filterSelection() {
    const lge = getSelectedLge();
    const topic = getSelectedTopic();

    [...document.getElementsByClassName("item")].forEach(item => {
        item.classList.remove("show");
        if ((topic === 'all' || item.classList.contains(topic)) && item.classList.contains(lge)) {
            item.classList.add("show");
        }
    });
}

[...document.getElementById("selector").getElementsByClassName("btn")].forEach(btn => {
    btn.addEventListener("click", evt => {
        const current = evt.target.parentElement.getElementsByClassName("active");
        if(current.length > 0) {
            current[0].classList.remove("active");
        }

        evt.target.classList.add("active");
        filterSelection();
    });
});

filterSelection();

