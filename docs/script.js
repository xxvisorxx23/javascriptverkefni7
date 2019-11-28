
function createNode(element) {//function sem nær i element to byr til node fyrir það
      return document.createElement(element);
  }

  function append(parent, el) {
    return parent.appendChild(el);//appendar child obejcti
  }

  const ul = document.getElementById('bands');//nær i id sem = bands
  const url = 'https://apis.is/concerts';//nær i url fra apis
  fetch(url)//fetch nær i url json
  .then((resp) => resp.json())//ef einhvað gerirst við data þá breytir hann þvi
  .then(function(data) {//vinnur með datainu fra json
    let bands = data.results;//bands = data
    return bands.map(function(band) {//notar map fyrir hvert hlutinna bands data.results
      let li = createNode('li'),//createar nodes með functioninu create nodes
          img = createNode('img'),
          span = createNode('span');
          p = createNode('p');
          time = createNode('time');
      img.src = band.imageSource;//nær i img src frá json datainu
      let date = new Date(band.dateOfShow);//nær i date
      year = date.getFullYear();//gerir date meiri lesanlegur
      month = date.getMonth()+1;
      day = date.getDate();
      hour = date.getHours();
      minutes = date.getMinutes();
      seconds = date.getSeconds();
      fixeddate = "kl:"+hour+":"+minutes+seconds+ " " +day + "-" + month + "-" + year;
      time.innerHTML = fixeddate;//setur allt fra jsoninu inna innerhtml noda
      span.innerHTML = band.eventDateName;
      p.innerHTML = band.name + `<br/>` + band.eventHallName + `<br/>`  
      append(li, img);//li appendar allt svo appenda ul li
      append(li, span);
      append(li, p);
      append(li, time);
      append(ul, li);
    })

  })
  .catch(function(error) {//catchar error
    console.log(JSON.stringify(error));//skilur error
  });   
  let input = document.getElementById("search");//tekur input search
  input.addEventListener("keyup",search)//biður eftir keyup til að ná i search function
  function search() {
   let input = document.getElementById("search");
   let filter = input.value.toUpperCase();
   let ul = document.getElementById("bands");
   let li = document.getElementsByTagName("li");
    for (let i = 0; i < li.length; i++) {//loopar i gegnum hvert attriði í li 
      let span = li[i].getElementsByTagName("span")[0];
      if (span) {
        let txtValue = span.innerHTML;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {//ef txtvalue er ekki eins þá removar hann li
          li[i].style.display = "";
        } else {
          li[i].style.display = "none";
        }
      }
    }
  }